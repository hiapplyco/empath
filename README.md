
<div align="center">
  <img src="public/empath-simple-logo.svg" alt="em.path logo" width="200"/>
  <h1>em.path</h1>
  <p><em>Connecting Hearts, Empowering Care</em></p>
</div>

---

## 🌟 Project Overview

**em.path** is a revolutionary caregiving platform that leverages AI to create meaningful connections between caregivers and care recipients. Our platform streamlines the care matching process while ensuring the highest quality of care delivery.

### 🎯 Core Features

#### For Care Recipients
- 🤖 AI-powered care needs assessment
- 👥 Smart caregiver matching
- 📅 Integrated care scheduling
- ⭐ Quality monitoring and feedback
- 👨‍👩‍👦 Family coordination tools

#### For Caregivers
- 📝 Intelligent onboarding process
- 🎓 Skills verification
- 📊 Dynamic scheduling
- 💰 Automated payments
- 📈 Professional development

## 🛠️ Technical Stack

### Frontend
- ⚛️ **React** with TypeScript
- 🏃‍♂️ **Vite** for blazing fast development
- 🎨 **Tailwind CSS** for styling
- 🎭 **shadcn/ui** for component library

### Backend
- 🔥 **Supabase** for:
  - 🔐 Authentication
  - 📦 Database
  - 📁 File storage
  - ⚡ Edge Functions

### AI Integration
- 🧠 **Google Gemini** for intelligent processing

## 🏗️ Architecture

The application follows a modern, component-based architecture with:

- 📱 Responsive design
- 🔄 State management using React Query
- 🔒 Role-based access control
- 🌐 Real-time capabilities

## 🔐 Security Features

- 🛡️ JWT-based authentication
- 🔒 Row Level Security (RLS)
- 📜 Audit logging
- 🔐 Secure file handling

## 🚀 Getting Started

### Prerequisites
```bash
# Install Node.js & npm - using nvm (recommended)
nvm install node
nvm use node

# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 👩‍💻 Development Guidelines

### Code Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and helpers
└── types/         # TypeScript definitions
```

### Best Practices
- ✅ Follow component-based architecture
- ✅ Use TypeScript for type safety
- ✅ Implement responsive design
- ✅ Write meaningful comments
- ✅ Follow accessibility guidelines

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage
```

## 📦 Deployment

The application can be deployed using various platforms:

1. Vercel (recommended)
2. Netlify
3. Custom hosting

## 🔮 Future Enhancements

- [ ] Enhanced AI matching algorithms
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Integration with health devices

## 📚 Documentation

Comprehensive documentation is available in the `/docs` directory, covering:
- API References
- Component Library
- Database Schema
- Deployment Guides

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines before submitting pull requests.

## 🆘 Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Open a new issue if needed

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<div align="center">
  <p>Built with ❤️ by the em.path team</p>
</div>
