# Standard Operating Procedures (SOPs)

## How Each Module Is Supposed to Work

---

## 4.1 Access & Authentication

**Purpose:** Control who can access what, securely.

### Key Features
- Account creation (client, staff, provider, admin)
- Secure login with hashed passwords
- Role-based permissions
- "Forgot username" and "reset password" flows
- Optional 2FA for staff/admin

### SOP (Staff/Admin)

#### 1. Creating a staff account
- Admin goes to **Admin → Users → Create New User**
- Select role (worker / shelter staff / provider / admin)
- Set initial login details and force password change on first login
- Assign default modules (case management, harm reduction, etc.)

#### 2. Client account creation
Either:
- Client self-registers via "Sign Up / Get Support"; or
- Worker creates a client record during outreach/intake, then invites them to create login later
- Ensure username/password are written down or communicated safely
- Explain that they can reset access later if they forget

#### 3. Password reset
- **For clients:** use the security questions / DOB / unique pattern you chose
- **For staff:** email-based reset or admin-triggered reset

### Basic Rules
- Never share logins between staff
- Admins keep a log of new accounts and role changes
- Regularly review user list and remove/inactivate people who no longer work with the system

---

## 4.2 Client Intake & Registration

**Purpose:** Bring someone into the system in a gentle, structured way that respects their pace.

### Key Features
- Short initial intake form ("quick start")
- Optional full smart intake later
- "Tell us only what you're okay with today" language
- Intake can be done by staff or client themselves

### SOP (Worker-led intake)

1. Confirm who you're talking to and get verbal permission to capture info
2. Open **New Client**
3. Fill in:
   - Name (or chosen name / alias)
   - Date of birth (or approximate if unknown)
   - Basic contact info: phone, email, "where to find you"
   - Emergency contacts (optional, with client permission)
4. Ask: "Would you like to create a login to see your info later, or just keep this on our side for now?"
5. Save record and explain: *"You're now in our system. We can add to this later as you feel comfortable."*

### Client Self-Registration SOP (Public)

1. Client clicks "I need support" / "Get Started"
2. Sees a short explanation: what OUTSINC is, privacy basics
3. Completes:
   - Basic info (as above)
   - Username/password
4. Optional: start the smart intake right away or "Skip for now" and book a contact

---

## 4.3 Consent & Privacy Management

**Purpose:** Make consent explicit, visible, changeable, and not a one-time signature buried in a cabinet.

### Key Features
- Digital consent form: who can OUTSINC talk to, about what, and for how long
- Per-agency consent toggles (e.g., Fourcast, county, hospital)
- History of consent changes
- Emergency / legal exception notices

### SOP (Worker)

1. Once trust is built and some basics are done, open **Client → Consents**
2. Explain clearly:
   - What consent is
   - Which agencies are relevant
   - That they can say yes/no to each
   - That they can change their mind later
3. Walk through each section:
   - "Can we talk to [Agency] about your housing?"
   - "Can we talk to [Agency] about your mental health supports?"
4. Check the appropriate boxes, record date/time, and whether consent is verbal or signed digitally
5. Review the limits of confidentiality (duty to report, serious/immediate risk)
6. Revisit consents:
   - When new agencies appear
   - At major changes (discharge, conflict, etc.)
   - At least annually

---

## 4.4 Needs Assessment & Smart Surveys

**Purpose:** Understand the person's situation in multiple life areas, without overwhelming them.

### Key Features
- Multi-step, trauma-informed questionnaire
- Sections: housing, substances, mental health, physical health, safety, relationships, income, ID, legal, goals, daily life, etc.
- "Skip this question," "I don't know," "Prefer not to say"
- Conditional branching to hide irrelevant sections

### SOP (Worker or Client)

1. Decide: full intake now, or partial + later?
2. Start **Needs Assessment** and pick mode:
   - Worker-led (you read and enter)
   - Self-guided (client uses kiosk/phone/computer)
3. Remind: *"You can skip anything you don't want to answer today."*
4. Work through sections one at a time, pausing for breaks as needed
5. Save progress regularly; system should autosave per page
6. After completion:
   - Review highlights with the client
   - Ask what feels most urgent from their perspective
7. The system generates a summary snapshot and flags (e.g., high housing instability, no ID, current violence, recent OD)

---

