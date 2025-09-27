
# Smoovement

A Next.js application with TypeScript, App Router, Tailwind CSS, and NextAuth.js authentication with Email + GitHub OAuth providers.

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

## Features

### 🎨 Design System

- **Tailwind CSS**: Utility-first CSS framework with custom design tokens
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Design Tokens**: Semantic color system, typography scale, and consistent spacing
- **UI Components**: Hand-rolled Button and Card components with variants

### 🔐 Authentication

- **NextAuth.js**: Complete authentication solution with Prisma adapter
- **Email Magic-Link**: Passwordless authentication with customizable email templates
- **GitHub OAuth**: Social authentication with GitHub
- **Database Sessions**: Persistent sessions stored in PostgreSQL
- **Protected Routes**: Server-side route protection with automatic redirects
- **Development-Friendly**: Multiple email transport options for local development

### 🛠️ Development Experience

- **TypeScript**: Full type safety throughout the application
- **App Router**: Next.js 14 App Router with server components
- **Hot Reload**: Fast development with instant updates
- **Linting & Formatting**: ESLint, Prettier, and Husky git hooks

## Design System

### Color Tokens

The application uses a semantic color system with CSS variables:

- **Background**: `bg-background` / `bg-card`
- **Text**: `text-foreground` / `text-muted-foreground`
- **Primary**: `bg-primary` / `text-primary-foreground`
- **Borders**: `border-border` / `border-input`
- **Accent**: `bg-accent` / `text-accent-foreground`

### Typography Scale

- **H1**: `text-h1` (2.25rem, bold, tight tracking)
- **H2**: `text-h2` (1.875rem, semibold, tight tracking)
- **H3**: `text-h3` (1.5rem, semibold, tight tracking)
- **Body**: Base 16px with system font stack

### Dark Mode

- Toggle via the theme button in the header
- Preference persists in localStorage
- Uses `.dark` class on `<html>` element
- All components automatically adapt to theme changes

## Authentication Setup

### Environment Variables

Copy `.env.example` to `.env.local` and configure the following variables:

#### Required Variables

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key  # Generate with: openssl rand -base64 32

# GitHub OAuth (Optional - for GitHub sign-in)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret

# Email Configuration (Required for email sign-in)
EMAIL_SERVER=your-smtp-server
EMAIL_FROM=auth@example.com

# Database
DATABASE_URL=your-database-connection-string
```

### GitHub OAuth Setup

1. **Create a GitHub OAuth App**:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the details:
     - **Application name**: Smoovement
     - **Homepage URL**: `http://localhost:3000`
     - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

2. **Get your credentials**:
   - Copy the **Client ID** and **Client Secret**
   - Add them to your `.env.local` file

### Email Configuration

The application supports multiple email transport options for development:

#### Option 1: Ethereal Email (Recommended for Development)

```bash
# In .env.local
EMAIL_SERVER=smtp://user:pass@smtp.ethereal.email:587
EMAIL_FROM="Smoovement Auth <no-reply@smoovement.local>"
```

- Creates temporary email accounts automatically
- Magic link URLs are logged to server console
- No external dependencies required

#### Option 2: File Transport (Offline Development)

```bash
# In .env.local
EMAIL_SERVER=file://./.tmp-mail
EMAIL_FROM="Smoovement Auth <no-reply@smoovement.local>"
```

- Saves emails to local files
- Fully offline development
- Magic link URLs logged to console

#### Option 3: Custom SMTP

```bash
# In .env.local
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM="Your App <noreply@yourdomain.com>"
```

### Testing Authentication

#### Happy Path Testing

1. **Start the development server**:

   ```bash
   pnpm dev
   ```

