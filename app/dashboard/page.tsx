"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TrendingUp, DollarSign, Calendar, MapPin, Download, Eye, MoreHorizontal } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import ProtectedRoute from "@/components/protected-route"

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

// Mock investment data
const investmentsData = [
  {
    id: 1,
    farmName: "Green Valley Poultry Farm",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2024-01-15",
    amount: 2000,
    expectedReturn: "14%",
    currentValue: 2180,
    status: "Ongoing",
    duration: "12 months",
    progress: 65,
    nextPayout: "2024-04-15",
    location: "Northern Region",
  },
  {
    id: 2,
    farmName: "Sunrise Vegetable Gardens",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2024-02-01",
    amount: 1500,
    expectedReturn: "12%",
    currentValue: 1590,
    status: "Ongoing",
    duration: "8 months",
    progress: 40,
    nextPayout: "2024-06-01",
    location: "Central Region",
  },
  {
    id: 3,
    farmName: "Blue Lake Fishery",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2024-03-10",
    amount: 3000,
    expectedReturn: "16%",
    currentValue: 3240,
    status: "Ongoing",
    duration: "18 months",
    progress: 25,
    nextPayout: "2024-09-10",
    location: "Coastal Region",
  },
  {
    id: 4,
    farmName: "Golden Grain Rice Farm",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2023-12-01",
    amount: 1000,
    expectedReturn: "10%",
    currentValue: 1100,
    status: "Completed",
    duration: "6 months",
    progress: 100,
    completedDate: "2024-06-01",
    location: "Northern Region",
  },
  {
    id: 5,
    farmName: "Tropical Fruit Orchard",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2024-01-20",
    amount: 2000,
    expectedReturn: "15%",
    currentValue: 2150,
    status: "Ongoing",
    duration: "24 months",
    progress: 15,
    nextPayout: "2024-07-20",
    location: "Eastern Region",
  },
  {
    id: 6,
    farmName: "Highland Coffee Plantation",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2023-10-15",
    amount: 1500,
    expectedReturn: "18%",
    currentValue: 1770,
    status: "Completed",
    duration: "12 months",
    progress: 100,
    completedDate: "2024-10-15",
    location: "Eastern Region",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const ongoingInvestments = investmentsData.filter((inv) => inv.status === "Ongoing")
  const completedInvestments = investmentsData.filter((inv) => inv.status === "Completed")

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
                <Link href="/farms">Browse New Farms</Link>
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
                {ongoingInvestments.map((investment) => (
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
                          <p className="font-semibold text-green-600">{investment.expectedReturn}%</p>
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
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="space-y-4">
                {completedInvestments.map((investment) => (
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
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
