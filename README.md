# Text2API-Front

# Based on: [Argon Admin Dashboard](https://github.com/ayoubhayda/react-admin-dashboard/tree/master)

## Steps to deploy (manually)

1. Create production build

```bash
npm run build
```

Build will be geneated in `/dist` folder.

2. Upload to s3

- You must have an s3 bucket already created
- Name of the bucket must be your domain name (not yet sure why).
- Upload the contents of the `/dist` folder to you bucket (not the folder iself, only the contents).

3. Modify the poermissions on the bucket

- Go to Permissions
- Disable **Block all public access**

4. Edit the bucket policy

- Replace your domain name.
- Paste the policy in `/extras/bucket.policy.json`

5. Modify bucket properties

- Go to the **Properties** tab.
- Enable **Static website hosting**
- Select "Host a static website"
- Input the name of your index file, in this case `index.html`

Reference [here](https://www.youtube.com/watch?v=_zshr7fswRQ)

## Run with Docker

Build your image with:

```bash
docker build -t yourusername/image-name .
```

Then run your container with:

```bash
docker run -d -p 80:80 yourusername/yourreactapp
```

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/jairogloz/go-budget-front
   cd go-budget-front
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Setting Up Environment Variables

1. Copy the `example.env` file to `.env`:

   ```bash
   cp example.env .env
   ```

2. Open the `.env` file and provide the necessary environment variables. For example:
   ```env
   VITE_GO_BUDGET_BACKEND_URL=http://localhost:8080
   ```

### Running the Application

Start the development server:

```bash
npm run dev
```

### Building for Production

To create a production build, run:

```bash
npm run build
```

### Previewing the Production Bild

To preview the production build locally, run:

```bash
npm run serve
```

### Linting

To lint your code, run:

```bash
npm run lint
```
