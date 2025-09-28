# Million Properties Frontend

A modern web application for real estate property management and visualization, built with Next.js 15 and React 19.

## Features

### Property Dashboard
- Paginated property listing with advanced filters
- Search by name and address
- Price filters (minimum and maximum)
- Smooth navigation with filter persistence
- Error handling with automatic retries
- Responsive design optimized for all devices

### Property Details
- Detailed view of each property
- Complete information including features, prices and location
- Intuitive navigation with back button
- Optimized image loading

### Intelligent Chatbot
- Virtual assistant specialized in real estate
- OpenAI integration for intelligent responses
- Automatic lead capture for interested users
- Contact information and offices
- Google Sheets integration for lead management

### Design and UX
- Mandalay color palette for consistent branding
- Optimized typography (Cinzel)
- Reusable components with SCSS Modules
- Smooth animations and transitions
- Accessibility and UX best practices

## Technologies

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styles**: SCSS Modules, CSS Variables
- **State**: React Context API
- **HTTP**: Axios for API calls
- **Testing**: Jest, React Testing Library
- **AI**: OpenAI API for chatbot
- **Integration**: Google Sheets API for leads
- **Authentication**: JWT for Google Sheets

## Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm or bun

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/daveshb/million-properties-front.git
cd million-properties-front
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Configure environment variables**
Create `.env` file in the project root:
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5049

# OpenAI Configuration
NEXT_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here

# Google Sheets Configuration
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_SHEET_NAME=leads
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open in browser**
Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/          # Dashboard page
│   ├── properties/         # Property pages
│   ├── api/               # API Routes
│   └── layout.tsx         # Main layout
├── components/            # Reusable components
│   ├── propertyCard/      # Property card
│   ├── pagination/        # Pagination component
│   └── chatbot/          # Chatbot and provider
├── context/              # React contexts
├── hooks/                # Custom hooks
├── services/             # API services
├── types/                # TypeScript definitions
└── utils/                # Utilities
```

## Testing

The application includes unit tests for:
- Main components (Dashboard, PropertyCard, PropertyDetail)
- API services (propertiesService)
- Custom hooks

```bash
npm test
```


## Responsive Features

- **Mobile First**: Design optimized for mobile devices
- **Tablet**: Adaptation for tablets
- **Desktop**: Complete experience on desktop
- **Touch Friendly**: Optimized touch interactions

## Security

- Environment variables for sensitive data
- Input validation in forms
- Secure JWT token handling


---