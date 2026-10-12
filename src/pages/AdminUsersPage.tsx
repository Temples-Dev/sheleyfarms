"use client"

import AdminProtectedRoute from "@/components/admin-protected-route"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Users, Search, MoreHorizontal, UserCheck, UserX, Mail, Calendar, Sprout, DollarSign } from "lucide-react"
import { useState } from "react"

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [userTypeFilter, setUserTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Mock data - in real app, this would come from API
  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@sunrisefarm.com",
      type: "farmer",
      status: "active",
      joinedDate: "2024-01-15",
      lastActive: "2024-01-28",
      farmsSubmitted: 2,
      totalInvestment: 0,
      location: "Oregon, USA",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@heritagegrain.com",
      type: "farmer",
      status: "active",
      joinedDate: "2024-01-10",
      lastActive: "2024-01-27",
      farmsSubmitted: 1,
      totalInvestment: 0,
      location: "Iowa, USA",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      type: "investor",
      status: "active",
      joinedDate: "2024-01-20",
      lastActive: "2024-01-28",
      farmsSubmitted: 0,
      totalInvestment: 150000,
      location: "New York, USA",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      type: "investor",
      status: "active",
      joinedDate: "2024-01-18",
      lastActive: "2024-01-26",
      farmsSubmitted: 0,
      totalInvestment: 75000,
      location: "California, USA",
    },
    {
      id: 5,
      name: "Robert Wilson",
      email: "robert@email.com",
      type: "investor",
      status: "inactive",
      joinedDate: "2024-01-05",
      lastActive: "2024-01-15",
      farmsSubmitted: 0,
      totalInvestment: 25000,
      location: "Texas, USA",
    },
  ]

  const stats = {
    total: users.length,
    farmers: users.filter((u) => u.type === "farmer").length,
    investors: users.filter((u) => u.type === "investor").length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = userTypeFilter === "all" || user.type === userTypeFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesType && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case "farmer":
        return "bg-orange-100 text-orange-800"
      case "investor":
        return "bg-blue-100 text-blue-800"
      case "admin":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <AdminProtectedRoute>
      <AdminDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
              <p className="text-gray-600">Manage farmers, investors, and platform users</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              <UserCheck className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>

          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold">{stats.total}</p>
                  </div>
                  <Users className="w-8 h-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Farmers</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.farmers}</p>
                  </div>
                  <Sprout className="w-8 h-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Investors</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.investors}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active</p>
                    <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Inactive</p>
                    <p className="text-2xl font-bold text-gray-600">{stats.inactive}</p>
                  </div>
                  <UserX className="w-8 h-8 text-gray-400" />
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
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="User Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="farmer">Farmers</SelectItem>
                    <SelectItem value="investor">Investors</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Users table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gray-100">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                            <div className="text-sm text-gray-500">{user.location}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getUserTypeColor(user.type)}>{user.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {user.type === "farmer" ? (
                            <div>
                              <div>{user.farmsSubmitted} farms submitted</div>
                              <div className="text-gray-500">Last active: {user.lastActive}</div>
                            </div>
                          ) : (
                            <div>
                              <div>${user.totalInvestment.toLocaleString()} invested</div>
                              <div className="text-gray-500">Last active: {user.lastActive}</div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {user.joinedDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem>
                              {user.status === "active" ? "Suspend User" : "Activate User"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {filteredUsers.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                <p className="text-gray-600">No users match your current filters.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </AdminDashboardLayout>
    </AdminProtectedRoute>
  )
}
