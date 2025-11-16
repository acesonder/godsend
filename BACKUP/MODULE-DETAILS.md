# Module Details: Features, Benefits & Future Recommendations

---

## 1. Access & Authentication

### Overview / Purpose

Access & Authentication is the gatekeeper of OUTSINC. It decides who gets in, what they see, and how safely they do it. The goal is to be secure without being a pain in the ass, especially for people who lose phones, forget passwords, or share devices.

### Key Features
- **Role-based accounts**
  - Roles: Client, Worker, Shelter Staff, Service Provider, Admin, Public (limited)
  - Each role has a defined permission set
- **Secure login**
  - Email/username + password (hashed)
  - Optional two-factor authentication (2FA) for staff/admin (SMS, app-based, or email code)
- **Account recovery**
  - For clients: security questions, DOB, or "staff-assisted reset"
  - For staff: email reset or admin reset with logging
- **Session management**
  - Auto-logout after inactivity
  - "Remember this device" on personal devices

### Benefits

**For clients:**
- Safer access to their data and plans without random people poking around
- Simpler recovery options that don't require stable email/phone only

**For workers:**
- Clear boundaries: you see what you need, not everyone's everything
- Reduced risk of "oops, I emailed the wrong file to the wrong person"

**For OUTSINC / community:**
- Strong privacy foundation = more trust
- Easier to meet funder/legal expectations around data protection

### Future Recommendations
- Passwordless login for clients (magic links, one-time codes)
- Device fingerprinting for high-risk roles (admins)
- "Session history" page so users can see where/when their account was accessed

---

## 2. Client Intake & Registration

### Overview / Purpose

This is the "front door" into OUTSINC for people needing support. It should feel more like meeting a person than filling out a credit card application.

### Key Features
- **Quick Intake vs. Full Intake**
  - Quick: name (or alias), DOB, how to contact/find them, basic reason for reaching out
  - Full: later, via Needs Assessment & Smart Surveys
- **Staff-led or self-service**
  - Worker can complete intake with the client sitting beside them or in outreach
  - Client can self-register via mobile, kiosk, or computer
- **Flexible identity handling**
  - Option to use "Chosen Name" and "Legal Name"
  - Support for unknown DOB ("approximate age" with notes)

### Benefits

**For clients:**
- Low-pressure start: they don't have to tell you their entire trauma archive on day one
- They get into "the system" even if they have no documents or fixed contact details

**For workers:**
- Captures enough info to start helping quickly
- Allows building deeper intake later when trust exists

**For OUTSINC:**
- Incoming flow is consistent
- No more random sticky notes and untracked "we'll follow up at some point"

### Future Recommendations
- Guided onboarding with friendly UI ("Step 1: Tell us a little about yourself")
- Support for voice or audio-assisted intake for low literacy
- "Intake snapshots" that can be printed/emailed as a simple one-page summary for the client

---

## 3. Consent & Privacy Management

### Overview / Purpose

This is where OUTSINC proves it's not just another system hoarding people's info. Clients control who you talk to, about what, and for how long.

### Key Features
- **Digital consent records**
  - Per agency: shelter, hospital, addiction service, housing office, etc.
  - Scope: "housing only," "health only," or "anything relevant"
- **Consent history**
  - Shows when consent was given, modified, or withdrawn
  - Notes on how consent was obtained (in-person, phone, digital)
- **Limits of confidentiality built-in**
  - Clear explanation of situations where information may be shared without consent (e.g., serious and imminent risk)

### Benefits

**For clients:**
- Real control over their information, not just signing something once
- Can see who has access and change their mind without drama

**For workers:**
- Simple view: "What am I allowed to share?"
- Protects them from accidentally oversharing

**For OUTSINC:**
- Strong ethical backbone
- Easier to demonstrate compliance to funders, legal, and partners

### Future Recommendations
- Client-facing consent dashboard where they can toggle agencies on/off
- Standardized "consent packs" (e.g., "Housing bundle", "Health bundle")
- Push notifications when consents are about to expire

---

## 4. Needs Assessment & Smart Surveys

### Overview / Purpose

