"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import FarmerProtectedRoute from "@/components/farmer-protected-route"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Tractor,
  DollarSign,
  FileText,
  Upload,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react"

interface FormData {
  // Basic Information
  farmName: string
  location: string
  farmSize: string
  farmType: string
  description: string

  // Investment Details
  investmentAmount: string
  expectedReturn: string
  investmentDuration: string
  minimumInvestment: string
  riskLevel: string

  // Operations
  cropTypes: string
  farmingMethods: string
  certifications: string
  experience: string

  // Legal & Contact
  businessRegistration: string
  taxId: string
  bankDetails: string
  contactPerson: string
  contactPhone: string
  contactEmail: string

  // Documents
  businessLicense: File | null
  landOwnership: File | null
  financialStatements: File | null
  farmPhotos: FileList | null

  // Terms
  termsAccepted: boolean
  dataProcessingConsent: boolean
}

const initialFormData: FormData = {
  farmName: "",
  location: "",
  farmSize: "",
  farmType: "",
  description: "",
  investmentAmount: "",
  expectedReturn: "",
  investmentDuration: "",
  minimumInvestment: "",
  riskLevel: "",
  cropTypes: "",
  farmingMethods: "",
  certifications: "",
  experience: "",
  businessRegistration: "",
  taxId: "",
  bankDetails: "",
  contactPerson: "",
  contactPhone: "",
  contactEmail: "",
  businessLicense: null,
  landOwnership: null,
  financialStatements: null,
  farmPhotos: null,
  termsAccepted: false,
  dataProcessingConsent: false,
}

