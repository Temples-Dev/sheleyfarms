"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, ArrowUpRight, ArrowDownLeft, Calendar } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import ProtectedRoute from "@/components/protected-route"

const transactions = [
  {
    id: 1,
    type: "Investment",
    description: "Investment in Green Valley Poultry Farm",
    amount: -2000,
    date: "2024-01-15",
    status: "Completed",
    farmName: "Green Valley Poultry Farm",
  },
  {
    id: 2,
    type: "Return",
    description: "Quarterly return from Sunrise Vegetable Gardens",
    amount: 180,
    date: "2024-01-10",
    status: "Completed",
    farmName: "Sunrise Vegetable Gardens",
  },
  {
    id: 3,
    type: "Investment",
    description: "Investment in Blue Lake Fishery",
    amount: -3000,
    date: "2024-03-10",
    status: "Completed",
    farmName: "Blue Lake Fishery",
  },
  {
    id: 4,
    type: "Return",
    description: "Final return from Golden Grain Rice Farm",
    amount: 100,
    date: "2024-06-01",
    status: "Completed",
    farmName: "Golden Grain Rice Farm",
  },
  {
    id: 5,
    type: "Withdrawal",
    description: "Withdrawal to bank account",
    amount: -500,
    date: "2024-02-20",
    status: "Completed",
    farmName: null,
  },
]

export default function TransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || transaction.type.toLowerCase() === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-gray-900">Transaction History</h1>
              <p className="text-gray-600 mt-1">View all your investment transactions and returns</p>
            </div>
            <Button
              variant="outline"
              className="border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              Export Transactions
            </Button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Total Invested</CardTitle>
                <ArrowUpRight className="h-4 w-4 text-red-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">$5,500</div>
                <p className="text-xs text-gray-600">Across all investments</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Total Returns</CardTitle>
                <ArrowDownLeft className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">$280</div>
                <p className="text-xs text-gray-600">Returns received</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-700">Net Position</CardTitle>
                <Calendar className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">-$5,220</div>
                <p className="text-xs text-gray-600">Current net position</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="return">Return</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Transactions List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900">Recent Transactions</CardTitle>
              <CardDescription>All your investment activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "Investment"
                            ? "bg-red-100"
                            : transaction.type === "Return"
                              ? "bg-green-100"
                              : "bg-blue-100"
                        }`}
                      >
                        {transaction.amount < 0 ? (
                          <ArrowUpRight
                            className={`h-4 w-4 ${
                              transaction.type === "Investment" ? "text-red-600" : "text-blue-600"
                            }`}
                          />
                        ) : (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.amount < 0 ? "text-red-600" : "text-green-600"}`}>
                          {transaction.amount < 0 ? "-" : "+"}${Math.abs(transaction.amount).toLocaleString()}
                        </p>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
