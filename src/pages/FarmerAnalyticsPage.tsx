"use client"

import FarmerProtectedRoute from "@/components/farmer-protected-route"
import FarmerDashboardLayout from "@/components/farmer-dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { TrendingUp, Eye, MessageSquare, DollarSign, Download, Calendar } from "lucide-react"
import { useState } from "react"

export default function FarmerAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")

  // Mock data - in real app, this would come from API
  const inquiryData = [
    { month: "Jan", inquiries: 5, investments: 2 },
    { month: "Feb", inquiries: 8, investments: 3 },
    { month: "Mar", inquiries: 12, investments: 4 },
    { month: "Apr", inquiries: 15, investments: 6 },
    { month: "May", inquiries: 18, investments: 7 },
    { month: "Jun", inquiries: 22, investments: 9 },
  ]

  const fundingData = [
    { month: "Jan", amount: 25000 },
    { month: "Feb", amount: 45000 },
    { month: "Mar", amount: 65000 },
    { month: "Apr", amount: 85000 },
    { month: "May", amount: 105000 },
    { month: "Jun", amount: 125000 },
  ]

  const farmPerformanceData = [
    { name: "Green Valley Organic", views: 245, inquiries: 18, funded: 125000, status: "Active" },
    { name: "Sunrise Vegetable Farm", views: 156, inquiries: 8, funded: 0, status: "Pending" },
    { name: "Heritage Grain Farm", views: 89, inquiries: 3, funded: 0, status: "Under Review" },
  ]

  const investorTypeData = [
    { name: "Individual", value: 65, color: "#f97316" },
    { name: "Institutional", value: 25, color: "#22c55e" },
    { name: "Corporate", value: 10, color: "#3b82f6" },
  ]

  const viewsData = [
    { date: "Jan 1", views: 12 },
    { date: "Jan 8", views: 18 },
    { date: "Jan 15", views: 25 },
    { date: "Jan 22", views: 32 },
    { date: "Jan 29", views: 28 },
    { date: "Feb 5", views: 35 },
    { date: "Feb 12", views: 42 },
  ]

  const stats = {
    totalViews: 1250,
    viewsGrowth: 15.2,
    totalInquiries: 29,
    inquiriesGrowth: 22.5,
    totalFunding: 125000,
    fundingGrowth: 8.3,
    conversionRate: 2.3,
    conversionChange: 0.5,
  }

  return (
    <FarmerProtectedRoute>
      <FarmerDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Track your farm performance and investor engagement</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Views</p>
                    <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+{stats.viewsGrowth}%</span>
                    </div>
                  </div>
                  <Eye className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Inquiries</p>
                    <p className="text-2xl font-bold">{stats.totalInquiries}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+{stats.inquiriesGrowth}%</span>
                    </div>
                  </div>
                  <MessageSquare className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Funding</p>
                    <p className="text-2xl font-bold">${(stats.totalFunding / 1000).toFixed(0)}K</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+{stats.fundingGrowth}%</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                    <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+{stats.conversionChange}%</span>
                    </div>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inquiry trends */}
            <Card>
              <CardHeader>
                <CardTitle>Inquiry & Investment Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={inquiryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="inquiries" fill="#f97316" name="Inquiries" />
                    <Bar dataKey="investments" fill="#22c55e" name="Investments" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Funding growth */}
            <Card>
              <CardHeader>
                <CardTitle>Funding Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={fundingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(Number(value) / 1000).toFixed(0)}K`, "Funding"]} />
                    <Area type="monotone" dataKey="amount" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Farm performance */}
            <Card>
              <CardHeader>
                <CardTitle>Farm Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {farmPerformanceData.map((farm, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{farm.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                          <span>{farm.views} views</span>
                          <span>{farm.inquiries} inquiries</span>
                          <span>${farm.funded.toLocaleString()} funded</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                            farm.status === "Active"
                              ? "bg-green-100 text-green-800"
                              : farm.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {farm.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Investor types */}
            <Card>
              <CardHeader>
                <CardTitle>Investor Types</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={investorTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {investorTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Views over time */}
          <Card>
            <CardHeader>
              <CardTitle>Views Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={viewsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#f97316" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Performance summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-2">
                    {Math.round(
                      (inquiryData.reduce((acc, curr) => acc + curr.investments, 0) /
                        inquiryData.reduce((acc, curr) => acc + curr.inquiries, 0)) *
                        100,
                    )}
                    %
                  </div>
                  <p className="text-gray-600">Inquiry to Investment Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {(fundingData[fundingData.length - 1].amount / fundingData.length / 1000).toFixed(0)}K
                  </div>
                  <p className="text-gray-600">Avg Monthly Funding</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {Math.round(inquiryData.reduce((acc, curr) => acc + curr.inquiries, 0) / inquiryData.length)}
                  </div>
                  <p className="text-gray-600">Avg Monthly Inquiries</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FarmerDashboardLayout>
    </FarmerProtectedRoute>
  )
}
