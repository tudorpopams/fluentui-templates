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
    color: "#0078d4",
  },
  {
    x: "Nov",
    y: 1100000,
    legend: "November",
    color: "#0078d4",
  },
  {
    x: "Dec",
    y: 1250000,
    legend: "December",
    color: "#0078d4",
  },
  {
    x: "Jan",
    y: 1150000,
    legend: "January",
    color: "#0078d4",
  },
  {
    x: "Feb",
    y: 1300000,
    legend: "February",
    color: "#0078d4",
  },
  {
    x: "Mar",
    y: 1280000,
    legend: "March",
    color: "#0078d4",
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

  return (
    <Card className="w-full m-0 h-fit p-6">
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
      <div className="grid grid-cols-[250px_1fr] gap-0 min-h-[800px]">
        {/* Sidebar */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 p-4">
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
        <div className="p-6 overflow-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
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
            <div className="flex items-center gap-4">
              <Text>Apr 17, 2023</Text>
              <Button appearance="primary">Get insights</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-center mb-2">
                <People24Regular />
                <Text size={600} weight="semibold">
                  14k
                </Text>
              </div>
              <Text>Users</Text>
              <div className="flex items-center mt-2">
                <ChevronUp24Regular color="green" />
                <Text size={200} style={{ color: "green" }}>
                  +5%
                </Text>
                <Text size={200}>Last 30 days</Text>
              </div>
            </Card>

            <Card>
              <div className="flex items-center mb-2">
                <Eye24Regular />
                <Text size={600} weight="semibold">
                  325
                </Text>
              </div>
              <Text>Conversions</Text>
              <div className="flex items-center mt-2">
                <ChevronDown24Regular color="red" />
                <Text size={200} style={{ color: "red" }}>
                  -3%
                </Text>
                <Text size={200}>Last 30 days</Text>
              </div>
            </Card>

            <Card>
              <div className="flex items-center mb-2">
                <DataTrending24Regular />
                <Text size={600} weight="semibold">
                  200k
                </Text>
              </div>
              <Text>Event count</Text>
              <div className="flex items-center mt-2">
                <ChevronUp24Regular color="green" />
                <Text size={200} style={{ color: "green" }}>
                  +3%
                </Text>
                <Text size={200}>Last 30 days</Text>
              </div>
            </Card>

            <Card>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Sessions</Text>
                    <div className="flex items-center my-2">
                      <Text size={600} weight="semibold">
                        13,277
                      </Text>
                      <div className="flex items-center ml-4">
                        <ChevronUp24Regular color="green" />
                        <Text size={200} style={{ color: "green" }}>
                          +4%
                        </Text>
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

            <Card>
              <CardHeader
                header={
                  <div>
                    <Text weight="semibold">Page views and downloads</Text>
                    <div className="flex items-center my-2">
                      <Text size={600} weight="semibold">
                        1.3M
                      </Text>
                      <div className="flex items-center ml-4">
                        <ChevronDown24Regular color="red" />
                        <Text size={200} style={{ color: "red" }}>
                          -6%
                        </Text>
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
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

            <Card>
              <CardHeader
                header={<Text weight="semibold">Users by country</Text>}
              />
              <div className="space-y-4">
                {countryData.map((country) => (
                  <div
                    key={country.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span>{country.flag}</span>
                      <Text>{country.name}</Text>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        style={{
                          width: "80px",
                          height: "8px",
                          backgroundColor: "var(--colorNeutralBackground3)",
                          borderRadius: "4px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            height: "100%",
                            backgroundColor: "var(--colorBrandBackground)",
                            borderRadius: "4px",
                            width: `${country.percentage}%`,
                          }}
                        />
                      </div>
                      <Text size={200}>{country.percentage}%</Text>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TailwindAnalyticsDashboard;
