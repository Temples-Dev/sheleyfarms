import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import { AuthProvider } from "@/lib/auth-context";
import DashboardPage from "./DashboardPage";
import InvestmentsPage from "./InvestmentsPage";

const apiInvestment = {
  id: "223e4567-e89b-12d3-a456-426614174001",
  farm_id: "123e4567-e89b-12d3-a456-426614174000",
  farm: {
    id: "123e4567-e89b-12d3-a456-426614174000",
    name: "Green Valley Poultry Farm",
    slug: "green-valley-poultry-farm",
    location: "Northern Region",
    farm_type: "Poultry",
    status: "open",
    description: "",
    detailed_description: "",
    size: "",
    farm_manager: "",
    duration_months: 12,
    expected_return_rate: "14.00",
    min_investment: "500.00",
    max_investment: "10000.00",
    total_funding_goal: "100000.00",
    amount_raised: "65000.00",
    funding_progress: 65,
    payout_schedule: "",
    expected_returns: "",
    key_features: [],
    farm_activities: [],
    risk_factors: [],
    gallery: [],
    banner_image: "",
  },
  amount: "2000.00",
  status: "active",
  expected_return_rate: "14.00",
  duration_months: 12,
  current_value: "2180.00",
  invested_at: "2024-01-15T10:00:00Z",
  completed_at: null,
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function seedSession() {
  localStorage.setItem(
    "shelley-farms-user",
    JSON.stringify({ token: "tok123", user: { id: "7", name: "Ama", email: "ama@example.com" } }),
  );
}

describe("investments pages", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("lists the patron investments from the API", async () => {
    seedSession();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ count: 1, next: null, previous: null, results: [apiInvestment] }),
      ),
    );
    render(
      <MemoryRouter>
        <AuthProvider>
          <InvestmentsPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByText("Green Valley Poultry Farm")).toBeInTheDocument();
  });

  it("shows an error when investments fail to load", async () => {
    seedSession();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ error: { code: "request_error", message: "Down." } }, 500),
      ),
    );
    render(
      <MemoryRouter>
        <AuthProvider>
          <InvestmentsPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByText(/could not load investments/i)).toBeInTheDocument();
  });

  it("shows the dashboard investments from the API", async () => {
    seedSession();
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ count: 1, next: null, previous: null, results: [apiInvestment] }),
      ),
    );
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <AuthProvider>
          <DashboardPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("tab", { name: /active investments/i }));

    expect(await screen.findByText("Green Valley Poultry Farm")).toBeInTheDocument();
  });
});
