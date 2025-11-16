-- Seed data for OUTSINC database
-- Partner Agencies

INSERT INTO agencies (name, description, service_types, phone, email, is_active) VALUES
('Northumberland County Housing', 'Housing support and emergency housing services', ARRAY['housing', 'emergency_shelter'], '905-555-0100', 'housing@northumberland.ca', true),
('Four County Crisis', 'Crisis intervention and mental health support 24/7', ARRAY['mental_health', 'crisis_support'], '1-866-995-9933', 'info@4countiescrisis.ca', true),
('Northumberland Community Legal Centre', 'Free legal services for low-income residents', ARRAY['legal', 'advocacy'], '905-555-0200', 'info@nclc.ca', true),
('Community Care Northumberland', 'Healthcare and support services', ARRAY['health', 'home_care', 'meals'], '905-555-0300', 'info@commcare.ca', true),
('Bridge Street United Church', 'Community meals and support programs', ARRAY['food', 'community_support'], '905-555-0400', 'outreach@bridgestreet.ca', true),
('Salvation Army Cobourg', 'Emergency services, food bank, and support', ARRAY['food', 'emergency_assistance', 'housing'], '905-555-0500', 'cobourg@salvationarmy.ca', true);

-- Resources Directory

INSERT INTO resources (name, category, description, address, phone, is_active) VALUES
('The Cornerstone', 'shelter', 'Emergency shelter for men and women', '123 King St, Cobourg', '905-555-0600', true),
('Amethyst Women''s Shelter', 'shelter', 'Emergency shelter for women fleeing violence', 'Confidential Location', '1-800-555-0700', true),
('Cobourg Community Health Centre', 'health', 'Primary care, mental health, and addiction services', '456 Ontario St, Cobourg', '905-555-0800', true),
('Food Share Cobourg', 'food', 'Food bank and emergency food assistance', '789 Division St, Cobourg', '905-555-0900', true),
('Ontario Works Northumberland', 'income', 'Financial assistance and employment support', '555 Courthouse Rd, Cobourg', '905-555-1000', true),
('Northumberland Transit', 'transportation', 'Public bus service in Northumberland County', 'Multiple Routes', '905-555-1100', true),
('Peterborough Drug Treatment Court', 'legal', 'Alternative justice program for substance use', '1000 Water St, Peterborough', '705-555-1200', true),
('CMHA Northumberland', 'mental_health', 'Mental health programs and peer support', '321 King St W, Cobourg', '905-555-1300', true),
('Northumberland Detox', 'detox', 'Short-term detoxification services', '444 D''Arcy St, Cobourg', '905-555-1400', true),
('ServiceOntario Cobourg', 'id_services', 'ID replacement and government services', '777 Elgin St W, Cobourg', '1-800-267-8097', true);

-- Sample FAQ entries

INSERT INTO faq (question, answer, category, order_index, is_published) VALUES
('What is OUTSINC?', 'OUTSINC (Outreach Someone In Need of Change) is a lived-experience-led support and navigation service that helps people facing homelessness, substance use, mental health challenges, and other life crises connect with the right resources.', 'about', 1, true),
('Do I need a referral to get help?', 'No! You can self-refer at any time. You don''t need anyone''s permission to ask for support.', 'services', 2, true),
('Is OUTSINC confidential?', 'Yes. We follow strict confidentiality guidelines. You control who we share your information with through our consent system.', 'privacy', 3, true),
('What if I''m using substances?', 'We practice harm reduction. You don''t need to stop using to get support. We focus on keeping you as safe as possible and supporting your goals, whatever they are.', 'services', 4, true),
('How much does OUTSINC cost?', 'OUTSINC services are free. There is no cost to access our support and navigation services.', 'services', 5, true),
('What areas do you serve?', 'We serve Cobourg and Northumberland County. Some services may be available outside this area.', 'about', 6, true),
('Can I change my consent preferences?', 'Yes! You can update your consent preferences at any time from your dashboard. You are always in control of your information.', 'privacy', 7, true),
('What if I lose my phone or forget my password?', 'We have trauma-informed recovery options including security questions. Contact us by phone and we can help you regain access to your account.', 'account', 8, true);

-- Create a test admin user (password: admin123)
-- Password hash for 'admin123' using bcrypt
INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active, account_verified) VALUES
('admin', 'admin@outsinc.org', '$2b$10$kZ5qE3YK8h6Y.MvF7jXxY.LkR8C1J7lKs4FmVN2wXr3BkT9YzHdG6', 'admin', 'Admin', 'User', true, true);

-- Create a test worker user (password: worker123)
INSERT INTO users (username, email, password_hash, role, first_name, last_name, is_active, account_verified) VALUES
('worker', 'worker@outsinc.org', '$2b$10$kZ5qE3YK8h6Y.MvF7jXxY.LkR8C1J7lKs4FmVN2wXr3BkT9YzHdG6', 'worker', 'Test', 'Worker', true, true);

-- Create worker profile for the worker
INSERT INTO worker_profiles (user_id, title, department, is_case_manager)
SELECT id, 'Case Manager', 'Outreach', true FROM users WHERE username = 'worker';
