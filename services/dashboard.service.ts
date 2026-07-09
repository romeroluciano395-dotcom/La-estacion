import type { DashboardStats, Passenger, Trip } from "@/types";
import { MOCK_PASSENGERS, MOCK_STATS, MOCK_TRIPS } from "./mock-data";

export async function getDashboardStats(): Promise<DashboardStats> {
  return MOCK_STATS;
}

export async function getPassengers(): Promise<Passenger[]> {
  return MOCK_PASSENGERS;
}

export async function getTrips(): Promise<Trip[]> {
  return MOCK_TRIPS;
}
