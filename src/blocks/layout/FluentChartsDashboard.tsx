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
  Home24Regular,
} from "@fluentui/react-icons";
import {
  AreaChart,
  VerticalBarChart,
  LineChart,
  DonutChart,
  FunnelChart,
  GanttChart,
  GaugeChart,
  HeatMapChart,
  ScatterChart,
  ChartProps,
  VerticalBarChartDataPoint,
  GanttChartDataPoint,
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

  // Pie Chart Data
  const pieChartData: ChartProps = {
    chartTitle: "Browser Distribution",
    chartData: [
      {
        legend: "Chrome",
        data: 65,
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: "Safari",
        data: 20,
        color: getColorFromToken(DataVizPalette.color2),
      },
      {
        legend: "Firefox",
        data: 10,
        color: getColorFromToken(DataVizPalette.color3),
      },
      {
        legend: "Edge",
        data: 5,
        color: getColorFromToken(DataVizPalette.color4),
      },
    ],
  };

  // Funnel Chart Data
  const funnelChartData = [
    {
      stage: "Website Visitors",
      value: 10000,
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      stage: "Product Views",
      value: 7500,
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      stage: "Add to Cart",
      value: 3200,
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      stage: "Checkout Started",
      value: 1800,
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      stage: "Payment Complete",
      value: 1250,
      color: getColorFromToken(DataVizPalette.color5),
    },
  ];

  // Gantt Chart Data
  const ganttChartData: GanttChartDataPoint[] = [
    {
      x: { start: new Date("2024-08-01"), end: new Date("2024-08-15") },
      y: "Project Planning",
      legend: "Complete",
      color: getColorFromToken(DataVizPalette.color1),
      gradient: [
        getColorFromToken(DataVizPalette.color1),
        getColorFromToken(DataVizPalette.color2),
      ],
    },
    {
      x: { start: new Date("2024-08-10"), end: new Date("2024-08-25") },
      y: "Design Phase",
      legend: "In Progress",
      color: getColorFromToken(DataVizPalette.color3),
      gradient: [
        getColorFromToken(DataVizPalette.color3),
        getColorFromToken(DataVizPalette.color4),
      ],
    },
    {
      x: { start: new Date("2024-08-20"), end: new Date("2024-09-10") },
      y: "Development",
      legend: "In Progress",
      color: getColorFromToken(DataVizPalette.color3),
      gradient: [
        getColorFromToken(DataVizPalette.color3),
        getColorFromToken(DataVizPalette.color4),
      ],
    },
    {
      x: { start: new Date("2024-09-05"), end: new Date("2024-09-20") },
      y: "Testing",
      legend: "Not Started",
      color: getColorFromToken(DataVizPalette.color5),
      gradient: [
        getColorFromToken(DataVizPalette.color5),
        getColorFromToken(DataVizPalette.color6),
      ],
    },
    {
      x: { start: new Date("2024-09-15"), end: new Date("2024-09-30") },
      y: "Deployment",
      legend: "Not Started",
      color: getColorFromToken(DataVizPalette.color5),
      gradient: [
        getColorFromToken(DataVizPalette.color5),
        getColorFromToken(DataVizPalette.color6),
      ],
    },
    {
      x: { start: new Date("2024-09-25"), end: new Date("2024-10-05") },
      y: "Documentation",
      legend: "Not Started",
      color: getColorFromToken(DataVizPalette.color5),
      gradient: [
        getColorFromToken(DataVizPalette.color5),
        getColorFromToken(DataVizPalette.color6),
      ],
    },
  ];

  // Gauge Chart Data
  const performanceSegments = [
    {
      legend: "Poor",
      size: 25,
      color: getColorFromToken(DataVizPalette.color5),
    },
    {
      legend: "Fair",
      size: 25,
      color: getColorFromToken(DataVizPalette.color4),
    },
    {
      legend: "Good",
      size: 25,
      color: getColorFromToken(DataVizPalette.color3),
    },
    {
      legend: "Excellent",
      size: 25,
      color: getColorFromToken(DataVizPalette.color1),
    },
  ];

  // HeatMap Chart Data
  const heatMapData = [
    {
      legend: "Product A",
      value: 150,
      data: [
        { x: "Jan", y: "High", value: 120 },
        { x: "Feb", y: "High", value: 135 },
        { x: "Mar", y: "Medium", value: 150 },
        { x: "Apr", y: "Medium", value: 165 },
        { x: "May", y: "Low", value: 180 },
      ],
      color: getColorFromToken(DataVizPalette.color1),
    },
    {
      legend: "Product B",
      value: 110,
      data: [
        { x: "Jan", y: "High", value: 85 },
        { x: "Feb", y: "Medium", value: 92 },
        { x: "Mar", y: "Medium", value: 110 },
        { x: "Apr", y: "Low", value: 125 },
        { x: "May", y: "Low", value: 140 },
      ],
      color: getColorFromToken(DataVizPalette.color2),
    },
    {
      legend: "Product C",
      value: 180,
      data: [
        { x: "Jan", y: "High", value: 145 },
        { x: "Feb", y: "High", value: 158 },
        { x: "Mar", y: "Medium", value: 172 },
        { x: "Apr", y: "Medium", value: 190 },
        { x: "May", y: "Low", value: 205 },
      ],
      color: getColorFromToken(DataVizPalette.color3),
    },
  ];

  // Dedicated ScatterChart Data
  const scatterPlotData: ChartProps = {
    chartTitle: "Revenue vs Customer Satisfaction",
    lineChartData: [
      {
        legend: "Q1 Performance",
        data: [
          { x: 75, y: 45000, markerSize: 12 },
          { x: 82, y: 52000, markerSize: 15 },
          { x: 78, y: 48000, markerSize: 10 },
          { x: 85, y: 61000, markerSize: 18 },
          { x: 80, y: 55000, markerSize: 14 },
          { x: 88, y: 67000, markerSize: 20 },
        ],
        color: getColorFromToken(DataVizPalette.color1),
      },
      {
        legend: "Q2 Performance",
        data: [
          { x: 72, y: 38000, markerSize: 10 },
          { x: 79, y: 43000, markerSize: 13 },
          { x: 83, y: 51000, markerSize: 16 },
          { x: 86, y: 58000, markerSize: 19 },
          { x: 90, y: 62000, markerSize: 22 },
          { x: 92, y: 71000, markerSize: 25 },
        ],
        color: getColorFromToken(DataVizPalette.color2),
      },
      {
        legend: "Milestone",
        data: [{ x: 95, y: 85000, markerSize: 35 }],
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
            Complete showcase of Fluent UI React Charts components featuring
            Line Charts, Area Charts, Bar Charts, Donut Charts, and advanced
            visualizations with interactive elements and real-time metrics
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
                    <Text weight="semibold">Donut Chart</Text>
                    <Text>Device usage distribution with center value</Text>
                  </div>
                }
              />
              <CardPreview>
                <DonutChart
                  data={donutData}
                  innerRadius={55}
                  valueInsideDonut={100}
                  height={300}
                  width={500}
                />
              </CardPreview>
            </Card>
          </div>

          {/* Extended Chart Collection */}
          <Text
            weight="semibold"
            size={500}
            style={{
              marginBottom: tokens.spacingVerticalM,
              marginTop: tokens.spacingVerticalL,
            }}
          >
            Extended Chart Collection
          </Text>
          <div className={styles.chartGrid}>
            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Pie Chart</Text>
                    <Text>
                      Browser market share distribution (innerRadius=0)
                    </Text>
                  </div>
                }
              />
              <CardPreview>
                <DonutChart
                  data={pieChartData}
                  height={300}
                  width={500}
                  innerRadius={0}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Funnel Chart</Text>
                    <Text>Sales conversion funnel analysis</Text>
                  </div>
                }
              />
              <CardPreview>
                <FunnelChart
                  data={funnelChartData}
                  chartTitle="E-commerce Conversion Funnel"
                  height={280}
                  width={350}
                  orientation="horizontal"
                  hideLegend={false}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Gauge Chart</Text>
                    <div className={styles.metricValue}>
                      85/100
                      <div
                        className={`${styles.metricChange} ${styles.metricChangePositive}`}
                      >
                        <ChevronUp24Regular />
                        <Text>+5 pts</Text>
                      </div>
                    </div>
                    <Text>Overall system performance rating</Text>
                  </div>
                }
              />
              <CardPreview>
                <GaugeChart
                  width={500}
                  height={300}
                  chartValue={85}
                  segments={performanceSegments}
                  minValue={0}
                  maxValue={100}
                  chartTitle="Performance Score"
                  sublabel="Current Status"
                  hideMinMax={false}
                  enableGradient={true}
                  roundCorners={true}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Heat Map Chart</Text>
                    <Text>Product performance over time</Text>
                  </div>
                }
              />
              <CardPreview>
                <HeatMapChart
                  data={heatMapData}
                  domainValuesForColorScale={[80, 150, 210]}
                  rangeValuesForColorScale={["#90EE90", "#FFD700", "#FF6347"]}
                  width={500}
                  height={300}
                  culture="en-US"
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Scatter Chart</Text>
                    <Text>
                      Customer satisfaction vs revenue with marker sizes
                    </Text>
                  </div>
                }
              />
              <CardPreview>
                <ScatterChart
                  data={scatterPlotData}
                  width={500}
                  height={300}
                  xAxisTitle="Customer Satisfaction Score"
                  yAxisTitle="Revenue ($)"
                  culture="en-US"
                />
              </CardPreview>
            </Card>
          </div>

          {/* Project Management Chart */}
          <Text
            weight="semibold"
            size={500}
            style={{
              marginBottom: tokens.spacingVerticalM,
              marginTop: tokens.spacingVerticalL,
            }}
          >
            Project Management
          </Text>
          <div className={styles.chartGrid}>
            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Gantt Chart</Text>
                    <Text>Project timeline and task scheduling</Text>
                  </div>
                }
              />
              <CardPreview>
                <GanttChart
                  data={ganttChartData}
                  width={500}
                  height={300}
                  enableGradient={true}
                  roundCorners={true}
                  yAxisPadding={0.5}
                  showYAxisLablesTooltip={true}
                  margins={{ top: 20, bottom: 35, left: 120, right: 20 }}
                  xAxisTickCount={6}
                  yAxisTickCount={6}
                  xAxisTitle="Timeline"
                  yAxisTitle="Project Tasks"
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
