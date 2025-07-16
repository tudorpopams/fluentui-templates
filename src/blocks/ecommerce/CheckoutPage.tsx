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
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbButton,
  BreadcrumbDivider,
  Combobox,
  useComboboxFilter,
  useId,
} from "@fluentui/react-components";
import {
  CheckmarkCircle24Regular,
  Circle24Regular,
  CircleHalfFill24Regular,
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
  checkout: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: tokens.spacingHorizontalXL,
    minHeight: "700px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusMedium,
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalL,
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalL,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: `0 ${tokens.borderRadiusMedium} ${tokens.borderRadiusMedium} 0`,
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    marginBottom: tokens.spacingVerticalL,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalXS,
    color: tokens.colorBrandForeground1,
  },
  progressSteps: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: tokens.spacingVerticalL,
    padding: tokens.spacingVerticalM,
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: tokens.borderRadiusMedium,
  },
  formSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: tokens.spacingHorizontalM,
  },
  formGridFull: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: tokens.spacingHorizontalM,
  },
  sidebarSection: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
  },
  orderSummary: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingVerticalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalS} 0`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  orderItemLast: {
    borderBottom: "none",
  },
  orderItemDescription: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${tokens.spacingVerticalM} 0`,
    borderTop: `2px solid ${tokens.colorNeutralStroke2}`,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase300,
  },
  checkboxField: {
    marginTop: tokens.spacingVerticalM,
  },
  nextButton: {
    marginTop: tokens.spacingVerticalL,
    alignSelf: "flex-end",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: tokens.spacingVerticalL,
  },
  backButton: {
    marginTop: tokens.spacingVerticalL,
  },
});

const countries = [
  { children: "United States", value: "United States" },
  { children: "Canada", value: "Canada" },
  { children: "United Kingdom", value: "United Kingdom" },
  { children: "Australia", value: "Australia" },
  { children: "India", value: "India" },
  { children: "Germany", value: "Germany" },
  { children: "France", value: "France" },
  { children: "Japan", value: "Japan" },
  { children: "China", value: "China" },
  { children: "Brazil", value: "Brazil" },
  { children: "Mexico", value: "Mexico" },
  { children: "Spain", value: "Spain" },
  { children: "Italy", value: "Italy" },
  { children: "Netherlands", value: "Netherlands" },
  { children: "South Korea", value: "South Korea" },
  { children: "Singapore", value: "Singapore" },
  { children: "Sweden", value: "Sweden" },
  { children: "Norway", value: "Norway" },
  { children: "Denmark", value: "Denmark" },
  { children: "Finland", value: "Finland" },
];

