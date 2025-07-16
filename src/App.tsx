import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStyles,
  tokens,
  Button,
  TabList,
  Tab,
  SelectTabData,
  SelectTabEvent,
} from "@fluentui/react-components";
import {
  WeatherMoon24Regular,
  WeatherSunny24Regular,
} from "@fluentui/react-icons";
import * as React from "react";

// Layout blocks
import AnalyticsDashboard from "./blocks/layout/AnalyticsDashboard";
import CheckoutPage from "./blocks/ecommerce/CheckoutPage";
import SignInPage from "./blocks/auth/SignInPage";
import TwoColumnSignInPage from "./blocks/auth/TwoColumnSignInPage";
import BlogHomepage from "./blocks/blog/BlogHomepage";

const useStyles = makeStyles({
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: tokens.spacingHorizontalXL,
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  globalBody: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    padding: 0,
    fontFamily: tokens.fontFamilyBase,
  },
  header: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalXL,
    position: "relative",
    paddingBottom: tokens.spacingVerticalXXL,
  },
  themeToggle: {
    position: "absolute",
    top: "0",
    right: "0",
  },
  title: {
    marginBottom: tokens.spacingVerticalS,
  },
  subtitle: {
    color: tokens.colorNeutralForeground2,
    maxWidth: "600px",
    margin: "0 auto",
  },
  content: {
    minHeight: "600px",
  },
  tabsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  tabList: {
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalL,
  },
  tabContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: "600px",
  },
  blockGrid: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXL,
    alignItems: "stretch",
    width: "100%",
  },
});

// Hook to detect system theme preference
const useSystemTheme = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(() => {
    // Check if we're in browser environment
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  return isDarkMode;
};

const App = () => {
  const styles = useStyles();
  const systemIsDark = useSystemTheme();
  const [themeMode, setThemeMode] = React.useState<"system" | "light" | "dark">(
    "system"
  );
  const [selectedTab, setSelectedTab] = React.useState<string>("analytics");

  // Determine the actual theme to use
  const isDarkTheme =
    themeMode === "dark" || (themeMode === "system" && systemIsDark);
  const currentTheme = isDarkTheme ? webDarkTheme : webLightTheme;

  // Tab change handler
  const handleTabChange = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value as string);
  };

  // Render the current template based on selected tab
  const renderCurrentTemplate = () => {
    switch (selectedTab) {
      case "analytics":
        return <AnalyticsDashboard />;
      case "checkout":
        return <CheckoutPage />;
      case "signin":
        return <SignInPage />;
      case "twocolumn":
        return <TwoColumnSignInPage />;
      case "blog":
        return <BlogHomepage />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  // Apply theme to document body
  React.useEffect(() => {
    const body = document.body;
    const theme = currentTheme;

    body.style.backgroundColor = theme.colorNeutralBackground1;
    body.style.color = theme.colorNeutralForeground1;
    body.style.fontFamily = theme.fontFamilyBase;
    body.style.margin = "0";
    body.style.padding = "0";

    // Also apply to html element for full coverage
    const html = document.documentElement;
    html.style.backgroundColor = theme.colorNeutralBackground1;

    return () => {
      // Cleanup function to reset styles if needed
      body.style.backgroundColor = "";
      body.style.color = "";
      body.style.fontFamily = "";
      html.style.backgroundColor = "";
    };
  }, [currentTheme]);

  const toggleTheme = () => {
    if (themeMode === "system") {
      setThemeMode("light");
    } else if (themeMode === "light") {
      setThemeMode("dark");
    } else {
      setThemeMode("system");
    }
  };

  const getThemeIcon = () => {
    if (themeMode === "system") {
      return systemIsDark ? (
        <WeatherMoon24Regular />
      ) : (
        <WeatherSunny24Regular />
      );
    }
    return themeMode === "dark" ? (
      <WeatherMoon24Regular />
    ) : (
      <WeatherSunny24Regular />
    );
  };

  const getThemeLabel = () => {
    if (themeMode === "system") {
      return `System (${systemIsDark ? "Dark" : "Light"})`;
    }
    return themeMode === "dark" ? "Dark" : "Light";
  };

  return (
    <FluentProvider theme={currentTheme}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Button
            appearance="subtle"
            icon={getThemeIcon()}
            onClick={toggleTheme}
            className={styles.themeToggle}
            title={`Switch theme (Currently: ${getThemeLabel()})`}
          >
            {getThemeLabel()}
          </Button>
        </header>

        <div className={styles.content}>
          <div className={styles.tabsContainer}>
            <TabList
              selectedValue={selectedTab}
              onTabSelect={handleTabChange}
              className={styles.tabList}
              size="large"
            >
              <Tab value="analytics">Analytics Dashboard</Tab>
              <Tab value="checkout">Checkout Page</Tab>
              <Tab value="signin">Sign In Page</Tab>
              <Tab value="twocolumn">Two-Column Sign In</Tab>
              <Tab value="blog">Blog Homepage</Tab>
            </TabList>

            <div className={styles.tabContent}>{renderCurrentTemplate()}</div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default App;
