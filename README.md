# Fluent UI React v9 Blocks & Templates

A comprehensive collection of modern, production-ready UI blocks and templates built with **Fluent UI React v9**. This repository provides reusable components similar to what Shadcn UI or Material UI offer, but specifically designed for Microsoft's Fluent Design System.

## 🚀 Overview

This project contains a curated set of UI blocks and templates that developers can use as building blocks for their applications. Each template is fully functional, accessible, and follows Fluent UI design principles.

## 📦 What's Included

### 🎯 **Templates Available**

1. **Analytics Dashboard** - Complete analytics dashboard with:

   - Sidebar navigation with Nav component
   - Key metrics cards with hover effects
   - Data visualization placeholders
   - Interactive DataGrid with sorting
   - Country-based user analytics
   - Responsive layout

2. **E-commerce Checkout Page** - Multi-step checkout process featuring:

   - Breadcrumb navigation for step progression
   - Form validation and input handling
   - Country selector with search (Combobox)
   - Order summary sidebar
   - Back/Forward navigation
   - Responsive design

3. **Sign-In Page** - Clean authentication template with:

   - Email and password fields
   - Password visibility toggle
   - Social authentication buttons (Google, Facebook)
   - "Remember me" functionality
   - Forgot password link
   - Professional styling

4. **Two-Column Sign-In Page** - Responsive authentication layout with:

   - Left column: Feature showcase with icons
   - Right column: Complete sign-in form
   - Marketing content integration
   - Responsive grid layout
   - Same authentication features as single-column

5. **Blog Homepage** - Modern blog layout featuring:
   - Navigation header with logo
   - Hero section
   - Category filtering system
   - Search functionality
   - Featured posts with colorful gradients
   - Regular post grid
   - "Latest" section
   - Pagination controls

## 🎨 Features

### ✨ **Design System**

- **Fluent UI React v9** - Latest version with modern components
- **Theme Support** - Light/Dark mode with system preference detection
- **Accessibility** - ARIA labels, keyboard navigation, screen reader support
- **Responsive** - Mobile-friendly layouts that adapt to different screen sizes

### 🔧 **Developer Experience**

- **TypeScript** - Full type safety and IntelliSense support
- **Modern React** - Hooks, functional components, and best practices
- **Hot Reload** - Instant development feedback with Vite
- **Clean Code** - Well-structured, documented, and maintainable

### 🎪 **Interactive Features**

- **Tab Navigation** - Easy switching between different templates
- **Theme Toggle** - System/Light/Dark mode switching
- **Form Validation** - Proper input handling and validation
- **Search & Filtering** - Real-time content filtering
- **Hover Effects** - Enhanced user interactions

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd fluentui-templates
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🎯 Usage

### Using Templates in Your Project

1. **Copy the template files** you need from the `src/blocks/` directory
2. **Install Fluent UI React v9** in your project:
   ```bash
   npm install @fluentui/react-components @fluentui/react-icons
   ```
3. **Import and use** the components in your application

### Example Usage

```tsx
import { AnalyticsDashboard } from "./blocks/layout/AnalyticsDashboard";
import { SignInPage } from "./blocks/auth/SignInPage";
import { BlogHomepage } from "./blocks/blog/BlogHomepage";

function App() {
  return (
    <div>
      <AnalyticsDashboard />
      {/* or */}
      <SignInPage />
      {/* or */}
      <BlogHomepage />
    </div>
  );
}
```

## 📁 Project Structure

```
src/
├── blocks/
│   ├── layout/
│   │   └── AnalyticsDashboard.tsx
│   ├── ecommerce/
│   │   └── CheckoutPage.tsx
│   ├── auth/
│   │   ├── SignInPage.tsx
│   │   └── TwoColumnSignInPage.tsx
│   └── blog/
│       └── BlogHomepage.tsx
├── App.tsx                 # Main application with tabs
└── index.tsx              # Entry point
```

## 🎨 Customization

### Theming

All templates use Fluent UI's design tokens, making them easy to customize:

```tsx
import {
  webLightTheme,
  webDarkTheme,
  FluentProvider,
} from "@fluentui/react-components";

<FluentProvider theme={webLightTheme}>
  <YourComponent />
</FluentProvider>;
```

### Styling

Templates use `makeStyles` for styling, which can be easily modified:

```tsx
const useStyles = makeStyles({
  customCard: {
    backgroundColor: tokens.colorNeutralBackground2,
    padding: tokens.spacingVerticalL,
    // Add your custom styles
  },
});
```

## 🔧 Technical Details

### Built With

- **React 18** - Latest React features and hooks
- **TypeScript** - Type safety and better developer experience
- **Fluent UI React v9** - Microsoft's design system
- **Vite** - Fast build tool and development server
- **CSS-in-JS** - Scoped styling with makeStyles

### Key Components Used

- `Card`, `CardHeader`, `CardPreview` - Container components
- `Nav`, `NavItem` - Navigation components
- `DataGrid` - Data tables with sorting
- `Breadcrumb` - Step-by-step navigation
- `Combobox` - Searchable dropdowns
- `SearchBox` - Search functionality
- `Button`, `Input`, `Field` - Form components
- `Badge`, `Avatar` - Status and profile components

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-template`)
3. **Commit your changes** (`git commit -m 'Add amazing template'`)
4. **Push to the branch** (`git push origin feature/amazing-template`)
5. **Open a Pull Request**

### Ideas for New Templates

- Dashboard widgets
- Data visualization components
- Form templates
- Navigation patterns
- Profile pages
- Settings pages
- Landing page sections

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Microsoft Fluent UI Team** - For the amazing design system
- **React Community** - For the excellent ecosystem
- **Vite Team** - For the fast development experience

## � GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### 📋 Setup Instructions

1. **Enable GitHub Pages**:

   - Go to your repository's Settings → Pages
   - Set Source to "GitHub Actions"
   - Save the configuration

2. **Configure Repository Name** (if needed):

   - If your repository name is different from `fluentui-blocks`, update the `base` path in `vite.config.ts`:

   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
   ```

3. **Deploy**:
   - Push to the `main` branch to trigger automatic deployment
   - Or manually trigger deployment from the Actions tab

### 🔧 Deployment Workflow

The `.github/workflows/deploy.yml` file automatically:

- Builds the project using `npm run build`
- Generates a `dist/` folder with optimized assets
- Deploys to GitHub Pages
- Provides a live URL for sharing

### 🌐 Access Your Deployed Site

After deployment, your site will be available at:

- `https://[username].github.io/[repository-name]/`
- Each tab has shareable URLs (e.g., `#charts`, `#analytics`)

### 🔄 Automatic Updates

- Every push to `main` branch automatically rebuilds and redeploys
- No manual intervention required
- Build status visible in GitHub Actions tab

## �📞 Support

If you have questions or need help:

- Open an issue on GitHub
- Check the [Fluent UI documentation](https://react.fluentui.dev/)
- Review the component examples in the repository

---

**Happy coding!** 🚀 Build amazing applications with these Fluent UI React v9 templates.
