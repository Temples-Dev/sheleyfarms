"use client"

import AdminProtectedRoute from "@/components/admin-protected-route"
import AdminDashboardLayout from "@/components/admin-dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, Bell, Shield, Mail, Users, FileText, Save } from "lucide-react"
import { useState } from "react"

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    // Platform settings
    platformName: "SheleyFarms",
    platformDescription: "Agricultural Investment Platform",
    maintenanceMode: false,
    registrationEnabled: true,

    // Notification settings
    emailNotifications: true,
    submissionAlerts: true,
    userRegistrationAlerts: true,
    systemAlerts: true,

    // Review settings
    autoApprovalThreshold: 50000,
    maxReviewDays: 7,
    requireDocuments: true,

    // Security settings
    sessionTimeout: 30,
    passwordMinLength: 8,
    twoFactorRequired: false,

    // Email settings
    smtpHost: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "admin@sheleyfarms.com",
    smtpPassword: "",
  })

  const handleSave = (section: string) => {
    console.log(`Saving ${section} settings:`, settings)
    // In real app, this would call API
  }

  return (
    <AdminProtectedRoute>
      <AdminDashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage platform configuration and preferences</p>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="platformName">Platform Name</Label>
                      <Input
                        id="platformName"
                        value={settings.platformName}
                        onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platformDescription">Platform Description</Label>
                      <Input
                        id="platformDescription"
                        value={settings.platformDescription}
                        onChange={(e) => setSettings({ ...settings, platformDescription: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                        <p className="text-sm text-gray-600">Temporarily disable platform access</p>
                      </div>
                      <Switch
                        id="maintenanceMode"
                        checked={settings.maintenanceMode}
                        onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="registrationEnabled">User Registration</Label>
                        <p className="text-sm text-gray-600">Allow new user registrations</p>
                      </div>
                      <Switch
                        id="registrationEnabled"
                        checked={settings.registrationEnabled}
                        onCheckedChange={(checked) => setSettings({ ...settings, registrationEnabled: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("general")} className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save General Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notification Settings */}
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
                        <p className="text-sm text-gray-600">Send email notifications for important events</p>
                      </div>
                      <Switch
                        id="emailNotifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="submissionAlerts">Farm Submission Alerts</Label>
                        <p className="text-sm text-gray-600">Get notified when new farms are submitted</p>
                      </div>
                      <Switch
                        id="submissionAlerts"
                        checked={settings.submissionAlerts}
                        onCheckedChange={(checked) => setSettings({ ...settings, submissionAlerts: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="userRegistrationAlerts">User Registration Alerts</Label>
                        <p className="text-sm text-gray-600">Get notified when new users register</p>
                      </div>
                      <Switch
                        id="userRegistrationAlerts"
                        checked={settings.userRegistrationAlerts}
                        onCheckedChange={(checked) => setSettings({ ...settings, userRegistrationAlerts: checked })}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="systemAlerts">System Alerts</Label>
                        <p className="text-sm text-gray-600">Get notified about system issues and updates</p>
                      </div>
                      <Switch
                        id="systemAlerts"
                        checked={settings.systemAlerts}
                        onCheckedChange={(checked) => setSettings({ ...settings, systemAlerts: checked })}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("notifications")} className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Review Settings */}
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Review Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="autoApprovalThreshold">Auto-Approval Threshold ($)</Label>
                      <Input
                        id="autoApprovalThreshold"
                        type="number"
                        value={settings.autoApprovalThreshold}
                        onChange={(e) =>
                          setSettings({ ...settings, autoApprovalThreshold: Number.parseInt(e.target.value) })
                        }
                      />
                      <p className="text-sm text-gray-600">Farms below this amount can be auto-approved</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxReviewDays">Maximum Review Days</Label>
                      <Input
                        id="maxReviewDays"
                        type="number"
                        value={settings.maxReviewDays}
                        onChange={(e) => setSettings({ ...settings, maxReviewDays: Number.parseInt(e.target.value) })}
                      />
                      <p className="text-sm text-gray-600">Maximum days to review a submission</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="requireDocuments">Require Documents</Label>
                      <p className="text-sm text-gray-600">Require document uploads for all submissions</p>
                    </div>
                    <Switch
                      id="requireDocuments"
                      checked={settings.requireDocuments}
                      onCheckedChange={(checked) => setSettings({ ...settings, requireDocuments: checked })}
                    />
                  </div>

                  <Button onClick={() => handleSave("reviews")} className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Review Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.sessionTimeout}
                        onChange={(e) => setSettings({ ...settings, sessionTimeout: Number.parseInt(e.target.value) })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={settings.passwordMinLength}
                        onChange={(e) =>
                          setSettings({ ...settings, passwordMinLength: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorRequired">Require Two-Factor Authentication</Label>
                      <p className="text-sm text-gray-600">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch
                      id="twoFactorRequired"
                      checked={settings.twoFactorRequired}
                      onCheckedChange={(checked) => setSettings({ ...settings, twoFactorRequired: checked })}
                    />
                  </div>

                  <Button onClick={() => handleSave("security")} className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save Security Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Settings */}
            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={settings.smtpHost}
                        onChange={(e) => setSettings({ ...settings, smtpHost: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={settings.smtpPort}
                        onChange={(e) => setSettings({ ...settings, smtpPort: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        value={settings.smtpUsername}
                        onChange={(e) => setSettings({ ...settings, smtpUsername: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.smtpPassword}
                        onChange={(e) => setSettings({ ...settings, smtpPassword: e.target.value })}
                        placeholder="Enter password to change"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline">Test Connection</Button>
                    <Button onClick={() => handleSave("email")} className="bg-purple-600 hover:bg-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Email Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* User Management Settings */}
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="defaultUserRole">Default User Role</Label>
                      <Select defaultValue="investor">
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="investor">Investor</SelectItem>
                          <SelectItem value="farmer">Farmer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="welcomeMessage">Welcome Message</Label>
                      <Textarea
                        id="welcomeMessage"
                        className="mt-2"
                        placeholder="Welcome message for new users..."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button onClick={() => handleSave("users")} className="bg-purple-600 hover:bg-purple-700">
                    <Save className="w-4 h-4 mr-2" />
                    Save User Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </AdminDashboardLayout>
    </AdminProtectedRoute>
  )
}
