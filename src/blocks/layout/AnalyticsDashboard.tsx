import * as React from "react";
import {
  Card,
  CardHeader,
  CardPreview,
  makeStyles,
  tokens,
  Text,
  Button,
  Badge,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridBody,
  DataGridRow,
  DataGridCell,
  TableColumnDefinition,
  createTableColumn,
  NavItem,
  Nav,
} from "@fluentui/react-components";
import {
  DataTrending24Regular,
  People24Regular,
  Eye24Regular,
  Calendar24Regular,
  Globe24Regular,
  ChevronUp24Regular,
  ChevronDown24Regular,
  Home24Regular,
} from "@fluentui/react-icons";
import {
  AreaChart,
  VerticalBarChart,
  ChartProps,
  VerticalBarChartDataPoint,
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
  metricsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: tokens.spacingHorizontalL,
    marginBottom: tokens.spacingVerticalL,
  },
  metricCard: {
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow8,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "box-shadow 0.2s ease, transform 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow16,
      transform: "translateY(-2px)",
    },
  },
  metricValue: {
    fontSize: "32px",
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
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
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
  chartPlaceholder: {
    height: "300px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
  },
  barChartPlaceholder: {
    height: "200px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `2px dashed ${tokens.colorNeutralStroke2}`,
  },
  detailsSection: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: tokens.spacingHorizontalL,
  },
  tableCard: {
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow8,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow16,
    },
  },
  rightPanel: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  insightsCard: {
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow8,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow16,
    },
  },
  countryCard: {
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow8,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    transition: "box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: tokens.shadow16,
    },
  },
  countryList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  countryItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: tokens.spacingVerticalXS,
  },
  countryName: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
  },
  countryFlag: {
    width: "20px",
    height: "15px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
  },
  progressBar: {
    width: "60px",
    height: "4px",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusSmall,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: tokens.colorBrandBackground,
    transition: "width 0.3s ease",
  },
});

interface TableItem {
  pageTitle: string;
  status: string;
  users: number;
  eventCount: number;
  viewsPerUser: number;
  averageTime: string;
  dailyConversions: number;
  productTree: string;
}

const tableData: TableItem[] = [
  {
    pageTitle: "Homepage Overview",
    status: "Online",
    users: 23423,
    eventCount: 8345,
    viewsPerUser: 18.3,
    averageTime: "2m 14s",
    dailyConversions: 4.2,
    productTree: "Website",
  },
  {
    pageTitle: "Product Details - Gadgets",
    status: "Online",
    users: 17240,
    eventCount: 5953,
    viewsPerUser: 8.7,
    averageTime: "2m 30s",
    dailyConversions: 3.8,
    productTree: "Home",
  },
  {
    pageTitle: "Checkout Process - Step 1",
    status: "Offline",
    users: 58246,
    eventCount: 3456,
    viewsPerUser: 15.2,
    averageTime: "2m 55s",
    dailyConversions: 2.9,
    productTree: "Pricing",
  },
  {
    pageTitle: "User Profile Dashboard",
    status: "Online",
    users: 86246,
    eventCount: 12434,
    viewsPerUser: 7.4,
    averageTime: "2m 40s",
    dailyConversions: 3.1,
    productTree: "About us",
  },
  {
    pageTitle: "Article Listing - Tech News",
    status: "Online",
    users: 14246,
    eventCount: 3553,
    viewsPerUser: 3.1,
    averageTime: "2m 55s",
    dailyConversions: 2.7,
    productTree: "Blog",
  },
];

