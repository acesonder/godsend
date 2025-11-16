// OUTSINC Application - Frontend JavaScript

// Configuration
const API_BASE_URL = window.location.origin + '/api';

// Utility Functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Modal Management
class ModalManager {
    constructor() {
        this.container = $('#modal-container');
    }

    open(title, content, options = {}) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
                ${options.footer ? `<div class="modal-footer">${options.footer}</div>` : ''}
            </div>
        `;

        this.container.appendChild(modal);

        // Close handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.close(modal));
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.close(modal);
        });

        // ESC key handler
        const escHandler = (e) => {
            if (e.key === 'Escape') {
                this.close(modal);
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);

        return modal;
    }

    close(modal) {
        modal.classList.add('fade-out');
        setTimeout(() => modal.remove(), 300);
    }

    closeAll() {
        this.container.innerHTML = '';
    }
}

const modalManager = new ModalManager();

// API Service
class APIService {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const token = localStorage.getItem('authToken');

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Request failed');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }

    async post(endpoint, body) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });
    }

    async put(endpoint, body) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(body)
        });
    }
}

const api = new APIService();

// Login Modal
function showLoginModal() {
    const content = `
        <form id="loginForm">
            <div class="form-group">
                <label class="form-label" for="loginUsername">Username or Email</label>
                <input type="text" id="loginUsername" class="form-input" required>
            </div>
            <div class="form-group">
                <label class="form-label" for="loginPassword">Password</label>
                <input type="password" id="loginPassword" class="form-input" required>
            </div>
            <div id="loginError" class="form-error" style="display: none;"></div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">Login</button>
        </form>
        <p style="text-align: center; margin-top: 1rem;">
            Don't have an account? <a href="#self-referral" onclick="modalManager.closeAll()">Self-refer here</a>
        </p>
    `;

    const modal = modalManager.open('Login to Your Account', content);

    const form = modal.querySelector('#loginForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = $('#loginUsername').value;
        const password = $('#loginPassword').value;
        const errorDiv = $('#loginError');

        try {
            const data = await api.post('/auth/login', { username, password });
            
            // Store token
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect based on role
            if (data.user.role === 'client') {
                window.location.href = '/client/dashboard.html';
            } else if (data.user.role === 'worker' || data.user.role === 'admin') {
                window.location.href = '/worker/dashboard.html';
            } else {
                window.location.href = '/dashboard.html';
            }
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
        }
    });
}

// Incident Report Modal
function showReportModal() {
    const content = `
        <form id="reportForm">
            <p style="margin-bottom: 1.5rem; color: var(--text-medium);">
                Thank you for reporting. Your report helps us respond compassionately and effectively.
            </p>
            
            <div class="form-group">
                <label class="form-label" for="reportType">Type of Report *</label>
                <select id="reportType" class="form-select" required>
                    <option value="">Select a type...</option>
                    <option value="harm_reduction_litter">Harm Reduction Litter (needles, supplies)</option>
                    <option value="welfare_check">Welfare Check - Concern about someone's wellbeing</option>
                    <option value="abandoned_belongings">Abandoned Belongings</option>
                    <option value="illegal_tent">Encampment/Tent</option>
                    <option value="safety_concern">Safety Concern</option>
                    <option value="cleanup">Cleanup Request</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div class="form-group">
                <label class="form-label" for="reportLocation">Location *</label>
                <input type="text" id="reportLocation" class="form-input" 
                       placeholder="e.g., Corner of King St and Division St" required>
                <small class="form-help">Please be as specific as possible</small>
            </div>

            <div class="form-group">
                <label class="form-label" for="reportDescription">Description *</label>
                <textarea id="reportDescription" class="form-textarea" 
                          placeholder="Please describe what you're reporting..." required></textarea>
                <small class="form-help">Include any relevant details that will help us respond appropriately</small>
            </div>

            <div class="form-group">
                <label class="form-label" for="reporterName">Your Name (optional)</label>
                <input type="text" id="reporterName" class="form-input">
            </div>

            <div class="form-group">
                <label class="form-label" for="reporterEmail">Your Email (optional)</label>
                <input type="email" id="reporterEmail" class="form-input">
                <small class="form-help">We'll send you a confirmation if you provide your email</small>
            </div>

            <div class="form-group">
                <label class="form-label" for="reporterPhone">Your Phone (optional)</label>
                <input type="tel" id="reporterPhone" class="form-input">
            </div>

