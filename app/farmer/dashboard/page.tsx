"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import FarmerProtectedRoute from "@/components/farmer-protected-route"
import FarmerDashboardLayout from "@/components/farmer-dashboard-layout"
import { useFarmerAuth } from "@/lib/farmer-auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Eye,
  Calendar,
} from "lucide-react"

export default function FarmerDashboard() {
  const { farmer } = useFarmerAuth()
  const searchParams = useSearchParams()
  const submitted = searchParams.get("submitted") === "true"
  const [dismissed, setDismissed] = useState(false)
  const showSuccessMessage = submitted && !dismissed

  useEffect(() => {
    if (!submitted) return
    const timer = setTimeout(() => setDismissed(true), 5000)
    return () => clearTimeout(timer)
  }, [submitted])

  // Mock data - in real app, this would come from API
  const stats = {
    totalSubmissions: 3,
    approvedFarms: 1,
    pendingReview: 2,
    totalInquiries: 12,
    totalFunding: 125000,
    avgReturn: 14.2,
  }

  const recentSubmissions = [
    {
      id: 1,
      farmName: "Green Valley Organic Farm",
      status: "approved",
      submittedDate: "2024-01-15",
      investmentAmount: 500000,
      expectedReturn: 12.5,
      inquiries: 8,
    },
    {
      id: 2,
      farmName: "Sunrise Vegetable Farm",
      status: "pending",
      submittedDate: "2024-01-20",
      investmentAmount: 300000,
      expectedReturn: 15.0,
      inquiries: 3,
    },
    {
      id: 3,
      farmName: "Heritage Grain Farm",
      status: "under_review",
      submittedDate: "2024-01-25",
      investmentAmount: 750000,
      expectedReturn: 13.8,
      inquiries: 1,
    },
  ]

  const recentInquiries = [
    {
      id: 1,
      investorName: "John Smith",
      farmName: "Green Valley Organic Farm",
      amount: 50000,
      message: "Interested in learning more about your organic certification process...",
      date: "2024-01-28",
      status: "new",
    },
    {
      id: 2,
      investorName: "Sarah Johnson",
      farmName: "Green Valley Organic Farm",
      amount: 25000,
      message: "Would like to schedule a farm visit to discuss investment...",
      date: "2024-01-27",
      status: "replied",
    },
    {
      id: 3,
      investorName: "Mike Davis",
      farmName: "Sunrise Vegetable Farm",
      amount: 75000,
      message: "Interested in the hydroponic expansion project...",
      date: "2024-01-26",
      status: "new",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
      case "under_review":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <FarmerProtectedRoute>
      <FarmerDashboardLayout>
        <div className="space-y-6">
          {/* Success message */}
          {showSuccessMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <h3 className="text-sm font-medium text-green-800">Application Submitted Successfully!</h3>
                  <p className="text-sm text-green-700 mt-1">
                    Your farm application has been submitted and is now under review. We&apos;ll contact you within 5-7
                    business days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Welcome section */}
          <div className="bg-gradient-to-r from-green-600 to-orange-500 rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-2">Welcome back, {farmer?.name}!</h1>
            <p className="text-green-100 mb-4">
              Manage your farm listings, track investor interest, and grow your agricultural business.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/farmer/submit">
                <Button variant="secondary" className="bg-white text-green-700 hover:bg-gray-100">
                  <Plus className="w-4 h-4 mr-2" />
                  Submit New Farm
                </Button>
              </Link>
              <Link href="/farmer/dashboard/inquiries">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-700 bg-transparent"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  View Inquiries
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSubmissions}</div>
                <p className="text-xs text-muted-foreground">
                  {stats.approvedFarms} approved, {stats.pendingReview} pending
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Investor Inquiries</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalInquiries}</div>
                <p className="text-xs text-muted-foreground">3 new this week</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Funding Raised</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalFunding.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent submissions */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Submissions</CardTitle>
                  <Link href="/farmer/dashboard/submissions">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900">{submission.farmName}</h3>
                        <Badge className={getStatusColor(submission.status)}>
                          {getStatusIcon(submission.status)}
                          <span className="ml-1 capitalize">{submission.status.replace("_", " ")}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Investment: ${submission.investmentAmount.toLocaleString()}</p>
                        <p>Expected Return: {submission.expectedReturn}%</p>
                        <p>Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{submission.inquiries} inquiries</div>
                      <Button variant="ghost" size="sm" className="mt-2">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent inquiries */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Inquiries</CardTitle>
                  <Link href="/farmer/dashboard/inquiries">
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{inquiry.investorName}</h3>
                        <Badge variant={inquiry.status === "new" ? "default" : "secondary"}>
                          {inquiry.status === "new" ? "New" : "Replied"}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(inquiry.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{inquiry.farmName}</p>
                    <p className="text-sm text-gray-700 mb-2 line-clamp-2">{inquiry.message}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">
                        ${inquiry.amount.toLocaleString()} interest
                      </span>
                      <Button variant="ghost" size="sm">
                        Reply
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/farmer/submit">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center bg-transparent"
                  >
                    <Plus className="w-6 h-6 mb-2" />
                    Submit New Farm
                  </Button>
                </Link>
                <Link href="/farmer/dashboard/analytics">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center bg-transparent"
                  >
                    <TrendingUp className="w-6 h-6 mb-2" />
                    View Analytics
                  </Button>
                </Link>
                <Link href="/farmer/dashboard/profile">
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center justify-center bg-transparent"
                  >
                    <Calendar className="w-6 h-6 mb-2" />
                    Update Profile
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </FarmerDashboardLayout>
    </FarmerProtectedRoute>
  )
}
