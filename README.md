# Paint SPA

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📋 Available Scripts

| Script                  | Description                                     |
| ----------------------- | ----------------------------------------------- |
| `npm run dev`           | Start development server with Turbopack         |
| `npm run build`         | Build for production                            |
| `npm run start`         | Start production server                         |
| `npm run lint`          | Run ESLint                                      |
| `npm run format`        | Format code with Prettier and fix ESLint issues |
| `npm run typecheck`     | Run TypeScript type checking                    |
| `npm run test`          | Run all tests                                   |
| `npm run test:coverage` | Run tests with coverage report                  |
| `npm run validate`      | Run all quality checks (CI simulation)          |
| `npm run setup-hooks`   | Install Git pre-commit hooks                    |
| `npm run clean`         | Clean all build artifacts and caches            |

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier with Tailwind CSS plugin
- **Fonts**: Poppins + Schibsted Grotesk (Google Fonts)

## 🔧 Development

### Prerequisites

- Node.js 20.x or later
- npm (comes with Node.js)

### Setup for Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd paint-spa
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup Git hooks (optional but recommended)**

   ```bash
   npm run setup-hooks
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

### Code Quality

This project enforces code quality through automated checks:

- ✅ **TypeScript** - Static type checking
- ✅ **ESLint** - Code linting with Next.js rules
- ✅ **Prettier** - Code formatting with Tailwind class sorting
- ✅ **Jest** - Unit testing with React Testing Library
- ✅ **GitHub Actions** - Automated PR validation

### Pre-commit Validation

Run this before committing to ensure CI will pass:

```bash
npm run validate
```

This runs the same checks as the GitHub Actions workflow.

## 🧪 Testing

```bash
# Run tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Tests are located next to their components and follow the pattern `*.test.tsx`.

## 🏗️ Building

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## 📖 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed development guidelines.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles with Tailwind
│   ├── layout.tsx          # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── AboutUs/           # About us section component
│   ├── Buttons/           # Reusable button components
│   ├── ClientFeedBack/    # Client testimonials with carousel
│   ├── CompanyPhilosophy/ # Company philosophy section
│   ├── CompanyServices/   # Services showcase component
│   ├── Footer/            # Site footer with social links
│   ├── Hero/              # Landing page hero section
│   ├── Navbar/            # Navigation with smooth scroll
│   ├── News/              # News and blog section
│   ├── Partners/          # Partner logos showcase
│   ├── Pricing/           # Pricing tiers with expansion panels
│   └── Statistic/         # Statistics display component
├── constants/             # Application constants
│   ├── chart/             # Chart-related constants
│   └── URLs/              # Navigation and URL constants
├── data/                  # Static data and content
│   ├── chartData.ts       # Chart configuration data
│   ├── clientFeedbacks.ts # Customer testimonials
│   ├── companyServices.ts # Service offerings data
│   ├── news.ts            # News articles and blog posts
│   ├── partners.ts        # Partner information
│   ├── pricingTiers.ts    # Pricing plan configurations
│   └── statItems.ts       # Statistics and metrics
├── hooks/                 # Custom React hooks
│   ├── animations/        # Animation-related hooks
│   │   └── countUp/       # Count-up animation with intersection observer
│   ├── carousel/          # Carousel navigation functionality
│   └── scroll/            # Smooth scrolling functionality
├── types/                 # TypeScript type definitions
│   ├── chartTypes.ts      # Chart and data visualization types
│   ├── ClientFeedBack.ts  # Client feedback interface
│   ├── CompanyServiceTypes.ts # Service-related types
│   ├── navTypes.ts        # Navigation types
│   ├── NewsTypes.ts            # News and article types
│   ├── PartnerTypes.ts    # Partner data types
│   ├── PricingTierTypes.ts     # Pricing structure types
│   └── StatTypes.ts       # Statistics types
public/                    # Static assets
├── about-us/              # About section graphics
├── client-profile/        # Client-related images
├── footer/                # Footer background assets
├── hero/                  # Hero section graphics
├── icons/                 # Service and feature icons
├── logo/                  # Brand logos and marks
├── news/                  # News and blog images
├── partners/              # Partner logos
└── pricing/               # Pricing section graphics
```

## 🎨 Design System

The project uses a custom design system with:

- **Colors**: Primary (#7d4283), Secondary (#646a69), Accent (#e879f9)
- **Typography**: Poppins (primary), Schibsted Grotesk (display)
- **Components**: Consistent button styles, spacing, and interactions

## 🚀 Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!