## 4.5 Risk Assessment & Safety Planning

**Purpose:** Identify immediate and ongoing risks, and build clear plans to reduce harm.

### Key Features
- Structured risk questions (self-harm, harm to others, exploitation, severe self-neglect, overdose risk, violence)
- Risk level rating (low/moderate/high)
- Safety plan section: who to call, where to go, what to avoid, coping strategies

### SOP (Worker)

1. Use risk assessment:
   - At initial intake if the situation feels acute
   - When there are big changes (relapse, conflict, new housing, major loss)
2. Ask questions gently, with permission to pass
3. Capture:
   - Current risk
   - Recent incidents (e.g., past 30 days)
4. If risk is high:
   - Create / update **Safety Plan** immediately
   - Discuss concrete steps and supports
   - Trigger internal alert if your policy says so (e.g., notify supervisor)
5. Document:
   - What the client wants to happen if things worsen
   - Which services are okay to contact in crisis
6. Review and update risks regularly

---

## 4.6 Quality of Life Tracking (QOL)

**Purpose:** Measure change over time in a way that feels meaningful to the person, not just a funder.

### Key Features
- Simple, client-rated scales for stress, mood, safety, hope, connection, etc.
- Behavioural indicators (ER visits, arrests, nights outside, etc.)
- Before/after graphs for clients and aggregate

### SOP

1. Do a baseline QOL:
   - At or near first proper engagement
2. Repeat QOL:
   - Every 3–6 months
   - After major life changes (housed, big loss, program completion)
3. Use the results in conversation:
   - Show graphs
   - Ask: "Does this reflect how it feels? What's missing?"
4. Use anonymized data for:
   - Impact reports
   - Grant applications
   - Advocacy with council, service planners, etc.

---

## 4.7 Case Management & Notes

**Purpose:** Track what's happening with each person, make sure follow-ups aren't missed, and avoid gaslighting ("we never talked about that").

### Key Features
- Client profiles with all history in one place
- Contact logs / case notes with timestamps
- Goals and action plans
- Task tracking with due dates
- Attachments (photos of ID, letters, etc., if you enable this)

### SOP (Worker)

1. After each significant contact:
   - Add a case note: where, when, what was discussed, any decisions made
2. Use tags:
   - Crisis, housing, income, mental health, legal, harm reduction, etc.
3. Maintain a goal / plan per client:
   - At least 1–3 active goals with clear steps and responsible people
4. Create tasks:
   - For follow-ups (call worker X, book appointment, help fill application)
   - Assign due dates and mark completion honestly
5. Supervisors:
   - Review notes periodically for quality, risks, and worker support needs

---

## 4.8 Harm Reduction Ordering & Inventory (TweakEasy Module)

**Purpose:** Make supply distribution easier, safer, and properly tracked without making it carceral.

### Key Features
- Staff-facing interface for placing orders on behalf of clients
- Optional client self-ordering (for delivery/pickup)
- Product catalogue (needles, stems, naloxone, condoms, etc.)
- Favourites and standard packs
- Statuses: awaiting pickup, delivered, on hold, out of stock
- Inventory view per location (office, van, outreach kits)

### SOP (Outreach Worker)

1. When a client asks for supplies:
   - Open **New Order**
   - Select existing client or create basic record (first/last name or alias)
2. Choose items:
   - Use favourites or standard kit presets to speed this up
3. Confirm quantities and whether:
   - Given on the spot; or
   - Scheduled for later pickup/delivery
4. Set order status:
   - Fulfilled, awaiting pickup, on route, etc.
5. System auto-updates inventory
6. Use monthly data:
   - To spot trends (new drug types, more/less overdose risk)
   - For harm reduction funding and reporting

---

## 4.9 Resource Directory & Referral Engine

**Purpose:** Make it easy to find and connect to local services without 47 tabs open.

### Key Features
- Searchable directory: shelters, health, mental health, legal, food, ID clinics, outreach, etc.
- Filters: location, hours, eligibility, population (youth, women, 2SLGBTQIA+, Indigenous, etc.)
- "Warm referral" function: send details with consent

### SOP (Worker)

1. During planning:
   - Open **Resources** and filter based on the client's needs
2. Talk through options with the client:
   - Ask what feels realistic and safe
3. With consent:
   - Click **Make Referral**
   - Choose what info to attach (contact details, summary, risks, consents)
