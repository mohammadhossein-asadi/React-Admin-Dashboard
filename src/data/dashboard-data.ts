export type Period = "thisWeek" | "thisMonth" | "thisYear";

export const periodLabels: Record<Period, string> = {
  thisWeek: "This Week",
  thisMonth: "This Month",
  thisYear: "This Year",
};

export const sparklineTrends: Record<
  Period,
  { emails: number[]; sales: number[]; clients: number[]; traffic: number[] }
> = {
  thisWeek: {
    emails: [8, 12, 10, 14, 11, 13, 12],
    sales: [30, 35, 32, 40, 38, 42, 43],
    clients: [2, 3, 2, 4, 3, 3, 3],
    traffic: [80, 95, 88, 100, 92, 110, 132],
  },
  thisMonth: {
    emails: [40, 45, 42, 48, 44, 46, 48],
    sales: [150, 165, 155, 180, 170, 178, 184],
    clients: [10, 12, 11, 14, 12, 13, 12],
    traffic: [400, 450, 420, 500, 480, 510, 523],
  },
  thisYear: {
    emails: [400, 450, 420, 480, 440, 460, 542],
    sales: [1500, 1650, 1550, 1800, 1700, 1780, 2150],
    clients: [100, 120, 110, 140, 120, 130, 142],
    traffic: [4000, 4500, 4200, 5000, 4800, 5100, 6240],
  },
};