const CheckoutPage: React.FC = () => {
  const styles = useStyles();
  const comboId = useId();
  const [currentStep, setCurrentStep] = React.useState(1);
  const [countryQuery, setCountryQuery] = React.useState("United States");
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    useForPayment: false,
  });

  const filteredCountries = useComboboxFilter(countryQuery, countries, {
    noOptionsMessage: "No countries match your search.",
  });

  const orderItems = [
    {
      name: "Professional plan",
      description: "Monthly subscription",
      price: "$15.00",
    },
    {
      name: "Dedicated support",
      description: "Included in the professional plan",
      price: "Free",
    },
    {
      name: "Hardware",
      description: "Devices needed for development",
      price: "$69.99",
    },
    {
      name: "Landing page template",
      description: "Copilot",
      price: "$49.99",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCountrySelect = (
    _: React.SyntheticEvent,
    data: { optionText?: string; optionValue?: string }
  ) => {
    if (data.optionText && data.optionValue) {
      setCountryQuery(data.optionText);
      setFormData((prev) => ({ ...prev, country: data.optionValue || "US" }));
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepClick = (step: number) => {
    // Allow going back to previous steps, but not forward to future steps
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        header={
          <Text weight="semibold" size={500}>
            E-commerce Checkout
          </Text>
        }
        description={
          <Text>
            Multi-step checkout process with order summary and form validation
          </Text>
        }
      />
      <div className={styles.checkout}>
        <div className={styles.mainContent}>
          <nav aria-label="Checkout process" className={styles.progressSteps}>
            <Breadcrumb>
              {/* Step 1: Shipping Address */}
              <BreadcrumbItem>
                <BreadcrumbButton
                  aria-current={currentStep === 1 ? "page" : undefined}
                  disabled={false}
                  onClick={() => handleStepClick(1)}
                >
                  {currentStep > 1 ? (
                    <CheckmarkCircle24Regular
                      style={{ color: tokens.colorPaletteGreenForeground1 }}
                    />
                  ) : currentStep === 1 ? (
                    <CircleHalfFill24Regular
                      style={{ color: tokens.colorBrandForeground1 }}
                    />
                  ) : (
                    <Circle24Regular
                      style={{ color: tokens.colorNeutralForeground3 }}
                    />
                  )}
                  Shipping address
                </BreadcrumbButton>
              </BreadcrumbItem>
              <BreadcrumbDivider />

              {/* Step 2: Payment Details */}
              <BreadcrumbItem>
                <BreadcrumbButton
                  aria-current={currentStep === 2 ? "page" : undefined}
                  disabled={currentStep < 2}
                  onClick={() => handleStepClick(2)}
                >
                  {currentStep > 2 ? (
                    <CheckmarkCircle24Regular
                      style={{ color: tokens.colorPaletteGreenForeground1 }}
                    />
                  ) : currentStep === 2 ? (
                    <CircleHalfFill24Regular
                      style={{ color: tokens.colorBrandForeground1 }}
                    />
                  ) : (
                    <Circle24Regular
                      style={{ color: tokens.colorNeutralForeground3 }}
                    />
                  )}
                  Payment details
                </BreadcrumbButton>
              </BreadcrumbItem>
              <BreadcrumbDivider />

              {/* Step 3: Review Order */}
              <BreadcrumbItem>
                <BreadcrumbButton
                  aria-current={currentStep === 3 ? "page" : undefined}
                  disabled={currentStep < 3}
                  onClick={() => handleStepClick(3)}
                >
                  {currentStep > 3 ? (
                    <CheckmarkCircle24Regular
                      style={{ color: tokens.colorPaletteGreenForeground1 }}
                    />
                  ) : currentStep === 3 ? (
                    <CircleHalfFill24Regular
                      style={{ color: tokens.colorBrandForeground1 }}
                    />
                  ) : (
                    <Circle24Regular
                      style={{ color: tokens.colorNeutralForeground3 }}
                    />
                  )}
                  Review your order
                </BreadcrumbButton>
              </BreadcrumbItem>
            </Breadcrumb>
          </nav>

          {currentStep === 1 && (
            <div className={styles.formSection}>
              <Text weight="semibold" size={500}>
                Shipping address
              </Text>
              <div className={styles.formGrid}>
                <Field label="First name" required>
                  <Input
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    placeholder="John"
                  />
                </Field>
                <Field label="Last name" required>
                  <Input
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    placeholder="Snow"
                  />
                </Field>
              </div>
              <div className={styles.formGridFull}>
                <Field label="Address line 1" required>
                  <Input
                    value={formData.addressLine1}
                    onChange={(e) =>
                      handleInputChange("addressLine1", e.target.value)
                    }
                    placeholder="1 Material-UI Drive"
                  />
                </Field>
                <Field label="Address line 2">
                  <Input
                    value={formData.addressLine2}
                    onChange={(e) =>
                      handleInputChange("addressLine2", e.target.value)
                    }
                    placeholder="Apartment, suite, unit, etc. (optional)"
                  />
                </Field>
              </div>
              <div className={styles.formGrid}>
                <Field label="City" required>
                  <Input
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="New York"
                  />
                </Field>
                <Field label="State" required>
                  <Input
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="NY"
                  />
                </Field>
              </div>
              <div className={styles.formGrid}>
                <Field label="Zip / Postal code" required>
                  <Input
                    value={formData.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                    placeholder="12345"
                  />
                </Field>
                <Field label="Country" required>
                  <Combobox
                    aria-labelledby={comboId}
                    placeholder="Search for a country"
                    value={countryQuery}
                    onChange={(event) => setCountryQuery(event.target.value)}
                    onOptionSelect={handleCountrySelect}
                  >
                    {filteredCountries}
                  </Combobox>
                </Field>
              </div>
              <div className={styles.checkboxField}>
                <Checkbox
                  checked={formData.useForPayment}
                  onChange={(_, data) =>
                    setFormData((prev) => ({
                      ...prev,
                      useForPayment: Boolean(data.checked),
                    }))
                  }
                  label="Use this address for payment details"
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className={styles.formSection}>
              <Text weight="semibold" size={500}>
                Payment details
              </Text>
              <Text>Payment form would go here...</Text>
            </div>
          )}

          {currentStep === 3 && (
            <div className={styles.formSection}>
              <Text weight="semibold" size={500}>
                Review your order
              </Text>
              <Text>Order review would go here...</Text>
            </div>
          )}

          <div className={styles.buttonGroup}>
            <Button
              appearance="subtle"
              className={styles.backButton}
              onClick={handleBack}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button
              appearance="primary"
              className={styles.nextButton}
              onClick={handleNext}
              disabled={currentStep === 3}
            >
              {currentStep === 3 ? "Place Order" : "Next"}
            </Button>
          </div>
        </div>

        <div className={styles.sidebar}>
          <div className={styles.sidebarSection}>
            <Text weight="semibold" size={400}>
              Total
            </Text>
            <Text weight="bold" size={600}>
              $134.98
            </Text>
          </div>

          <div className={styles.orderSummary}>
            {orderItems.map((item, index) => (
              <div
                key={index}
                className={`${styles.orderItem} ${
                  index === orderItems.length - 1 ? styles.orderItemLast : ""
                }`}
              >
                <div className={styles.orderItemDescription}>
                  <Text weight="semibold" size={300}>
                    {item.name}
                  </Text>
                  <Text
                    size={200}
                    style={{ color: tokens.colorNeutralForeground2 }}
                  >
                    {item.description}
                  </Text>
                </div>
                <Text weight="semibold" size={300}>
                  {item.price}
                </Text>
              </div>
            ))}
            <div className={styles.total}>
              <Text>Total</Text>
              <Text>$134.98</Text>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CheckoutPage;
