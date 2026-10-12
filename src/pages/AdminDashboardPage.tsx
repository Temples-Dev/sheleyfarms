"use client"

import AdminProtectedRoute from "@/components/admin-protected-route"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
import { useAdminAuth } from "@/lib/admin-auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import {
  FileText,
  Users,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  Eye,
  MessageSquare,
  Calendar,
} from "lucide-react"

export default function AdminDashboard() {
  const { admin } = useAdminAuth()

  // Mock data - in real app, this would come from API
  const stats = {
    pendingReviews: 8,
    totalSubmissions: 45,
    approvedFarms: 23,
    rejectedFarms: 14,
    totalFarmers: 67,
    totalInvestors: 234,
    totalFunding: 2450000,
    avgProcessingTime: 4.2,
  }

  const pendingSubmissions = [
    {
      id: 1,
      farmName: "Sunrise Vegetable Farm",
      farmerName: "John Smith",
      submittedDate: "2024-01-28",
      investmentAmount: 300000,
      location: "Oregon, USA",
      farmType: "Hydroponic",
      priority: "high",
      daysWaiting: 3,
    },
    {
      id: 2,
      farmName: "Heritage Grain Farm",
      farmerName: "Sarah Johnson",
      submittedDate: "2024-01-27",
      investmentAmount: 750000,
      location: "Iowa, USA",
      farmType: "Conventional",
      priority: "medium",
      daysWaiting: 4,
    },
    {
      id: 3,
      farmName: "Mountain Berry Farm",
      farmerName: "Mike Davis",
      submittedDate: "2024-01-26",
      investmentAmount: 200000,
      location: "Colorado, USA",
      farmType: "Specialty",
      priority: "low",
      daysWaiting: 5,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "approval",
      message: "Green Valley Organic Farm approved by Admin User",
      timestamp: "2024-01-28 14:30",
      farmName: "Green Valley Organic Farm",
    },
    {
      id: 2,
      type: "submission",
      message: "New farm submission: Sunrise Vegetable Farm",
      timestamp: "2024-01-28 10:15",
      farmName: "Sunrise Vegetable Farm",
    },
    {
      id: 3,
      type: "rejection",
      message: "Mountain Berry Farm rejected - insufficient documentation",
      timestamp: "2024-01-27 16:45",
      farmName: "Mountain Berry Farm",
    },
    {
      id: 4,
      type: "inquiry",
      message: "New investor inquiry for Green Valley Organic Farm",
      timestamp: "2024-01-27 11:20",
      farmName: "Green Valley Organic Farm",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejection":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      case "submission":
        return <FileText className="w-4 h-4 text-blue-600" />
      case "inquiry":
        return <MessageSquare className="w-4 h-4 text-purple-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <AdminProtectedRoute>
      <AdminDashboardLayout>
        <div className="space-y-6">
          {/* Welcome section */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {admin?.name}!</h1>
            <p className="text-purple-100 mb-4">
              Manage farm submissions, review applications, and oversee the platform operations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/dashboard/reviews">
                <Button variant="secondary" className="bg-white text-purple-700 hover:bg-gray-100">
                  <FileText className="w-4 h-4 mr-2" />
                  Review Pending ({stats.pendingReviews})
                </Button>
              </Link>
              <Link to="/admin/dashboard/analytics">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-700 bg-transparent"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{stats.pendingReviews}</div>
                <p className="text-xs text-muted-foreground">Awaiting admin review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.approvedFarms} approved, {stats.rejectedFarms} rejected
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Platform Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalFarmers + stats.totalInvestors}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.totalFarmers} farmers, {stats.totalInvestors} investors
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Funding</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${(stats.totalFunding / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-muted-foreground">Across all approved farms</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending submissions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Reviews</CardTitle>
                  <Link to="/admin/dashboard/reviews">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{submission.farmName}</h3>
                        <Badge className={getPriorityColor(submission.priority)}>{submission.priority} priority</Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Farmer: {submission.farmerName}</p>
                        <p>Investment: ${submission.investmentAmount.toLocaleString()}</p>
                        <p>Waiting: {submission.daysWaiting} days</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{activity.message}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick stats */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.avgProcessingTime}</div>
                  <p className="text-sm text-gray-600">Average Processing Time (days)</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((stats.approvedFarms / stats.totalSubmissions) * 100)}%
                  </div>
                  <p className="text-sm text-gray-600">Approval Rate</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.pendingReviews}</div>
                  <p className="text-sm text-gray-600">Pending Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminDashboardLayout>
    </AdminProtectedRoute>
  )
}