            <div id="reportError" class="form-error" style="display: none;"></div>
            <div id="reportSuccess" style="display: none; color: var(--success-color); margin-bottom: 1rem;"></div>

            <button type="submit" class="btn btn-primary" style="width: 100%;">Submit Report</button>
        </form>
    `;

    const modal = modalManager.open('Report an Incident', content);

    const form = modal.querySelector('#reportForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            reportType: $('#reportType').value,
            location: $('#reportLocation').value,
            description: $('#reportDescription').value,
            reporterName: $('#reporterName').value || null,
            reporterEmail: $('#reporterEmail').value || null,
            reporterPhone: $('#reporterPhone').value || null
        };

        const errorDiv = $('#reportError');
        const successDiv = $('#reportSuccess');

        try {
            const data = await api.post('/incident-reports/submit', formData);
            
            successDiv.textContent = data.confirmationMessage;
            successDiv.style.display = 'block';
            errorDiv.style.display = 'none';
            
            form.reset();
            
            setTimeout(() => {
                modalManager.closeAll();
            }, 3000);
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
            successDiv.style.display = 'none';
        }
    });
}

// Self-Referral Flow
class SelfReferralFlow {
    constructor() {
        this.currentStep = 1;
        this.sessionData = {};
    }

    start() {
        this.currentStep = 1;
        this.showStep1();
    }

    showStep1() {
        const content = `
            <div style="margin-bottom: 1rem;">
                <strong>Step 1 of 3:</strong> Tell us about yourself
            </div>
            <p style="margin-bottom: 1.5rem; color: var(--text-medium);">
                This information helps us understand how to best support you. You can skip any question
                you're not comfortable answering. You are the expert on your own life.
            </p>
            
            <form id="step1Form">
                <div class="form-group">
                    <label class="form-label" for="firstName">First Name *</label>
                    <input type="text" id="firstName" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label" for="lastName">Last Name *</label>
                    <input type="text" id="lastName" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label" for="dateOfBirth">Date of Birth *</label>
                    <input type="date" id="dateOfBirth" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label" for="phone">Phone Number</label>
                    <input type="tel" id="phone" class="form-input">
                </div>

                <div class="form-group">
                    <label class="form-label" for="email">Email</label>
                    <input type="email" id="email" class="form-input">
                </div>

                <div class="form-group">
                    <label class="form-label" for="housingStatus">Current Housing Situation *</label>
                    <select id="housingStatus" class="form-select" required>
                        <option value="">Select...</option>
                        <option value="sheltered">Staying in a shelter</option>
                        <option value="unsheltered">Unsheltered (outdoors, tent, vehicle)</option>
                        <option value="transitional">Transitional housing</option>
                        <option value="couch_surfing">Couch surfing</option>
                        <option value="at_risk">At risk of losing housing</option>
                        <option value="housed">Housed but need support</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Are you currently experiencing any of the following? (Check all that apply)</label>
                    <div class="form-checkbox-group">
                        <input type="checkbox" id="suicideThoughts" class="form-checkbox">
                        <label for="suicideThoughts">Thoughts of suicide</label>
                    </div>
                    <div class="form-checkbox-group">
                        <input type="checkbox" id="homicideThoughts" class="form-checkbox">
                        <label for="homicideThoughts">Thoughts of harming others</label>
                    </div>
                    <div class="form-checkbox-group">
                        <input type="checkbox" id="selfHarmThoughts" class="form-checkbox">
                        <label for="selfHarmThoughts">Thoughts of self-harm</label>
                    </div>
                    <div class="form-checkbox-group">
                        <input type="checkbox" id="fleeingViolence" class="form-checkbox">
                        <label for="fleeingViolence">Fleeing violence or unsafe situation</label>
                    </div>
                </div>

                <div id="crisisInfo" style="display: none; background-color: #fff3cd; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                    <strong>Crisis Resources Available Now:</strong>
                    <ul style="margin-top: 0.5rem;">
                        <li>4 County Crisis: <a href="tel:1-866-995-9933">1-866-995-9933</a></li>
                        <li>NORS Crisis Line: <a href="tel:1-877-688-6677">1-877-688-6677</a></li>
                        <li>Emergency: <a href="tel:911">911</a></li>
                    </ul>
                    <p style="margin-top: 0.5rem; font-size: 0.875rem;">
                        You can continue with this form, and we'll also prioritize your case for immediate support.
                    </p>
                </div>

