import DOMPurify from "isomorphic-dompurify";
import { ContactFormData } from "./validation";

export function sanitizeInput(data: ContactFormData): ContactFormData {
  return {
    name: DOMPurify.sanitize(data.name.trim()),
    email: DOMPurify.sanitize(data.email.trim().toLowerCase()),
    company: DOMPurify.sanitize(data.company.trim()),
    projectType: DOMPurify.sanitize(data.projectType.trim()),
    message: DOMPurify.sanitize(data.message.trim()),
  };
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
