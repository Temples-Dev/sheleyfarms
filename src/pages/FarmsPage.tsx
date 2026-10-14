"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Filter, Search, TrendingUp } from "lucide-react"
import { Link } from "react-router-dom"
import { fetchFarms, type UiFarm } from "@/lib/farms-api"

export default function FarmsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("returnRate")
  const [farms, setFarms] = useState<UiFarm[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchFarms()
      .then((loaded) => {
        if (!cancelled) {
          setFarms(loaded)
          setLoadError(null)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("Could not load farms. Please try again later.")
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Filter and sort farms
  const filteredFarms = farms
    .filter((farm) => {
      const matchesSearch = farm.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLocation = locationFilter === "all" || farm.location === locationFilter
      const matchesType = typeFilter === "all" || farm.type === typeFilter
      const matchesStatus = statusFilter === "all" || farm.status === statusFilter
      return matchesSearch && matchesLocation && matchesType && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "returnRate":
          return Number.parseFloat(b.returnRate) - Number.parseFloat(a.returnRate)
        case "duration":
          return Number.parseInt(a.duration) - Number.parseInt(b.duration)
        case "minInvestment":
          return a.minInvestment - b.minInvestment
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-cream-beige">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#388E3C]/20">
        
      </header>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-green-50 py-24">
        <div className="container mx-auto px-4 text-center">
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-6 px-4 py-2">
            Investment Opportunities
          </Badge>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">Browse Farms</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover profitable farming investments across Ghana. Compare returns, durations, and find the perfect
            opportunity for your portfolio.
          </p>
          <div className="flex items-center justify-center space-x-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">50+</div>
              <div className="text-gray-600">Active Farms</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">₵2.5M+</div>
              <div className="text-gray-600">Total Invested</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">14%</div>
              <div className="text-gray-600">Avg. Returns</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search farms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 border-gray-300 focus:border-orange-500 focus:ring-orange-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-3">
                <Filter className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filter by:</span>
              </div>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Northern Region">Northern Region</SelectItem>
                  <SelectItem value="Central Region">Central Region</SelectItem>
                  <SelectItem value="Coastal Region">Coastal Region</SelectItem>
                  <SelectItem value="Eastern Region">Eastern Region</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Farm Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Poultry">Poultry</SelectItem>
                  <SelectItem value="Vegetable">Vegetable</SelectItem>
                  <SelectItem value="Fishery">Fishery</SelectItem>
                  <SelectItem value="Grain">Grain</SelectItem>
                  <SelectItem value="Fruit">Fruit</SelectItem>
                  <SelectItem value="Coffee">Coffee</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="Funded">Funded</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="returnRate">Return Rate</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="minInvestment">Min Investment</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 text-gray-600">
            {isLoading
              ? "Loading farms..."
              : `Showing ${filteredFarms.length} of ${farms.length} farms`}
          </div>
        </div>
      </section>

      {/* Farms Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">Loading farms...</p>
            </div>
          ) : loadError !== null ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-6">{loadError}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                Retry
              </Button>
            </div>
          ) : filteredFarms.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-6">No farms match your current filters.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setLocationFilter("all")
                  setTypeFilter("all")
                  setStatusFilter("all")
                }}
                variant="outline"
                className="border-orange-500 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFarms.map((farm) => (
                <Card
                  key={farm.id}
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
                          : farm.status === "Funded"
                            ? "bg-orange-500 hover:bg-orange-500 text-white"
                            : "bg-gray-500 hover:bg-gray-500 text-white"
                      }`}
                    >
                      {farm.status}
                    </Badge>
                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900 hover:bg-white/90">
                      {farm.type}
                    </Badge>
                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
                      <div className="flex items-center">
                        <TrendingUp className="h-4 w-4 text-orange-500 mr-1" />
                        <span className="text-2xl font-bold text-gray-900">{farm.returnRate}</span>
                      </div>
                      <div className="text-xs text-gray-600">Annual Return</div>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-gray-900 font-serif text-xl">{farm.name}</CardTitle>
                    <CardDescription className="text-gray-600 flex items-center">📍 {farm.location}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-gray-700">{farm.description}</p>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">{farm.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Min. Investment</p>
                        <p className="font-semibold text-gray-900">₵{farm.minInvestment.toLocaleString()}</p>
                      </div>
                    </div>

                    {farm.status !== "Closed" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Funding Progress</span>
                          <span className="font-semibold">{farm.fundingProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${farm.fundingProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <Button
                        asChild
                        className={`flex-1 ${
                          farm.status === "Open"
                            ? "gradient-orange text-white hover:shadow-lg"
                            : "bg-gray-100 text-gray-600 cursor-not-allowed"
                        } transition-all duration-300`}
                        disabled={farm.status === "Closed"}
                      >
                        <Link to={`/farms/${farm.id}`}>
                          {farm.status === "Open" ? "Invest Now" : farm.status === "Funded" ? "View Details" : "Closed"}
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                      >
                        <Link to={`/farms/${farm.id}`}>Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
