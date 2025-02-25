# Award ASIAN Flight Search

A modern web application for searching award flights across Asian airlines, built with Next.js and TypeScript. This application helps users find and compare award flight availability with an intuitive interface and real-time search capabilities.

## 🌟 Features

- Real-time flight search across multiple airlines
- Multi-airport selection support
- Flexible date range search
- Cabin class filtering
- Accessibility-first design (WCAG 2.2 compliant)
- Responsive UI for all devices

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:**
  - [Radix UI](https://www.radix-ui.com/)
  - [Shadcn/ui](https://ui.shadcn.com/)
- **State Management:** [TanStack Query (React Query)](https://tanstack.com/query)
- **Form Handling:** [React Hook Form](https://react-hook-form.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Date Handling:** [date-fns](https://date-fns.org/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18.17 or higher)
- Yarn package manager

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/naufaldi/miles-rove.git
cd miles-rove
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# API Configuration
PARTNER_AUTH=partner_auth_key
SEATS_AERO_API_URL=seats_aero_api_url
```

### Installation

```bash
# Install dependencies
yarn install
```

### Development

```bash
# Start development server
yarn dev
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── api/                 # list api
├── app/                 # Next.js app directory
├── api/                  # Next.js api route
├── components/         # React components
│   ├── flights/       # Flight-related components
│   ├── ui/            # Reusable UI components
│   └── wcag/          # Accessibility components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── types/             # TypeScript type definitions
└── schema/            # Zod validation schemas
```
