import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageCircle, Mail, Phone, Tractor, Leaf } from "lucide-react"
import { Link } from "react-router-dom"

export default function FAQPage() {
  const faqCategories = [
    {
      title: "Getting Started",
      faqs: [
        {
          question: "How do I start investing with SheleyFarms?",
          answer:
            "Getting started is simple! Create an account, browse our available farm investments, and choose the opportunities that align with your investment goals. You can start with as little as $500 on most farms.",
        },
        {
          question: "What is the minimum investment amount?",
          answer:
            "Minimum investments vary by farm, typically ranging from $500 to $5,000. Each farm listing clearly shows the minimum investment required.",
        },
        {
          question: "How long do investments typically last?",
          answer:
            "Investment periods vary depending on the farm and crop type. Most investments range from 6 months to 3 years, with the timeline clearly specified for each opportunity.",
        },
      ],
    },
    {
      title: "Returns & Payments",
      faqs: [
        {
          question: "How are returns calculated and paid?",
          answer:
            "Returns are calculated based on the farm's performance and are typically paid quarterly or at harvest time. You'll receive detailed reports showing how your investment is performing.",
        },
        {
          question: "What kind of returns can I expect?",
          answer:
            "Historical returns have ranged from 8% to 15% annually, depending on the farm and crop type. However, past performance doesn't guarantee future results, and all investments carry risk.",
        },
        {
          question: "Are there any fees?",
          answer:
            "We charge a small management fee (typically 1-2% annually) that covers farm monitoring, reporting, and platform maintenance. All fees are clearly disclosed before you invest.",
        },
      ],
    },
    {
      title: "Risk & Security",
      faqs: [
        {
          question: "What are the risks involved?",
          answer:
            "Agricultural investments carry risks including weather, market prices, and operational challenges. We mitigate these through careful farm selection, diversification, and insurance where applicable.",
        },
        {
          question: "How do you select farms?",
          answer:
            "We have a rigorous vetting process that includes financial analysis, on-site inspections, sustainability assessments, and farmer background checks. Only farms meeting our strict criteria are accepted.",
        },
        {
          question: "Is my investment insured?",
          answer:
            "Many of our farm partnerships include crop insurance to protect against weather-related losses. Insurance details are provided for each investment opportunity.",
        },
      ],
    },
    {
      title: "Platform & Account",
      faqs: [
        {
          question: "How do I track my investments?",
          answer:
            "Your investor dashboard provides real-time updates on all your investments, including performance reports, payment history, and farm updates with photos and videos.",
        },
        {
          question: "Can I visit the farms I've invested in?",
          answer:
            "Yes! We organize investor visits to farms throughout the year. You'll receive invitations to visit your invested farms and meet the farmers personally.",
        },
        {
          question: "How do I withdraw my investment?",
          answer:
            "Most investments have fixed terms, but we offer a secondary market where you may be able to sell your investment to other investors before maturity.",
        },
      ],
    },
    {
      title: "For Farmers",
      faqs: [
        {
          question: "How can I list my farm on SheleyFarms?",
          answer:
            "Farmers can apply through our Farmer Portal by creating an account and submitting a detailed application. Our team reviews each submission and conducts on-site evaluations before approval.",
        },
        {
          question: "What are the requirements to join as a farmer?",
          answer:
            "We look for farms with sustainable practices, solid business plans, transparent financials, and experienced management. Farms must also meet our environmental and social responsibility standards.",
        },
        {
          question: "How long does the approval process take?",
          answer:
            "The approval process typically takes 5-7 business days for initial review, followed by a comprehensive evaluation that can take 2-4 weeks depending on the complexity of your operation.",
        },
        {
          question: "What support do farmers receive?",
          answer:
            "Approved farmers get access to funding, business development support, sustainability guidance, and ongoing monitoring to ensure project success and investor satisfaction.",
        },
      ],
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 to-orange-500 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="h-20 w-20 mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about investing in agriculture with SheleyFarms
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="text-center mb-12">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 mb-4 px-4 py-2">
                  {category.title}
                </Badge>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">{category.title}</h2>
              </div>
              <Accordion type="single" collapsible className="space-y-4">
                {category.faqs.map((faq, faqIndex) => (
                  <AccordionItem
                    key={faqIndex}
                    value={`${categoryIndex}-${faqIndex}`}
                    className="bg-gray-50 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <AccordionTrigger className="px-8 py-6 text-left font-semibold hover:no-underline hover:bg-gray-100 rounded-xl text-gray-900">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-8 pb-6 text-gray-700 leading-relaxed text-lg">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-green-600 to-orange-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Tractor className="h-6 w-6 text-white" />
                </div>
                <span className="text-white font-medium">For Farmers</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Ready to List Your Farm?</h2>
              <p className="text-xl text-green-100">
                Join our network of successful farmers and get access to funding opportunities that can help grow your
                agricultural business.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/farmer/auth/signup">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-gray-50 shadow-lg">
                    <Leaf className="mr-2 h-5 w-5" />
                    Apply Now
                  </Button>
                </Link>
                <Link to="/farmer/auth/signin">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    Farmer Portal
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="Farmer with successful harvest"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$2.5M+</div>
                  <div className="text-sm text-gray-600">Farmer Funding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4 px-4 py-2">Support</Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-8">Still Have Questions?</h2>
            <p className="text-xl text-gray-600 mb-16">
              Our support team is here to help you with any questions about agricultural investing.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="h-16 w-16 text-orange-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">Live Chat</h3>
                  <p className="text-gray-600 mb-6">Chat with our support team in real-time</p>
                  <Button className="gradient-orange text-white shadow-lg">Start Chat</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <Mail className="h-16 w-16 text-green-600 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">Email Support</h3>
                  <p className="text-gray-600 mb-6">Get detailed answers via email</p>
                  <Button className="bg-green-600 hover:bg-green-700 text-white shadow-lg">Send Email</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8 text-center">
                  <Phone className="h-16 w-16 text-yellow-500 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">Phone Support</h3>
                  <p className="text-gray-600 mb-6">Speak directly with our experts</p>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 shadow-lg">Call Now</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-orange-50 to-green-50 border-0 shadow-lg">
              <CardContent className="p-12">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-6">Ready to Start Investing?</h3>
                <p className="text-gray-700 mb-8 text-lg">
                  Join thousands of investors who are already earning returns while supporting sustainable agriculture.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="gradient-orange text-white shadow-lg px-8">
                    <Link to="/farms">Browse Farms</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white bg-transparent px-8"
                  >
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
