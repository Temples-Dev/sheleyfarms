"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, MapPin, Calendar, DollarSign, TrendingUp, Users, Shield } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Extended mock data for farm details
const farmDetailsData: Record<string, any> = {
  "1": {
    id: 1,
    name: "Green Valley Poultry Farm",
    bannerImage: "/placeholder.svg?height=400&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    returnRate: "14%",
    duration: "12 months",
    status: "Open",
    minInvestment: 500,
    maxInvestment: 10000,
    location: "Northern Region, Ghana",
    type: "Poultry",
    size: "25 acres",
    description:
      "Green Valley Poultry Farm is a state-of-the-art facility specializing in free-range chicken production. Our sustainable farming practices ensure high-quality poultry products while maintaining environmental responsibility.",
    detailedDescription:
      "Located in the fertile Northern Region of Ghana, Green Valley Poultry Farm spans 25 acres of lush farmland. We maintain a flock of over 5,000 free-range chickens, producing both meat and eggs for local and regional markets. Our modern facilities include climate-controlled housing, automated feeding systems, and on-site processing capabilities.",
    fundingProgress: 65,
    totalFundingGoal: 50000,
    currentFunding: 32500,
    investorCount: 23,
    farmActivities: [
      "Free-range chicken rearing",
      "Egg production and collection",
      "Feed production and storage",
      "Processing and packaging",
      "Local market distribution",
    ],
    keyFeatures: [
      "Certified organic practices",
      "Modern climate-controlled facilities",
      "Automated feeding systems",
      "On-site veterinary care",
      "Direct market access",
    ],
    riskFactors: [
      "Weather-dependent operations",
      "Market price fluctuations",
      "Disease management",
      "Feed cost variations",
    ],
    expectedReturns: {
      "6 months": "7%",
      "12 months": "14%",
      "18 months": "21%",
    },
    payoutSchedule: "Quarterly dividends with principal return at maturity",
    farmManager: {
      name: "Kwame Osei",
      experience: "15 years in poultry farming",
      credentials: "Agricultural Science Degree, Certified Organic Farmer",
    },
  },
  "2": {
    id: 2,
    name: "Sunrise Vegetable Gardens",
    bannerImage: "/placeholder.svg?height=400&width=800",
    gallery: [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ],
    returnRate: "12%",
    duration: "8 months",
    status: "Open",
    minInvestment: 300,
    maxInvestment: 5000,
    location: "Central Region, Ghana",
    type: "Vegetable",
    size: "15 acres",
    description:
      "Sunrise Vegetable Gardens focuses on organic vegetable production, growing premium tomatoes, peppers, and leafy greens for local markets using sustainable farming methods.",
    detailedDescription:
      "Our 15-acre organic vegetable farm in the Central Region utilizes advanced irrigation systems and greenhouse technology to ensure year-round production. We specialize in high-value crops including tomatoes, bell peppers, lettuce, and spinach, supplying restaurants and supermarkets across the region.",
    fundingProgress: 40,
    totalFundingGoal: 30000,
    currentFunding: 12000,
    investorCount: 15,
    farmActivities: [
      "Organic vegetable cultivation",
      "Greenhouse management",
      "Irrigation system operation",
      "Harvesting and packaging",
      "Market distribution",
    ],
    keyFeatures: [
      "Organic certification",
      "Drip irrigation system",
      "Greenhouse facilities",
      "Soil health management",
      "Premium market contracts",
    ],
    riskFactors: [
      "Seasonal demand variations",
      "Pest and disease management",
      "Water availability",
      "Market competition",
    ],
    expectedReturns: {
      "4 months": "6%",
      "8 months": "12%",
      "12 months": "18%",
    },
    payoutSchedule: "Bi-annual dividends with principal return at harvest",
    farmManager: {
      name: "Ama Asante",
      experience: "12 years in organic farming",
      credentials: "Horticulture Degree, Organic Certification",
    },
  },
}

