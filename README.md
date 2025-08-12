# Nextdot - Estate Planning Platform

Nextdot is a modern, web-based platform designed to help users manage their estate planning and financial well-being. It provides actionable suggestions, risk assessments, and a centralized dashboard to keep track of important life documents and policies.

## Features

-   **Dashboard:** A central hub that provides a summary of completed tasks and outstanding issues.
-   **Actionable Suggestions:** The platform provides personalized suggestions (e.g., "Secure a Medical Policy") to help users improve their estate plan.
-   **Risk Assessment:** Visualizes potential risks to your estate across categories like "Protection," "Delay," and "Cost."
-   **Family Management:** Allows users to manage information for their partner, children, and other dependents.
-   **Onboarding:** A guided process to help new users set up their profiles and input initial data.
-   **Third-Party Integration:** Connects with service providers like "NextDot Advisory" and integrates with Stripe for payments.
-   **Educational Content:** Provides links to suggested readings to help users make informed decisions.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) 15 (with App Router)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Package Manager:** [Bun](https://bun.sh/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [Shadcn UI](https://ui.shadcn.com/) components.
-   **State Management:** [Zustand](https://github.com/pmndrs/zustand) (client-side) and [TanStack Query](https://tanstack.com/query/latest) (server-side).
-   **Forms:** [TanStack Form](https://tanstack.com/form/latest)
-   **Authentication:** [Auth0](https://auth0.com/)
-   **Linting & Formatting:** [Biome](https://biomejs.dev/)
-   **API Client:** [Axios](https://axios-http.com/)

## Getting Started

### Prerequisites

-   [Bun](https://bun.sh/docs/installation) installed on your machine.
-   Node.js (LTS version recommended).

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    cd next-beta
    ```

2.  Install dependencies:
    ```bash
    bun install
    ```

### Running the Development Server

To run the application in development mode with hot-reloading:

```bash
bun run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

### Scripts

-   `bun run dev`: Starts the development server with Turbopack.
-   `bun run build`: Creates a production-ready build.
-   `bun run start`: Starts the production server.
-   `bun run lint`: Lints and auto-fixes code using Biome.
-   `bun run format`: Formats code using Biome.

## Project Structure

The codebase is organized into several key directories within `src/`:

-   `app/`: Contains the pages and routes, following the Next.js App Router structure.
-   `components/`: Shared, reusable UI components.
-   `features/`: More complex, domain-specific components that make up the core features of the application.
-   `lib/`: Utility functions, API request logic, and provider configurations.
-   `hooks/`: Custom React hooks.
-   `store/`: Zustand state management stores.
-   `types/`: TypeScript type definitions.
-   `public/`: Static assets like images and fonts.
