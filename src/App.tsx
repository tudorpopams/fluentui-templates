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
  Share24Regular,
} from "@fluentui/react-icons";
import * as React from "react";

// Layout blocks
import AnalyticsDashboard from "./blocks/layout/AnalyticsDashboard";
import FluentChartsDashboard from "./blocks/layout/FluentChartsDashboard";
import TailwindAnalyticsDashboard from "./blocks/layout/TailwindAnalyticsDashboard";
import CheckoutPage from "./blocks/ecommerce/CheckoutPage";
import SignInPage from "./blocks/auth/SignInPage";
import TwoColumnSignInPage from "./blocks/auth/TwoColumnSignInPage";
import BlogHomepage from "./blocks/blog/BlogHomepage";
import TetrisGame from "./blocks/games/TetrisGame";
import TicTacToeGame from "./blocks/games/TicTacToeGame";
import BreakoutGame from "./blocks/games/BreakoutGame";

const useStyles = makeStyles({
  appContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    fontFamily: tokens.fontFamilyBase,
    overflow: "auto",
  },
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
  headerActions: {
    position: "absolute",
    top: "0",
    right: "0",
    display: "flex",
    gap: tokens.spacingHorizontalS,
    alignItems: "center",
  },
  themeToggle: {
    // Removed individual positioning since it's now in headerActions
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

  // Get initial tab from URL hash or default to "analytics"
  const getInitialTab = () => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      const validTabs = [
        "analytics",
        "charts",
        "tailwind",
        "checkout",
        "signin",
        "twocolumn",
        "blog",
        "tetris",
        "tictactoe",
        "breakout",
      ];
      return validTabs.includes(hash) ? hash : "analytics";
    }
    return "analytics";
  };

  const [selectedTab, setSelectedTab] = React.useState<string>(getInitialTab);

  // Update URL when tab changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.location.hash = selectedTab;
    }
  }, [selectedTab]);

  // Listen for hash changes (browser back/forward)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const handleHashChange = () => {
        const hash = window.location.hash.slice(1);
        const validTabs = [
          "analytics",
          "charts",
          "tailwind",
          "checkout",
          "signin",
          "twocolumn",
          "blog",
          "tetris",
          "tictactoe",
          "breakout",
        ];
        if (validTabs.includes(hash)) {
          setSelectedTab(hash);
        }
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

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
      case "charts":
        return <FluentChartsDashboard />;
      case "tailwind":
        return <TailwindAnalyticsDashboard />;
      case "checkout":
        return <CheckoutPage />;
      case "signin":
        return <SignInPage />;
      case "twocolumn":
        return <TwoColumnSignInPage />;
      case "blog":
        return <BlogHomepage />;
      case "tetris":
        return <TetrisGame />;
      case "tictactoe":
        return <TicTacToeGame />;
      case "breakout":
        return <BreakoutGame />;
      default:
        return <AnalyticsDashboard />;
    }
  };

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

  const copyCurrentLink = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        // You could add a toast notification here if you have a toast system
        console.log("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <FluentProvider theme={currentTheme}>
      <div className={styles.appContainer}>
        <div className={styles.container}>
          <header className={styles.header}>
            <div className={styles.headerActions}>
              <Button
                appearance="subtle"
                icon={<Share24Regular />}
                onClick={copyCurrentLink}
                title="Copy link to current page"
              >
                Share
              </Button>
              <Button
                appearance="subtle"
                icon={getThemeIcon()}
                onClick={toggleTheme}
                title={`Switch theme (Currently: ${getThemeLabel()})`}
              >
                {getThemeLabel()}
              </Button>
            </div>
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
                <Tab value="charts">Fluent Charts</Tab>
                <Tab value="tailwind">Tailwind Dashboard</Tab>
                <Tab value="checkout">Checkout Page</Tab>
                <Tab value="signin">Sign In Page</Tab>
                <Tab value="twocolumn">Two-Column Sign In</Tab>
                <Tab value="blog">Blog Homepage</Tab>
                <Tab value="tetris">Tetris Game</Tab>
                <Tab value="tictactoe">Tic Tac Toe</Tab>
                <Tab value="breakout">Breakout</Tab>
              </TabList>

              <div className={styles.tabContent}>{renderCurrentTemplate()}</div>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
};

export default App;
