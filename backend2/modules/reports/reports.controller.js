import * as ReportsService from "./reports.service.js";

export const getDashboard = async (req, res) => {
  const dashboard = await ReportsService.getDashboardData();
  res.json(dashboard);
};
