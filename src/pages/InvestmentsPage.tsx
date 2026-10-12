"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Calendar } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import ProtectedRoute from "@/components/protected-route"

// Mock investment data
const investments = [
  {
    id: 1,
    farmName: "Green Valley Poultry Farm",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2024-01-15",
    amount: 2000,
    expectedReturn: "14%",
    currentValue: 2180,
    status: "Active",
    duration: "12 months",
    progress: 65,
    location: "Northern Region",
    farmType: "Poultry",
  },
  {
    id: 2,
    farmName: "Sunrise Vegetable Gardens",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2024-02-01",
    amount: 1500,
    expectedReturn: "12%",
    currentValue: 1590,
    status: "Active",
    duration: "8 months",
    progress: 40,
    location: "Central Region",
    farmType: "Vegetables",
  },
  {
    id: 3,
    farmName: "Golden Grain Rice Farm",
    farmImage: "/placeholder.svg?height=100&width=100",
    investmentDate: "2023-12-01",
    amount: 1000,
    expectedReturn: "10%",
    currentValue: 1100,
    status: "Completed",
    duration: "6 months",
    progress: 100,
    location: "Northern Region",
    farmType: "Grains",
  },
]

export default function InvestmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredInvestments = investments.filter((investment) => {
    const matchesSearch = investment.farmName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || investment.status.toLowerCase() === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">My Investments</h1>
              <p className="text-gray-600 mt-1">Track and manage all your agricultural investments</p>
            </div>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">Browse New Farms</Button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search investments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Investment Cards */}
          <div className="grid gap-6">
            {filteredInvestments.map((investment) => (
              <Card key={investment.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img
                        src={investment.farmImage || "/placeholder.svg"}
                        alt={investment.farmName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{investment.farmName}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {investment.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {investment.investmentDate}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Investment</p>
                        <p className="font-semibold text-gray-900">${investment.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Expected Return</p>
                        <p className="font-semibold text-green-600">{investment.expectedReturn}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Current Value</p>
                        <p className="font-semibold text-gray-900">${investment.currentValue.toLocaleString()}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-600">Progress</p>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{ width: `${investment.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{investment.progress}%</span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          investment.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                        }
                      >
                        {investment.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