This is where the system learns what's going on in someone's life: housing, health, income, safety, relationships, and goals. The "smart" part is that it adjusts to the person, instead of making everyone answer every question.

### Key Features
- **Modular sections**
  - Housing, substance use, mental health, physical health, income, ID, legal, daily life, supports, goals, etc.
- **Trauma-informed UX**
  - One topic at a time
  - "Skip question," "Not sure," "Prefer not to say"
  - Clear explanation: "Why we're asking"
- **Conditional logic**
  - If no substance use → skip detailed substance questions
  - If no current legal issues → skip justice section
- **Save & resume**
  - Clients or workers can come back later without losing progress

### Benefits

**For clients:**
- Less overwhelming, more respectful
- They don't feel forced to disclose everything in one sitting

**For workers:**
- Gets a structured view of needs without manually cobbling together notes
- Highlights priority areas automatically (e.g., housing + safety)

**For OUTSINC:**
- Standardized data for analysis and advocacy
- Easy to tweak question sets per project/funder

### Future Recommendations
- Multiple "profiles" of surveys (e.g., youth, families, justice-involved)
- Periodic mini-check-ins instead of one giant annual re-assessment
- Smart language level adjustment (simpler wording if user selects "easy read" mode)

---

## 5. Risk Assessment & Safety Planning

### Overview / Purpose

This module identifies immediate and ongoing safety risks and builds practical, client-centred plans for what to do when things escalate.

### Key Features
- **Structured risk questions**
  - Suicidal thoughts, self-harm, harm to others
  - Overdose risk
  - Violence/abuse, exploitation
  - Severe self-neglect, medical risk
- **Risk level tagging**
  - Low / medium / high with clear criteria
- **Safety plan builder**
  - "When I feel X, I will try Y, call Z, and avoid…"
  - Contacts: safe people, crisis lines, services
- **Alerts & prompts**
  - If risk is high → prompt worker about next steps (according to your policy)

### Benefits

**For clients:**
- They get a say in what happens when things are bad (instead of being steamrolled by "policy")
- Concrete plan they can refer back to

**For workers:**
- Framework to guide difficult conversations
- Documentation of actions and rationale for supervision/legal

**For OUTSINC:**
- More consistent risk handling
- Evidence that you take safety seriously, but still centre autonomy

### Future Recommendations
- Printable "pocket version" of safety plans
- Option for clients to open their own safety plan during crises from the portal ("Crisis mode" UI)
- Aggregate risk pattern analysis (e.g., "we're seeing rising risk levels in X group/location")

---

## 6. Quality of Life Tracking (QOL)

### Overview / Purpose

QOL is your "before and after" lens. It captures how life feels and how behaviours change over time, not just bureaucratic outcomes like "housed/not housed."

### Key Features
- **Client-rated scales**
  - Safety, hope, connection, stress, sleep, emotional wellbeing, physical health, sense of control
- **Behavioural markers**
  - ER visits, police contact, nights in shelter, nights outside, overdose events
- **Time-based graphs**
  - Change over months/years per person
  - Aggregated for populations

### Benefits

**For clients:**
- Visual proof of small improvements that might otherwise be invisible
- Opportunity to reflect: "Weird, I do feel a bit safer than before"

**For workers:**
- Concrete way to talk about progress without "You should be better by now"
- Helps focus on what's improving vs. what's stuck

**For OUTSINC:**
- Gold for impact reports, grants, council presentations
- Helps show that housing/support changes more than just addresses

### Future Recommendations
- Client-written "narrative check-ins" linked to QOL points
- Option for clients to choose which QOL domains matter most to them
- Comparative views: before/after major events (housing, detox, court outcome)

---

## 7. Case Management & Notes

### Overview / Purpose

This is the living story of the work: contacts, appointments, progress, setbacks, decisions. It's where "we'll remember" actually becomes true.

### Key Features
- **Client profiles**
  - Overview of situation, key supports, flags (risk, consents, etc.)
- **Case notes**
  - Time-stamped, worker-tagged, with categories (crisis, housing, harm reduction, etc.)
  - Clear distinction between factual notes and interpretation
