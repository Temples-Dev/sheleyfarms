"use client"

import FarmerProtectedRoute from "@/components/farmer-protected-route"
import FarmerDashboardLayout from "@/components/farmer-dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"
import {
  FileText,
  Search,
  Eye,
  Edit,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
} from "lucide-react"

export default function FarmerSubmissions() {
  // Mock data - in real app, this would come from API
  const submissions = [
    {
      id: 1,
      farmName: "Green Valley Organic Farm",
      status: "approved",
      submittedDate: "2024-01-15",
      approvedDate: "2024-01-22",
      investmentAmount: 500000,
      expectedReturn: 12.5,
      duration: "3 years",
      inquiries: 8,
      funded: 125000,
      fundingProgress: 25,
      location: "California, USA",
      farmType: "Organic",
    },
    {
      id: 2,
      farmName: "Sunrise Vegetable Farm",
      status: "pending",
      submittedDate: "2024-01-20",
      investmentAmount: 300000,
      expectedReturn: 15.0,
      duration: "2 years",
      inquiries: 3,
      funded: 0,
      fundingProgress: 0,
      location: "Oregon, USA",
      farmType: "Hydroponic",
    },
    {
      id: 3,
      farmName: "Heritage Grain Farm",
      status: "under_review",
      submittedDate: "2024-01-25",
      investmentAmount: 750000,
      expectedReturn: 13.8,
      duration: "5 years",
      inquiries: 1,
      funded: 0,
      fundingProgress: 0,
      location: "Iowa, USA",
      farmType: "Conventional",
    },
    {
      id: 4,
      farmName: "Mountain Berry Farm",
      status: "rejected",
      submittedDate: "2024-01-10",
      rejectedDate: "2024-01-18",
      investmentAmount: 200000,
      expectedReturn: 18.0,
      duration: "2 years",
      inquiries: 0,
      funded: 0,
      fundingProgress: 0,
      location: "Colorado, USA",
      farmType: "Specialty",
      rejectionReason: "Insufficient financial documentation",
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
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Submissions</h1>
              <p className="text-gray-600">Track and manage your farm listing applications</p>
            </div>
            <Link to="/farmer/submit">
              <Button className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600">
                <Plus className="w-4 h-4 mr-2" />
                Submit New Farm
              </Button>
            </Link>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search farms..." className="pl-10" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="organic">Organic</SelectItem>
                    <SelectItem value="conventional">Conventional</SelectItem>
                    <SelectItem value="hydroponic">Hydroponic</SelectItem>
                    <SelectItem value="specialty">Specialty</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submissions list */}
          <div className="space-y-4">
            {submissions.map((submission) => (
              <Card key={submission.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{submission.farmName}</h3>
                        <Badge className={getStatusColor(submission.status)}>
                          {getStatusIcon(submission.status)}
                          <span className="ml-1 capitalize">{submission.status.replace("_", " ")}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted: {new Date(submission.submittedDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          <span>Investment: ${submission.investmentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          <span>Return: {submission.expectedReturn}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          <span>{submission.inquiries} inquiries</span>
                        </div>
                      </div>

                      {submission.status === "approved" && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-gray-600">Funding Progress</span>
                            <span className="font-medium">
                              ${submission.funded.toLocaleString()} / ${submission.investmentAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-600 to-orange-500 h-2 rounded-full"
                              style={{ width: `${submission.fundingProgress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {submission.status === "rejected" && submission.rejectionReason && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <p className="text-sm text-red-800">
                            <strong>Rejection Reason:</strong> {submission.rejectionReason}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                        <Eye className="w-4 h-4" />
                        View Details
                      </Button>
                      {submission.status === "rejected" && (
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <Edit className="w-4 h-4" />
                          Resubmit
                        </Button>
                      )}
                      {submission.inquiries > 0 && (
                        <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                          <MessageSquare className="w-4 h-4" />
                          View Inquiries
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {submissions.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions yet</h3>
                <p className="text-gray-600 mb-4">Get started by submitting your first farm for listing.</p>
                <Link to="/farmer/submit">
                  <Button className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Submit Your First Farm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </FarmerDashboardLayout>
    </FarmerProtectedRoute>
  )
}
