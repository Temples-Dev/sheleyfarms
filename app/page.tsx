import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Star, TrendingUp, Shield, Users, Award, Tractor, Leaf } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-orange-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 px-4 py-2">
                  🌱 Sustainable Agriculture Investment
                </Badge>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 leading-tight">
                  Invest in the Future of <span className="gradient-text">Farming</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Explore vetted farms, understand their operations, and invest to earn attractive annual returns while
                  supporting sustainable agriculture across Ghana.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/farms">
                  <Button
                    size="lg"
                    className="gradient-orange text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Browse Farms
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50 bg-transparent">
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">50+</div>
                  <div className="text-sm text-gray-600">Active Farms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">₵2.5M+</div>
                  <div className="text-sm text-gray-600">Invested</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">14%</div>
                  <div className="text-sm text-gray-600">Avg. Returns</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-3xl transform rotate-3 opacity-10"></div>
              <img
                src="/placeholder.svg?height=600&width=700"
                alt="Modern farmer using technology in lush farm field"
                className="rounded-3xl shadow-2xl relative z-10 w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl z-20">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">+16% Growth</div>
                    <div className="text-sm text-gray-600">This Quarter</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 mb-4">Simple Process</Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">How SheleyFarms Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start your agricultural investment journey in four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Explore",
                description: "Browse our curated selection of profitable farms with detailed analytics",
                icon: <Users className="h-8 w-8" />,
                color: "bg-blue-500",
              },
              {
                step: "02",
                title: "Analyze",
                description: "Review farm performance, financials, and growth projections",
                icon: <TrendingUp className="h-8 w-8" />,
                color: "bg-green-500",
              },
              {
                step: "03",
                title: "Invest",
                description: "Choose your investment amount and secure your stake safely",
                icon: <Shield className="h-8 w-8" />,
                color: "bg-orange-500",
              },
              {
                step: "04",
                title: "Earn",
                description: "Receive attractive annual returns and track your portfolio",
                icon: <Award className="h-8 w-8" />,
                color: "bg-purple-500",
              },
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="text-center space-y-6">
                  <div
                    className={`w-20 h-20 ${item.color} rounded-2xl flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform duration-300`}
                  >
                    {item.icon}
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-orange-600">{item.step}</div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
                {index < 3 && <div className="hidden md:block absolute top-10 -right-4 w-8 h-0.5 bg-gray-200"></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Farms */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-4">Investment Opportunities</Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Featured Farms</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover high-yield farming investments with proven track records and transparent operations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Green Valley Poultry Farm",
                image: "/placeholder.svg?height=300&width=400",
                returnRate: "14%",
                duration: "12 months",
                status: "Open",
                minInvestment: "₵500",
                location: "Northern Region",
                funded: 75,
                investors: 24,
              },
              {
                name: "Sunrise Vegetable Gardens",
                image: "/placeholder.svg?height=300&width=400",
                returnRate: "12%",
                duration: "8 months",
                status: "Open",
                minInvestment: "₵300",
                location: "Central Region",
                funded: 60,
                investors: 18,
              },
              {
                name: "Blue Lake Fishery",
                image: "/placeholder.svg?height=300&width=400",
                returnRate: "16%",
                duration: "18 months",
                status: "Funded",
                minInvestment: "₵1,000",
                location: "Coastal Region",
                funded: 100,
                investors: 32,
              },
            ].map((farm, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={farm.image || "/placeholder.svg"}
                    alt={farm.name}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className={`absolute top-4 right-4 ${
                      farm.status === "Open"
                        ? "bg-green-500 hover:bg-green-500 text-white"
                        : "bg-orange-500 hover:bg-orange-500 text-white"
                    }`}
                  >
                    {farm.status}
                  </Badge>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                    <div className="text-2xl font-bold text-gray-900">{farm.returnRate}</div>
                    <div className="text-xs text-gray-600">Annual Return</div>
                  </div>
                </div>

                <CardHeader className="space-y-3">
                  <CardTitle className="text-gray-900 font-serif text-xl">{farm.name}</CardTitle>
                  <CardDescription className="text-gray-600 flex items-center">📍 {farm.location}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-900">{farm.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Min. Investment</p>
                      <p className="font-semibold text-gray-900">{farm.minInvestment}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Funded</span>
                      <span className="font-semibold">{farm.funded}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${farm.funded}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">{farm.investors} investors</div>
                  </div>

                  <Link href={`/farms/${index + 1}`}>
                    <Button
                      className={`w-full ${
                        farm.status === "Open"
                          ? "gradient-orange text-white hover:shadow-lg"
                          : "bg-gray-100 text-gray-600 cursor-not-allowed"
                      } transition-all duration-300`}
                      disabled={farm.status === "Funded"}
                    >
                      {farm.status === "Open" ? "Invest Now" : "View Details"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/farms">
              <Button
                variant="outline"
                size="lg"
                className="border-orange-300 text-orange-600 hover:bg-orange-50 px-8 bg-transparent"
              >
                View All Farms
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-r from-green-600 to-orange-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Tractor className="h-6 w-6 text-white" />
                </div>
                <Badge className="bg-white/20 text-white hover:bg-white/20">For Farmers</Badge>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">List Your Farm on SheleyFarms</h2>
              <p className="text-xl text-green-100">
                Connect with investors, secure funding for your agricultural projects, and grow your farming business
                with our trusted platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/farmer/auth/signup">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-gray-50 shadow-lg">
                    <Leaf className="mr-2 h-5 w-5" />
                    List Your Farm
                  </Button>
                </Link>
                <Link href="/farmer/auth/signin">
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
                alt="Happy farmer in field with crops"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">67+</div>
                  <div className="text-sm text-gray-600">Farmers Joined</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100 mb-4">Success Stories</Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">What Our Investors Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ama Osei",
                role: "Small Business Owner",
                content:
                  "SheleyFarms has been an excellent investment platform. I've earned consistent returns while supporting local agriculture. The transparency is outstanding.",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
                return: "15.2%",
              },
              {
                name: "Kwame Asante",
                role: "Teacher",
                content:
                  "The transparency and regular updates make me feel confident about my investments. Great platform for beginners like me to start investing.",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
                return: "13.8%",
              },
              {
                name: "Akosua Mensah",
                role: "Entrepreneur",
                content:
                  "I love that I can support sustainable farming while earning good returns. The process is simple, trustworthy, and the community is amazing.",
                rating: 5,
                avatar: "/placeholder.svg?height=60&width=60",
                return: "16.4%",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="space-y-6 p-0">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      +{testimonial.return} return
                    </Badge>
                  </div>

                  <blockquote className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</blockquote>

                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="text-xl text-orange-100">
              Join thousands of investors who are earning attractive returns while supporting sustainable agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-50 shadow-lg">
                  Start Investing Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Schedule a Call
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
