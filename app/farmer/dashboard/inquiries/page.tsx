"use client"

import FarmerProtectedRoute from "@/components/farmer-protected-route"
import FarmerDashboardLayout from "@/components/farmer-dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Search, Reply, Eye, Calendar, DollarSign, User, Send } from "lucide-react"
import { useState } from "react"

export default function FarmerInquiries() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [replyMessage, setReplyMessage] = useState("")

  // Mock data - in real app, this would come from API
  const inquiries = [
    {
      id: 1,
      investorName: "John Smith",
      investorEmail: "john.smith@email.com",
      farmName: "Green Valley Organic Farm",
      investmentAmount: 50000,
      message:
        "I'm very interested in your organic farming operation. Could you provide more details about your certification process and expected yields? I'd also like to know about the timeline for returns and any risks involved.",
      date: "2024-01-28",
      status: "new",
      investorProfile: {
        totalInvestments: 3,
        avgInvestment: 75000,
        location: "California, USA",
      },
    },
    {
      id: 2,
      investorName: "Sarah Johnson",
      investorEmail: "sarah.johnson@email.com",
      farmName: "Green Valley Organic Farm",
      investmentAmount: 25000,
      message:
        "Would like to schedule a farm visit to discuss investment opportunities. I'm particularly interested in sustainable farming practices and long-term growth potential.",
      date: "2024-01-27",
      status: "replied",
      reply:
        "Thank you for your interest! I'd be happy to arrange a farm visit. We're available next week for tours. Please let me know your preferred dates.",
      replyDate: "2024-01-27",
      investorProfile: {
        totalInvestments: 1,
        avgInvestment: 25000,
        location: "Oregon, USA",
      },
    },
    {
      id: 3,
      investorName: "Mike Davis",
      investorEmail: "mike.davis@email.com",
      farmName: "Sunrise Vegetable Farm",
      investmentAmount: 75000,
      message:
        "Interested in the hydroponic expansion project. Can you share more details about the technology being used and the market demand for hydroponic vegetables?",
      date: "2024-01-26",
      status: "new",
      investorProfile: {
        totalInvestments: 5,
        avgInvestment: 60000,
        location: "Washington, USA",
      },
    },
    {
      id: 4,
      investorName: "Emily Chen",
      investorEmail: "emily.chen@email.com",
      farmName: "Heritage Grain Farm",
      investmentAmount: 100000,
      message:
        "I'm looking for agricultural investments with stable returns. Your grain operation looks promising. What are the historical yields and how do you manage weather-related risks?",
      date: "2024-01-25",
      status: "archived",
      reply:
        "Thank you for your inquiry. Our grain operation has maintained consistent yields over the past 5 years with comprehensive crop insurance coverage.",
      replyDate: "2024-01-25",
      investorProfile: {
        totalInvestments: 8,
        avgInvestment: 120000,
        location: "New York, USA",
      },
    },
  ]

  const stats = {
    total: inquiries.length,
    new: inquiries.filter((i) => i.status === "new").length,
    replied: inquiries.filter((i) => i.status === "replied").length,
    archived: inquiries.filter((i) => i.status === "archived").length,
    totalInterest: inquiries.reduce((sum, i) => sum + i.investmentAmount, 0),
  }

  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "replied":
        return "bg-green-100 text-green-800"
      case "archived":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleReply = (inquiryId: number) => {
    console.log("Replying to inquiry:", inquiryId, replyMessage)
    setReplyMessage("")
    // In real app, this would call API
  }

  return (
    <FarmerProtectedRoute>
      <FarmerDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Investor Inquiries</h1>
              <p className="text-gray-600">Manage and respond to investor interest in your farms</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {stats.new} new inquiries
              </Badge>
            </div>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Inquiries</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <MessageSquare className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">New</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
                  </div>
                  <Eye className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Replied</p>
                    <p className="text-2xl font-bold text-green-600">{stats.replied}</p>
                  </div>
                  <Reply className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Interest</p>
                    <p className="text-2xl font-bold text-orange-600">${(stats.totalInterest / 1000).toFixed(0)}K</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-orange-400" />
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
                      placeholder="Search inquiries..."
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
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="replied">Replied</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inquiries list */}
          <div className="space-y-4">
            {filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gray-100">
                            {inquiry.investorName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{inquiry.investorName}</h3>
                            <Badge className={getStatusColor(inquiry.status)}>{inquiry.status}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {inquiry.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />${inquiry.investmentAmount.toLocaleString()} interest
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm font-medium text-gray-900 mb-1">Farm: {inquiry.farmName}</p>
                        <p className="text-gray-700 text-sm leading-relaxed">{inquiry.message}</p>
                      </div>

                      {inquiry.reply && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Reply className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-800">Your Reply</span>
                            <span className="text-xs text-green-600">({inquiry.replyDate})</span>
                          </div>
                          <p className="text-sm text-green-700">{inquiry.reply}</p>
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {inquiry.investorProfile.totalInvestments} investments
                        </span>
                        <span>Avg: ${inquiry.investorProfile.avgInvestment.toLocaleString()}</span>
                        <span>{inquiry.investorProfile.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Reply className="w-4 h-4 mr-2" />
                            Reply
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Reply to {inquiry.investorName}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <p className="text-sm text-gray-600 mb-2">Original Message:</p>
                              <p className="text-sm text-gray-900">{inquiry.message}</p>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                              <Textarea
                                value={replyMessage}
                                onChange={(e) => setReplyMessage(e.target.value)}
                                placeholder="Type your reply here..."
                                className="min-h-32"
                              />
                            </div>
                            <div className="flex justify-end gap-3">
                              <Button variant="outline">Save Draft</Button>
                              <Button
                                onClick={() => handleReply(inquiry.id)}
                                className="bg-orange-500 hover:bg-orange-600 text-white"
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Send Reply
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredInquiries.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                <p className="text-gray-600">No investor inquiries match your current filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </FarmerDashboardLayout>
    </FarmerProtectedRoute>
  )
}
