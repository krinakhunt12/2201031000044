# Stylon - E-commerce Clothing Website

A modern, responsive e-commerce website built with React, Redux Toolkit, and Tailwind CSS for selling clothing items.

## Features

### 🛍️ **Shopping Experience**
- **Product Catalog**: Browse products by category (Men, Women, Kids)
- **Subcategory Navigation**: Detailed product organization (T-shirts, Shirts, Jackets, etc.)
- **Product Cards**: Interactive product display with size/color selection
- **Search Functionality**: Find products with advanced filtering options
- **Responsive Design**: Mobile-first approach with modern UI/UX

### 🛒 **Cart & Checkout**
- **Shopping Cart**: Add/remove items, update quantities, size/color selection
- **Wishlist**: Save favorite items for later
- **Checkout Process**: Complete order flow with shipping and payment
- **Redux State Management**: Centralized cart and wishlist management

### 👤 **User Management**
- **User Authentication**: Login/Signup with form validation
- **User Profiles**: Manage personal information and preferences
- **Order History**: Track past purchases and order status
- **Secure Routes**: Protected pages for authenticated users

### 🔐 **Admin Dashboard**
- **Admin Authentication**: Separate admin login system
- **Product Management**: Add, edit, and remove products
- **Order Management**: Process and track customer orders
- **User Management**: Monitor user accounts and activity
- **Analytics**: Dashboard overview with key metrics

### 🎨 **UI/UX Features**
- **Toast Notifications**: Success/error messages for user actions
- **Loading States**: Smooth user experience with loading indicators
- **Image Integration**: High-quality Unsplash images for products
- **Modern Design**: Clean, professional aesthetic with Tailwind CSS

## Tech Stack

- **Frontend**: React 18, React Router DOM
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Icons**: Lucide React, Heroicons
- **Build Tool**: Vite
- **Package Manager**: npm

## Project Structure

```
Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   ├── Pages/              # Page components
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux slices (cart, wishlist, auth)
│   │   └── hooks.js        # Custom Redux hooks
│   ├── contexts/           # React Context providers
│   ├── constants/          # Data constants and collections
│   └── routes.jsx          # Application routing
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Stylon
   ```

2. **Install dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## Usage

### For Users
1. **Browse Products**: Navigate through categories and subcategories
2. **Add to Cart**: Select size/color and add items to cart
3. **Manage Wishlist**: Save items for later purchase
4. **Complete Purchase**: Go through checkout process
5. **Track Orders**: View order history and status

### For Admins
1. **Admin Login**: Use `admin@stylon.com` / `admin123`
2. **Dashboard Access**: Manage products, orders, and users
3. **Product Management**: Add new products or update existing ones
4. **Order Processing**: Update order status and track fulfillment

## Key Components

### Redux Store
- **Cart Slice**: Manages shopping cart state and operations
- **Wishlist Slice**: Handles wishlist functionality
- **Auth Slice**: Manages user authentication and admin access

### Toast System
- **ToastContext**: Centralized notification management
- **Toast Component**: Reusable notification UI
- **Auto-dismiss**: Configurable notification duration

### Navigation
- **Navbar**: Main navigation with search, cart, and user menu
- **Category Navigation**: Dropdown menus for product categories
- **Responsive Design**: Mobile-friendly navigation

## Features in Detail

### Product Management
- Dynamic product loading with Unsplash images
- Size and color selection
- Sale price display
- Rating and review system
- Category-based organization

### Cart Functionality
- Add/remove items
- Quantity updates
- Size and color tracking
- Total calculation
- Persistent state management

### Search & Filtering
- Real-time search functionality
- Category filters
- Price range filters
- Rating filters
- Sale item filters

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation
- Professional visual design

## Future Enhancements

- **Payment Integration**: Real payment gateway integration
- **Inventory Management**: Stock tracking and management
- **User Reviews**: Product rating and review system
- **Email Notifications**: Order confirmations and updates
- **Analytics Dashboard**: Advanced reporting and insights
- **Multi-language Support**: Internationalization
- **Mobile App**: React Native mobile application

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Stylon** - Where Style Meets Technology
