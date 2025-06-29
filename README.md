# 🎬 Mad4Movies

Mad4Movies is a professional-grade movie recommendation web application built with the **MERN Stack** following industry-standard **MVC architecture**. Powered by TMDb API and featuring comprehensive security measures, it delivers a Netflix-like experience for movie discovery, community engagement, and personal collection management.

## 🚀 Key Features

### 🔍 **Smart Movie Discovery**
* **Trending & Popular Movies** - Discover what's hot right now with beautiful poster displays, ratings, and genre tags
* **Intelligent Search** - Find movies instantly with debounced search for optimal performance
* **Advanced Filtering System**:
  * Genre filtering (Action, Comedy, Drama, Sci-Fi, and more)
  * Release year selection
  * IMDb rating range slider (0-10 stars)
* **Lazy Loading** - Smooth, performance-optimized browsing experience

### 🎥 **Comprehensive Movie Details**
* **Rich Movie Pages** - Complete movie information including synopsis, cast, crew, and release details
* **Embedded Trailers** - Watch YouTube trailers directly in the app
* **TMDb Integration** - Real-time ratings and comprehensive movie data
* **Smart Recommendations** - Discover related movies based on genre and directors
* **Interactive Navigation** - Click genres to explore similar movies
* **Streaming Availability** - See where movies are available to watch

### 👤 **Complete User Experience**
* **Enterprise-Grade Authentication** - JWT-based security with session management
* **Multi-Strategy Authentication**:
  * Local authentication with bcrypt password hashing
  * Google OAuth 2.0 integration via Passport.js
  * Email verification and secure password recovery
* **Personal Movie Management**:
  * **Watchlist** - Save movies to watch later
  * **Favorites** - Keep track of your all-time favorites  
  * **Watched History** - Mark and track completed movies
  * **Movie Ratings** - Rate movies out of 10 stars
* **Social Profiles** - Visit other users' profiles via clean username URLs
* **Secure Sessions** - Protected user sessions with automatic timeout

### 🗣️ **Vibrant Community Hub**
* **Movie Reviews** - Write and share detailed movie reviews
* **Social Engagement** - Like, react, and interact with other users' content
* **Content Management** - Edit and delete your own reviews
* **Community Discovery** - Connect with fellow movie enthusiasts

### 🎭 **Cast & Crew Exploration**
* **Dedicated Actor/Director Pages** featuring:
  * Comprehensive biographies and career information
  * Top movies and filmography
  * Social media links and external profiles
  * Related content recommendations

### 🎨 **Modern UI/UX Design**
* **Dark/Light Mode** - Toggle between themes for comfortable viewing
* **Smooth Animations** - Enhanced with Framer Motion for fluid interactions
* **Fully Responsive** - Perfect experience across desktop, tablet, and mobile
* **Hero Slider** - Showcase "Greatest of All Time" movies with stunning visuals
* **Premium Typography** - Multiple Google Font families for enhanced readability

### 📋 **Additional Features**
* **Interactive FAQ** - Comprehensive help section with user question submission
* **Legal Compliance** - Complete privacy policy and cookie policy pages
* **Contact System** - Direct communication channel with the development team

## 🛠️ **Technology Stack**

### **Frontend Architecture**
* **React 19** - Latest React features with cutting-edge performance optimizations
* **Vite 6.1** - Lightning-fast build tool with HMR and optimized bundling
* **TypeScript Ready** - Full TypeScript support for type-safe development
* **Redux Toolkit 2.6** - Modern state management with RTK Query integration
* **TanStack React Query 5.76** - Powerful data fetching, caching, and synchronization

### **Styling & Design System**
* **Tailwind CSS** - Utility-first CSS framework for rapid development
* **Styled Components 6.1** - CSS-in-JS for component-scoped styling
* **Tailwind Variants** - Advanced variant API for consistent design patterns
* **Class Variance Authority** - Powerful utility for conditional styling
* **Radix UI** - Accessible, unstyled components for complex UI patterns

### **Typography & Icons**
* **Premium Font Stack**:
  * **Poppins** - Modern, geometric sans-serif for body text
  * **Bebas Neue** - Impact display font for headers and titles
  * **Baloo Bhai 2** - Friendly, rounded font for special elements
* **Icon Libraries**:
  * **Lucide React** - Beautiful, customizable SVG icons
  * **React Icons** - Comprehensive icon library with popular icon sets

### **Animation & Interactions**
* **Framer Motion 12.6** - Production-ready motion library for React
* **React Responsive** - Responsive design utilities and breakpoint management
* **Smooth Transitions** - Optimized animations for 60fps performance

### **Routing & Navigation**
* **React Router DOM 7.2** - Latest routing library with data loading features
* **Slugify** - SEO-friendly URL generation for movie titles and user profiles

