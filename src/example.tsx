import * as React from "react";
import { Button } from "@fluentui/react-components";
import type { ButtonProps } from "@fluentui/react-components";
import AnalyticsDashboard from "./blocks/layout/AnalyticsDashboard";
import TailwindAnalyticsDashboard from "./blocks/layout/TailwindAnalyticsDashboard";

export const Default = (props: ButtonProps) => (
  <Button {...props}>Example</Button>
);

export const FluentUIDashboard = () => (
  <div style={{ padding: "20px" }}>
    <h2 style={{ marginBottom: "20px" }}>Fluent UI Dashboard (makeStyles)</h2>
    <AnalyticsDashboard />
  </div>
);

export const TailwindDashboard = () => (
  <div style={{ padding: "20px" }}>
    <h2 style={{ marginBottom: "20px" }}>Tailwind CSS Dashboard</h2>
    <TailwindAnalyticsDashboard />
  </div>
);

export const DashboardComparison = () => (
  <div style={{ padding: "20px" }}>
    <h1 style={{ marginBottom: "30px" }}>Dashboard Comparison</h1>
    <div style={{ marginBottom: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Fluent UI Dashboard (makeStyles)</h2>
      <AnalyticsDashboard />
    </div>
    <div>
      <h2 style={{ marginBottom: "20px" }}>Tailwind CSS Dashboard</h2>
      <TailwindAnalyticsDashboard />
    </div>
  </div>
);
