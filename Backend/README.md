# 🎬 Mad4Movies - Backend API

Professional Node.js backend service for Mad4Movies built with **Express.js 5.1** following **MVC architecture**. Features enterprise-grade security, authentication, and scalable MongoDB integration.

## 🔐 **Security Features**

### **Multi-Layer Authentication**
* **JWT Tokens** - Stateless authentication with configurable expiration
* **bcrypt 6.0** - Industry-standard password hashing with salt rounds
* **Session Management** - Secure user sessions with automatic cleanup
* **Rate Limiting** - DDoS protection and API abuse prevention

### **OAuth Integration**
* **Google OAuth 2.0** - Seamless third-party authentication
* **Passport.js Strategies**:
  * `passport-local` - Username/password authentication
  * `passport-google-oauth20` - Google OAuth integration
* **Secure Token Exchange** - Protected OAuth flow with proper validation

## 🗄️ **Database Design**

### **MongoDB with Mongoose 8.15**
* **User Schema** - Profile management, authentication, preferences
* **Movie Collections** - Watchlists, favorites, ratings, reviews
* **Review System** - Community reviews with like/dislike functionality
* **Session Storage** - Secure session management
* **Optimized Indexing** - Performance-tuned database queries

### **Data Relationships**
* **User ↔ Movies** - Many-to-many relationships for watchlists/favorites
* **User ↔ Reviews** - One-to-many for review authorship
* **Review ↔ Likes** - Social engagement tracking
* **Referential Integrity** - Proper data consistency and validation

## 🛠️ **Technology Stack**

### **Core Framework**
* **Node.js** - JavaScript runtime environment
* **Express.js 5.1.0** - Latest web framework with enhanced performance
* **MongoDB** - NoSQL database for flexible data storage
* **Mongoose 8.15.1** - Advanced ODM with schema validation

### **Security & Authentication**
* **jsonwebtoken 9.0.2** - JWT implementation for stateless auth
* **bcrypt 6.0.0** - Password hashing with configurable rounds
* **passport 0.7.0** - Authentication middleware
* **passport-local 1.0.0** - Local authentication strategy
* **passport-google-oauth20 2.0.0** - Google OAuth integration
* **express-rate-limit 7.5.0** - API rate limiting middleware

### **Middleware & Utilities**
* **express-session 1.18.1** - Session management
* **cors 2.8.5** - Cross-origin resource sharing
* **body-parser 2.2.0** - Request body parsing
* **nanoid 3.3.6** - Secure unique ID generation

### **Development Tools**
* **nodemon 3.1.10** - Development server with hot reloading
* **ESLint** - Code quality and consistency
* **Environment Variables** - Secure configuration management

### **Security Configuration**
* **Rate Limiting** - 100 requests per 15-minute window
* **Password Requirements** - Minimum 8 characters with complexity rules
* **JWT Expiration** - 7-day access tokens with refresh capability
* **Session Security** - HTTP-only cookies with secure flags
* **CORS Policy** - Configured for frontend domain

## 🔒 **Security Best Practices**

### **Authentication Security**
* **Secure password hashing** with bcrypt and configurable salt rounds upto 12
* **JWT token validation** with proper signature verification
* **Session hijacking prevention** with secure cookie settings
* **OAuth security** with state parameter validation

### **API Security**
* **Rate limiting** to prevent abuse and DDoS attacks
* **Input validation** and sanitization for all endpoints
* **CORS configuration** to control cross-origin access
* **Error handling** that doesn't leak sensitive information

### **Database Security**
* **Mongoose validation** for data integrity
* **Indexed queries** for performance and security
* **Connection security** with proper authentication
* **Data encryption** for sensitive user information

## 📊 **Performance Features**

### **Database Optimization**
* **Efficient indexing** on frequently queried fields
* **Connection pooling** for optimal database performance
* **Query optimization** with Mongoose aggregation pipelines
* **Caching strategies** for frequently accessed data

### **Server Performance**
* **Express 5.1 features** for enhanced performance
* **Middleware optimization** with proper ordering
* **Memory management** with efficient data structures
* **Response compression** for faster API responses

## 📈 **Scalability Considerations**

* **Modular architecture** for easy feature addition
* **Database indexing** for query performance
* **Caching layer** ready for Redis integration
* **Load balancing** compatible architecture
* **Microservices** migration pathway available

## 🛡️ **Monitoring & Logging**

* **Request logging** for debugging and analytics
* **Error tracking** with detailed stack traces
* **Performance monitoring** for response times
* **Security logging** for authentication events
* **Database query monitoring** for optimization

---

**Built with ❤️ using Node.js, Express.js, and MongoDB**

*Part of the Mad4Movies full-stack application ecosystem*