2. **Navigate to landing page**:
   Visit [http://localhost:3000/landing](http://localhost:3000/landing)

3. **Test Email Sign-in**:
   - Click "Sign in to Continue"
   - Choose "Send me a sign-in link"
   - Enter your email and submit
   - Check the server console for the magic link URL
   - Click the magic link to sign in
   - You should be redirected to the dashboard

4. **Test GitHub Sign-in**:
   - Click "Continue with GitHub"
   - Authorize the application
   - You should be redirected to the dashboard

5. **Test Protected API**:

   ```bash
   # When logged in
   curl -i http://localhost:3000/api/me
   # Returns 200 with user info

   # When logged out
   curl -i http://localhost:3000/api/me
   # Returns 401 Unauthorized
   ```

#### Unauthorized Testing

1. **Sign out** from the application
2. **Try to access protected routes**:
   - Visit `/dashboard` - should redirect to sign-in
   - Call `/api/me` - should return 401

#### Multi-user Testing

1. **Create a second account** with a different email
2. **Verify both accounts can sign in/out independently**
3. **Check that user data is properly isolated** (each user only sees their own data)

## Database Setup

This application uses **Supabase Postgres** with **Prisma ORM** for database management.

### Prerequisites

1. **Supabase Account**: Sign up at [supabase.com](https://supabase.com)
2. **Database Project**: Create a new project in your Supabase dashboard

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

### Required

- **NEXTAUTH_URL**: Application URL (http://localhost:3000 for development)
- **NEXTAUTH_SECRET**: Random string for JWT signing (generate with `openssl rand -base64 32`)
- **DATABASE_URL**: Supabase Postgres connection string

### Database Configuration

1. **Get your Supabase connection string**:
   - Go to your Supabase project dashboard
   - Navigate to Settings → Database
   - Copy the "Connection string" under "Connection parameters"
   - Format: `postgresql://postgres:[password]@[host]:[port]/[database]?schema=public`

2. **Set DATABASE_URL in .env.local**:
   ```bash
   DATABASE_URL=postgresql://postgres:your-password@db.your-project.supabase.co:5432/postgres?schema=public
   ```

### Database Migration

#### Local Development

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations (creates tables)
pnpm db:migrate

# Open Prisma Studio (database GUI)
pnpm db:studio
```

#### Production Deployment

```bash
# Apply migrations to production database
pnpm db:deploy
```

### Database Scripts

- `pnpm db:generate` - Generate Prisma client
- `pnpm db:migrate` - Run migrations in development
- `pnpm db:deploy` - Apply migrations in production
- `pnpm db:studio` - Open Prisma Studio (database GUI)
- `pnpm db:seed` - Run seed script (placeholder)
- `pnpm db:reset` - Reset database (development only)

### Database Schema

The application includes the following models:

#### NextAuth.js Models

- **User**: User accounts with email authentication
- **Account**: OAuth provider accounts
- **Session**: User sessions
- **VerificationToken**: Email verification tokens

#### Application Models

- **SummonerLink**: Links users to their League of Legends summoner accounts
  - Unique constraint: `(userId, summonerName, region)`
  - Index on `puuid` for fast lookups
- **ChampionPreference**: User preferences for champions
  - Unique constraint: `(userId, championId)`
  - Rating scale: -5 to 5
- **Match**: League of Legends match data
  - Unique constraint: `(userId, gameId)`
  - Indexes on `championId`, `win`, `gameStart` for efficient queries

#### Key Features

- **Cascade Deletes**: When a user is deleted, all related data is automatically removed
- **Optimized Indexes**: Strategic indexes for common query patterns
- **Type Safety**: Full TypeScript support with generated Prisma client

### Email Configuration (Choose One)

- **EMAIL_SERVER**: SMTP server or file transport URL
- **EMAIL_FROM**: Sender email address and name

## Verification

### Local Development

- ✅ App starts without requiring secrets
- ✅ Home page displays build information and authentication status
- ✅ Health check endpoint returns "ok"
- ✅ Dark mode toggle works and persists preference
- ✅ Email magic-link authentication works
- ✅ Protected API returns correct responses
- ✅ All scripts work correctly
- ✅ Database migrations apply cleanly
- ✅ Prisma client generates without errors
- ✅ Unique constraints prevent duplicate data

### Authentication Testing

- ✅ Sign-in page renders correctly with both Email and GitHub options
- ✅ Email magic-link is sent (check console for URL)
- ✅ GitHub OAuth flow works correctly
- ✅ Following magic link signs user in
- ✅ Header shows user email when authenticated
- ✅ Landing page is accessible without authentication
- ✅ Dashboard redirects to sign-in when not authenticated
- ✅ Protected API returns 401 when logged out
- ✅ Protected API returns 200 with user info when logged in
- ✅ Sessions are persisted in database
- ✅ Multiple users can sign in independently

### Git Hooks

- ✅ Pre-commit blocks commits with lint/type errors
- ✅ Pre-push runs full checks before pushing

### Database Testing

- ✅ Prisma schema validates without errors
- ✅ Migration files are properly formatted
- ✅ Unique constraints work correctly
- ✅ Indexes are created for performance
- ✅ Foreign key relationships are enforced
- ✅ Prisma Studio opens and displays schema

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

### Database Issues

#### Migration Errors

```bash
# Reset database (development only)
pnpm db:reset

# Check migration status
pnpm prisma migrate status

# Generate client after schema changes
pnpm db:generate
```

#### Connection Issues

- Verify `DATABASE_URL` is correctly set in `.env.local`
- Ensure Supabase project is active and accessible
- Check that the connection string format is correct
- Verify database password is correct

#### Prisma Studio Not Opening

```bash
# Try opening with explicit port
pnpm prisma studio --port 5555
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

