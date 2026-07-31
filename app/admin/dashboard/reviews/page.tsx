"use client"

import AdminProtectedRoute from "@/components/admin-protected-route"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Eye, CheckCircle, XCircle, Clock, Search, MapPin, DollarSign, User } from "lucide-react"
import { useState } from "react"

export default function AdminReviews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  // Mock data - in real app, this would come from API
  const submissions = [
    {
      id: 1,
      farmName: "Sunrise Vegetable Farm",
      farmerName: "John Smith",
      farmerEmail: "john@sunrisefarm.com",
      submittedDate: "2024-01-28",
      investmentAmount: 300000,
      expectedReturn: 12,
      duration: 24,
      location: "Oregon, USA",
      farmType: "Hydroponic",
      priority: "high",
      status: "pending",
      daysWaiting: 3,
      description: "Modern hydroponic facility specializing in leafy greens and herbs with automated systems.",
      documents: ["business_plan.pdf", "financial_statements.pdf", "land_ownership.pdf"],
    },
    {
      id: 2,
      farmName: "Heritage Grain Farm",
      farmerName: "Sarah Johnson",
      farmerEmail: "sarah@heritagegrain.com",
      submittedDate: "2024-01-27",
      investmentAmount: 750000,
      expectedReturn: 15,
      duration: 36,
      location: "Iowa, USA",
      farmType: "Conventional",
      priority: "medium",
      status: "pending",
      daysWaiting: 4,
      description: "Large-scale grain operation with sustainable farming practices and modern equipment.",
      documents: ["business_plan.pdf", "soil_analysis.pdf", "equipment_list.pdf"],
    },
    {
      id: 3,
      farmName: "Mountain Berry Farm",
      farmerName: "Mike Davis",
      farmerEmail: "mike@mountainberry.com",
      submittedDate: "2024-01-26",
      investmentAmount: 200000,
      expectedReturn: 18,
      duration: 18,
      location: "Colorado, USA",
      farmType: "Specialty",
      priority: "low",
      status: "under_review",
      daysWaiting: 5,
      description: "Organic berry farm specializing in high-altitude berry varieties with direct-to-consumer sales.",
      documents: ["organic_certification.pdf", "market_analysis.pdf"],
    },
  ]

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.farmerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    const matchesPriority = priorityFilter === "all" || submission.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

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

  const handleApprove = (id: number) => {
    console.log("Approving submission:", id)
    // In real app, this would call API
  }

  const handleReject = (id: number) => {
    console.log("Rejecting submission:", id)
    // In real app, this would call API
  }

  return (
    <AdminProtectedRoute>
      <AdminDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pending Reviews</h1>
              <p className="text-gray-600">Review and approve farm submissions</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {filteredSubmissions.length} pending
              </Badge>
            </div>
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
                  </SelectContent>
                </Select>
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Submissions list */}
          <div className="space-y-4">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{submission.farmName}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getPriorityColor(submission.priority)}>
                              {submission.priority} priority
                            </Badge>
                            <Badge className={getStatusColor(submission.status)}>
                              {submission.status.replace("_", " ")}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span>{submission.farmerName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{submission.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span>${submission.investmentAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{submission.daysWaiting} days waiting</span>
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm">{submission.description}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{submission.farmName} - Detailed Review</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            {/* Farm details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-semibold mb-3">Farm Information</h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <strong>Farm Name:</strong> {submission.farmName}
                                  </div>
                                  <div>
                                    <strong>Type:</strong> {submission.farmType}
                                  </div>
                                  <div>
                                    <strong>Location:</strong> {submission.location}
                                  </div>
                                  <div>
                                    <strong>Farmer:</strong> {submission.farmerName}
                                  </div>
                                  <div>
                                    <strong>Email:</strong> {submission.farmerEmail}
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-3">Investment Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div>
                                    <strong>Investment Amount:</strong> ${submission.investmentAmount.toLocaleString()}
                                  </div>
                                  <div>
                                    <strong>Expected Return:</strong> {submission.expectedReturn}% annually
                                  </div>
                                  <div>
                                    <strong>Duration:</strong> {submission.duration} months
                                  </div>
                                  <div>
                                    <strong>Submitted:</strong> {submission.submittedDate}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">Description</h4>
                              <p className="text-sm text-gray-600">{submission.description}</p>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">Documents</h4>
                              <div className="flex flex-wrap gap-2">
                                {submission.documents.map((doc, index) => (
                                  <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-50">
                                    <FileText className="w-3 h-3 mr-1" />
                                    {doc}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-semibold mb-3">Admin Notes</h4>
                              <Textarea placeholder="Add your review notes here..." className="min-h-20" />
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t">
                              <Button
                                variant="outline"
                                onClick={() => handleReject(submission.id)}
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                              <Button
                                onClick={() => handleApprove(submission.id)}
                                className="bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

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
