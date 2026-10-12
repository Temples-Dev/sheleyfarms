import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart, Tractor, Leaf } from "lucide-react"
import { Link } from "react-router-dom"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former agricultural economist with 15+ years in sustainable farming investments.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Chen",
      role: "Head of Farm Operations",
      bio: "Agricultural engineer specializing in modern farming techniques and crop optimization.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Emily Rodriguez",
      role: "Investment Director",
      bio: "Financial expert with deep knowledge in agricultural markets and investment strategies.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Thompson",
      role: "Sustainability Officer",
      bio: "Environmental scientist focused on sustainable farming practices and climate resilience.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8 text-orange-500" />,
      title: "Transparency",
      description: "We believe in complete transparency in all our investment opportunities and farm operations.",
    },
    {
      icon: <Heart className="h-8 w-8 text-green-600" />,
      title: "Sustainability",
      description:
        "Every farm we partner with follows sustainable practices that benefit both investors and the environment.",
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-500" />,
      title: "Community",
      description: "We build lasting relationships with farmers, investors, and local communities.",
    },
    {
      icon: <Award className="h-8 w-8 text-gray-700" />,
      title: "Excellence",
      description: "We maintain the highest standards in farm selection, management, and investor relations.",
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-500 to-green-600 text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">About SheleyFarms</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Connecting investors with sustainable agricultural opportunities since 2018
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-12 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
              <p className="text-xl leading-relaxed">
                SheleyFarms was founded in 2018 with a simple yet powerful vision: to democratize agricultural
                investment while supporting sustainable farming practices. Our founder, Sarah Johnson, recognized that
                traditional farming faced significant challenges - from access to capital to adopting sustainable
                practices - while investors sought meaningful opportunities to generate returns while making a positive
                impact.
              </p>
              <p className="text-xl leading-relaxed">
                What started as a small initiative to connect local investors with family farms has grown into a
                comprehensive platform serving thousands of investors and hundreds of farms across the country. We&apos;ve
                facilitated over $50 million in agricultural investments, helping farms expand, modernize, and adopt
                sustainable practices.
              </p>
              <p className="text-xl leading-relaxed">
                Today, SheleyFarms continues to bridge the gap between capital and agriculture, creating win-win
                opportunities that benefit investors, farmers, and the environment. Every investment through our
                platform contributes to a more sustainable and resilient food system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <Card className="border-2 border-green-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-3xl font-serif font-bold text-green-600 mb-6">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  To make agricultural investment accessible, transparent, and profitable while promoting sustainable
                  farming practices that benefit our planet and future generations.
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 border-orange-500 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <h3 className="text-3xl font-serif font-bold text-orange-500 mb-6">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  A world where sustainable agriculture is fully funded by conscious investors, creating prosperity for
                  farmers, returns for investors, and a healthier planet for all.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-16 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-16 text-center">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 group">
                <CardContent className="p-8">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-6 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="text-xl font-serif font-bold mb-2 text-gray-900">{member.name}</h3>
                  <p className="text-orange-500 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Partner with SheleyFarms</h2>
              <p className="text-xl text-green-100">
                Join our network of successful farmers. Get access to funding, expert support, and a community of
                agricultural professionals committed to sustainable farming.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/farmer/auth/signup">
                  <Button size="lg" className="bg-white text-green-700 hover:bg-gray-50 shadow-lg">
                    <Leaf className="mr-2 h-5 w-5" />
                    Apply to List Your Farm
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
                alt="Farmer working in sustainable farm"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">67+</div>
                  <div className="text-sm text-gray-600">Partner Farms</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-orange-500 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">
            Ready to Start Your Agricultural Investment Journey?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto">
            Join thousands of investors who are already earning returns while supporting sustainable agriculture.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-50 shadow-lg px-8">
              <Link to="/farms">Explore Farms</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 bg-transparent px-8"
            >
              <Link to="/faq">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
