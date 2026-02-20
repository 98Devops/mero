"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { contactFormSchema, type ContactFormData } from "@/lib/validation";
import Button from "@/components/ui/Button";
import GlassCard from "@/components/ui/GlassCard";

interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  projectType?: string;
  message?: string;
}

const projectTypes = [
  "AI Automation & Workflows",
  "AI Agents & Chatbots", 
  "Internal Business Tools",
  "Web Applications",
  "Website Development",
  "API Integrations",
  "Cloud Infrastructure",
  "DevOps Engineering",
  "AI Consulting",
];

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: "",
  });

  const [formState, setFormState] = useState<FormState>({ status: "idle" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const result = contactFormSchema.safeParse(formData);
    
    if (result.success) {
      setErrors({});
      return true;
    }
    
    const fieldErrors: FormErrors = {};
    result.error.errors.forEach((err) => {
      const field = err.path[0] as keyof FormErrors;
      fieldErrors[field] = err.message;
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormState({ status: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormState({
          status: "success",
          message: "Thank you for your message! We'll get back to you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          company: "",
          projectType: "",
          message: "",
        });
      } else {
        setFormState({
          status: "error",
          message: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (_error) {
      setFormState({
        status: "error",
        message: "Unable to submit form. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <GlassCard className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-text-secondary mb-2">
            Ready to transform your business with intelligent systems? Let's discuss your project.
          </p>
          <p className="text-text-muted text-sm">
            📍 Mt Pleasant, Harare
          </p>
        </div>

        {formState.status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg"
          >
            <p className="text-green-400">{formState.message}</p>
          </motion.div>
        )}

        {formState.status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
          >
            <p className="text-red-400">{formState.message}</p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300 ${
                errors.name ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="Your full name"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300 ${
                errors.email ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="your.email@company.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Company Field */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
              Company *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300 ${
                errors.company ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="Your company name"
            />
            {errors.company && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors.company}
              </motion.p>
            )}
          </div>

          {/* Project Type Field */}
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-white mb-2">
              Project Type *
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300 ${
                errors.projectType ? "border-red-500/50" : "border-white/10"
              }`}
            >
              <option value="" className="bg-background-primary text-text-muted">
                Select a project type
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-background-primary text-white">
                  {type}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors.projectType}
              </motion.p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent-primary/50 focus:border-accent-primary/50 transition-all duration-300 resize-vertical ${
                errors.message ? "border-red-500/50" : "border-white/10"
              }`}
              placeholder="Tell us about your project, goals, and how we can help..."
            />
            {errors.message && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-sm text-red-400"
              >
                {errors.message}
              </motion.p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={formState.status === "submitting"}
              disabled={formState.status === "submitting"}
              className="w-full"
            >
              {formState.status === "submitting" ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}