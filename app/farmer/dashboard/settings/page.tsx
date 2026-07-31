"use client"

import FarmerProtectedRoute from "@/components/farmer-protected-route"
import FarmerDashboardLayout from "@/components/farmer-dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Bell, Shield, Key, Save, Trash2 } from "lucide-react"
import { useState } from "react"

export default function FarmerSettings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    inquiryAlerts: true,
    submissionUpdates: true,
    marketingEmails: false,
    weeklyReports: true,
    mobileNotifications: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showContactInfo: true,
    allowDirectMessages: true,
    showFarmLocation: true,
    dataSharing: false,
  })

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
    loginAlerts: true,
  })

  const [preferences, setPreferences] = useState({
    language: "en",
    timezone: "America/Los_Angeles",
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    emailFrequency: "daily",
  })

  const handleSaveNotifications = () => {
    console.log("Saving notifications:", notifications)
    // In real app, this would call API
  }

  const handleSavePrivacy = () => {
    console.log("Saving privacy:", privacy)
    // In real app, this would call API
  }

  const handleChangePassword = () => {
    console.log("Changing password")
    // In real app, this would call API
  }

  const handleSavePreferences = () => {
    console.log("Saving preferences:", preferences)
    // In real app, this would call API
  }

  const handleDeleteAccount = () => {
    console.log("Deleting account")
    // In real app, this would call API with confirmation
  }

  return (
    <FarmerProtectedRoute>
      <FarmerDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account preferences and security settings</p>
          </div>

          <Tabs defaultValue="notifications" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailNotifications">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive email notifications for important updates</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailNotifications: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="inquiryAlerts">Investor Inquiry Alerts</Label>
                        <p className="text-sm text-gray-600">Get notified when investors show interest in your farms</p>
                      </div>
                      <Switch
                        id="inquiryAlerts"
                        checked={notifications.inquiryAlerts}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, inquiryAlerts: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="submissionUpdates">Submission Updates</Label>
                        <p className="text-sm text-gray-600">Receive updates on your farm submission status</p>
                      </div>
                      <Switch
                        id="submissionUpdates"
                        checked={notifications.submissionUpdates}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, submissionUpdates: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weeklyReports">Weekly Reports</Label>
                        <p className="text-sm text-gray-600">Receive weekly performance and analytics reports</p>
                      </div>
                      <Switch
                        id="weeklyReports"
                        checked={notifications.weeklyReports}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="marketingEmails">Marketing Emails</Label>
                        <p className="text-sm text-gray-600">Receive promotional emails and platform updates</p>
                      </div>
                      <Switch
                        id="marketingEmails"
                        checked={notifications.marketingEmails}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="mobileNotifications">Mobile Notifications</Label>
                        <p className="text-sm text-gray-600">Receive push notifications on mobile devices</p>
                      </div>
                      <Switch
                        id="mobileNotifications"
                        checked={notifications.mobileNotifications}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, mobileNotifications: checked })
                        }
                      />
                    </div>
                  </div>

                  <Button onClick={handleSaveNotifications} className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Settings */}
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="profileVisibility">Profile Visibility</Label>
                      <Select
                        value={privacy.profileVisibility}
                        onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                      >
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Visible to all users</SelectItem>
                          <SelectItem value="investors">Investors Only - Visible to verified investors</SelectItem>
                          <SelectItem value="private">Private - Not visible to others</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showContactInfo">Show Contact Information</Label>
                        <p className="text-sm text-gray-600">Display your email and phone number on your profile</p>
                      </div>
                      <Switch
                        id="showContactInfo"
                        checked={privacy.showContactInfo}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showContactInfo: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowDirectMessages">Allow Direct Messages</Label>
                        <p className="text-sm text-gray-600">Allow investors to send you direct messages</p>
                      </div>
                      <Switch
                        id="allowDirectMessages"
                        checked={privacy.allowDirectMessages}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, allowDirectMessages: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="showFarmLocation">Show Farm Location</Label>
                        <p className="text-sm text-gray-600">Display your farm's location on listings</p>
                      </div>
                      <Switch
                        id="showFarmLocation"
                        checked={privacy.showFarmLocation}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, showFarmLocation: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="dataSharing">Data Sharing</Label>
                        <p className="text-sm text-gray-600">Share anonymized data for platform improvements</p>
                      </div>
                      <Switch
                        id="dataSharing"
                        checked={privacy.dataSharing}
                        onCheckedChange={(checked) => setPrivacy({ ...privacy, dataSharing: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={handleSavePrivacy} className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="w-5 h-5" />
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={security.currentPassword}
                        onChange={(e) => setSecurity({ ...security, currentPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={security.newPassword}
                        onChange={(e) => setSecurity({ ...security, newPassword: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={security.confirmPassword}
                        onChange={(e) => setSecurity({ ...security, confirmPassword: e.target.value })}
                      />
                    </div>
                    <Button onClick={handleChangePassword} className="bg-orange-500 hover:bg-orange-600 text-white">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security Options
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="twoFactorEnabled">Two-Factor Authentication</Label>
                        <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                      </div>
                      <Button variant="outline">{security.twoFactorEnabled ? "Disable" : "Enable"} 2FA</Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="loginAlerts">Login Alerts</Label>
                        <p className="text-sm text-gray-600">Get notified of new login attempts</p>
                      </div>
                      <Switch
                        id="loginAlerts"
                        checked={security.loginAlerts}
                        onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Preferences Settings */}
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    General Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={preferences.language}
                        onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={preferences.timezone}
                        onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                          <SelectItem value="America/Denver">Mountain Time</SelectItem>
                          <SelectItem value="America/Chicago">Central Time</SelectItem>
                          <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currency">Currency</Label>
                      <Select
                        value={preferences.currency}
                        onValueChange={(value) => setPreferences({ ...preferences, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                          <SelectItem value="GBP">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select
                        value={preferences.dateFormat}
                        onValueChange={(value) => setPreferences({ ...preferences, dateFormat: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emailFrequency">Email Frequency</Label>
                      <Select
                        value={preferences.emailFrequency}
                        onValueChange={(value) => setPreferences({ ...preferences, emailFrequency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="daily">Daily Digest</SelectItem>
                          <SelectItem value="weekly">Weekly Summary</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button onClick={handleSavePreferences} className="bg-orange-500 hover:bg-orange-600 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Settings */}
            <TabsContent value="account">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                      <h3 className="font-medium text-yellow-800 mb-2">Export Your Data</h3>
                      <p className="text-sm text-yellow-700 mb-3">
                        Download a copy of all your data including farm submissions, inquiries, and profile information.
                      </p>
                      <Button variant="outline" className="bg-transparent">
                        Export Data
                      </Button>
                    </div>

                    <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
                      <h3 className="font-medium text-red-800 mb-2">Delete Account</h3>
                      <p className="text-sm text-red-700 mb-3">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button
                        variant="outline"
                        onClick={handleDeleteAccount}
                        className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </FarmerDashboardLayout>
    </FarmerProtectedRoute>
  )
}
