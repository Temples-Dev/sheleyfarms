import { Outlet, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./lib/auth-context";
import { ConditionalLayout } from "./components/conditional-layout";
import AuthLayout from "./layouts/AuthLayout";
import FarmerAuthLayout from "./layouts/FarmerAuthLayout";
import AdminAuthLayout from "./layouts/AdminAuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import FarmerLayout from "./layouts/FarmerLayout";
import AdminLayout from "./layouts/AdminLayout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import FaqPage from "./pages/FaqPage";
import FarmsPage from "./pages/FarmsPage";
import FarmDetailPage from "./pages/FarmDetailPage";
import AuthSignInPage from "./pages/AuthSignInPage";
import AuthSignUpPage from "./pages/AuthSignUpPage";
import FarmerSignInPage from "./pages/FarmerSignInPage";
import FarmerSignUpPage from "./pages/FarmerSignUpPage";
import AdminSignInPage from "./pages/AdminSignInPage";
import FarmerSubmitPage from "./pages/FarmerSubmitPage";
import DashboardPage from "./pages/DashboardPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import PortfolioPage from "./pages/PortfolioPage";
import TransactionsPage from "./pages/TransactionsPage";
import DashboardSettingsPage from "./pages/DashboardSettingsPage";
import HelpPage from "./pages/HelpPage";
import FarmerDashboardPage from "./pages/FarmerDashboardPage";
import FarmerAnalyticsPage from "./pages/FarmerAnalyticsPage";
import FarmerInquiriesPage from "./pages/FarmerInquiriesPage";
import FarmerProfilePage from "./pages/FarmerProfilePage";
import FarmerSettingsPage from "./pages/FarmerSettingsPage";
import FarmerSubmissionsPage from "./pages/FarmerSubmissionsPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import AdminReviewsPage from "./pages/AdminReviewsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminSubmissionsPage from "./pages/AdminSubmissionsPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import NotFoundPage from "./pages/NotFoundPage";

function RootShell() {
  return (
    <AuthProvider>
      <ConditionalLayout>
        <Outlet />
      </ConditionalLayout>
    </AuthProvider>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootShell />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="farms" element={<FarmsPage />} />
        <Route path="farms/:id" element={<FarmDetailPage />} />
        <Route path="auth" element={<AuthLayout />}>
          <Route path="signin" element={<AuthSignInPage />} />
          <Route path="signup" element={<AuthSignUpPage />} />
        </Route>
        <Route path="farmer" element={<FarmerLayout />}>
          <Route
            path="auth"
            element={<FarmerAuthLayout />}
          >
            <Route path="signin" element={<FarmerSignInPage />} />
            <Route path="signup" element={<FarmerSignUpPage />} />
          </Route>
          <Route path="submit" element={<FarmerSubmitPage />} />
          <Route path="dashboard" element={<FarmerDashboardPage />} />
          <Route path="dashboard/analytics" element={<FarmerAnalyticsPage />} />
          <Route path="dashboard/inquiries" element={<FarmerInquiriesPage />} />
          <Route path="dashboard/profile" element={<FarmerProfilePage />} />
          <Route path="dashboard/settings" element={<FarmerSettingsPage />} />
          <Route path="dashboard/submissions" element={<FarmerSubmissionsPage />} />
        </Route>
        <Route path="admin" element={<AdminLayout />}>
          <Route path="auth" element={<AdminAuthLayout />}>
            <Route path="signin" element={<AdminSignInPage />} />
          </Route>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="dashboard/analytics" element={<AdminAnalyticsPage />} />
          <Route path="dashboard/profile" element={<AdminProfilePage />} />
          <Route path="dashboard/reviews" element={<AdminReviewsPage />} />
          <Route path="dashboard/settings" element={<AdminSettingsPage />} />
          <Route path="dashboard/submissions" element={<AdminSubmissionsPage />} />
          <Route path="dashboard/users" element={<AdminUsersPage />} />
        </Route>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="investments" element={<InvestmentsPage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="settings" element={<DashboardSettingsPage />} />
          <Route path="help" element={<HelpPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
