# OUTSINC - Outreach Someone In Need of Change

**Lived experience. Real support. No wrong door.**

OUTSINC is a lived-experience–led support and navigation service that helps people facing homelessness, substance use, mental health challenges, and other life crises connect with the right resources, at the right time, in a way that feels safe and human.

## Mission

To provide compassionate, person-centred support and navigation for people impacted by homelessness, substance use, mental health challenges, poverty, and systemic barriers — meeting people where they are, helping them define their own goals, and walking with them as they build safer, more stable, and more hopeful lives.

## Vision

We envision a community where:
- No one is left outside without options
- People can access help without shame, judgement, or impossible rules
- Lived and living experience is treated as expertise
- Systems work together instead of pushing people around
- Housing, health, safety, and belonging are treated as basic human rights

## Core Values

- **Person-Centred** – You are the expert on your own life
- **Lived Experience at the Centre** – Our team has been there
- **Harm Reduction** – We don't require abstinence to offer help
- **Accessibility** – We remove barriers wherever we can
- **Self-Determination** – You choose your goals
- **Acceptance & Non-Judgement** – You don't need to be "polite" to deserve help
- **Collaboration** – We connect services, not replace them
- **Accountability & Transparency** – We're clear about what we can and cannot do
- **Advocacy & Systems Change** – Individual support matters, but so does changing the conditions

## About This Application

This web application is built for OUTSINC to serve the Cobourg and Northumberland County community with a comprehensive digital platform that includes:

### Features

1. **Public Landing Page**
   - Clear CTAs for "Find Help Now" and "Self-Refer"
   - Floating Login and Report buttons
   - Comprehensive information about services
   - Crisis resources prominently displayed

2. **Client Self-Referral System**
   - 3-step trauma-informed intake process
   - Digital consent management
   - Smart intake survey with conditional logic
   - Account creation and secure login

3. **Case Management Tools** (for workers)
   - Client profiles and case notes
   - Individual service plans
   - Task and follow-up tracking
   - Assessment history and timelines
   - Time tracking

4. **Incident Reporting** (for businesses/public)
   - Quick online reporting for incidents
   - Status tracking and assignment
   - Compassionate response coordination

5. **Resource Directory**
   - Searchable database of services
   - Warm referral system
   - Partner agency management

6. **Engagement & Community**
   - Events calendar
   - News and impact updates
   - Donation integration
   - Partner application system

7. **Forum & Communication**
   - Blog/story submission with review
   - FAQ system
   - Q&A submission

8. **eLearning Platform**
   - Toolkits and guides
   - Training courses
   - Public awareness resources

## Technology Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Authentication**: JWT with bcrypt
- **API**: RESTful architecture

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/acesonder/godsend.git
   cd godsend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   ```bash
   # Create database
   psql -U postgres -c "CREATE DATABASE outsinc;"
   
   # Run schema
   psql -U postgres -d outsinc -f server/config/database.sql
   ```

4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Start the server:
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

6. Access the application:
   - Open browser to http://localhost:5000
   - API documentation at http://localhost:5000/api

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/change-password` - Change password

### Self-Referral
- `POST /api/self-referral/step1/client-info` - Submit client information
- `POST /api/self-referral/step2/account-setup` - Create account
- `POST /api/self-referral/step3/consent` - Set consent preferences
- `GET /api/self-referral/agencies` - Get available agencies

### Incident Reports
- `POST /api/incident-reports/submit` - Submit public report
- `GET /api/incident-reports/types` - Get report types
- `GET /api/incident-reports` - List reports (worker/admin)
- `GET /api/incident-reports/:id` - Get specific report
- `PUT /api/incident-reports/:id` - Update report
- `POST /api/incident-reports/:id/assign` - Assign to worker
- `GET /api/incident-reports/stats` - Get statistics

## Security

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- Input validation with express-validator
- Prepared statements for SQL injection prevention
- CORS configuration
- Environment variable protection

## Trauma-Informed Design

The application follows trauma-informed principles:

- **Language**: "Would you like to share..." instead of "You must answer"
- **Control**: Visible options to skip, pause, save, and delete responses
- **Soft edges**: Calming colors, plain language, clear explanations
- **Predictability**: Progress bars, time estimates, clear next steps
- **Privacy**: Strong consent management and confidentiality

## Contributing

OUTSINC is rooted in lived experience. We welcome contributions from:
- People with lived/living experience
- Partner organizations
- Community members
- Developers and designers

## License

ISC License - Copyright (c) 2024 OUTSINC

## Contact

Serving Cobourg and Northumberland County

**Crisis Resources:**
- 4 County Crisis: 1-866-995-9933
- NORS Crisis Line: 1-877-688-6677
- Emergency: 911

---

*We walk the streets you walk. We understand because we've been there.*