### **Backend Architecture**
* **Node.js + Express 5.1** - Latest server-side framework with enhanced performance
* **MVC Pattern** - Clean, maintainable code structure with organized:
  * **Models** - MongoDB schemas and data logic with Mongoose ODM
  * **Routes** - RESTful API endpoints and request handling
  * **Controllers** - Business logic separation and middleware integration
* **MongoDB + Mongoose 8.15** - Modern NoSQL database with advanced ODM features

### **Security & Authentication**
* **JWT (jsonwebtoken 9.0)** - Stateless authentication tokens
* **Passport.js Multi-Strategy**:
  * **passport-local** - Username/password authentication
  * **passport-google-oauth20** - Google OAuth 2.0 integration
* **bcrypt 6.0** - Industry-standard password hashing with latest security features
* **Express Rate Limiting** - DDoS protection and API abuse prevention
* **Express Sessions** - Secure session management with automatic cleanup
* **CORS** - Cross-origin resource sharing configuration

### **Development & Quality Assurance**
* **ESLint 9.19** - Latest linting with React 19 support
* **Jest 29.7** - Comprehensive testing framework
* **React Testing Library** - Component testing utilities
* **User Event Testing** - Realistic user interaction testing
* **Nodemon** - Development server with hot reloading
* **nanoid** - Secure, URL-safe unique ID generation

### **External APIs & Services**
* **TMDb API** - Comprehensive movie database and real-time data
* **YouTube API** - Embedded trailer functionality
* **Google OAuth 2.0** - Secure third-party authentication

## 🏗️ **Architecture Highlights**

### **MVC Pattern Implementation**
* **Models** - Clean data schemas with Mongoose for MongoDB interactions
* **Routes** - Organized API endpoints following RESTful conventions
* **Controllers** - Business logic separation with proper error handling
* **Middleware Integration** - Rate limiting, authentication, and request processing

### **Security-First Approach**
* **Rate Limiting** - Prevents abuse and ensures fair usage across all endpoints
* **JWT + Sessions** - Hybrid authentication for optimal security and performance
* **Password Security** - bcrypt hashing with configurable salt rounds
* **OAuth Integration** - Secure third-party authentication flow

### **Performance Optimization**
* **React Query Caching** - Intelligent data caching and background updates
* **Code Splitting** - Optimized bundle sizes with lazy loading
* **Image Optimization** - Lazy loading and responsive image handling
* **Database Indexing** - Optimized queries for large-scale data operations

### **Modern Development Practices**
* **TypeScript Ready** - Full type safety for scalable development
* **Component Testing** - Comprehensive test coverage with Jest and React Testing Library
* **ESLint Configuration** - Consistent code quality and React 19 best practices
* **Hot Module Replacement** - Lightning-fast development experience with Vite

## 🌟 **What Makes Mad4Movies Special**

Mad4Movies represents a professional-grade entertainment platform that combines Netflix-level user experience with robust social features and enterprise-grade security:

* **Production-Ready Architecture** - Built with MVC patterns and industry best practices
* **Enterprise Security** - Multi-layer protection with rate limiting, JWT, and secure sessions
* **Modern Tech Stack** - Latest versions of React 19, Express 5.1, and cutting-edge libraries
* **Performance Focused** - Optimized with React Query, Vite, and efficient caching strategies
* **Design System** - Consistent UI with Tailwind, Styled Components, and premium typography
* **Developer Experience** - TypeScript support, comprehensive testing, and modern tooling
* **Scalable Design** - MongoDB architecture that grows with your user base
* **Community-Driven** - Social features that create engagement and user retention

Whether you're a movie enthusiast looking for your next favorite film or a developer studying modern full-stack applications, Mad4Movies delivers a comprehensive, professional experience that showcases the power of the modern MERN stack! 🍿

## 🔧 **Technical Specifications**

### **Frontend**
* **React 19.0.0** - Latest React with concurrent features and improved performance
* **Vite 6.1.0** - Next-generation frontend tooling with optimized builds
* **Redux Toolkit 2.6.0** - Modern Redux with RTK Query integration
* **TanStack React Query 5.76.2** - Advanced data synchronization and caching
* **Framer Motion 12.6.2** - Production-ready animations and gestures

### **Backend**
* **Express 5.1.0** - Latest framework features and performance improvements
* **Mongoose 8.15.1** - Advanced MongoDB ODM with enhanced validation
* **JWT 9.0.2** - Secure token-based authentication
* **bcrypt 6.0.0** - Enhanced security with latest hashing algorithms

### **Development**
* **ESLint 9.19.0** - Latest linting rules and React 19 support
* **Jest 29.7.0** - Comprehensive testing framework
* **TypeScript Support** - Full type safety with React 19 types
* **Rate Limiting** - Configurable request throttling for API protection