export default function FarmSubmission() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const totalSteps = 5
  const progress = (currentStep / totalSteps) * 100

  const handleInputChange = (field: keyof FormData, value: string | boolean | File | FileList | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.farmName) newErrors.farmName = "Farm name is required"
        if (!formData.location) newErrors.location = "Location is required"
        if (!formData.farmSize) newErrors.farmSize = "Farm size is required"
        if (!formData.farmType) newErrors.farmType = "Farm type is required"
        if (!formData.description) newErrors.description = "Description is required"
        break
      case 2:
        if (!formData.investmentAmount) newErrors.investmentAmount = "Investment amount is required"
        if (!formData.expectedReturn) newErrors.expectedReturn = "Expected return is required"
        if (!formData.investmentDuration) newErrors.investmentDuration = "Investment duration is required"
        if (!formData.minimumInvestment) newErrors.minimumInvestment = "Minimum investment is required"
        if (!formData.riskLevel) newErrors.riskLevel = "Risk level is required"
        break
      case 3:
        if (!formData.cropTypes) newErrors.cropTypes = "Crop types are required"
        if (!formData.farmingMethods) newErrors.farmingMethods = "Farming methods are required"
        if (!formData.experience) newErrors.experience = "Experience is required"
        break
      case 4:
        if (!formData.contactPerson) newErrors.contactPerson = "Contact person is required"
        if (!formData.contactPhone) newErrors.contactPhone = "Contact phone is required"
        if (!formData.contactEmail) newErrors.contactEmail = "Contact email is required"
        if (!formData.businessRegistration) newErrors.businessRegistration = "Business registration is required"
        break
      case 5:
        if (!formData.termsAccepted) newErrors.termsAccepted = "You must accept the terms and conditions"
        if (!formData.dataProcessingConsent) newErrors.dataProcessingConsent = "You must consent to data processing"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to success page or farmer dashboard
    router.push("/farmer/dashboard?submitted=true")
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Tractor className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Basic Farm Information</h2>
              <p className="text-gray-600">Tell us about your farm and what makes it special</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="farmName">Farm Name *</Label>
                <Input
                  id="farmName"
                  placeholder="Green Valley Organic Farm"
                  value={formData.farmName}
                  onChange={(e) => handleInputChange("farmName", e.target.value)}
                  className={errors.farmName ? "border-red-500" : ""}
                />
                {errors.farmName && <p className="text-sm text-red-600">{errors.farmName}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="California, USA"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className={errors.location ? "border-red-500" : ""}
                />
                {errors.location && <p className="text-sm text-red-600">{errors.location}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmSize">Farm Size (acres) *</Label>
                <Input
                  id="farmSize"
                  type="number"
                  placeholder="100"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                  className={errors.farmSize ? "border-red-500" : ""}
                />
                {errors.farmSize && <p className="text-sm text-red-600">{errors.farmSize}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmType">Farm Type *</Label>
                <Select value={formData.farmType} onValueChange={(value) => handleInputChange("farmType", value)}>
                  <SelectTrigger className={errors.farmType ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select farm type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organic">Organic Farming</SelectItem>
                    <SelectItem value="conventional">Conventional Farming</SelectItem>
                    <SelectItem value="hydroponic">Hydroponic</SelectItem>
                    <SelectItem value="livestock">Livestock</SelectItem>
                    <SelectItem value="mixed">Mixed Farming</SelectItem>
                    <SelectItem value="specialty">Specialty Crops</SelectItem>
                  </SelectContent>
                </Select>
                {errors.farmType && <p className="text-sm text-red-600">{errors.farmType}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Farm Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe your farm, its history, unique features, and what makes it a good investment opportunity..."
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Investment Details</h2>
              <p className="text-gray-600">Define the investment opportunity for potential investors</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="investmentAmount">Total Investment Needed ($) *</Label>
                <Input
                  id="investmentAmount"
                  type="number"
                  placeholder="500000"
                  value={formData.investmentAmount}
                  onChange={(e) => handleInputChange("investmentAmount", e.target.value)}
                  className={errors.investmentAmount ? "border-red-500" : ""}
                />
                {errors.investmentAmount && <p className="text-sm text-red-600">{errors.investmentAmount}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="expectedReturn">Expected Annual Return (%) *</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  step="0.1"
                  placeholder="12.5"
                  value={formData.expectedReturn}
                  onChange={(e) => handleInputChange("expectedReturn", e.target.value)}
                  className={errors.expectedReturn ? "border-red-500" : ""}
                />
                {errors.expectedReturn && <p className="text-sm text-red-600">{errors.expectedReturn}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="investmentDuration">Investment Duration (years) *</Label>
                <Select
                  value={formData.investmentDuration}
                  onValueChange={(value) => handleInputChange("investmentDuration", value)}
                >
                  <SelectTrigger className={errors.investmentDuration ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Year</SelectItem>
                    <SelectItem value="2">2 Years</SelectItem>
                    <SelectItem value="3">3 Years</SelectItem>
                    <SelectItem value="5">5 Years</SelectItem>
                    <SelectItem value="10">10 Years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.investmentDuration && <p className="text-sm text-red-600">{errors.investmentDuration}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumInvestment">Minimum Investment ($) *</Label>
                <Input
                  id="minimumInvestment"
                  type="number"
                  placeholder="10000"
                  value={formData.minimumInvestment}
                  onChange={(e) => handleInputChange("minimumInvestment", e.target.value)}
                  className={errors.minimumInvestment ? "border-red-500" : ""}
                />
                {errors.minimumInvestment && <p className="text-sm text-red-600">{errors.minimumInvestment}</p>}
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="riskLevel">Risk Level *</Label>
                <Select value={formData.riskLevel} onValueChange={(value) => handleInputChange("riskLevel", value)}>
                  <SelectTrigger className={errors.riskLevel ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Risk - Stable, established operations</SelectItem>
                    <SelectItem value="medium">Medium Risk - Growing business with some uncertainty</SelectItem>
                    <SelectItem value="high">High Risk - New venture or expansion project</SelectItem>
                  </SelectContent>
                </Select>
                {errors.riskLevel && <p className="text-sm text-red-600">{errors.riskLevel}</p>}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Farm Operations</h2>
              <p className="text-gray-600">Provide details about your farming operations and experience</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cropTypes">Crop Types / Livestock *</Label>
                <Textarea
                  id="cropTypes"
                  placeholder="List the main crops you grow or livestock you raise (e.g., Organic tomatoes, bell peppers, herbs; Free-range chickens)"
                  rows={3}
                  value={formData.cropTypes}
                  onChange={(e) => handleInputChange("cropTypes", e.target.value)}
                  className={errors.cropTypes ? "border-red-500" : ""}
                />
                {errors.cropTypes && <p className="text-sm text-red-600">{errors.cropTypes}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmingMethods">Farming Methods & Techniques *</Label>
                <Textarea
                  id="farmingMethods"
                  placeholder="Describe your farming methods, techniques, and any special practices you use"
                  rows={3}
                  value={formData.farmingMethods}
                  onChange={(e) => handleInputChange("farmingMethods", e.target.value)}
                  className={errors.farmingMethods ? "border-red-500" : ""}
                />
                {errors.farmingMethods && <p className="text-sm text-red-600">{errors.farmingMethods}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications & Awards</Label>
                <Textarea
                  id="certifications"
                  placeholder="List any organic certifications, awards, or recognitions your farm has received"
                  rows={2}
                  value={formData.certifications}
                  onChange={(e) => handleInputChange("certifications", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Farming Experience *</Label>
                <Textarea
                  id="experience"
                  placeholder="Describe your farming experience, background, and expertise"
                  rows={3}
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  className={errors.experience ? "border-red-500" : ""}
                />
                {errors.experience && <p className="text-sm text-red-600">{errors.experience}</p>}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Legal & Contact Information</h2>
              <p className="text-gray-600">Provide your business and contact details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactPerson">Primary Contact Person *</Label>
                <Input
                  id="contactPerson"
                  placeholder="John Doe"
                  value={formData.contactPerson}
                  onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                  className={errors.contactPerson ? "border-red-500" : ""}
                />
                {errors.contactPerson && <p className="text-sm text-red-600">{errors.contactPerson}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone *</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                  className={errors.contactPhone ? "border-red-500" : ""}
                />
                {errors.contactPhone && <p className="text-sm text-red-600">{errors.contactPhone}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="contact@farm.com"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                  className={errors.contactEmail ? "border-red-500" : ""}
                />
                {errors.contactEmail && <p className="text-sm text-red-600">{errors.contactEmail}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessRegistration">Business Registration Number *</Label>
                <Input
                  id="businessRegistration"
                  placeholder="123456789"
                  value={formData.businessRegistration}
                  onChange={(e) => handleInputChange("businessRegistration", e.target.value)}
                  className={errors.businessRegistration ? "border-red-500" : ""}
                />
                {errors.businessRegistration && <p className="text-sm text-red-600">{errors.businessRegistration}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input
                  id="taxId"
                  placeholder="12-3456789"
                  value={formData.taxId}
                  onChange={(e) => handleInputChange("taxId", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankDetails">Bank Account Details</Label>
                <Input
                  id="bankDetails"
                  placeholder="Bank name and account information"
                  value={formData.bankDetails}
                  onChange={(e) => handleInputChange("bankDetails", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Document Uploads</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessLicense">Business License</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <Input
                      id="businessLicense"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleInputChange("businessLicense", e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Label
                      htmlFor="businessLicense"
                      className="cursor-pointer text-sm text-gray-600 hover:text-green-600"
                    >
                      Click to upload business license
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landOwnership">Land Ownership Documents</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <Input
                      id="landOwnership"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleInputChange("landOwnership", e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Label
                      htmlFor="landOwnership"
                      className="cursor-pointer text-sm text-gray-600 hover:text-green-600"
                    >
                      Click to upload land documents
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="financialStatements">Financial Statements</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <Input
                      id="financialStatements"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleInputChange("financialStatements", e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <Label
                      htmlFor="financialStatements"
                      className="cursor-pointer text-sm text-gray-600 hover:text-green-600"
                    >
                      Click to upload financial statements
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmPhotos">Farm Photos</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <Input
                      id="farmPhotos"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={(e) => handleInputChange("farmPhotos", e.target.files)}
                      className="hidden"
                    />
                    <Label htmlFor="farmPhotos" className="cursor-pointer text-sm text-gray-600 hover:text-green-600">
                      Click to upload farm photos
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900">Review & Submit</h2>
              <p className="text-gray-600">Review your information and accept the terms to submit your application</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Application Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Farm Name:</span>
                  <span className="ml-2 text-gray-900">{formData.farmName}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-900">{formData.location}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Investment Amount:</span>
                  <span className="ml-2 text-gray-900">${formData.investmentAmount}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Expected Return:</span>
                  <span className="ml-2 text-gray-900">{formData.expectedReturn}%</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Contact Person:</span>
                  <span className="ml-2 text-gray-900">{formData.contactPerson}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Contact Email:</span>
                  <span className="ml-2 text-gray-900">{formData.contactEmail}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                  className={errors.termsAccepted ? "border-red-500" : ""}
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the Terms and Conditions *
                  </Label>
                  <p className="text-xs text-gray-600">
                    By checking this box, you agree to our terms of service and listing agreement.
                  </p>
                  {errors.termsAccepted && <p className="text-xs text-red-600">{errors.termsAccepted}</p>}
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="dataProcessing"
                  checked={formData.dataProcessingConsent}
                  onCheckedChange={(checked) => handleInputChange("dataProcessingConsent", checked as boolean)}
                  className={errors.dataProcessingConsent ? "border-red-500" : ""}
                />
                <div className="space-y-1">
                  <Label
                    htmlFor="dataProcessing"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I consent to data processing *
                  </Label>
                  <p className="text-xs text-gray-600">
                    You consent to the processing of your personal data for the purpose of farm listing and investor
                    matching.
                  </p>
                  {errors.dataProcessingConsent && (
                    <p className="text-xs text-red-600">{errors.dataProcessingConsent}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">What happens next?</p>
                  <ul className="list-disc list-inside space-y-1 text-blue-700">
                    <li>Your application will be reviewed by our team within 5-7 business days</li>
                    <li>We may contact you for additional information or clarification</li>
                    <li>Once approved, your farm will be listed on our platform</li>
                    <li>You&apos;ll receive access to investor inquiries and funding opportunities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <FarmerProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => router.push("/farmer/dashboard")}
                className="flex items-center gap-2 bg-white hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Dashboard
              </Button>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Submit Your Farm</h1>
              <div className="text-sm text-gray-600">
                Step {currentStep} of {totalSteps}
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
            <CardContent className="p-8">
              {renderStep()}

              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </FarmerProtectedRoute>
  )
}