                <div id="step1Error" class="form-error" style="display: none;"></div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    Continue to Next Step
                </button>
            </form>
        `;

        const modal = modalManager.open('Self-Referral - Step 1', content);

        // Show crisis info if any crisis checkbox is checked
        const crisisCheckboxes = ['#suicideThoughts', '#homicideThoughts', '#selfHarmThoughts', '#fleeingViolence'];
        crisisCheckboxes.forEach(id => {
            modal.querySelector(id)?.addEventListener('change', () => {
                const anyChecked = crisisCheckboxes.some(id => modal.querySelector(id)?.checked);
                const crisisInfo = modal.querySelector('#crisisInfo');
                if (crisisInfo) {
                    crisisInfo.style.display = anyChecked ? 'block' : 'none';
                }
            });
        });

        const form = modal.querySelector('#step1Form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                firstName: $('#firstName').value,
                lastName: $('#lastName').value,
                dateOfBirth: $('#dateOfBirth').value,
                phone: $('#phone').value,
                email: $('#email').value,
                housingStatus: $('#housingStatus').value,
                hasSuicideThoughts: $('#suicideThoughts').checked,
                hasHomicideThoughts: $('#homicideThoughts').checked,
                hasSelfHarmThoughts: $('#selfHarmThoughts').checked,
                isFleeingViolence: $('#fleeingViolence').checked
            };

            try {
                const data = await api.post('/self-referral/step1/client-info', formData);
                
                this.sessionData = {
                    sessionId: data.sessionId,
                    assessmentId: data.assessmentId,
                    ...formData
                };

                modalManager.closeAll();
                this.showStep2();
            } catch (error) {
                $('#step1Error').textContent = error.message;
                $('#step1Error').style.display = 'block';
            }
        });
    }

    showStep2() {
        const content = `
            <div style="margin-bottom: 1rem;">
                <strong>Step 2 of 3:</strong> Create your account
            </div>
            <p style="margin-bottom: 1.5rem; color: var(--text-medium);">
                Create a secure account to access your information and communicate with your worker.
            </p>
            
            <form id="step2Form">
                <div class="form-group">
                    <label class="form-label" for="username">Username *</label>
                    <input type="text" id="username" class="form-input" required minlength="3">
                    <small class="form-help">Choose a username (at least 3 characters)</small>
                </div>

                <div class="form-group">
                    <label class="form-label" for="password">Password *</label>
                    <input type="password" id="password" class="form-input" required minlength="8">
                    <small class="form-help">At least 8 characters with uppercase, lowercase, and number</small>
                </div>

                <div class="form-group">
                    <label class="form-label" for="confirmPassword">Confirm Password *</label>
                    <input type="password" id="confirmPassword" class="form-input" required>
                </div>

                <div class="form-group">
                    <label class="form-label">Security Questions</label>
                    <p style="font-size: 0.875rem; color: var(--text-medium); margin-bottom: 1rem;">
                        These help us verify your identity if you forget your password.
                    </p>
                    
                    <label class="form-label" for="securityQ1">Question 1: What city were you born in?</label>
                    <input type="text" id="securityQ1" class="form-input" required>

                    <label class="form-label" for="securityQ2" style="margin-top: 1rem;">
                        Question 2: What is your mother's maiden name?
                    </label>
                    <input type="text" id="securityQ2" class="form-input" required>

                    <label class="form-label" for="securityQ3" style="margin-top: 1rem;">
                        Question 3: What was the name of your first pet?
                    </label>
                    <input type="text" id="securityQ3" class="form-input" required>
                </div>

                <div id="step2Error" class="form-error" style="display: none;"></div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    Create Account & Continue
                </button>
            </form>
        `;

        const modal = modalManager.open('Self-Referral - Step 2', content);

        const form = modal.querySelector('#step2Form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const password = $('#password').value;
            const confirmPassword = $('#confirmPassword').value;

            if (password !== confirmPassword) {
                $('#step2Error').textContent = 'Passwords do not match';
                $('#step2Error').style.display = 'block';
                return;
            }

            const formData = {
                sessionId: this.sessionData.sessionId,
                assessmentId: this.sessionData.assessmentId,
                username: $('#username').value,
                password: password,
                securityQuestions: [
                    { question: 'What city were you born in?', answer: $('#securityQ1').value },
                    { question: 'What is your mother\'s maiden name?', answer: $('#securityQ2').value },
                    { question: 'What was the name of your first pet?', answer: $('#securityQ3').value }
                ]
            };

            try {
                const data = await api.post('/self-referral/step2/account-setup', formData);
                
                // Store token
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                modalManager.closeAll();
                this.showStep3();
            } catch (error) {
                $('#step2Error').textContent = error.message;
                $('#step2Error').style.display = 'block';
            }
        });
    }

    async showStep3() {
        const content = `
            <div style="margin-bottom: 1rem;">
                <strong>Step 3 of 3:</strong> Consent preferences
            </div>
            <p style="margin-bottom: 1.5rem; color: var(--text-medium);">
                Choose which partner agencies we can share your information with. You can change these
                preferences at any time from your dashboard.
            </p>
            
