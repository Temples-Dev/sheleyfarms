"use client"

import AdminProtectedRoute from "@/components/admin-protected-route"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Eye, Search, Download, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"
import { useState } from "react"

export default function AdminSubmissions() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date_desc")

  // Mock data - in real app, this would come from API
  const submissions = [
    {
      id: 1,
      farmName: "Sunrise Vegetable Farm",
      farmerName: "John Smith",
      submittedDate: "2024-01-28",
      investmentAmount: 300000,
      expectedReturn: 12,
      status: "pending",
      reviewedBy: null,
      reviewedDate: null,
      farmType: "Hydroponic",
      location: "Oregon, USA",
    },
    {
      id: 2,
      farmName: "Heritage Grain Farm",
      farmerName: "Sarah Johnson",
      submittedDate: "2024-01-27",
      investmentAmount: 750000,
      expectedReturn: 15,
      status: "approved",
      reviewedBy: "Admin User",
      reviewedDate: "2024-01-29",
      farmType: "Conventional",
      location: "Iowa, USA",
    },
    {
      id: 3,
      farmName: "Mountain Berry Farm",
      farmerName: "Mike Davis",
      submittedDate: "2024-01-26",
      investmentAmount: 200000,
      expectedReturn: 18,
      status: "rejected",
      reviewedBy: "Admin User",
      reviewedDate: "2024-01-28",
      farmType: "Specialty",
      location: "Colorado, USA",
    },
    {
      id: 4,
      farmName: "Green Valley Organic",
      farmerName: "Lisa Chen",
      submittedDate: "2024-01-25",
      investmentAmount: 450000,
      expectedReturn: 14,
      status: "approved",
      reviewedBy: "Admin User",
      reviewedDate: "2024-01-27",
      farmType: "Organic",
      location: "California, USA",
    },
    {
      id: 5,
      farmName: "Prairie Wind Farm",
      farmerName: "Tom Wilson",
      submittedDate: "2024-01-24",
      investmentAmount: 600000,
      expectedReturn: 13,
      status: "under_review",
      reviewedBy: null,
      reviewedDate: null,
      farmType: "Wind Energy",
      location: "Texas, USA",
    },
  ]

  const stats = {
    total: submissions.length,
    pending: submissions.filter((s) => s.status === "pending").length,
    approved: submissions.filter((s) => s.status === "approved").length,
    rejected: submissions.filter((s) => s.status === "rejected").length,
    underReview: submissions.filter((s) => s.status === "under_review").length,
  }

  const filteredSubmissions = submissions
    .filter((submission) => {
      const matchesSearch =
        submission.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || submission.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date_desc":
          return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime()
        case "date_asc":
          return new Date(a.submittedDate).getTime() - new Date(b.submittedDate).getTime()
        case "amount_desc":
          return b.investmentAmount - a.investmentAmount
        case "amount_asc":
          return a.investmentAmount - b.investmentAmount
        default:
          return 0
      }
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "under_review":
        return <Eye className="w-4 h-4 text-blue-600" />
      default:
        return <Clock className="w-4 h-4 text-orange-600" />
    }
  }

  return (
    <AdminProtectedRoute>
      <AdminDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">All Submissions</h1>
              <p className="text-gray-600">Complete history of farm submissions</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Under Review</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Approved</p>
                    <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Rejected</p>
                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                  </div>
                  <XCircle className="w-8 h-8 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search farms or farmers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date_desc">Newest First</SelectItem>
                    <SelectItem value="date_asc">Oldest First</SelectItem>
                    <SelectItem value="amount_desc">Highest Amount</SelectItem>
                    <SelectItem value="amount_asc">Lowest Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submissions table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farm</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Investment</TableHead>
                    <TableHead>Return</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{submission.farmName}</div>
                          <div className="text-sm text-gray-500">{submission.location}</div>
                        </div>
                      </TableCell>
                      <TableCell>{submission.farmerName}</TableCell>
                      <TableCell>{submission.farmType}</TableCell>
                      <TableCell>${submission.investmentAmount.toLocaleString()}</TableCell>
                      <TableCell>{submission.expectedReturn}%</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(submission.status)}
                          <Badge className={getStatusColor(submission.status)}>
                            {submission.status.replace("_", " ")}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {submission.submittedDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredSubmissions.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No submissions found</h3>
                <p className="text-gray-600">No farm submissions match your current filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </AdminDashboardLayout>
    </AdminProtectedRoute>
  )
}
