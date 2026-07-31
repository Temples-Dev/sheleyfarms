"use client"

import AdminProtectedRoute from "@/components/admin-protected-route"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
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
} from "recharts"
import { TrendingUp, Users, DollarSign, FileText, Download, BarChart3 } from "lucide-react"
import { useState } from "react"

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("30d")

  // Mock data - in real app, this would come from API
  const submissionData = [
    { month: "Jan", submissions: 12, approved: 8, rejected: 3 },
    { month: "Feb", submissions: 15, approved: 11, rejected: 2 },
    { month: "Mar", submissions: 18, approved: 14, rejected: 4 },
    { month: "Apr", submissions: 22, approved: 16, rejected: 5 },
    { month: "May", submissions: 25, approved: 19, rejected: 4 },
    { month: "Jun", submissions: 28, approved: 22, rejected: 6 },
  ]

  const investmentData = [
    { month: "Jan", amount: 1200000 },
    { month: "Feb", amount: 1450000 },
    { month: "Mar", amount: 1680000 },
    { month: "Apr", amount: 1920000 },
    { month: "May", amount: 2150000 },
    { month: "Jun", amount: 2450000 },
  ]

  const farmTypeData = [
    { name: "Organic", value: 35, color: "#22c55e" },
    { name: "Hydroponic", value: 25, color: "#3b82f6" },
    { name: "Conventional", value: 20, color: "#f59e0b" },
    { name: "Specialty", value: 15, color: "#8b5cf6" },
    { name: "Other", value: 5, color: "#6b7280" },
  ]

  const userGrowthData = [
    { month: "Jan", farmers: 45, investors: 120 },
    { month: "Feb", farmers: 52, investors: 145 },
    { month: "Mar", farmers: 61, investors: 168 },
    { month: "Apr", farmers: 67, investors: 195 },
    { month: "May", farmers: 74, investors: 218 },
    { month: "Jun", farmers: 82, investors: 245 },
  ]

  const stats = {
    totalRevenue: 2450000,
    revenueGrowth: 12.5,
    totalUsers: 327,
    userGrowth: 8.3,
    totalSubmissions: 120,
    submissionGrowth: 15.2,
    approvalRate: 78.5,
    approvalChange: 2.1,
  }

  return (
    <AdminProtectedRoute>
      <AdminDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600">Platform performance and insights</p>
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
                    <p className="text-sm font-medium text-gray-600">Total Investment</p>
                    <p className="text-2xl font-bold">${(stats.totalRevenue / 1000000).toFixed(1)}M</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600">+{stats.revenueGrowth}%</span>
                    </div>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="text-sm text-blue-600">+{stats.userGrowth}%</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Submissions</p>
                    <p className="text-2xl font-bold">{stats.totalSubmissions}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-purple-500 mr-1" />
                      <span className="text-sm text-purple-600">+{stats.submissionGrowth}%</span>
                    </div>
                  </div>
                  <FileText className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Approval Rate</p>
                    <p className="text-2xl font-bold">{stats.approvalRate}%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-4 h-4 text-orange-500 mr-1" />
                      <span className="text-sm text-orange-600">+{stats.approvalChange}%</span>
                    </div>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submission trends */}
            <Card>
              <CardHeader>
                <CardTitle>Submission Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={submissionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="submissions" fill="#8b5cf6" name="Total" />
                    <Bar dataKey="approved" fill="#22c55e" name="Approved" />
                    <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Investment growth */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={investmentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${(value / 1000000).toFixed(1)}M`, "Investment"]} />
                    <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Farm types distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Farm Types Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={farmTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {farmTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* User growth */}
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="farmers" stroke="#f59e0b" strokeWidth={2} name="Farmers" />
                    <Line type="monotone" dataKey="investors" stroke="#3b82f6" strokeWidth={2} name="Investors" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Performance summary */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {Math.round(
                      (submissionData.reduce((acc, curr) => acc + curr.approved, 0) /
                        submissionData.reduce((acc, curr) => acc + curr.submissions, 0)) *
                        100,
                    )}
                    %
                  </div>
                  <p className="text-gray-600">Average Approval Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {(investmentData[investmentData.length - 1].amount / investmentData.length / 1000).toFixed(0)}K
                  </div>
                  <p className="text-gray-600">Avg Monthly Investment</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {Math.round(
                      submissionData.reduce((acc, curr) => acc + curr.submissions, 0) / submissionData.length,
                    )}
                  </div>
                  <p className="text-gray-600">Avg Monthly Submissions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    </AdminProtectedRoute>
  )
}
