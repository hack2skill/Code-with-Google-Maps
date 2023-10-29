## Team Name

XAEA12

## Problem Statement

Currently, Google offers Direction Requests insights (Count of unique customers seeking directions to your business, adjusted for multi-tapping, cancellations, and spam) as a part of Google Business Profile performance metrics. 
However, for a new business who wishes to set up a store in a particular locality, there is little to no data available on the customer density.

## Team leader email

tijinabet@gmail.com

## A brief of the prototype

# Idea
Develop an application utilizing the Google Maps Places API to extract business details and create heatmaps, addressing the problem of understanding market demand in specific geographic areas.	

# Solution
Our application collects data on business activity, including visit trends, and visualizes it using heatmaps. This helps businesses and local authorities make data-driven decisions, optimize operations, and identify growth opportunities.

## Tech stack

Next.js (with TypeScript) for the frontend, with Flask for the backend. We use Google maps APIs such as Places API to get place data, autofill as well as visualization information for creating heatmaps.

## Step by Step code execution instructions

First, edit the code to insert your API key with Places API enabled in 
app/.env
api/.env
.env
app/page.tsx

Install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
```

Run 

```npm run build
```

to build the packages.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The Flask server will be running on [http://127.0.0.1:5328](http://127.0.0.1:5328) – feel free to change the port in `package.json` (you'll also need to update it in `next.config.js`).
