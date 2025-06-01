# Transformer Asset Dashboard

This is a web application that ingests Transformer asset data from a JSON dataset and visualizes it to the user in both a **tabular** and **line-chart** format.

## Features

- Asset search by name and filtering by region
- Line chart visualization of voltage readings
- Persistent UI state across tabs and refresh
- Two implementation approaches:
  - **main** branch – native React state & built-in components
  - **feat/redux-antd** branch – enhanced version with `redux-persist` and `Ant Design` UI components

---

## Tech Stack

- **React 19 + Vite**
- **TypeScript**
- **Redux Toolkit + redux-persist**
- **Ant Design**
- **Tailwind CSS**
- **Recharts** for data visualization
- **Docker** for containerized development

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/upesic/dataset-challenge.git
cd dataset-challenge
```

---

## Running the App

### Option 1: Using Docker (Recommended)

> Before you begin, install [Docker Desktop](https://docs.docker.com/get-docker/) and make sure the Docker engine is running.

Start the app with:

```bash
docker-compose up
```

If you're running it for the first time or want to rebuild containers, use:

```bash
docker-compose up --build
```

Wait until both containers (`frontend` and `backend`) are fully initialized. You can monitor their logs directly in the terminal window.
App will be available at: [http://localhost:5173/](http://localhost:5173/)

---

### Option 2: Manual Setup

> Use this if Docker is not available or you encounter any issues running containers.

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

App will be available at: [http://localhost:5173](http://localhost:5173)

---