export default function FarmDetailPage() {
  const params = useParams()
  const farmId = params.id as string
  const farm = farmDetailsData[farmId]
  const [selectedImage, setSelectedImage] = useState(0)

  if (!farm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">Farm Not Found</h1>
          <Link href="/farms">
            <Button className="gradient-orange text-white shadow-lg">Back to Farms</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Banner Section */}
      <section className="relative">
        <div className="h-[500px] overflow-hidden">
          <img src={farm.bannerImage || "/placeholder.svg"} alt={farm.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Link
                href="/farms"
                className="flex items-center text-white/90 hover:text-white transition-colors bg-black/30 backdrop-blur-sm rounded-lg px-4 py-2"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Farms
              </Link>
              <Badge className="bg-white/90 text-gray-900 hover:bg-white/90">{farm.type}</Badge>
              <Badge
                className={`${
                  farm.status === "Open"
                    ? "bg-green-500 hover:bg-green-500 text-white"
                    : farm.status === "Funded"
                      ? "bg-orange-500 hover:bg-orange-500 text-white"
                      : "bg-gray-500 hover:bg-gray-500 text-white"
                }`}
              >
                {farm.status}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-4">{farm.name}</h1>
            <div className="flex items-center text-white/90 text-xl">
              <MapPin className="h-6 w-6 mr-3" />
              {farm.location}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="gallery">Gallery</TabsTrigger>
                  <TabsTrigger value="returns">Returns</TabsTrigger>
                  <TabsTrigger value="faq">FAQ</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <Card className="shadow-lg border-0">
                    <CardHeader>
                      <CardTitle className="text-gray-900 font-serif text-2xl">Farm Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                        <p className="text-gray-700 leading-relaxed text-lg">{farm.detailedDescription}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Farm Activities</h3>
                          <ul className="space-y-3">
                            {farm.farmActivities.map((activity: string, index: number) => (
                              <li key={index} className="flex items-center text-gray-700">
                                <div className="w-2 h-2 bg-orange-500 rounded-full mr-4" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                          <ul className="space-y-3">
                            {farm.keyFeatures.map((feature: string, index: number) => (
                              <li key={index} className="flex items-center text-gray-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-4" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">Farm Manager</h3>
                        <Card className="bg-gradient-to-r from-orange-50 to-green-50 border-0">
                          <CardContent className="p-6">
                            <p className="font-semibold text-gray-900 text-lg">{farm.farmManager.name}</p>
                            <p className="text-gray-700">{farm.farmManager.experience}</p>
                            <p className="text-gray-600">{farm.farmManager.credentials}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="gallery" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-soil-brown font-serif">Farm Gallery</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="aspect-video overflow-hidden rounded-lg">
                          <img
                            src={farm.gallery[selectedImage] || "/placeholder.svg"}
                            alt={`${farm.name} - Image ${selectedImage + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {farm.gallery.map((image: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                                selectedImage === index ? "border-harvest-orange" : "border-transparent"
                              }`}
                            >
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`${farm.name} - Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="returns" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-soil-brown font-serif">Investment Returns</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-soil-brown mb-3">Expected Returns</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {Object.entries(farm.expectedReturns).map(([period, rate]) => (
                            <div key={period} className="bg-cream-beige p-4 rounded-lg text-center">
                              <p className="text-2xl font-bold text-harvest-orange">{rate}</p>
                              <p className="text-soil-brown/70">{period}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-soil-brown mb-3">Payout Schedule</h3>
                        <p className="text-soil-brown/80">{farm.payoutSchedule}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-soil-brown mb-3">Risk Factors</h3>
                        <ul className="space-y-2">
                          {farm.riskFactors.map((risk: string, index: number) => (
                            <li key={index} className="flex items-center text-soil-brown/80">
                              <Shield className="w-4 h-4 text-sunrise-yellow mr-3" />
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="faq" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-soil-brown font-serif">Frequently Asked Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>How are returns calculated?</AccordionTrigger>
                          <AccordionContent>
                            Returns are calculated based on the farm's net profit after operational expenses. Investors
                            receive a proportional share based on their investment amount.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                          <AccordionTrigger>When do I receive my returns?</AccordionTrigger>
                          <AccordionContent>
                            {farm.payoutSchedule}. You'll receive detailed reports before each payout.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                          <AccordionTrigger>Can I visit the farm?</AccordionTrigger>
                          <AccordionContent>
                            Yes! We organize quarterly investor visits where you can see the farm operations firsthand
                            and meet the management team.
                          </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                          <AccordionTrigger>What happens if the farm underperforms?</AccordionTrigger>
                          <AccordionContent>
                            While we carefully select farms with strong track records, agricultural investments carry
                            inherent risks. We provide regular updates and work with farm managers to address any
                            challenges.
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Column - Investment Panel */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="shadow-xl border-0">
                  <CardHeader>
                    <CardTitle className="text-gray-900 font-serif text-2xl">Investment Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-6">
                      <div className="text-center p-4 bg-orange-50 rounded-xl">
                        <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                        <p className="text-3xl font-bold text-orange-500">{farm.returnRate}</p>
                        <p className="text-sm text-gray-600">Annual Return</p>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-xl">
                        <Calendar className="h-8 w-8 text-green-500 mx-auto mb-3" />
                        <p className="text-3xl font-bold text-green-500">{farm.duration}</p>
                        <p className="text-sm text-gray-600">Duration</p>
                      </div>
                    </div>

                    {/* Investment Range */}
                    <div>
                      <div className="flex items-center mb-3">
                        <DollarSign className="h-6 w-6 text-gray-700 mr-3" />
                        <span className="font-semibold text-gray-900 text-lg">Investment Range</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        ₵{farm.minInvestment.toLocaleString()} - ₵{farm.maxInvestment.toLocaleString()}
                      </p>
                    </div>

                    {/* Funding Progress */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-semibold text-gray-900">Funding Progress</span>
                        <span className="text-lg font-bold text-gray-900">{farm.fundingProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 mb-3">
                        <div
                          className="bg-gradient-to-r from-orange-400 to-orange-600 h-4 rounded-full transition-all duration-300"
                          style={{ width: `${farm.fundingProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>₵{farm.currentFunding.toLocaleString()} raised</span>
                        <span>₵{farm.totalFundingGoal.toLocaleString()} goal</span>
                      </div>
                    </div>

                    {/* Investor Count */}
                    <div className="flex items-center justify-center p-4 bg-gray-50 rounded-xl">
                      <Users className="h-6 w-6 text-gray-700 mr-3" />
                      <span className="text-gray-900 font-semibold">{farm.investorCount} investors joined</span>
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-4">
                      <Button
                        className={`w-full h-14 text-lg ${
                          farm.status === "Open"
                            ? "gradient-orange text-white hover:shadow-xl"
                            : "bg-gray-100 text-gray-600 cursor-not-allowed"
                        } transition-all duration-300`}
                        disabled={farm.status !== "Open"}
                      >
                        {farm.status === "Open" ? "Invest Now" : farm.status === "Funded" ? "Fully Funded" : "Closed"}
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full h-14 text-lg border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        Reserve Your Slot
                      </Button>
                    </div>

                    {/* Additional Info */}
                    <div className="pt-6 border-t border-gray-200">
                      <div className="space-y-3 text-gray-600">
                        <p>• Minimum investment: ₵{farm.minInvestment.toLocaleString()}</p>
                        <p>• Farm size: {farm.size}</p>
                        <p>• Location: {farm.location}</p>
                        <p>• Managed by: {farm.farmManager.name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
