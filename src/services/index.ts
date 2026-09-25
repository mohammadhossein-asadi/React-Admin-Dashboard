import { mockDataTeam, mockDataContacts, mockDataInvoices } from "@/data/mock-data";
import type { TeamMember, Contact, Invoice } from "@/types";
import { apiFetch, isLiveApiConfigured } from "./client";

export async function getTeam(): Promise<TeamMember[]> {
  if (isLiveApiConfigured) return apiFetch<TeamMember[]>("/team");
  return mockDataTeam;
}

export async function getContacts(): Promise<Contact[]> {
  if (isLiveApiConfigured) return apiFetch<Contact[]>("/contacts");
  return mockDataContacts;
}

export async function getInvoices(): Promise<Invoice[]> {
  if (isLiveApiConfigured) return apiFetch<Invoice[]>("/invoices");
  return mockDataInvoices;
}
