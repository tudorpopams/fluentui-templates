import * as React from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  makeStyles,
  tokens,
  Text,
  Button,
  NavItem,
  Nav,
} from "@fluentui/react-components";
import {
  DataTrending24Regular,
  ChartMultiple24Regular,
  Eye24Regular,
  Calendar24Regular,
  ChevronUp24Regular,
  ChevronDown24Regular,
  Home24Regular,
  DataScatter24Regular,
} from "@fluentui/react-icons";
import {
  AreaChart,
  VerticalBarChart,
  LineChart,
  DonutChart,
  ChartProps,
  VerticalBarChartDataPoint,
  DataVizPalette,
  getColorFromToken,
} from "@fluentui/react-charts";

const useStyles = makeStyles({
  card: {
    width: "100%",
    margin: "0",
    height: "fit-content",
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow16,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  dashboard: {
    display: "grid",
    gridTemplateColumns: "250px 1fr",
    minHeight: "800px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  sidebarTitle: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    padding: tokens.spacingHorizontalM,
    paddingTop: tokens.spacingVerticalM,
    paddingBottom: tokens.spacingVerticalM,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  content: {
    padding: tokens.spacingVerticalL,
    overflow: "auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: tokens.spacingVerticalL,
  },
  headerActions: {
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  chartCard: {
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow8,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow16,
    },
  },
  smallChartsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  sparklineGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: tokens.spacingHorizontalL,
  },
  sparklineCard: {
    padding: tokens.spacingVerticalS,
    boxShadow: tokens.shadow4,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow8,
    },
  },
  metricValue: {
    fontSize: "24px",
    fontWeight: tokens.fontWeightSemibold,
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalXS,
  },
  metricChange: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    fontSize: tokens.fontSizeBase200,
  },
  metricChangePositive: {
    color: tokens.colorPaletteGreenForeground1,
  },
  metricChangeNegative: {
    color: tokens.colorPaletteRedForeground1,
  },
});

