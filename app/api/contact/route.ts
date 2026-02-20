import { NextRequest, NextResponse } from "next/server";
import DOMPurify from "isomorphic-dompurify";
import { contactFormSchema, ContactFormData } from "@/lib/validation";

interface ContactResponse {
  success: boolean;
  message: string;
}

interface ErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[]>;
}

function sanitizeInput(data: ContactFormData): ContactFormData {
  return {
    name: DOMPurify.sanitize(data.name.trim()),
    email: DOMPurify.sanitize(data.email.trim().toLowerCase()),
    company: DOMPurify.sanitize(data.company.trim()),
    projectType: DOMPurify.sanitize(data.projectType.trim()),
    message: DOMPurify.sanitize(data.message.trim()),
  };
}

export async function POST(request: NextRequest): Promise<NextResponse<ContactResponse | ErrorResponse>> {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate request data using Zod schema
    const validationResult = contactFormSchema.safeParse(body);
    
    if (!validationResult.success) {
      // Return 400 error with validation details
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    // Sanitize user input using DOMPurify
    const sanitizedData = sanitizeInput(validationResult.data);
    
    // Log the sanitized form submission (in production, you'd send to email service, database, etc.)
    console.log("Contact form submission:", {
      timestamp: new Date().toISOString(),
      data: sanitizedData,
    });

    // Return 200 success response
    return NextResponse.json({
      success: true,
      message: "Form submitted successfully. We'll get back to you soon!",
    });

  } catch (error) {
    // Handle unexpected errors
    console.error("Contact form API error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}