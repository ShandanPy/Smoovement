
# Smoovement

A Next.js application with TypeScript, App Router, and comprehensive development tooling.

## Prerequisites

- **Node.js**: 20.x (LTS) - Use `.nvmrc` file for version management
- **pnpm**: 9.x - Specified in `packageManager` field

## Quick Start

### First Run

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd smoovement
   ```

2. **Copy environment variables**

   ```bash
   cp .env.example .env.local
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   ```

4. **Start development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm check` - Run lint + typecheck + build
- `pnpm prepare` - Setup Husky git hooks

## Development Tools

### Linting & Formatting

- **ESLint**: Configured with Next.js, TypeScript, and import ordering rules
- **Prettier**: Code formatting with consistent style
- **Integration**: ESLint and Prettier work together seamlessly

### Git Hooks (Husky)

- **Pre-commit**: Runs `lint-staged` to lint and format staged files
- **Pre-push**: Runs type checking and linting before pushing

### CI/CD

GitHub Actions workflow runs on:

- Pull requests to `main`
- Pushes to `main`

**CI Steps:**

1. Checkout code
2. Setup Node.js 20
3. Setup pnpm 9
4. Install dependencies (with caching)
5. Run linter
6. Run type check
7. Build application

## Project Structure

```
src/
├── app/                 # App Router pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── health/         # Health check endpoint
│       └── page.tsx
├── components/         # Reusable components
└── lib/               # Utility functions
    └── build-info.ts  # Build information helper
```

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

- **NextAuth**: Authentication configuration
- **Riot API**: Game API integration
- **Supabase**: Database and authentication
- **Database**: PostgreSQL connection string

## Verification

### Local Development

- ✅ App starts without requiring secrets
- ✅ Home page displays build information
- ✅ Health check endpoint returns "ok"
- ✅ All scripts work correctly

### Git Hooks

- ✅ Pre-commit blocks commits with lint/type errors
- ✅ Pre-push runs full checks before pushing

### CI Pipeline

- ✅ GitHub Actions runs on PR/push
- ✅ All steps pass (install → lint → typecheck → build)

## Troubleshooting

### Node Version Issues

```bash
# Use the specified Node version
nvm use
```

### pnpm Issues

```bash
# Ensure correct pnpm version
pnpm --version  # Should be 9.x
```

### Git Hooks Not Working

```bash
# Reinstall Husky hooks
pnpm prepare
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Ensure all checks pass locally (`pnpm check`)
4. Commit your changes (hooks will run automatically)
5. Push to your branch
6. Create a pull request

The CI pipeline will automatically run on your PR to ensure everything is working correctly.
=======
🌊 Smoovement App

Track your League of Legends journey with smarter insights.
Smoovement connects to the Riot API to automatically pull your match history, highlight your favorite champions, and give you performance dashboards that help you grow as a player.

✨ Features

📊 Match History – Automatic sync of your latest games.

🧩 Champion Insights – See trends and stats for the champions you care about.

🔑 Personal Accounts – Secure login keeps your data private.

📈 Visual Dashboards – Clean charts for win rates, KDA, and more.

🚀 Multi-Platform Ready – Built to expand into overlays, coaching, and live stats.

🔮 Roadmap

Smoovement is evolving! Here’s what’s coming next:

Nightly summaries – Easy-to-read stats without waiting for calculations.

Live overlays – In-game stats and reminders.

ML coaching – AI-powered tips tailored to your playstyle.

🛠️ Tech Behind the Scenes

Database: Supabase (Postgres)

Frontend/Backend: Next.js + Prisma

Auth: NextAuth

Data: Riot Games API

Visuals: Recharts

⚡ Smoovement is in active development. Early adopters can try it now and watch as new features roll out every week.

