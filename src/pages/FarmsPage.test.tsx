import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import FarmDetailPage from "./FarmDetailPage";
import FarmsPage from "./FarmsPage";

const apiFarm = {
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
  gallery: [],
  banner_image: "",
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

describe("farms pages", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    localStorage.clear();
  });

  it("lists farms from the API", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ count: 1, next: null, previous: null, results: [apiFarm] }),
      ),
    );
    render(
      <MemoryRouter>
        <FarmsPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText("Green Valley Poultry Farm")).toBeInTheDocument();
    expect(screen.getByText("Showing 1 of 1 farms")).toBeInTheDocument();
  });

  it("shows an error with retry when the list fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ error: { code: "request_error", message: "Down." } }, 500),
      ),
    );
    render(
      <MemoryRouter>
        <FarmsPage />
      </MemoryRouter>,
    );

    expect(await screen.findByText(/could not load farms/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });

  it("filters the loaded farms without refetching", async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({ count: 1, next: null, previous: null, results: [apiFarm] }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <FarmsPage />
      </MemoryRouter>,
    );
    await screen.findByText("Green Valley Poultry Farm");

    await user.type(screen.getByPlaceholderText(/search farms/i), "zzz-no-match");

    expect(await screen.findByText(/no farms match your current filters/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("shows farm details from the API", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse(apiFarm)));
    render(
      <MemoryRouter initialEntries={[`/farms/${apiFarm.id}`]}>
        <Routes>
          <Route path="/farms/:id" element={<FarmDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText("Green Valley Poultry Farm")).toBeInTheDocument();
    expect(screen.getByText("Kwame Osei")).toBeInTheDocument();
  });

  it("shows not found for an unknown farm id", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ error: { code: "not_found", message: "Nope." } }, 404),
      ),
    );
    render(
      <MemoryRouter initialEntries={["/farms/does-not-exist"]}>
        <Routes>
          <Route path="/farms/:id" element={<FarmDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(await screen.findByText(/farm not found/i)).toBeInTheDocument();
  });

  it("links cards to the detail route", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string | URL | Request) => {
        if (String(url).includes("/farms/?")) {
          return jsonResponse({ count: 1, next: null, previous: null, results: [apiFarm] });
        }
        return jsonResponse(apiFarm);
      }),
    );
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/farms"]}>
        <Routes>
          <Route path="/farms" element={<FarmsPage />} />
          <Route path="/farms/:id" element={<FarmDetailPage />} />
        </Routes>
      </MemoryRouter>,
    );
    await screen.findByText("Green Valley Poultry Farm");

    await user.click(screen.getByRole("link", { name: /details/i }));

    await waitFor(() => {
      expect(screen.getByText("Farm Overview")).toBeInTheDocument();
    });
  });
});