const columns: TableColumnDefinition<TableItem>[] = [
  createTableColumn<TableItem>({
    columnId: "pageTitle",
    compare: (a, b) => a.pageTitle.localeCompare(b.pageTitle),
    renderHeaderCell: () => "Page Title",
    renderCell: (item) => item.pageTitle,
  }),
  createTableColumn<TableItem>({
    columnId: "status",
    compare: (a, b) => a.status.localeCompare(b.status),
    renderHeaderCell: () => "Status",
    renderCell: (item) => (
      <Badge
        appearance={item.status === "Online" ? "filled" : "outline"}
        color={item.status === "Online" ? "success" : "danger"}
      >
        {item.status}
      </Badge>
    ),
  }),
  createTableColumn<TableItem>({
    columnId: "users",
    compare: (a, b) => a.users - b.users,
    renderHeaderCell: () => "Users",
    renderCell: (item) => item.users.toLocaleString(),
  }),
  createTableColumn<TableItem>({
    columnId: "eventCount",
    compare: (a, b) => a.eventCount - b.eventCount,
    renderHeaderCell: () => "Event Count",
    renderCell: (item) => item.eventCount.toLocaleString(),
  }),
  createTableColumn<TableItem>({
    columnId: "viewsPerUser",
    compare: (a, b) => a.viewsPerUser - b.viewsPerUser,
    renderHeaderCell: () => "Views per User",
    renderCell: (item) => item.viewsPerUser.toString(),
  }),
  createTableColumn<TableItem>({
    columnId: "averageTime",
    compare: (a, b) => a.averageTime.localeCompare(b.averageTime),
    renderHeaderCell: () => "Average Time",
    renderCell: (item) => item.averageTime,
  }),
  createTableColumn<TableItem>({
    columnId: "dailyConversions",
    compare: (a, b) => a.dailyConversions - b.dailyConversions,
    renderHeaderCell: () => "Daily Conversions",
    renderCell: (item) => `${item.dailyConversions}%`,
  }),
  createTableColumn<TableItem>({
    columnId: "productTree",
    compare: (a, b) => a.productTree.localeCompare(b.productTree),
    renderHeaderCell: () => "Product tree",
    renderCell: (item) => item.productTree,
  }),
];

// Chart data for Sessions Area Chart
const sessionsData: ChartProps = {
  chartTitle: "Sessions Over Time",
  lineChartData: [
    {
      legend: "Sessions",
      data: [
        { x: new Date("2023-03-01"), y: 8500 },
        { x: new Date("2023-03-05"), y: 9200 },
        { x: new Date("2023-03-10"), y: 10800 },
        { x: new Date("2023-03-15"), y: 11500 },
        { x: new Date("2023-03-20"), y: 13277 },
        { x: new Date("2023-03-25"), y: 12800 },
        { x: new Date("2023-03-30"), y: 14200 },
        { x: new Date("2023-04-01"), y: 13900 },
        { x: new Date("2023-04-05"), y: 15100 },
        { x: new Date("2023-04-10"), y: 14800 },
        { x: new Date("2023-04-15"), y: 16200 },
        { x: new Date("2023-04-17"), y: 13277 },
      ],
      color: tokens.colorBrandBackground,
    },
  ],
};

// Chart data for Page Views Bar Chart
const pageViewsData: VerticalBarChartDataPoint[] = [
  {
    x: "Oct",
    y: 980000,
    legend: "October",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Nov",
    y: 1100000,
    legend: "November",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Dec",
    y: 1250000,
    legend: "December",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Jan",
    y: 1150000,
    legend: "January",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Feb",
    y: 1300000,
    legend: "February",
    color: tokens.colorPaletteBlueForeground2,
  },
  {
    x: "Mar",
    y: 1280000,
    legend: "March",
    color: tokens.colorPaletteBlueForeground2,
  },
];

