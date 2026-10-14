import { apiFetch, type Paginated } from "./api-client";
import type { ApiFarm } from "./farms-api";

/** Investment commitment as the API returns it. */
export interface ApiInvestment {
  id: string;
  farm_id: string;
  farm: ApiFarm;
  amount: string;
  status: "active" | "completed" | "cancelled";
  expected_return_rate: string;
  duration_months: number;
  current_value: string;
  invested_at: string;
  completed_at: string | null;
}

/** Investment shape the patron UI renders. */
export interface UiInvestment {
  id: string;
  farmName: string;
  farmImage: string;
  location: string;
  farmType: string;
  investmentDate: string;
  amount: number;
  expectedReturn: string;
  currentValue: number;
  status: string;
  duration: string;
  progress: number;
  completedDate: string;
}

function capitalizeStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function toUiInvestment(api: ApiInvestment): UiInvestment {
  return {
    id: api.id,
    farmName: api.farm.name,
    farmImage: api.farm.banner_image,
    location: api.farm.location,
    farmType: api.farm.farm_type,
    investmentDate: api.invested_at.slice(0, 10),
    amount: Number(api.amount),
    expectedReturn: `${Number.parseFloat(api.expected_return_rate)}%`,
    currentValue: Number(api.current_value),
    status: capitalizeStatus(api.status),
    duration: `${api.duration_months} months`,
    progress: Number(api.farm.funding_progress),
    completedDate: api.completed_at === null ? "" : api.completed_at.slice(0, 10),
  };
}

/** The signed-in patron's commitments, newest first. Requires authentication. */
export async function fetchMyInvestments(): Promise<UiInvestment[]> {
  const page = await apiFetch<Paginated<ApiInvestment>>("/investments/?page_size=100");
  return page.results.map(toUiInvestment);
}
