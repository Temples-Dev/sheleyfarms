"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TrendingUp, DollarSign, Calendar, MapPin, Download, Eye, MoreHorizontal } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import ProtectedRoute from "@/components/protected-route"
import { Link } from "react-router-dom"
import { fetchMyInvestments, type UiInvestment } from "@/lib/investments-api"

// Mock user data
const userData = {
  name: "Ama Osei",
  email: "ama.osei@email.com",
  joinDate: "March 2024",
  avatar: "/placeholder.svg?height=100&width=100",
  totalInvested: 8500,
  totalReturns: 1240,
  activeInvestments: 5,
  completedInvestments: 2,
}


export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [investments, setInvestments] = useState<UiInvestment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    fetchMyInvestments()
      .then((loaded) => {
        if (!cancelled) {
          setInvestments(loaded)
          setLoadError(null)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setLoadError("Could not load investments.")
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

  const ongoingInvestments = investments.filter((inv) => inv.status === "Active")
  const completedInvestments = investments.filter((inv) => inv.status === "Completed")

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {/* Welcome Section */}
        <section className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">Hello, {userData.name}!</h1>
              <p className="text-gray-600 mt-1">Welcome back to your investment dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
              >
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Link to="/farms">Browse New Farms</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Total Invested</CardTitle>
                <DollarSign className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">${userData.totalInvested.toLocaleString()}</div>
                <p className="text-xs text-gray-600">Across {userData.activeInvestments} active farms</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Total Returns</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">${userData.totalReturns.toLocaleString()}</div>
                <p className="text-xs text-gray-600">
                  +{((userData.totalReturns / userData.totalInvested) * 100).toFixed(1)}% overall return
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Active Investments</CardTitle>
                <Calendar className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{userData.activeInvestments}</div>
                <p className="text-xs text-gray-600">Currently generating returns</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Portfolio Value</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  ${(userData.totalInvested + userData.totalReturns).toLocaleString()}
                </div>
                <p className="text-xs text-gray-600">Current total value</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Dashboard Content */}
        <section>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
              <TabsTrigger value="active">Active Investments</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Recent Activity</CardTitle>
                    <CardDescription>Your latest investment activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Investment return received</p>
                          <p className="text-xs text-gray-600">Sunny Acres Farm - $2,400</p>
                        </div>
                        <span className="text-xs text-gray-500">2 days ago</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">New investment made</p>
                          <p className="text-xs text-gray-600">Green Valley Organic - $15,000</p>
                        </div>
                        <span className="text-xs text-gray-500">1 week ago</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Investment return received</p>
                          <p className="text-xs text-gray-600">Heritage Wheat Farm - $1,800</p>
                        </div>
                        <span className="text-xs text-gray-500">2 weeks ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-900">Portfolio Performance</CardTitle>
                    <CardDescription>Your investment growth over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <p className="text-gray-500">Performance chart would go here</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="active" className="mt-6">
              <div className="space-y-4">
                {isLoading ? (
                  <p className="text-gray-500">Loading investments...</p>
                ) : loadError !== null ? (
                  <p className="text-gray-500">{loadError}</p>
                ) : ongoingInvestments.length === 0 ? (
                  <p className="text-gray-500">No active investments.</p>
                ) : (
                  ongoingInvestments.map((investment) => (
                  <Card key={investment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={investment.farmImage || "/placeholder.svg"}
                            alt={investment.farmName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{investment.farmName}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{investment.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Investment Amount</p>
                          <p className="font-semibold text-gray-900">${investment.amount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Expected Return</p>
                          <p className="font-semibold text-green-600">{investment.expectedReturn}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-semibold text-gray-900">{investment.duration}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {investment.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="space-y-4">
                {isLoading ? (
                  <p className="text-gray-500">Loading investments...</p>
                ) : loadError !== null ? (
                  <p className="text-gray-500">{loadError}</p>
                ) : completedInvestments.length === 0 ? (
                  <p className="text-gray-500">No completed investments.</p>
                ) : (
                  completedInvestments.map((investment) => (
                  <Card key={investment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <img
                            src={investment.farmImage || "/placeholder.svg"}
                            alt={investment.farmName}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="font-semibold text-gray-900">{investment.farmName}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <MapPin className="h-4 w-4" />
                              <span>{investment.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Investment Amount</p>
                          <p className="font-semibold text-gray-900">${investment.amount.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total Return</p>
                          <p className="font-semibold text-green-600">${investment.currentValue - investment.amount}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Completion Date</p>
                          <p className="font-semibold text-gray-900">{investment.completedDate}</p>
                        </div>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {investment.status}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
