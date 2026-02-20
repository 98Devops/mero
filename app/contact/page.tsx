import { Metadata } from "next";
import ContactForm from "@/components/forms/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us - Mero Tech",
  description: "Get in touch with Mero Tech for AI automation, web development, and cloud infrastructure solutions. Located in Mt Pleasant, Harare.",
  keywords: ["contact", "mero tech", "ai automation", "web development", "harare", "zimbabwe"],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Let's Build Something Amazing Together
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
              Ready to transform your business with intelligent systems? We're here to help you succeed.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />

          {/* Company Information */}
          <div className="mt-16 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8">About Mero Tech</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Our Expertise</h3>
                  <p className="text-text-secondary">
                    We specialize in building intelligent systems that transform how businesses operate. 
                    From AI automation and chatbots to scalable web applications and cloud infrastructure, 
                    we deliver solutions that drive real results.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-white">Our Approach</h3>
                  <p className="text-text-secondary">
                    We believe in clear communication, technical excellence, and delivering value from day one. 
                    Our team works closely with you to understand your challenges and build solutions that 
                    scale with your business.
                  </p>
                </div>
              </div>
              
              {/* Location */}
              <div className="mt-12 p-6 bg-white/5 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-4">Our Location</h3>
                <p className="text-text-secondary">
                  📍 Mt Pleasant, Harare, Zimbabwe
                </p>
                <p className="text-text-muted text-sm mt-2">
                  Serving clients locally and internationally
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}