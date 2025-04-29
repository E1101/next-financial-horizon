This is a [Next.js](https://nextjs.org) project bootstrapped with [`npx create-next-app@14`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components which were bootstrapped with:

```bash
npx shadcn@2.3.0 init
```

The components are built on top of [Tailwind CSS](https://tailwindcss.com/) version 3 and offer a set of accessible, reusable, and composable UI components that can be copied and pasted into the application.

To add new components, use the shadcn CLI:

```bash
npx shadcn@2.3.0 add [component-name]
```

## Monitoring

This project has Sentry monitoring enabled for error tracking and performance monitoring. It was set up with:

```bash
npx @sentry/wizard@latest -i nextjs --saas --org my-organization-rz --project javascript-nextjs
```

## Dependencies

This project uses the following packages:

| Package | Description |
|---------|-------------|
| [query-string](https://github.com/sindresorhus/query-string) | Parse and stringify URL query strings |
| [react-countup](https://github.com/glennreyes/react-countup) | A React component that animates counting from one value to another |
| [chart.js](https://www.chartjs.org/) | Simple yet flexible JavaScript charting library for creating interactive charts |
| [react-chartjs-2](https://react-chartjs-2.js.org/) | React components for Chart.js, providing an easy way to use Chart.js in React applications |
| [node-appwrite](https://github.com/appwrite/sdk-for-node) | Appwrite SDK for Node.js to interact with Appwrite backend services |
| [react-plaid-link](https://github.com/plaid/react-plaid-link) | React component for integrating with Plaid Link |
| [plaid](https://github.com/plaid/plaid-node) | Node.js client library for the Plaid API |
| [dwolla-v2](https://github.com/Dwolla/dwolla-v2-node) | Node.js client library for the Dwolla API, enabling payments and transfers |