const AnalyticsDashboard: React.FC = () => {
  const styles = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("home");

  const handleNavItemSelect = (value: string) => {
    setSelectedValue(value);
  };

  const countryData = [
    { name: "India", percentage: 59, flag: "🇮🇳" },
    { name: "USA", percentage: 22, flag: "🇺🇸" },
    { name: "Brazil", percentage: 15, flag: "🇧🇷" },
  ];

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Text weight="semibold" size={500}>
            Analytics Dashboard
          </Text>
        }
        description={
          <Text>
            Complete analytics dashboard with metrics, charts, and data tables
          </Text>
        }
      />
      <div className={styles.dashboard}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarTitle}>
            <Globe24Regular />
            <Text weight="semibold">Streamlit-web</Text>
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
              value="analytics"
              icon={<DataTrending24Regular />}
              onClick={() => handleNavItemSelect("analytics")}
            >
              Analytics
            </NavItem>
            <NavItem
              value="clients"
              icon={<People24Regular />}
              onClick={() => handleNavItemSelect("clients")}
            >
              Clients
            </NavItem>
            <NavItem
              value="tasks"
              icon={<Calendar24Regular />}
              onClick={() => handleNavItemSelect("tasks")}
            >
              Tasks
            </NavItem>
          </Nav>
        </div>

        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <Text size={600} weight="semibold">
                Dashboard
              </Text>
              <Text>
                {" "}
                /{" "}
                {selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}
              </Text>
            </div>
            <div className={styles.headerActions}>
              <Text>Apr 17, 2023</Text>
              <Button appearance="primary">Get insights</Button>
            </div>
          </div>

          <div className={styles.metricsGrid}>
            <Card className={styles.metricCard}>
              <div className={styles.metricValue}>
                <People24Regular />
                14k
              </div>
              <Text>Users</Text>
              <div
                className={`${styles.metricChange} ${styles.metricChangePositive}`}
              >
                <ChevronUp24Regular />
                <Text>+5%</Text>
                <Text>Last 30 days</Text>
              </div>
            </Card>

            <Card className={styles.metricCard}>
              <div className={styles.metricValue}>
                <Eye24Regular />
                325
              </div>
              <Text>Conversions</Text>
              <div
                className={`${styles.metricChange} ${styles.metricChangeNegative}`}
              >
                <ChevronDown24Regular />
                <Text>-3%</Text>
                <Text>Last 30 days</Text>
              </div>
            </Card>

            <Card className={styles.metricCard}>
              <div className={styles.metricValue}>
                <DataTrending24Regular />
                200k
              </div>
              <Text>Event count</Text>
              <div
                className={`${styles.metricChange} ${styles.metricChangePositive}`}
              >
                <ChevronUp24Regular />
                <Text>+3%</Text>
                <Text>Last 30 days</Text>
              </div>
            </Card>

            <Card className={styles.metricCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Explore your data</Text>
                    <Text>
                      Uncover performance and visitor insights with our data
                    </Text>
                  </div>
                }
              />
              <Button appearance="primary">Get insights</Button>
            </Card>
          </div>

          <div className={styles.chartGrid}>
            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Sessions</Text>
                    <div className={styles.metricValue}>
                      13,277
                      <div
                        className={`${styles.metricChange} ${styles.metricChangePositive}`}
                      >
                        <ChevronUp24Regular />
                        <Text>+4%</Text>
                      </div>
                    </div>
                    <Text>Sessions over time for the last 30 days</Text>
                  </div>
                }
              />
              <CardPreview>
                <AreaChart
                  data={sessionsData}
                  height={300}
                  width={600}
                  enableReflow={true}
                />
              </CardPreview>
            </Card>

            <Card className={styles.chartCard}>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Page views and downloads</Text>
                    <div className={styles.metricValue}>
                      1.3M
                      <div
                        className={`${styles.metricChange} ${styles.metricChangeNegative}`}
                      >
                        <ChevronDown24Regular />
                        <Text>-6%</Text>
                      </div>
                    </div>
                    <Text>Page views and downloads for the last 6 months</Text>
                  </div>
                }
              />
              <CardPreview>
                <VerticalBarChart
                  data={pageViewsData}
                  height={200}
                  width={400}
                  barWidth={40}
                  yAxisTickCount={5}
                  enableReflow={true}
                  chartTitle="Page Views by Month"
                  legendProps={{
                    allowFocusOnLegends: true,
                  }}
                />
              </CardPreview>
            </Card>
          </div>

          <div className={styles.detailsSection}>
            <Card className={styles.tableCard}>
              <CardHeader header={<Text weight="semibold">Details</Text>} />
              <DataGrid
                items={tableData}
                columns={columns}
                sortable
                getRowId={(item) => item.pageTitle}
              >
                <DataGridHeader>
                  <DataGridRow>
                    {({ renderHeaderCell }) => (
                      <DataGridHeaderCell>
                        {renderHeaderCell()}
                      </DataGridHeaderCell>
                    )}
                  </DataGridRow>
                </DataGridHeader>
                <DataGridBody<TableItem>>
                  {({ item, rowId }) => (
                    <DataGridRow<TableItem> key={rowId}>
                      {({ renderCell }) => (
                        <DataGridCell>{renderCell(item)}</DataGridCell>
                      )}
                    </DataGridRow>
                  )}
                </DataGridBody>
              </DataGrid>
            </Card>

            <div className={styles.rightPanel}>
              <Card className={styles.countryCard}>
                <CardHeader
                  header={<Text weight="semibold">Users by country</Text>}
                />
                <div className={styles.countryList}>
                  {countryData.map((country) => (
                    <div key={country.name} className={styles.countryItem}>
                      <div className={styles.countryName}>
                        <span className={styles.countryFlag}>
                          {country.flag}
                        </span>
                        <Text>{country.name}</Text>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div className={styles.progressBar}>
                          <div
                            className={styles.progressFill}
                            style={{ width: `${country.percentage}%` }}
                          />
                        </div>
                        <Text>{country.percentage}%</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AnalyticsDashboard;