- **Goals & action plans**
  - Objectives, steps, responsible person, deadlines, status
- **Task management**
  - Per-client and per-worker task lists
- **Attachments (if enabled)**
  - Photos of ID, letters, forms, etc.

### Benefits

**For clients:**
- Reduced chance of repeating their story when workers change
- Consistent follow-up on what they actually asked for

**For workers:**
- Everything in one place; no more chasing notebooks
- Easier supervision, reflection, and handover

**For OUTSINC:**
- Stronger continuity of care
- Clear record if anything is challenged (complaints, reviews, audits)

### Future Recommendations
- Copy-safe "client view" of their story in plain language
- Tagging system for themes (system barriers, discrimination, etc.) for advocacy
- AI-assisted note summaries (with manual review)

---

## 8. Harm Reduction Ordering & Inventory (TweakEasy-style)

### Overview / Purpose

This turns your harm reduction supply flow into something that's organized, responsive, and data-informed without feeling like a police database.

### Key Features
- **Product catalogue**
  - Syringes, stems, bowls, naloxone, condoms, safer sex supplies, wipes, sharps containers, etc.
- **Order creation**
  - By staff or client (depending on model)
  - Choice of pickup, delivery, or outreach handoff
- **Presets & favourites**
  - Standard "night outreach kit," "intro safer use kit," etc.
- **Order statuses**
  - New, preparing, delivered, missed, cancelled
- **Inventory tracking**
  - Per location (office, van, outreach kits, partner agencies)

### Benefits

**For clients:**
- More predictable access to supplies
- Reduced "no stock" frustration, which directly impacts safety

**For workers:**
- Faster order processing = more time with people
- Clear inventory = less panic about running out

**For OUTSINC:**
- Real-time data on what's being used, where, and by whom (anonymized)
- Stronger case for funding harm reduction programs

### Future Recommendations
- Client self-ordering via app/portal
- Auto-reorder triggers when inventory hits threshold
- Integration with public health reporting (anonymous overdose trends, drug alerts)

---

## 9. Resource Directory & Referral Engine

### Overview / Purpose

Make it easy to find and connect to local services without 47 tabs open.

### Key Features
- **Searchable directory**
  - Shelters, health, mental health, legal, food, ID clinics, outreach, etc.
- **Filters**
  - Location, hours, eligibility, population (youth, women, 2SLGBTQIA+, Indigenous, etc.)
- **"Warm referral" function**
  - Send details with consent

### Benefits

**For clients:**
- Easier to see what's out there
- Less "try this place, oh wait they're closed on weekends"

**For workers:**
- Quick lookups during conversations
- Documented referrals for follow-up

**For OUTSINC:**
- Better coordination with community partners
- Data on referral patterns and service gaps

### Future Recommendations
- Real-time availability (beds, appointments)
- Feedback loop: "Did this referral work out?"
- Public-facing "light version" for community members

---

## 10. Public / Business Reporting & Response

### Overview / Purpose

Give the community a way to raise concerns that leads to support, not just displacement.

### Key Features
- **Public form to report:**
  - Needles/sharps
  - Encampments/tents
  - Welfare concerns about a person
  - Abandoned belongings
  - "Not sure, but something's wrong"
- **Basic context + education in the form itself**
- **Internal dashboard for handling reports**

### Benefits

**For public/businesses:**
- Clear path to get help instead of calling police
- Transparency about what happens next

**For workers:**
- Organized queue of concerns to address
- Context before going into situations

**For OUTSINC:**
- Proactive outreach opportunities
- Data on community concerns and hotspots

### Future Recommendations
- Map view of reports for route planning
- Automated status updates to reporters
- Anonymous feedback: "Was this helpful?"

---

## 11. Events, News & Community Engagement

### Overview / Purpose

Keep the community informed and connected to what's actually happening.

### Key Features
- **Event listing** (outreach days, pop-ups, meetings, community meals)
- **News/posts** about outcomes and system issues
- **"Impact update" snapshots**

### Benefits

**For clients:**
- Know when/where to find support
- See themselves reflected in stories

