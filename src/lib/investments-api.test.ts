import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchMyInvestments, toUiInvestment, type ApiInvestment } from "./investments-api";

const apiInvestment: ApiInvestment = {
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

describe("investments-api", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("maps API investments to the patron UI shape", () => {
    expect(toUiInvestment(apiInvestment)).toMatchObject({
      id: apiInvestment.id,
      farmName: "Green Valley Poultry Farm",
      location: "Northern Region",
      farmType: "Poultry",
      investmentDate: "2024-01-15",
      amount: 2000,
      expectedReturn: "14%",
      currentValue: 2180,
      status: "Active",
      duration: "12 months",
      progress: 65,
    });
  });

  it("fetches the signed-in patron commitments with auth", async () => {
    localStorage.setItem("shelley-farms-token", "tok123");
    const fetchMock = vi.fn(async () =>
      jsonResponse({ count: 1, next: null, previous: null, results: [apiInvestment] }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const investments = await fetchMyInvestments();

    expect(investments).toHaveLength(1);
    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(init.headers).toMatchObject({ Authorization: "Token tok123" });
  });
});
