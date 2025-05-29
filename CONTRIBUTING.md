# Contributing Guide

## Development Workflow

This project uses automated quality checks for all pull requests. Here's what you need to know:

### Prerequisites

- Node.js 20.x
- npm (comes with Node.js)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development Scripts

| Script                   | Description                             |
| ------------------------ | --------------------------------------- |
| `npm run dev`            | Start development server with Turbopack |
| `npm run build`          | Build for production                    |
| `npm run start`          | Start production server                 |
| `npm run lint`           | Run ESLint                              |
| `npm run lint:fix`       | Run ESLint and fix auto-fixable issues  |
| `npm run prettier`       | Format all files with Prettier          |
| `npm run prettier:check` | Check if files are formatted correctly  |
| `npm run format`         | Run both Prettier and ESLint fix        |
| `npm run typecheck`      | Run TypeScript type checking            |
| `npm run test`           | Run all tests                           |
| `npm run test:watch`     | Run tests in watch mode                 |
| `npm run test:coverage`  | Run tests with coverage report          |

### Code Quality

This project enforces code quality through:

- **TypeScript**: Static type checking
- **ESLint**: Code linting with Next.js recommended rules
- **Prettier**: Code formatting with Tailwind CSS class sorting
- **Jest**: Unit testing with React Testing Library
- **Husky**: Git hooks for pre-commit checks (if configured)

### Pre-commit Checklist

Before committing, make sure to run:

```bash
npm run format        # Format code and fix linting issues
npm run typecheck     # Check for TypeScript errors
npm run test          # Run all tests
npm run build         # Ensure production build works
```

### Pull Request Process

1. Create a feature branch from `main` or `dev`
2. Make your changes
3. Ensure all quality checks pass locally
4. Push your branch and create a pull request
5. The automated workflow will run:
   - TypeScript type checking
   - ESLint linting
   - Prettier format checking
   - Jest tests with coverage
   - Production build verification
   - Security audit
   - Dependency review (for external PRs)

### Automated Checks

The GitHub workflow (`pr-validation.yml`) automatically runs on:

- Pull requests to `main` or `dev` branches
- Direct pushes to `main` or `dev` branches

**Required checks that must pass:**

- TypeScript compilation
- ESLint linting
- Prettier formatting
- All Jest tests
- Production build

**Optional/informational checks:**

- Security audit
- Test coverage reporting
- Dependency review

### VS Code Integration

This project includes VS Code settings for:

- Auto-formatting on save with Prettier
- ESLint integration
- Recommended extensions
- TypeScript configuration

Recommended extensions will be suggested when you open the project in VS Code.

### Prettier Configuration

Prettier is configured with:

- Semi-colons enabled
- Double quotes for strings
- Trailing commas where valid in ES5
- 2-space indentation
- 80 character line width
- Tailwind CSS class sorting

### ESLint Configuration

ESLint uses:

- Next.js recommended rules
- TypeScript support
- Prettier integration (no conflicts)

### Testing

- Tests are written with Jest and React Testing Library
- Test files should be named `*.test.tsx` or `*.test.ts`
- Place tests next to the components they test
- Aim for high test coverage on critical components
- Mock external dependencies and Next.js components

### Troubleshooting

**Common issues:**

1. **Prettier formatting fails**: Run `npm run prettier` to fix formatting
2. **ESLint errors**: Run `npm run lint:fix` to auto-fix issues
3. **TypeScript errors**: Check `npm run typecheck` output
4. **Tests failing**: Run `npm run test` to see detailed error messages
5. **Build fails**: Ensure all TypeScript and ESLint issues are resolved

**Clean reset:**

```bash
rm -rf node_modules package-lock.json .next
npm install
```
