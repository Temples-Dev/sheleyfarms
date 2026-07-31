"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, MessageCircle, Phone, Mail, FileText, HelpCircle } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import ProtectedRoute from "@/components/protected-route"

const faqs = [
  {
    question: "How do I make my first investment?",
    answer:
      "To make your first investment, browse our available farms, select one that matches your investment goals, and follow the investment process. You'll need to complete KYC verification and have funds in your wallet.",
  },
  {
    question: "When will I receive returns on my investment?",
    answer:
      "Returns are typically distributed quarterly, but this varies by farm type and investment duration. Each farm listing shows the expected return schedule and payout dates.",
  },
  {
    question: "Can I withdraw my investment early?",
    answer:
      "Early withdrawal policies vary by farm. Some investments have lock-in periods, while others may allow early withdrawal with penalties. Check the specific terms for each investment.",
  },
  {
    question: "How is my investment protected?",
    answer:
      "We work with verified farms, provide insurance coverage, and conduct regular monitoring. However, all investments carry risk, and past performance doesn't guarantee future results.",
  },
  {
    question: "What documents will I receive?",
    answer:
      "You'll receive investment certificates, quarterly reports, tax documents, and any relevant farm updates. All documents are available in your dashboard's Documents section.",
  },
]

export default function HelpPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Help Center</h1>
            <p className="text-gray-600 mt-1">Get support and find answers to your questions</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-8 w-8 text-orange-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Phone className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-sm text-gray-600 mb-4">Call us for immediate help</p>
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent"
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-sm text-gray-600 mb-4">Send us a detailed message</p>
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white bg-transparent"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Search */}
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input placeholder="Search for help articles, FAQs, or topics..." className="pl-10 h-12 text-lg" />
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <HelpCircle className="mr-2 h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>Find quick answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <FileText className="mr-2 h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>Can't find what you're looking for? Send us a message</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="support-name">Name</Label>
                    <Input id="support-name" placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="support-email">Email</Label>
                    <Input id="support-email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-subject">Subject</Label>
                  <Input id="support-subject" placeholder="Brief description of your issue" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea id="support-message" placeholder="Please describe your issue in detail..." rows={5} />
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">Send Message</Button>
              </form>
            </CardContent>
          </Card>

          {/* Support Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Support Hours</CardTitle>
              <CardDescription>When our team is available to help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Live Chat & Phone</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Monday - Friday: 8:00 AM - 8:00 PM EST</p>
                    <p>Saturday: 9:00 AM - 5:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Email Support</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>24/7 - We respond within 24 hours</p>
                    <p>Priority support for urgent issues</p>
                    <p>support@sheleyfarms.com</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