            <div id="agenciesLoading">Loading agencies...</div>
            <form id="step3Form" style="display: none;">
                <div id="agenciesList"></div>

                <div class="form-group">
                    <label class="form-label">How should we identify you in communications?</label>
                    <div class="form-checkbox-group">
                        <input type="radio" name="consentScope" value="full_name" id="scopeFullName" checked>
                        <label for="scopeFullName">Use my full name</label>
                    </div>
                    <div class="form-checkbox-group">
                        <input type="radio" name="consentScope" value="initials" id="scopeInitials">
                        <label for="scopeInitials">Use only my initials</label>
                    </div>
                    <div class="form-checkbox-group">
                        <input type="radio" name="consentScope" value="anonymous" id="scopeAnonymous">
                        <label for="scopeAnonymous">Keep me anonymous</label>
                    </div>
                </div>

                <div id="step3Error" class="form-error" style="display: none;"></div>

                <button type="submit" class="btn btn-primary" style="width: 100%;">
                    Complete Registration
                </button>
            </form>
        `;

        const modal = modalManager.open('Self-Referral - Step 3', content);

        try {
            const data = await api.get('/self-referral/agencies');
            const agenciesList = modal.querySelector('#agenciesList');
            const loading = modal.querySelector('#agenciesLoading');
            const form = modal.querySelector('#step3Form');

            if (data.agencies && data.agencies.length > 0) {
                agenciesList.innerHTML = data.agencies.map(agency => `
                    <div class="form-checkbox-group" style="margin-bottom: 1rem; padding: 0.5rem; background-color: var(--bg-light); border-radius: 4px;">
                        <input type="checkbox" id="agency_${agency.id}" class="form-checkbox" value="${agency.id}">
                        <label for="agency_${agency.id}" style="flex: 1;">
                            <strong>${agency.name}</strong>
                            ${agency.description ? `<br><small style="color: var(--text-medium);">${agency.description}</small>` : ''}
                        </label>
                    </div>
                `).join('');
            } else {
                agenciesList.innerHTML = '<p style="color: var(--text-medium);">No partner agencies available at this time.</p>';
            }

            loading.style.display = 'none';
            form.style.display = 'block';

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const selectedAgencies = Array.from(modal.querySelectorAll('#agenciesList input:checked'))
                    .map(input => parseInt(input.value));
                
                const consentScope = modal.querySelector('input[name="consentScope"]:checked').value;

                const consents = selectedAgencies.map(agencyId => ({
                    agencyId,
                    consentScope,
                    isActive: true
                }));

                try {
                    await api.post('/self-referral/step3/consent', { consents });
                    
                    modalManager.closeAll();
                    
                    // Show success message and redirect
                    alert('Registration complete! Redirecting to your dashboard...');
                    window.location.href = '/client/dashboard.html';
                } catch (error) {
                    $('#step3Error').textContent = error.message;
                    $('#step3Error').style.display = 'block';
                }
            });
        } catch (error) {
            $('#agenciesLoading').textContent = 'Error loading agencies: ' + error.message;
        }
    }
}

const selfReferral = new SelfReferralFlow();

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Floating button handlers
    const loginBtn = $('#loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
    }

    const reportBtn = $('#reportBtn');
    if (reportBtn) {
        reportBtn.addEventListener('click', showReportModal);
    }

    // Self-referral button handler
    const startReferralBtn = $('#startReferralBtn');
    if (startReferralBtn) {
        startReferralBtn.addEventListener('click', () => selfReferral.start());
    }

    // Report incident button in business section
    const reportIncidentBtn = $('#reportIncidentBtn');
    if (reportIncidentBtn) {
        reportIncidentBtn.addEventListener('click', showReportModal);
    }

    // Mobile menu toggle
    const mobileMenuToggle = $('.mobile-menu-toggle');
    const navMenu = $('.nav-menu');
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && !href.includes('modal')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
});
