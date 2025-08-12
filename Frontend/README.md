# Stylon E-commerce Frontend

A modern, responsive e-commerce application built with React, Redux Toolkit, and TailwindCSS.

## 🚀 Features

### ✅ Authentication System
- **User & Admin Login**: Separate login forms with visual distinction
- **Modal-based Authentication**: Clean, accessible popup modals with smooth transitions
- **Form Validation**: Client-side validation with error handling
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **High Z-index**: Modals appear above all other elements (z-index: 9999)

### ✅ Shopping Cart
- **Add to Cart**: One-click product addition with size/color selection
- **Real-time Updates**: Cart count badge updates immediately
- **Persistent State**: Cart items persist across sessions
- **Quantity Management**: Easy quantity adjustment
- **No Navigation**: Add to Cart button doesn't navigate, only adds to cart

### ✅ Search & Discovery
- **Smart Search**: Real-time product suggestions with debouncing
- **Search Suggestions**: Modern dropdown with product images, prices, and ratings
- **Recent Searches**: Local storage for search history
- **Responsive Search**: Works on all device sizes
- **Smooth Animations**: Slide-in animations for search suggestions

### ✅ Product Management
- **Product Detail Pages**: Comprehensive product information
- **Image Galleries**: Multiple product images with thumbnails
- **Size & Color Selection**: Interactive product customization
- **Wishlist Functionality**: Save products for later
- **Rating & Reviews**: Display product ratings and review counts

### ✅ Category & Subcategory Pages
- **Grid/List Views**: Toggle between different viewing modes
- **Sorting Options**: Price, rating, newest, featured
- **Filter System**: Price range, sizes, colors, brands
- **Responsive Layout**: Optimized for all screen sizes
- **Enhanced Design**: Better spacing, hover effects, and modern styling

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Modal, Button, etc.)
│   ├── auth/            # Authentication components
│   ├── search/          # Search-related components
│   └── ...
├── features/            # Feature-based Redux slices
│   ├── auth/            # Authentication state management
│   ├── cart/            # Shopping cart functionality
│   └── wishlist/        # Wishlist management
├── pages/               # Route-level components
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   └── ...
├── hooks/               # Custom React hooks
│   ├── useAuth.js       # Authentication state management
│   ├── useSearch.js     # Search functionality
│   └── ...
├── services/            # API and external services
│   ├── searchService.js # Product search functionality
│   └── ...
├── utils/               # Helper functions and utilities
│   ├── helpers.js       # Common utility functions
│   └── ...
├── store/               # Redux store configuration
│   ├── index.js         # Store setup
│   └── hooks.js         # Redux hooks
├── contexts/            # React contexts
│   └── ToastContext.jsx # Toast notifications
└── constants/           # Static data and constants
    ├── products.js      # Product data
    └── ...
```

## 🛠️ Technology Stack

- **React 19** - Modern React with hooks
- **Redux Toolkit** - State management with RTK Query
- **React Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Secondary**: Gray scale
- **Accent**: Red for admin features
- **Success**: Green for positive actions
- **Error**: Red for errors

### Typography
- **Font**: Poppins (Google Fonts)
- **Headings**: Bold, large text
- **Body**: Regular, readable text
- **Captions**: Small, muted text

### Components
- **Buttons**: Rounded corners, hover effects, scale animations
- **Cards**: Subtle shadows, hover animations
- **Modals**: Backdrop blur, smooth transitions, high z-index
- **Forms**: Clean inputs, validation states

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Features
- **Mobile-first**: Designed for mobile first
- **Touch-friendly**: Large touch targets
- **Flexible layouts**: Grid and flexbox
- **Optimized images**: Responsive images

## 🔧 Development

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Code Quality
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety (optional)
- **Component Structure**: Consistent patterns

### Best Practices
- **Component Composition**: Reusable components
- **State Management**: Redux Toolkit patterns
- **Performance**: React.memo, useMemo, useCallback
- **Accessibility**: ARIA labels, keyboard navigation

## 🚀 Deployment

### Build Process
```bash
# Create production build
npm run build

# Preview build
npm run preview
```

### Environment Variables
```env
VITE_API_URL=your_api_url
VITE_APP_NAME=Stylon
```

## 📊 Performance

### Optimizations
- **Code Splitting**: Route-based splitting
- **Lazy Loading**: Component lazy loading
- **Image Optimization**: WebP format, responsive images
- **Bundle Analysis**: Webpack bundle analyzer

### Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security

### Features
- **Input Validation**: Client and server-side
- **XSS Protection**: React's built-in protection
- **CSRF Protection**: Token-based protection
- **Secure Headers**: Content Security Policy

## 📈 Analytics

### Tracking
- **Page Views**: React Router integration
- **User Actions**: Custom event tracking
- **Performance**: Core Web Vitals
- **Errors**: Error boundary and logging

## 🤝 Contributing

### Guidelines
1. **Fork** the repository
2. **Create** a feature branch
3. **Commit** your changes
4. **Push** to the branch
5. **Create** a Pull Request

### Code Style
- **ESLint**: Follow linting rules
- **Prettier**: Consistent formatting
- **Conventional Commits**: Clear commit messages
- **Component Naming**: PascalCase for components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful product images
- **TailwindCSS** for the amazing CSS framework
- **React Team** for the incredible library
- **Redux Team** for state management

---

**Built with ❤️ by the Stylon Team**