**For community:**
- Transparency about the work
- Reduced stigma through education

**For OUTSINC:**
- Stronger public support and funding case
- Community-building and trust

### Future Recommendations
- Email/SMS event reminders
- Community feedback surveys
- Integration with social media for wider reach

---

## 12. eLearning & Knowledge Library

### Overview / Purpose

Teach people how to support themselves and others, and reduce stigma.

### Key Features
- **Short guides** (written, audio, video)
- **Toolkits** (overdose response, ID recovery, tenant rights)
- **Courses with simple quizzes** (for staff, volunteers, businesses)

### Benefits

**For clients:**
- Self-directed learning at their own pace
- Practical information they can use immediately

**For workers:**
- Standardized training resources
- Easy to share with clients

**For community:**
- Better understanding of complex issues
- More informed, compassionate responses

### Future Recommendations
- Certificates for course completion
- Multi-language content
- Accessibility features (screen readers, closed captions)

---

## 13. Dashboards & Analytics

### Overview / Purpose

Turn chaos into patterns so you can advocate properly.

### Key Features
- **Staff dashboards:** today's tasks, upcoming appointments, clients needing follow-up
- **Admin dashboards:** number of clients, contacts, surveys, risk flags, supply flows, referrals
- **Visuals:** charts, heatmaps, timelines

### Benefits

**For workers:**
- Clear daily priorities
- Quick overview of caseload

**For supervisors/admin:**
- System-level patterns
- Evidence for advocacy and funding

**For OUTSINC:**
- Data-driven decision making
- Transparent impact reporting

### Future Recommendations
- Customizable dashboards per role
- Predictive analytics (risk trends, service gaps)
- Export templates for common reports

---

## 14. Admin & Configuration

### Overview / Purpose

Keep the whole thing tidy, secure, and adaptable.

### Key Features
- **User and role management**
- **Module toggles** (turn features on/off)
- **Customizable forms and labels**
- **Audit logs**

### Benefits

**For admins:**
- Centralized control
- Easy to adapt as needs change

**For OUTSINC:**
- System stays organized
- Accountability and security

### Future Recommendations
- Bulk user operations
- Version control for form changes
- Automated security audits

---

## 15. Client Self-Service (Portal & Life Dashboard)

### Overview / Purpose

Give clients tools to see their own progress and manage their own stuff.

### Key Features
- **Dashboard:** appointments, tasks, goals, recent notes (client-safe summary), mood check-ins
- **Ability to:**
  - Update some info
  - View their consents
  - Review their own plans
  - Access resources and learning

### Benefits

**For clients:**
- Ownership over their journey
- Reduced dependency on workers for basic info

**For workers:**
- Less time on administrative tasks
- More focus on relationship and support

**For OUTSINC:**
- Client empowerment = better outcomes
- Demonstration of person-centred values

### Future Recommendations
- Goal progress visualization
- Peer messaging/support forums
- Integration with external calendars/reminders

---

## Future / Advanced Modules

### 16. Outreach Field App (Offline-first, mobile)
- Fully offline outreach mode with sync
- GPS route logging and approximate location tagging (privacy-respecting)

### 17. Mapping & Outreach Route Planner
- Heatmaps for: overdoses, complaints, outreach contacts, supply distribution
- Route plans for outreach teams

### 18. Volunteer & Community Partner Portal
- Training modules, schedule sign-ups, feedback/debrief forms
- Partner dashboard for agencies with agreed contexts

### 19. AI Helpers (Careful, Transparent)
- Summarize long case notes into timelines
- Suggest relevant services based on client description
- Translate jargon from government letters into plain language
- Always human review, never autopilot

### 20. VR/XR Training
- Simulated "night outside in winter" or "trying to navigate five agencies" for decision-makers and staff

### 21. White-label Core
- A core OUTSINC engine that other towns can adopt, with:
  - Their services plugged in
  - Their branding
  - Your values & architecture underneath

### 22. Co-Governance Dashboard
- Clients and peers can:
  - Vote on new features
  - Flag problems with wording or policies
  - Propose changes that get formal responses
