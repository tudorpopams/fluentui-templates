import * as React from "react";
import {
  Text,
  Button,
  Badge,
  Card,
  CardHeader,
  CardPreview,
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
  tokens,
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
      color: "#0078d4",
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

const TailwindAnalyticsDashboard: React.FC = () => {
  const [selectedValue, setSelectedValue] = React.useState("home");

  const handleNavItemSelect = (value: string) => {
    setSelectedValue(value);
  };

  const countryData = [
    { name: "India", percentage: 59, flag: "🇮🇳" },
    { name: "USA", percentage: 22, flag: "🇺🇸" },
    { name: "Brazil", percentage: 15, flag: "🇧🇷" },
  ];

  // Define all Fluent UI design tokens as CSS variables
  const designTokens = {
    // Spacing
    "--spacing-vertical-xs": tokens.spacingVerticalXS,
    "--spacing-vertical-s": tokens.spacingVerticalS,
    "--spacing-vertical-m": tokens.spacingVerticalM,
    "--spacing-vertical-l": tokens.spacingVerticalL,
    "--spacing-horizontal-xs": tokens.spacingHorizontalXS,
    "--spacing-horizontal-s": tokens.spacingHorizontalS,
    "--spacing-horizontal-m": tokens.spacingHorizontalM,
    "--spacing-horizontal-l": tokens.spacingHorizontalL,

    // Colors - Background
    "--color-neutral-background1": tokens.colorNeutralBackground1,
    "--color-neutral-background2": tokens.colorNeutralBackground2,
    "--color-neutral-background3": tokens.colorNeutralBackground3,
    "--color-neutral-background4": tokens.colorNeutralBackground4,
    "--color-neutral-background5": tokens.colorNeutralBackground5,
    "--color-neutral-background6": tokens.colorNeutralBackground6,

    // Colors - Foreground
    "--color-neutral-foreground1": tokens.colorNeutralForeground1,
    "--color-neutral-foreground2": tokens.colorNeutralForeground2,
    "--color-neutral-foreground3": tokens.colorNeutralForeground3,
    "--color-neutral-foreground4": tokens.colorNeutralForeground4,

    // Colors - Stroke
    "--color-neutral-stroke1": tokens.colorNeutralStroke1,
    "--color-neutral-stroke2": tokens.colorNeutralStroke2,
    "--color-neutral-stroke3": tokens.colorNeutralStroke3,

    // Colors - Brand
    "--color-brand-background": tokens.colorBrandBackground,
    "--color-brand-background2": tokens.colorBrandBackground2,
    "--color-brand-foreground1": tokens.colorBrandForeground1,
    "--color-brand-foreground2": tokens.colorBrandForeground2,

    // Colors - Palette
    "--color-palette-green-foreground1": tokens.colorPaletteGreenForeground1,
    "--color-palette-green-background2": tokens.colorPaletteGreenBackground2,
    "--color-palette-red-foreground1": tokens.colorPaletteRedForeground1,
    "--color-palette-red-background2": tokens.colorPaletteRedBackground2,
    "--color-palette-blue-foreground2": tokens.colorPaletteBlueForeground2,
    "--color-palette-blue-background2": tokens.colorPaletteBlueBackground2,
    "--color-palette-yellow-background2": tokens.colorPaletteYellowBackground2,

    // Shadows
    "--shadow8": tokens.shadow8,
    "--shadow16": tokens.shadow16,

    // Border radius
    "--border-radius-small": tokens.borderRadiusSmall,
    "--border-radius-medium": tokens.borderRadiusMedium,

    // Typography
    "--font-weight-semibold": tokens.fontWeightSemibold,
    "--font-size-base200": tokens.fontSizeBase200,
  } as React.CSSProperties;

  return (
    <Card
      style={designTokens}
      className="w-full m-0 h-fit p-[var(--spacing-vertical-m)] shadow-[var(--shadow16)] border border-[var(--color-neutral-stroke2)]"
    >
      <CardHeader
        header={
          <Text weight="semibold" size={500}>
            Analytics Dashboard (Tailwind)
          </Text>
        }
        description={
          <Text>
            Complete analytics dashboard with metrics, charts, and data tables
          </Text>
        }
      />
      <div className="grid grid-cols-[250px_1fr] min-h-[800px] bg-[var(--color-neutral-background1)] rounded-[var(--border-radius-medium)] overflow-hidden">
        {/* Sidebar */}
        <div className="flex flex-col bg-[var(--color-neutral-background2)] border-r border-[var(--color-neutral-stroke2)]">
          <div className="flex items-center gap-[var(--spacing-horizontal-s)] p-[var(--spacing-horizontal-m)] pt-[var(--spacing-vertical-m)] pb-[var(--spacing-vertical-m)] border-b border-[var(--color-neutral-stroke2)]">
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

        {/* Main Content */}
        <div className="p-[var(--spacing-vertical-l)] overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-[var(--spacing-vertical-l)]">
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
            <div className="flex gap-[var(--spacing-horizontal-s)] items-center">
              <Text>Apr 17, 2023</Text>
              <Button appearance="primary">Get insights</Button>
            </div>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[var(--spacing-horizontal-l)] mb-[var(--spacing-vertical-l)]">
            <Card className="p-[var(--spacing-vertical-m)] shadow-[var(--shadow8)] border border-[var(--color-neutral-stroke2)] bg-[var(--color-neutral-background1)] transition-all duration-200 hover:shadow-[var(--shadow16)] hover:-translate-y-0.5">
              <div className="text-[32px] font-[var(--font-weight-semibold)] flex items-center gap-[var(--spacing-horizontal-s)] mb-[var(--spacing-vertical-xs)]">
                <People24Regular />
                14k
              </div>
              <Text>Users</Text>
              <div className="flex items-center gap-[var(--spacing-horizontal-xs)] text-[var(--color-palette-green-foreground1)]">
                <ChevronUp24Regular />
                <Text>+5%</Text>
                <Text>Last 30 days</Text>
              </div>
            </Card>

            <Card className="p-[var(--spacing-vertical-m)] shadow-[var(--shadow8)] border border-[var(--color-neutral-stroke2)] bg-[var(--color-neutral-background1)] transition-all duration-200 hover:shadow-[var(--shadow16)] hover:-translate-y-0.5">
              <div className="text-[32px] font-[var(--font-weight-semibold)] flex items-center gap-[var(--spacing-horizontal-s)] mb-[var(--spacing-vertical-xs)]">
                <Eye24Regular />
                325
              </div>
              <Text>Conversions</Text>
              <div className="flex items-center gap-[var(--spacing-horizontal-xs)] text-[var(--color-palette-red-foreground1)]">
                <ChevronDown24Regular />
                <Text>-3%</Text>
                <Text>Last 30 days</Text>
              </div>
            </Card>

            <Card className="p-[var(--spacing-vertical-m)] shadow-[var(--shadow8)] border border-[var(--color-neutral-stroke2)] bg-[var(--color-neutral-background1)] transition-all duration-200 hover:shadow-[var(--shadow16)] hover:-translate-y-0.5">
              <div className="text-[32px] font-[var(--font-weight-semibold)] flex items-center gap-[var(--spacing-horizontal-s)] mb-[var(--spacing-vertical-xs)]">
                <DataTrending24Regular />
                200k
              </div>
              <Text>Event count</Text>
              <div className="flex items-center gap-[var(--spacing-horizontal-xs)] text-[var(--color-palette-green-foreground1)]">
                <ChevronUp24Regular />
                <Text>+3%</Text>
                <Text>Last 30 days</Text>
              </div>
            </Card>

            <Card className="p-[var(--spacing-vertical-m)] shadow-[var(--shadow8)] border border-[var(--color-neutral-stroke2)] bg-[var(--color-neutral-background1)] transition-all duration-200 hover:shadow-[var(--shadow16)] hover:-translate-y-0.5">
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Explore your data</Text>
                    <Text className="text-[var(--color-neutral-foreground2)]">
                      Uncover performance and visitor insights with our data
                    </Text>
                  </div>
                }
              />
              <Button appearance="primary">Get insights</Button>
            </Card>
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-[var(--spacing-horizontal-l)] mb-[var(--spacing-vertical-l)]">
            <Card className="p-[var(--spacing-vertical-m)] shadow-[var(--shadow8)] border border-[var(--color-neutral-stroke2)] bg-[var(--color-neutral-background1)] transition-shadow duration-200 hover:shadow-[var(--shadow16)]">
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Sessions</Text>
                    <div className="text-[32px] font-[var(--font-weight-semibold)] flex items-center gap-[var(--spacing-horizontal-s)] mb-[var(--spacing-vertical-xs)]">
                      13,277
                      <div className="flex items-center gap-[var(--spacing-horizontal-xs)] text-[var(--color-palette-green-foreground1)]">
                        <ChevronUp24Regular />
                        <Text>+4%</Text>
                      </div>
                    </div>
                    <Text className="text-[var(--color-neutral-foreground2)]">
                      Sessions over time for the last 30 days
                    </Text>
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

            <Card className="p-[var(--spacing-vertical-m)] shadow-[var(--shadow8)] border border-[var(--color-neutral-stroke2)] bg-[var(--color-neutral-background1)] transition-shadow duration-200 hover:shadow-[var(--shadow16)]">
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Page views and downloads</Text>
                    <div className="text-[32px] font-[var(--font-weight-semibold)] flex items-center gap-[var(--spacing-horizontal-s)] mb-[var(--spacing-vertical-xs)]">
                      1.3M
                      <div className="flex items-center gap-[var(--spacing-horizontal-xs)] text-[var(--color-palette-red-foreground1)]">
                        <ChevronDown24Regular />
                        <Text>-6%</Text>
                      </div>
                    </div>
                    <Text className="text-[var(--color-neutral-foreground2)]">
                      Page views and downloads for the last 6 months
                    </Text>
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

          <div className="grid grid-cols-[2fr_1fr] gap-[var(--spacing-horizontal-l)]">
            <Card className="p-[var(--spacing-vertical-m)] shadow-[var(--shadow8)] border border-[var(--color-neutral-stroke2)] bg-[var(--color-neutral-background1)] transition-shadow duration-200 hover:shadow-[var(--shadow16)]">
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

            <div className="flex flex-col gap-[var(--spacing-vertical-m)]">
              <Card className="p-[var(--spacing-vertical-m)] shadow-[var(--shadow8)] border border-[var(--color-neutral-stroke2)] bg-[var(--color-neutral-background1)] transition-shadow duration-200 hover:shadow-[var(--shadow16)]">
                <CardHeader
                  header={<Text weight="semibold">Users by country</Text>}
                />
                <div className="flex flex-col gap-[var(--spacing-vertical-s)]">
                  {countryData.map((country) => (
                    <div
                      key={country.name}
                      className="flex justify-between items-center p-[var(--spacing-vertical-xs)]"
                    >
                      <div className="flex items-center gap-[var(--spacing-horizontal-s)]">
                        <span className="w-5 h-4 bg-[var(--color-neutral-background3)] rounded-[var(--border-radius-small)]">
                          {country.flag}
                        </span>
                        <Text>{country.name}</Text>
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <div className="w-[60px] h-1 bg-[var(--color-neutral-background3)] rounded-[var(--border-radius-small)] overflow-hidden">
                          <div
                            className="h-full bg-[var(--color-brand-background)] transition-[width] duration-300"
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

export default TailwindAnalyticsDashboard;