const FluentChartsDashboard: React.FC = () => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("charts");

  const handleNavItemSelect = (value: string) => {
    setSelectedValue(value);
  };

  // Line Chart Data
  const lineChartData: ChartProps = {
    chartTitle: "Revenue Over Time",
    lineChartData: [
      {
        legend: "Q1 Revenue",
        data: [
          { x: new Date("2024-01-01"), y: 45000 },
          { x: new Date("2024-02-01"), y: 52000 },
          { x: new Date("2024-03-01"), y: 48000 },
          { x: new Date("2024-04-01"), y: 61000 },
          { x: new Date("2024-05-01"), y: 55000 },
          { x: new Date("2024-06-01"), y: 67000 },
        ],
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: "Q2 Revenue",
        data: [
          { x: new Date("2024-01-01"), y: 38000 },
          { x: new Date("2024-02-01"), y: 43000 },
          { x: new Date("2024-03-01"), y: 51000 },
          { x: new Date("2024-04-01"), y: 58000 },
          { x: new Date("2024-05-01"), y: 62000 },
          { x: new Date("2024-06-01"), y: 71000 },
        ],
        color: getColorFromToken(DataVizPalette.color2),
      },
    ],
  };

  // Area Chart Data
  const areaChartData: ChartProps = {
    chartTitle: "Traffic Sources",
    lineChartData: [
      {
        legend: "Organic Search",
        data: [
          { x: new Date("2024-01-01"), y: 2400 },
          { x: new Date("2024-02-01"), y: 2800 },
          { x: new Date("2024-03-01"), y: 3200 },
          { x: new Date("2024-04-01"), y: 3600 },
          { x: new Date("2024-05-01"), y: 4000 },
          { x: new Date("2024-06-01"), y: 4200 },
        ],
        color: getColorFromToken(DataVizPalette.color3),
      },
    ],
  };

  // Vertical Bar Chart Data
  const verticalBarData: VerticalBarChartDataPoint[] = [
    {
      x: "Jan",
      y: 12000,
      legend: "Sales",
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      x: "Feb",
      y: 15000,
      legend: "Sales",
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      x: "Mar",
      y: 18000,
      legend: "Sales",
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      x: "Apr",
      y: 16000,
      legend: "Sales",
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      x: "May",
      y: 21000,
      legend: "Sales",
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      x: "Jun",
      y: 23000,
      legend: "Sales",
      color: getColorFromToken(DataVizPalette.color4),
    },
  ];

  // Multi-Bar Chart Data (using different colors for variety)
  const multiBarData: VerticalBarChartDataPoint[] = [
    {
      x: "Product A",
      y: 8500,
      legend: "Product A",
      color: getColorFromToken(DataVizPalette.color5),
    },
    {
      x: "Product B",
      y: 12300,
      legend: "Product B",
      color: getColorFromToken(DataVizPalette.color6),
    },
    {
      x: "Product C",
      y: 6700,
      legend: "Product C",
      color: getColorFromToken(DataVizPalette.color7),
    },
    {
      x: "Product D",
      y: 15200,
      legend: "Product D",
      color: getColorFromToken(DataVizPalette.color8),
    },
    {
      x: "Product E",
      y: 9800,
      legend: "Product E",
      color: getColorFromToken(DataVizPalette.color9),
    },
  ];

  // Donut Chart Data
  const donutData: ChartProps = {
    chartTitle: "Market Share",
    chartData: [
      {
        legend: "Desktop",
        data: 45,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: "Mobile",
        data: 35,
        color: getColorFromToken(DataVizPalette.color2),
      },
      {
        legend: "Tablet",
        data: 20,
        color: getColorFromToken(DataVizPalette.color3),
      },
    ],
  };

  // Performance Data for second donut chart
  const performanceData: ChartProps = {
    chartTitle: "Performance Score",
    chartData: [
      {
        legend: "Completed",
        data: 78,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: "Remaining",
        data: 22,
        color: getColorFromToken(DataVizPalette.color10),
      },
    ],
  };

  // Category Data
  const categoryData: VerticalBarChartDataPoint[] = [
    {
      x: "Electronics",
      y: 25000,
      legend: "Electronics",
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      x: "Clothing",
      y: 18000,
      legend: "Clothing",
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      x: "Books",
      y: 12000,
      legend: "Books",
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      x: "Home",
      y: 22000,
      legend: "Home",
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      x: "Sports",
      y: 15000,
      legend: "Sports",
      color: getColorFromToken(DataVizPalette.color5),
    },
  ];

  // Sparkline Data
  const sparklineData1: ChartProps = {
    chartTitle: "Daily Users",
    lineChartData: [
      {
        legend: "Users",
        data: [
          { x: new Date("2024-08-08"), y: 120 },
          { x: new Date("2024-08-09"), y: 135 },
          { x: new Date("2024-08-10"), y: 128 },
          { x: new Date("2024-08-11"), y: 142 },
          { x: new Date("2024-08-12"), y: 158 },
          { x: new Date("2024-08-13"), y: 165 },
          { x: new Date("2024-08-14"), y: 171 },
        ],
        color: getColorFromToken(DataVizPalette.color1),
      },
    ],
  };

  const sparklineData2: ChartProps = {
    chartTitle: "Conversion Rate",
    lineChartData: [
      {
        legend: "Rate",
        data: [
          { x: new Date("2024-08-08"), y: 2.4 },
          { x: new Date("2024-08-09"), y: 2.8 },
          { x: new Date("2024-08-10"), y: 3.1 },
          { x: new Date("2024-08-11"), y: 2.9 },
          { x: new Date("2024-08-12"), y: 3.3 },
          { x: new Date("2024-08-13"), y: 3.6 },
          { x: new Date("2024-08-14"), y: 3.8 },
        ],
        color: getColorFromToken(DataVizPalette.color2),
      },
    ],
  };

  const sparklineData3: ChartProps = {
    chartTitle: "Page Load Time",
    lineChartData: [
      {
        legend: "Load Time",
        data: [
          { x: new Date("2024-08-08"), y: 1.8 },
          { x: new Date("2024-08-09"), y: 1.6 },
          { x: new Date("2024-08-10"), y: 1.4 },
          { x: new Date("2024-08-11"), y: 1.2 },
          { x: new Date("2024-08-12"), y: 1.1 },
          { x: new Date("2024-08-13"), y: 0.9 },
          { x: new Date("2024-08-14"), y: 0.8 },
        ],
        color: getColorFromToken(DataVizPalette.color3),
      },
    ],
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Text weight="semibold" size={500}>
            Fluent Charts Showcase
          </Text>
        }
        description={
          <Text>
            Comprehensive showcase of Fluent UI React Charts components and
            their capabilities
          </Text>
        }
      />
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarTitle}>
            <ChartMultiple24Regular />
            <Text weight="semibold">Chart Gallery</Text>
          </div>
          <Nav selectedValue={selectedValue}>
            <NavItem
              value="home"
              icon={<Home24Regular />}
              onClick={() => handleNavItemSelect("home")}
            >
              Home
            </NavItem>
            <NavItem
              value="charts"
              icon={<DataTrending24Regular />}
              onClick={() => handleNavItemSelect("charts")}
            >
              Charts
            </NavItem>
            <NavItem
              value="analytics"
              icon={<Eye24Regular />}
              onClick={() => handleNavItemSelect("analytics")}
            >
              Analytics
            </NavItem>
            <NavItem
              value="reports"
              icon={<Calendar24Regular />}
              onClick={() => handleNavItemSelect("reports")}
            >
              Reports
            </NavItem>
          </Nav>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <Text size={600} weight="semibold">
                Fluent Charts Dashboard
              </Text>
              <Text>
                {" "}
                /{" "}
                {selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}
              </Text>
            </div>
            <div className={styles.headerActions}>
              <Text>Aug 14, 2025</Text>
              <Button appearance="primary">Export Data</Button>
            </div>
          </div>

          {/* Main Charts Grid */}
          <div className={styles.chartGrid}>
            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Line Chart</Text>
                    <Text>Multi-series revenue tracking over time</Text>
                  </div>
                }
              />
              <CardPreview>
                <LineChart
                  data={lineChartData}
                  height={300}
                  width={500}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Area Chart</Text>
                    <Text>Traffic sources with filled area visualization</Text>
                  </div>
                }
              />
              <CardPreview>
                <AreaChart
                  data={areaChartData}
                  height={300}
                  width={500}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Vertical Bar Chart</Text>
                    <Text>Monthly sales performance comparison</Text>
                  </div>
                }
              />
              <CardPreview>
                <VerticalBarChart
                  data={verticalBarData}
                  height={300}
                  width={500}
                  barWidth={60}
                  yAxisTickCount={6}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Multi-Bar Chart</Text>
                    <Text>Product performance ranking</Text>
                  </div>
                }
              />
              <CardPreview>
                <VerticalBarChart
                  data={multiBarData}
                  height={300}
                  width={500}
                  barWidth={40}
                  yAxisTickCount={6}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>
          </div>

          {/* Smaller Charts Grid */}
          <div className={styles.smallChartsGrid}>
            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Donut Chart</Text>
                    <div className={styles.metricValue}>
                      100%
                      <div
                        className={`${styles.metricChange} ${styles.metricChangePositive}`}
                      >
                        <ChevronUp24Regular />
                        <Text>+2%</Text>
                      </div>
                    </div>
                    <Text>Device usage distribution</Text>
                  </div>
                }
              />
              <CardPreview>
                <DonutChart
                  data={donutData}
                  innerRadius={55}
                  valueInsideDonut={100}
                  height={250}
                  width={350}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Performance Metrics</Text>
                    <div className={styles.metricValue}>
                      78/100
                      <div
                        className={`${styles.metricChange} ${styles.metricChangePositive}`}
                      >
                        <ChevronUp24Regular />
                        <Text>+5 pts</Text>
                      </div>
                    </div>
                    <Text>Overall performance score visualization</Text>
                  </div>
                }
              />
              <CardPreview>
                <DonutChart
                  data={performanceData}
                  innerRadius={55}
                  valueInsideDonut={78}
                  height={250}
                  width={350}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Product Categories</Text>
                    <div className={styles.metricValue}>
                      <DataScatter24Regular />5 Categories
                    </div>
                    <Text>Revenue distribution by category</Text>
                  </div>
                }
              />
              <CardPreview>
                <VerticalBarChart
                  data={categoryData}
                  height={250}
                  width={350}
                  barWidth={40}
                  yAxisTickCount={5}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>
          </div>

          {/* Mini Charts Grid */}
          <Text
            weight="semibold"
            size={400}
            style={{ marginBottom: tokens.spacingVerticalM }}
          >
            Key Metrics Trends
          </Text>
          <div className={styles.sparklineGrid}>
            <Card className={styles.sparklineCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Daily Users</Text>
                    <div
                      className={styles.metricValue}
                      style={{ fontSize: "18px" }}
                    >
                      171
                      <div
                        className={`${styles.metricChange} ${styles.metricChangePositive}`}
                      >
                        <ChevronUp24Regular />
                        <Text>+42%</Text>
                      </div>
                    </div>
                  </div>
                }
              />
              <CardPreview>
                <AreaChart
                  data={sparklineData1}
                  height={80}
                  width={180}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>

            <Card className={styles.sparklineCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Conversion Rate</Text>
                    <div
                      className={styles.metricValue}
                      style={{ fontSize: "18px" }}
                    >
                      3.8%
                      <div
                        className={`${styles.metricChange} ${styles.metricChangePositive}`}
                      >
                        <ChevronUp24Regular />
                        <Text>+58%</Text>
                      </div>
                    </div>
                  </div>
                }
              />
              <CardPreview>
                <AreaChart
                  data={sparklineData2}
                  height={80}
                  width={180}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>

            <Card className={styles.sparklineCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Page Load Time</Text>
                    <div
                      className={styles.metricValue}
                      style={{ fontSize: "18px" }}
                    >
                      0.8s
                      <div
                        className={`${styles.metricChange} ${styles.metricChangeNegative}`}
                      >
                        <ChevronDown24Regular />
                        <Text>-56%</Text>
                      </div>
                    </div>
                  </div>
                }
              />
              <CardPreview>
                <AreaChart
                  data={sparklineData3}
                  height={80}
                  width={180}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FluentChartsDashboard;
