import * as React from "react";
import {
  Card,
  CardHeader,
  makeStyles,
  tokens,
  Text,
  Button,
  Input,
  Field,
  Checkbox,
  Link,
} from "@fluentui/react-components";
import {
  Eye24Regular,
  EyeOff24Regular,
  Star24Filled,
  ShieldCheckmark24Regular,
  SparkleCircle24Regular,
  People24Regular,
  Lightbulb24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  card: {
    width: "100%",
    margin: "0",
    height: "fit-content",
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow16,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  twoColumnContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    minHeight: "600px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
  },
  leftColumn: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalXXL,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  rightColumn: {
    padding: tokens.spacingVerticalXXL,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    color: tokens.colorBrandForeground1,
    marginBottom: tokens.spacingVerticalL,
  },
  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
  },
  featureItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: tokens.spacingHorizontalM,
  },
  featureIcon: {
    color: tokens.colorBrandForeground1,
    marginTop: tokens.spacingVerticalXS,
  },
  featureContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  featureTitle: {
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  featureDescription: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200,
  },
  signInForm: {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  title: {
    textAlign: "center",
    marginBottom: tokens.spacingVerticalL,
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  passwordField: {
    position: "relative",
    width: "100%",
  },
  passwordInput: {
    width: "100%",
    paddingRight: "40px",
  },
  passwordToggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: tokens.colorNeutralForeground2,
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      color: tokens.colorNeutralForeground1,
    },
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: tokens.spacingVerticalS,
  },
  signInButton: {
    width: "100%",
    marginTop: tokens.spacingVerticalM,
  },
  dividerSection: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    margin: `${tokens.spacingVerticalM} 0`,
  },
  dividerText: {
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase200,
    whiteSpace: "nowrap",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    backgroundColor: tokens.colorNeutralStroke2,
  },
  socialButtons: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
  },
  socialButton: {
    width: "100%",
    justifyContent: "flex-start",
    gap: tokens.spacingHorizontalS,
  },
  googleButton: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  facebookButton: {
    backgroundColor: "#1877f2",
    color: "white",
    border: "none",
    "&:hover": {
      backgroundColor: "#166fe5",
    },
  },
  signUpSection: {
    textAlign: "center",
    marginTop: tokens.spacingVerticalM,
    color: tokens.colorNeutralForeground2,
  },
  googleIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#4285f4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "white",
    fontWeight: "bold",
  },
  facebookIcon: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    backgroundColor: "#1877f2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    color: "white",
    fontWeight: "bold",
  },
});

const TwoColumnSignInPage: React.FC = () => {
  const styles = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignIn = () => {
    console.log("Sign in with:", formData);
  };

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
  };

  const handleFacebookSignIn = () => {
    console.log("Sign in with Facebook");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const features = [
    {
      icon: <ShieldCheckmark24Regular />,
      title: "Adaptable performance",
      description:
        "Our product effortlessly adjusts to your needs, boosting efficiency and providing no matter how demanding your tasks.",
    },
    {
      icon: <SparkleCircle24Regular />,
      title: "Built to last",
      description:
        "Experience unmatched durability that goes above and beyond with lasting investment.",
    },
    {
      icon: <People24Regular />,
      title: "Great user experience",
      description:
        "Integrate our product into your routine with an intuitive and easy-to-use interface.",
    },
    {
      icon: <Lightbulb24Regular />,
      title: "Innovation functionality",
      description:
        "Stay ahead with features that set new standards, addressing your evolving needs better than the rest.",
    },
  ];

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Text weight="semibold" size={500}>
            Two-Column Sign In
          </Text>
        }
        description={
          <Text>
            Responsive two-column sign-in page with content alongside the form
          </Text>
        }
      />
      <div className={styles.twoColumnContainer}>
        <div className={styles.leftColumn}>
          <div className={styles.logo}>
            <Star24Filled />
            <Text weight="semibold" size={500}>
              Sitemark
            </Text>
          </div>

          <div className={styles.featureList}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <div className={styles.featureContent}>
                  <Text className={styles.featureTitle}>{feature.title}</Text>
                  <Text className={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.signInForm}>
            <div className={styles.title}>
              <Text weight="semibold" size={600}>
                Sign in
              </Text>
            </div>

            <div className={styles.formSection}>
              <Field label="Email">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="you@email.com"
                />
              </Field>

              <Field label="Password">
                <div className={styles.passwordField}>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    placeholder="••••••••"
                    className={styles.passwordInput}
                  />
                  <button
                    type="button"
                    className={styles.passwordToggle}
                    onClick={togglePasswordVisibility}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff24Regular /> : <Eye24Regular />}
                  </button>
                </div>
              </Field>

              <div className={styles.rememberMe}>
                <Checkbox
                  checked={formData.rememberMe}
                  onChange={(_, data) =>
                    setFormData((prev) => ({
                      ...prev,
                      rememberMe: Boolean(data.checked),
                    }))
                  }
                  label="Remember me"
                />
                <Link href="#" appearance="subtle">
                  Forgot your password?
                </Link>
              </div>

              <Button
                appearance="primary"
                className={styles.signInButton}
                onClick={handleSignIn}
              >
                Sign in
              </Button>
            </div>

            <div className={styles.dividerSection}>
              <div className={styles.dividerLine} />
              <Text className={styles.dividerText}>or</Text>
              <div className={styles.dividerLine} />
            </div>

            <div className={styles.socialButtons}>
              <Button
                appearance="secondary"
                className={`${styles.socialButton} ${styles.googleButton}`}
                onClick={handleGoogleSignIn}
              >
                <div className={styles.googleIcon}>G</div>
                Sign in with Google
              </Button>

              <Button
                appearance="secondary"
                className={`${styles.socialButton} ${styles.facebookButton}`}
                onClick={handleFacebookSignIn}
              >
                <div className={styles.facebookIcon}>f</div>
                Sign in with Facebook
              </Button>
            </div>

            <div className={styles.signUpSection}>
              <Text>Don't have an account? </Text>
              <Link href="#" appearance="subtle">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TwoColumnSignInPage;
