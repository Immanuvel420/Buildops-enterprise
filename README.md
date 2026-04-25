# BuildOps Nexus | Enterprise Infra Monitoring

BuildOps Nexus is a futuristic enterprise-grade infrastructure monitoring platform designed for smart mall management. It provides a seamless interface for customers to report issues, maintenance workers to track tasks, and administrators to gain high-level operational insights.

## 🚀 Key Features

- **Multi-Role Ecosystem**: Tailored workflows for Customers, Maintenance Workers, and Administrators.
- **Visual Issue Reporting**: intuitive floor and block selector system for precise issue location reporting with image upload support.
- **Real-time Tracking**: Live status updates for reported issues (Pending, In Progress, Resolved).
- **Maintenance Command Center**: A dedicated dashboard for workers to manage their daily rotation and update repair statuses.
- **Admin Analytics**: High-level data visualization of system health, asset failure distribution, and operational efficiency using Recharts.
- **Futuristic UI**: A high-performance "Glassmorphism" interface built with Tailwind CSS and Framer Motion for smooth transitions.

## 🛠️ Technical Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS (PostCSS)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Build Tool**: Vite

## 🏗️ Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

- `src/components/UserFlow`: Components for customer issue reporting.
- `src/components/WorkerPanel`: Maintenance worker management tools.
- `src/components/AdminPanel`: Administrative analytics and overviews.
- `src/services`: Core logic and data handling (formerly featured AI scanning).
- `src/types.ts`: Centralized TypeScript definitions for data integrity.

## 🛡️ Security & Privacy

The platform implements role-based access control (RBAC) to ensure that sensitive infrastructure data and maintenance logs are only accessible to authorized personnel.

---
*Built for the next generation of smart infrastructure management.*
