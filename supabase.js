// Supabase Configuration
const SUPABASE_URL = 'https://pwvqimwcptcdjklenatk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dnFpbXdjcHRjZGprbGVuYXRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMzMxMDYsImV4cCI6MjA4NjgwOTEwNn0.Y5ZraAu654x7PSUBy3x5jF5u_eC4XM7EyRRmz48WhV8';

// Initialize Supabase client immediately
const { createClient } = window.supabase;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true
    }
});
let currentUser = null;

console.log('Supabase client initialized with URL:', SUPABASE_URL);

// Test connection
async function testConnection() {
    try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
            console.error('Connection test failed:', error);
        } else {
            console.log('Supabase connection successful');
        }
    } catch (err) {
        console.error('Connection error:', err);
    }
}

// Check if user is logged in on page load
async function initAuth() {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
            currentUser = session.user;
            console.log('User logged in:', currentUser.email);
        }
    } catch (err) {
        console.error('Init auth error:', err);
    }
}

// Listen for auth state changes
supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
        currentUser = session.user;
        console.log('User signed in:', currentUser.email);

        // ================= RESTORE USER PROFILE =================
        const savedProfile = localStorage.getItem("userProfile");
        const savedMealPlan = localStorage.getItem("mealPlan");

        if (savedProfile) {
            appState.userProfile = JSON.parse(savedProfile);

            // Recalculate calories
            appState.calorieRequirements = calculateHealthyCalories(
                parseInt(appState.userProfile.height),
                parseInt(appState.userProfile.weight),
                parseInt(appState.userProfile.age),
                appState.userProfile.gender,
                parseInt(appState.userProfile.targetWeight),
                parseInt(appState.userProfile.timeframe),
                appState.userProfile.activityLevel
            );

            // If we already have a saved meal plan, show it
            if (savedMealPlan) {
                appState.mealPlan = JSON.parse(savedMealPlan);

appState.currentPage = 'mealplan';
localStorage.setItem("currentPage", "mealplan");
showPage('mealPlanPage');
displayMealPlan();

            } else {
                // Otherwise generate a fresh plan
                generateAndDisplayMealPlan();
            }

        } else {
            // New user → go to form page
            goToUserForm();
        }

    } else if (event === 'SIGNED_OUT') {
        currentUser = null;
        console.log('User signed out');

        // Optional: clear UI to landing page
        goToLanding();
    }
});


// Initialize auth and test connection when script loads
testConnection();
initAuth();
