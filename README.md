🚀 Linklyst Frontend
A modern, scalable frontend for Linklyst URL Shortener, built with Angular 17+ and a clean, responsive UI. This application allows users to manage, shorten, secure, and track URLs seamlessly.

🧰 Tech Stack
**Angular 17**+ – Modern frontend framework
**TypeScript** – Strongly typed JavaScript
**PrimeNG** – Rich UI component library
**Tailwind CSS** – Utility-first styling for rapid UI development
**RxJS** – Reactive programming for async data handling

✨ Features
🔐 **Authentication**
User Signup & Login
JWT-based authentication (via backend)
Protected routes using guards
Session handling
🔗 **URL Management**
Create short URLs
Edit existing URLs
Delete URLs
**View all shortened URLs in dashboard**
🚀 Redirect System
Instant redirection from short URL → original URL
Optimized API calls for fast performance
🔒 **Secure URLs**
Add password protection to URLs
Access control before redirect
Secure sharing of sensitive links
📊** Dashboard (Planned / Extendable)**
View total links created
Click analytics (future enhancement)
Usage stats
📱** Responsive Design**
Fully responsive UI
Mobile-first approach
Works across devices (mobile, tablet, desktop)
⚙️ Setup & Installation
# Clone repo
git clone https://github.com/your-username/linklyst-frontend.git

# Install dependencies
npm install

# Run development server
ng serve

App will run on:

http://localhost:4200
🔌 Environment Configuration

Update API base URL in:

src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
🔐 Authentication Flow
User logs in / signs up
Backend returns JWT token
Token stored in local storage / memory
Interceptor attaches token to API requests
Guards protect private routes
🧠 Future Enhancements
URL analytics (click tracking, geo data)
QR code generation
Custom alias for URLs
Expiry-based URLs
Dark mode support
PWA support
📌 Best Practices Used
Modular architecture (feature-based structure)
Reusable UI components
Clean separation of concerns
Scalable folder structure
API abstraction layer
🤝 Contribution

Feel free to fork the repo and submit PRs. Suggestions and improvements are always welcome!

📄 License

MIT License

💡 Built with ❤️ for scalable microservice architecture (Linklyst ecosystem)
