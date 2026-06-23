# Ecom AI — AI-Powered Furniture Store

A full-stack e-commerce platform that combines a modern storefront, headless CMS, and an AI shopping assistant. Built to demonstrate production-grade patterns in Next.js, real-time content, payments, and agentic AI.

> Portfolio project showcasing end-to-end product engineering — from UX and server architecture to AI tool-calling and payment webhooks.

---

## Why This Project

Most demo stores stop at a product grid. This one goes further:

- **AI that actually does work** — the assistant searches inventory, filters by material/color/price, and tracks orders via tool-calling against live CMS data.
- **Real commerce flows** — Stripe Checkout, webhook-driven order creation, server-side stock validation, and idempotent payment handling.
- **Operator-ready admin** — inventory management, order fulfillment, low-stock alerts, and an AI insights dashboard (analytics + LLM summaries).
- **Modern stack choices** — Next.js 16 App Router, React 19, Sanity Live, Clerk auth, and the Vercel AI SDK with a `ToolLoopAgent`.

Useful for evaluating skills in **full-stack TypeScript**, **AI integration**, **CMS architecture**, and **payments**.

---

## Live Demo

<!-- Replace with your deployed URL -->
**[View live demo →](https://your-demo-url.vercel.app)**

| Surface | Path |
|---------|------|
| Storefront | `/` |
| Admin dashboard | `/admin` |
| Sanity Studio | `/studio` |

---

## Features

### Storefront
- Product catalog with search, category filters, price range, material/color filters, and sort options
- Featured product carousel and category navigation
- Product detail pages with image gallery and stock status
- Persistent cart (Zustand) with live stock validation
- Protected checkout and order history (Clerk)

### AI Shopping Assistant
- Streaming chat powered by **Claude Sonnet 4.5** via Vercel AI Gateway
- **Tool-calling agent** with structured tools:
  - `searchProducts` — GROQ queries against Sanity with category, material, color, and price filters
  - `getMyOrders` — order lookup for authenticated users
- Rich chat UI with tool-call visibility, product cards, and order widgets
- Context-aware auth — order tools only exposed when signed in
- “Ask AI for similar products” from any product page

### Admin & CMS
- Custom admin dashboard (`/admin`) built on Sanity SDK React
- Product CRUD with image upload, stock management, and featured toggles
- Order management with status workflow (pending → paid → shipped → delivered)
- Low-stock alerts and recent orders overview
- Embedded Sanity Studio for content editing
- Real-time content updates via Sanity Live

### Payments & Orders
- Stripe Checkout Sessions with multi-country shipping
- Server-side price and stock validation before checkout
- Webhook handler with signature verification and idempotent order creation
- Automatic inventory decrement on successful payment
- Customer sync between Clerk, Stripe, and Sanity

---

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS 4, shadcn/ui, Radix UI |
| **CMS** | Sanity v4, GROQ, Sanity Live, Sanity SDK React |
| **Auth** | Clerk (middleware-protected routes) |
| **Payments** | Stripe Checkout + Webhooks |
| **AI** | Vercel AI SDK 6, AI Gateway, ToolLoopAgent, Zod tool schemas |
| **State** | Zustand (cart + chat UI) |
| **Quality** | Biome, React Compiler, strict TypeScript |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js App Router                       │
├──────────────┬──────────────┬──────────────┬────────────────┤
│  Storefront  │  AI Chat     │  Admin       │  API Routes    │
│  (RSC + SSR) │  (Client)    │  (Sanity SDK)│  /chat, /webhooks │
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬───────┘
       │              │              │                │
       ▼              ▼              ▼                ▼
┌──────────────┐ ┌──────────┐ ┌──────────┐   ┌──────────────┐
│ Sanity CMS   │ │ AI Agent │ │ Clerk    │   │ Stripe       │
│ (GROQ/Live)  │ │ + Tools  │ │ Auth     │   │ Payments     │
└──────────────┘ └──────────┘ └──────────┘   └──────────────┘
```

**Key design decisions:**

- **Server Components first** — product listings and filters run GROQ on the server; client state is limited to cart, chat, and interactive UI.
- **Single source of truth** — Sanity holds products, inventory, orders, and customers; Stripe is the payment rail; Clerk is identity.
- **Agent tools hit real data** — the AI never hallucinates catalog info; it queries Sanity through typed GROQ and returns structured product results.
- **Fail-safe checkout** — prices and stock are re-validated server-side before creating a Stripe session, preventing stale cart exploits.

---

## Skills Demonstrated

| Area | What this repo shows |
|------|---------------------|
| **Full-stack Next.js** | App Router, RSC, Server Actions, API routes, middleware |
| **Headless CMS** | Schema design, GROQ queries, live preview, embedded Studio |
| **AI engineering** | Tool-calling agents, streaming UI, auth-scoped tools, prompt design |
| **Payments** | Checkout Sessions, webhooks, idempotency, metadata-driven order creation |
| **Auth & security** | Route protection, session validation, user-scoped data access |
| **UI/UX** | Responsive design, skeletons, dark mode, accessible components |
| **Type safety** | End-to-end TypeScript, Sanity typegen, Zod validation |

---

## Getting Started

### Prerequisites

- Node.js 20+
- Accounts: [Sanity](https://sanity.io), [Clerk](https://clerk.com), [Stripe](https://stripe.com)
- Vercel AI Gateway or compatible model provider

### 1. Clone & install

```bash
git clone https://github.com/your-username/ecom-ai-002.git
cd ecom-ai-002
npm install
```

### 2. Environment variables

Create `.env.local`:

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=
SANITY_API_WRITE_TOKEN=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# AI (Vercel AI Gateway)
AI_GATEWAY_API_KEY=
```

### 3. Seed sample data (optional)

Import the included sample dataset into your Sanity project:

```bash
npx sanity dataset import sample-data.ndjson production
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the store, [http://localhost:3000/admin](http://localhost:3000/admin) for admin, and [http://localhost:3000/studio](http://localhost:3000/studio) for Sanity Studio.

### Stripe webhooks (local)

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## Project Structure

```
├── app/
│   ├── (app)/          # Storefront — home, product, checkout, orders
│   ├── (admin)/        # Admin dashboard — inventory, orders
│   ├── api/            # Chat agent, Stripe webhooks
│   └── studio/         # Embedded Sanity Studio
├── components/
│   ├── app/            # Store UI — chat, cart, product, landing
│   ├── admin/          # Admin UI — stats, forms, alerts
│   └── ui/             # shadcn/ui primitives
├── lib/
│   ├── ai/             # Shopping agent + tools
│   ├── actions/        # Server Actions (checkout, customer)
│   └── store/          # Zustand providers
├── sanity/
│   ├── schemaTypes/    # Product, order, customer, category
│   ├── queries/        # GROQ queries
│   └── lib/            # Client, live preview
└── proxy.ts            # Clerk middleware
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run lint` | Run Biome checks |
| `npm run format` | Format with Biome |
| `npm run typegen` | Regenerate Sanity TypeScript types |

---

## Roadmap

- [ ] Enable admin AI insights API (LLM-generated sales & inventory summaries)
- [ ] Deploy production demo with seeded catalog
- [ ] Add README screenshots / demo GIF

---

## License

MIT — free to use for learning and portfolio review.

---

**Built by [Your Name](https://github.com/your-username)** · [LinkedIn](https://linkedin.com/in/your-profile) · [Portfolio](https://your-portfolio.com)
