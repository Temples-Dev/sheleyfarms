import { apiFetch, buildQuery, type Paginated } from "./api-client";

/** Farm as the API returns it (snake_case, decimals as strings). */
export interface ApiFarm {
  id: string;
  name: string;
  slug: string;
  location: string;
  farm_type: string;
  status: "draft" | "open" | "funded" | "closed";
  description: string;
  detailed_description: string;
  size: string;
  farm_manager: string;
  duration_months: number;
  expected_return_rate: string;
  min_investment: string;
  max_investment: string;
  total_funding_goal: string;
  amount_raised: string;
  funding_progress: number;
  payout_schedule: string;
  expected_returns: string;
  key_features: string[];
  farm_activities: string[];
  risk_factors: string[];
  gallery: string[];
  banner_image: string;
}

/** Farm shape the catalogue UI renders. */
export interface UiFarm {
  id: string;
  name: string;
  image: string;
  returnRate: string;
  duration: string;
  status: string;
  minInvestment: number;
  maxInvestment: number;
  location: string;
  type: string;
  description: string;
  fundingProgress: number;
}

export interface UiFarmDetail extends UiFarm {
  bannerImage: string;
  gallery: string[];
  detailedDescription: string;
  size: string;
  totalFundingGoal: number;
  currentFunding: number;
  investorCount: number;
  farmActivities: string[];
  keyFeatures: string[];
  riskFactors: string[];
  expectedReturns: Record<string, string>;
  payoutSchedule: string;
  farmManager: { name: string; experience: string; credentials: string };
}

function capitalizeStatus(status: string): string {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function percent(rate: string): string {
  return `${Number.parseFloat(rate)}%`;
}

export function toUiFarm(api: ApiFarm): UiFarm {
  return {
    id: api.id,
    name: api.name,
    image: api.banner_image,
    returnRate: percent(api.expected_return_rate),
    duration: `${api.duration_months} months`,
    status: capitalizeStatus(api.status),
    minInvestment: Number(api.min_investment),
    maxInvestment: Number(api.max_investment),
    location: api.location,
    type: api.farm_type,
    description: api.description,
    fundingProgress: Number(api.funding_progress),
  };
}

export function toUiFarmDetail(api: ApiFarm): UiFarmDetail {
  const base = toUiFarm(api);
  return {
    ...base,
    bannerImage: api.banner_image,
    gallery: api.gallery,
    detailedDescription: api.detailed_description,
    size: api.size,
    totalFundingGoal: Number(api.total_funding_goal),
    currentFunding: Number(api.amount_raised),
    // No investor headcount endpoint yet; shown as zero until investments land.
    investorCount: 0,
    farmActivities: api.farm_activities,
    keyFeatures: api.key_features,
    riskFactors: api.risk_factors,
    expectedReturns: { [base.duration]: base.returnRate },
    payoutSchedule: api.payout_schedule,
    farmManager: {
      name: api.farm_manager === "" ? "To be announced" : api.farm_manager,
      experience: "",
      credentials: "",
    },
  };
}

export interface FarmFilters {
  search?: string;
  status?: string;
  location?: string;
  farm_type?: string;
}

/** One large page; the catalogue filters and sorts client-side from here. */
export async function fetchFarms(filters: FarmFilters = {}): Promise<UiFarm[]> {
  const query = buildQuery({ page_size: "100", ...filters });
  const page = await apiFetch<Paginated<ApiFarm>>(`/farms/${query}`);
  return page.results.map(toUiFarm);
}

export async function fetchFarm(id: string): Promise<UiFarmDetail> {
  const api = await apiFetch<ApiFarm>(`/farms/${id}/`);
  return toUiFarmDetail(api);
}
