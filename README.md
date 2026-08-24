# Oak Apartment Inventory

A web-based inventory and trapper management system built for Oak Apartments.

The application is designed to help manage apartment inventory, track item quantities, and manage the issuing and return of trappers.

## Features

### Inventory Management

- View and manage inventory items
- Organize items by store
- Track item quantities
- Support items with and without quantities
- Manage item variants
- Upload and display item images
- View inventory through an administrative dashboard

### Trapper Management

- Check trappers out to borrowers
- Check trappers back in
- Track currently borrowed trappers
- Track available trappers
- Maintain borrower records
- Maintain trapper transaction history
- Support legacy return records for trappers issued before the system was introduced

### Administration

- Administrative inventory management
- Trapper management
- Inventory and borrowing records
- Centralized database-backed data management

## Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **UI:** React
- **Styling:** Tailwind CSS
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Database Hosting:** Neon
- **Deployment:** Vercel

## Architecture

The application uses Next.js for both the frontend and server-side API routes.

Prisma is used as the ORM and provides the application's database access layer.

The production architecture is:

```text
User
  ↓
Vercel
  ↓
Next.js
  ↓
Prisma
  ↓
PostgreSQL
  ↓
Neon
```

## Project Structure

```text
app/
├── admin/                 # Administrative interface
├── api/                   # Server-side API routes
├── trappers/              # Public trapper management page
└── page.tsx               # Main inventory page

components/                # Reusable UI components
lib/                       # Shared application utilities
prisma/                    # Prisma schema and configuration
public/                    # Static assets and images
types/                     # TypeScript type definitions
```

## Getting Started

### Prerequisites

Make sure you have:
- Node.js
- npm
- A PostgreSQL database

## Installation

### Clone the repository:

```bash
git clone git@github.com:bakerboy410/Oak-Apartment-Inventory.git
cd Oak-Apartment-Inventory
```

### Install dependencies:

```bash
npm install
```

### Environment Variables

Create a .env file in the project root:

```text

DATABASE_URL="your-postgresql-connection-string"
```

The DATABASE_URL should contain the connection string for the PostgreSQL database.

Do not commit the .env file or database credentials to the repository.

### Prisma

Generate the Prisma client:

```bash
npx prisma generate
```

Run the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Database

The application uses PostgreSQL with Prisma.

The project was initially developed using SQLite during development and was later migrated to PostgreSQL before production deployment.

The production database is hosted on Neon.

## Deployment

The application is deployed using Vercel.

The production environment requires the DATABASE_URL environment variable to be configured in Vercel.

The PostgreSQL database is hosted separately on Neon, keeping the application and database independent of the deployment environment.

## Development Notes

This project was built specifically for Oak Apartments and is designed around the operational requirements of the apartment's inventory and trapper management.

The application can be extended as additional inventory, reporting, or administrative requirements are introduced.
