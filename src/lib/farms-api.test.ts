import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchFarm, fetchFarms, toUiFarm, toUiFarmDetail, type ApiFarm } from "./farms-api";

const apiFarm: ApiFarm = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "Green Valley Poultry Farm",
  slug: "green-valley-poultry-farm",
  location: "Northern Region",
  farm_type: "Poultry",
  status: "open",
  description: "Free-range chicken production.",
  detailed_description: "Long description.",
  size: "25 acres",
  farm_manager: "Kwame Osei",
  duration_months: 12,
  expected_return_rate: "14.00",
  min_investment: "500.00",
  max_investment: "10000.00",
  total_funding_goal: "100000.00",
  amount_raised: "65000.00",
  funding_progress: 65,
  payout_schedule: "Quarterly dividends",
  expected_returns: "",
  key_features: ["Organic"],
  farm_activities: ["Rearing"],
  risk_factors: ["Weather"],
  gallery: ["https://example.com/1.jpg"],
  banner_image: "https://example.com/banner.jpg",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("farms-api", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("maps API farms to the catalogue card shape", () => {
    expect(toUiFarm(apiFarm)).toMatchObject({
      id: apiFarm.id,
      name: "Green Valley Poultry Farm",
      image: "https://example.com/banner.jpg",
      returnRate: "14%",
      duration: "12 months",
      status: "Open",
      minInvestment: 500,
      maxInvestment: 10000,
      type: "Poultry",
      fundingProgress: 65,
    });
  });

  it("maps API farms to the detail shape with derived fields", () => {
    const detail = toUiFarmDetail(apiFarm);
    expect(detail).toMatchObject({
      currentFunding: 65000,
      totalFundingGoal: 100000,
      investorCount: 0,
      farmManager: { name: "Kwame Osei" },
      expectedReturns: { "12 months": "14%" },
    });
    expect(detail.gallery).toEqual(["https://example.com/1.jpg"]);
  });

  it("fetches the list with filters as query params", async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ count: 1, next: null, previous: null, results: [apiFarm] }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const farms = await fetchFarms({ search: "valley", status: "open" });

    expect(farms).toHaveLength(1);
    const [url] = fetchMock.mock.calls[0] as unknown as [string];
    expect(url).toContain("/farms/?");
    expect(url).toContain("page_size=100");
    expect(url).toContain("search=valley");
    expect(url).toContain("status=open");
  });

  it("fetches a single farm by id", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse(apiFarm)));
    const farm = await fetchFarm(apiFarm.id);
    expect(farm.name).toBe("Green Valley Poultry Farm");
    expect(farm.status).toBe("Open");
  });
});
