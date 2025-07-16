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
import { Eye24Regular, EyeOff24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  card: {
    width: "100%",
    margin: "0",
    height: "fit-content",
    padding: tokens.spacingVerticalM,
    boxShadow: tokens.shadow16,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  signInContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "600px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalXXL,
  },
  signInCard: {
    width: "400px",
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
    padding: tokens.spacingVerticalXL,
    boxShadow: tokens.shadow8,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
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
    paddingRight: "40px", // Make room for the eye icon
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

const SignInPage: React.FC = () => {
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

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Text weight="semibold" size={500}>
            Authentication Sign In
          </Text>
        }
        description={
          <Text>
            Clean and efficient sign-in page with social authentication
            providers
          </Text>
        }
      />
      <div className={styles.signInContainer}>
        <div className={styles.signInCard}>
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
    </Card>
  );
};

export default SignInPage;
