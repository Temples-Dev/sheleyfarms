"use client"

import FarmerProtectedRoute from "@/components/farmer-protected-route"
import FarmerDashboardLayout from "@/components/farmer-dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useFarmerAuth } from "@/lib/farmer-auth-context"
import { User, MapPin, Calendar, Leaf, Save, Upload } from "lucide-react"
import { useState } from "react"

export default function FarmerProfile() {
  const { farmer } = useFarmerAuth()

  const [profile, setProfile] = useState({
    name: farmer?.name || "John Smith",
    email: farmer?.email || "john@sunrisefarm.com",
    phone: "+1 (555) 123-4567",
    location: "Oregon, USA",
    farmName: farmer?.farmName || "Sunrise Vegetable Farm",
    farmType: "Hydroponic",
    farmSize: "50 acres",
    experience: "15 years",
    bio: "Experienced farmer specializing in sustainable hydroponic vegetable production with a focus on organic practices and innovative growing techniques.",
    certifications: ["Organic Certified", "GAP Certified", "Hydroponic Specialist"],
    joinedDate: "2024-01-15",
    totalSubmissions: 3,
    approvedFarms: 1,
    totalFunding: 125000,
  })

  const [farmDetails, setFarmDetails] = useState({
    establishedYear: "2010",
    primaryCrops: "Leafy Greens, Herbs, Tomatoes",
    farmingMethods: "Hydroponic, Organic",
    certifications: "USDA Organic, GAP",
    annualProduction: "500,000 lbs",
    employees: "12 full-time, 8 seasonal",
    marketChannels: "Farmers Markets, Restaurants, Grocery Stores",
    sustainabilityPractices: "Solar power, water recycling, integrated pest management",
  })

  const handleSaveProfile = () => {
    console.log("Saving profile:", profile)
    // In real app, this would call API
  }

  const handleSaveFarmDetails = () => {
    console.log("Saving farm details:", farmDetails)
    // In real app, this would call API
  }

  return (
    <FarmerProtectedRoute>
      <FarmerDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <p className="text-gray-600">Manage your personal and farm information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Profile sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="bg-orange-500 text-white text-2xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
                  <p className="text-gray-600 mb-2">{profile.email}</p>
                  <Badge className="bg-orange-100 text-orange-800 mb-4">
                    <Leaf className="w-3 h-3 mr-1" />
                    Farmer
                  </Badge>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Upload className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Joined {profile.joinedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Leaf className="w-4 h-4" />
                      <span>{profile.farmName}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submissions</span>
                      <span className="font-medium">{profile.totalSubmissions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Approved</span>
                      <span className="font-medium">{profile.approvedFarms}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Funding Raised</span>
                      <span className="font-medium">${(profile.totalFunding / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="personal">Personal Info</TabsTrigger>
                  <TabsTrigger value="farm">Farm Details</TabsTrigger>
                </TabsList>

                {/* Personal Info Tab */}
                <TabsContent value="personal">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Personal Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="experience">Years of Experience</Label>
                          <Input
                            id="experience"
                            value={profile.experience}
                            onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="farmType">Primary Farm Type</Label>
                          <Input
                            id="farmType"
                            value={profile.farmType}
                            onChange={(e) => setProfile({ ...profile, farmType: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          className="min-h-24"
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Certifications</Label>
                        <div className="flex flex-wrap gap-2">
                          {profile.certifications.map((cert, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200"
                            >
                              {cert}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button onClick={handleSaveProfile} className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Farm Details Tab */}
                <TabsContent value="farm">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Leaf className="w-5 h-5" />
                        Farm Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="farmName">Farm Name</Label>
                          <Input
                            id="farmName"
                            value={profile.farmName}
                            onChange={(e) => setProfile({ ...profile, farmName: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="establishedYear">Established Year</Label>
                          <Input
                            id="establishedYear"
                            value={farmDetails.establishedYear}
                            onChange={(e) => setFarmDetails({ ...farmDetails, establishedYear: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="farmSize">Farm Size</Label>
                          <Input
                            id="farmSize"
                            value={profile.farmSize}
                            onChange={(e) => setProfile({ ...profile, farmSize: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="annualProduction">Annual Production</Label>
                          <Input
                            id="annualProduction"
                            value={farmDetails.annualProduction}
                            onChange={(e) => setFarmDetails({ ...farmDetails, annualProduction: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employees">Employees</Label>
                          <Input
                            id="employees"
                            value={farmDetails.employees}
                            onChange={(e) => setFarmDetails({ ...farmDetails, employees: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="certifications">Certifications</Label>
                          <Input
                            id="certifications"
                            value={farmDetails.certifications}
                            onChange={(e) => setFarmDetails({ ...farmDetails, certifications: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="primaryCrops">Primary Crops</Label>
                        <Input
                          id="primaryCrops"
                          value={farmDetails.primaryCrops}
                          onChange={(e) => setFarmDetails({ ...farmDetails, primaryCrops: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="farmingMethods">Farming Methods</Label>
                        <Input
                          id="farmingMethods"
                          value={farmDetails.farmingMethods}
                          onChange={(e) => setFarmDetails({ ...farmDetails, farmingMethods: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="marketChannels">Market Channels</Label>
                        <Textarea
                          id="marketChannels"
                          className="min-h-20"
                          value={farmDetails.marketChannels}
                          onChange={(e) => setFarmDetails({ ...farmDetails, marketChannels: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="sustainabilityPractices">Sustainability Practices</Label>
                        <Textarea
                          id="sustainabilityPractices"
                          className="min-h-20"
                          value={farmDetails.sustainabilityPractices}
                          onChange={(e) => setFarmDetails({ ...farmDetails, sustainabilityPractices: e.target.value })}
                        />
                      </div>

                      <Button onClick={handleSaveFarmDetails} className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Save className="w-4 h-4 mr-2" />
                        Save Farm Details
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </FarmerDashboardLayout>
    </FarmerProtectedRoute>
  )
}