4. Schedule follow-up tasks:
   - "Check if client connected" within a set timeframe
5. Update outcome:
   - Connected / on waitlist / declined / didn't qualify

---

## 4.10 Public / Business Reporting & Response

**Purpose:** Give the community a way to raise concerns that leads to support, not just displacement.

### Key Features
- Public form to report:
  - Needles/sharps
  - Encampments/tents
  - Welfare concerns about a person
  - Abandoned belongings
  - "Not sure, but something's wrong"
- Some basic context + education in the form itself
- Internal dashboard for handling reports

### SOP

1. Public user submits **Report** with:
   - Location
   - Type of concern
   - Optional contact info
   - Any safety issues
2. System logs report:
   - Assigns priority and type
3. Staff review:
   - Triage: Is it an outreach need, cleanup need, crisis call, or info-only?
4. Assign to worker/team:
   - With target response times based on type
5. After action:
   - Record what happened (outreach visit, supplies provided, person not found, etc.)
6. If contact info provided:
   - Send brief follow-up ("We attended," or "We linked with X service")

---

## 4.11 Events, News & Community Engagement

**Purpose:** Keep the community informed and connected to what's actually happening.

### Key Features
- Event listing (outreach days, pop-ups, meetings, community meals)
- News/posts about outcomes and system issues
- "Impact update" snapshots

### SOP (Admin/Comms)

1. When events are scheduled:
   - Create entries with date, time, location, who it's for
2. After major activities:
   - Post short recaps: what happened, how many people supported, any needs identified
3. Monthly:
   - Generate an **Impact Snapshot** using analytics data

---

## 4.12 eLearning & Knowledge Library

**Purpose:** Teach people how to support themselves and others, and reduce stigma.

### Key Features
- Short guides (written, audio, video)
- Toolkits (overdose response, ID recovery, tenant rights)
- Courses with simple quizzes (for staff, volunteers, businesses)

### SOP

1. Identify common questions ("How do I respond to someone using in my doorway?" etc.)
2. Create or upload content explaining:
   - The issue
   - Basic best practices
   - What OUTSINC can/can't do
3. Tag content by audience:
   - Clients, staff, businesses, general public
4. Regularly review and update:
   - Remove outdated info (e.g., program or law changes)
   - Add new topics as patterns show up

---

## 4.13 Dashboards & Analytics

**Purpose:** Turn chaos into patterns so you can advocate properly.

### Key Features
- Staff dashboards: today's tasks, upcoming appointments, clients needing follow-up
- Admin dashboards: number of clients, contacts, surveys, risk flags, supply flows, referrals
- Visuals: charts, heatmaps, timelines

### SOP

1. Workers:
   - Check dashboard at the start and end of shift
   - Use it to plan priority contacts
2. Supervisors/Admin:
   - Weekly review of:
     - Active caseloads
     - Risk clusters
     - Service outcomes
3. Monthly / quarterly:
   - Export data for:
     - Funders
     - Council presentations
     - Public impact reports

---

## 4.14 Admin & Configuration

**Purpose:** Keep the whole thing tidy, secure, and adaptable.

### Key Features
- User and role management
- Module toggles (turn features on/off)
- Customizable forms and labels
- Audit logs

### SOP (Admin)

1. Regularly:
   - Review users and roles
   - Deactivate accounts for staff who've left
2. When services change:
   - Update resource directory
   - Update consent options
3. When policies change:
   - Update intake wording, risk thresholds, etc.
4. Use audit logs:
   - To investigate privacy concerns
   - To support staff when errors/misunderstandings happen

---

## 4.15 Client Self-Service (Portal & Life Dashboard)

**Purpose:** Give clients tools to see their own progress and manage their own stuff.

### Key Features
- Dashboard: appointments, tasks, goals, recent notes (client-safe summary), mood check-ins
- Ability to:
  - Update some info
  - View their consents
  - Review their own plans
  - Access resources and learning

### SOP (Client-facing explanation)

- During intake or later, show:
  - "This is your OUTSINC home screen"
  - Where to see upcoming appointments
  - Where to see their main goals
  - How to request changes to their info or consents
- Encourage:
  - Short mood check-ins
  - Marking tasks they've completed
  - Reading/viewing content if it feels helpful
