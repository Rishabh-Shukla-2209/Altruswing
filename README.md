# AltruSwing

AltruSwing is a full-stack web application that combines golf performance tracking with automated philanthropic giving. Users can log their Stableford scores, participate in automated monthly prize draws, and seamlessly allocate a percentage of their subscription fee to curated global charities.

## Tech Stack

* **Framework:** Next.js (App Router, Server Components, Server Actions)
* **Language:** TypeScript
* **Database & Auth:** Supabase (PostgreSQL, Row Level Security)
* **Payments:** Stripe (Billing, Checkout, Webhooks)
* **Styling:** Tailwind CSS, Framer Motion, Radix UI
* **Email Processing:** Resend

## Core Features

* **Performance Dashboard:** Real-time visualization of rolling scores and lifetime win rates using Next.js Server Components for zero-loading-spinner data fetching.
* **Dynamic Philanthropy:** Users can route a percentage of their subscription (or make one-off Stripe Checkout donations) to selected charities, updating relational database preferences via Server Actions.
* **Draw & Winnings Ledger:** Automated tracking of monthly draw participation, tier matching, and payout statuses.
* **Secure Webhook Infrastructure:** Server-to-server Stripe webhooks handle subscription state synchronization, one-time donation logging, and graceful period-end cancellations.

## Local Development

1.  **Clone and Install:**
    ```bash
    git clone https://github.com/Rishabh-Shukla-2209/Altruswing.git
    cd altruswing
    npm install
    ```

2.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your keys:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

    STRIPE_SECRET_KEY=your_stripe_secret_key
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
    STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

    RESEND_API_KEY=your_resend_api_key
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Listen for Stripe webhooks locally:
    ```bash
    stripe listen --forward-to localhost:3000/api/stripe/webhook
    ```
