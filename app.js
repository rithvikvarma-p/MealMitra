// ==================== STATE MANAGEMENT ====================
let appState = {
    currentPage: 'landing',
    userProfile: {
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        activityLevel: 'lightly',
        diets: [],
        allergies: [],
        customAllergy: '',
        targetWeight: '',
        timeframe: ''
    },
    mealPlan: [],
    currentMealIndex: null,
    currentDayIndex: null,
    goalWarning: null,
    acceptedWarning: false,
    calorieRequirements: null
};

function showPage(pageId) {
    document.querySelectorAll('.app-page').forEach(p => {
        p.classList.remove('active');
    });

    const page = document.getElementById(pageId);
    if (page) {
        page.classList.add('active');
    }
}

const CALORIE_SPLIT = {
    breakfast: 0.28,
    lunch: 0.35,
    snack: 0.12,
    dinner: 0.25
};

// Meal variety tracking - prevents repeating meals within the same week
let usedMealsThisWeek = {
    breakfast: new Set(),
    lunch: new Set(),
    snack: new Set(),
    dinner: new Set()
};

// ==================== BMI & CALORIE CALCULATIONS ====================
function calculateBMI(height, weight) {
    // BMI = weight (kg) / (height (m))^2
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
}

// Utility helpers
function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
}

function computeTotalGrams(meal) {
    // Sum numeric part quantities (assumed grams). If none, try to parse from servingSize.
    const fromParts = (meal.parts || []).reduce((s, p) => {
        const num = parseFloat(String(p.quantity).replace(/[^0-9.]/g, '')) || 0;
        return s + num;
    }, 0);
    if (fromParts > 0) return Math.round(fromParts);

    if (meal.servingSize) {
        const m = String(meal.servingSize).match(/(\d+)\s*g/);
        if (m) return parseInt(m[1], 10);
    }

    return 0;
}

function calculateBMR(height, weight, age, gender) {
    // Mifflin-St Jeor Equation (more accurate than Harris-Benedict)
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
        // Average for other
        const maleBMR = 10 * weight + 6.25 * height - 5 * age + 5;
        const femaleBMR = 10 * weight + 6.25 * height - 5 * age - 161;
        bmr = (maleBMR + femaleBMR) / 2;
    }
    return bmr;
}

function calculateTDEE(bmr, activityMultiplier = 1.375) {
    return bmr * activityMultiplier;
}

function calculateHealthyCalories(height, weight, age, gender, targetWeight, timeframe, activityLevel = 'lightly') {
    // ---- BMR ----
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === 'female') {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
        const male = 10 * weight + 6.25 * height - 5 * age + 5;
        const female = 10 * weight + 6.25 * height - 5 * age - 161;
        bmr = (male + female) / 2;
    }

    // ---- TDEE ----
    const activityMap = {
        sedentary: 1.2,
        lightly: 1.375,
        moderate: 1.55,
        very: 1.725,
        extra: 1.9
    };

    const tdee = bmr * (activityMap[activityLevel] || activityMap.lightly);

    // ---- Weight change ----
    const weightDiff = targetWeight - weight;
    const weeks = timeframe * 4.33;
    const weeklyChange = weightDiff / weeks;

    // ---- Convert to calories ----
    const dailyChange = (weeklyChange * 7700) / 7;

    let rawTarget = tdee + dailyChange;

    // ---- SAFETY CAPS ----
    const maxDeficit = 700;
    const maxSurplus = 500;

    let direction = 'maintenance';

    if (weightDiff < 0) {
        // weight loss
        direction = 'loss';
        rawTarget = Math.max(rawTarget, tdee - maxDeficit);
    } else if (weightDiff > 0) {
        // weight gain (bulking)
        direction = 'gain';
        const minSurplus = 300;  // minimum calories needed to build muscle
        const maxSurplus = 500;
        // ensure at least +300 kcal
        rawTarget = Math.max(rawTarget, tdee + minSurplus);
        // but not more than +500
        rawTarget = Math.min(rawTarget, tdee + maxSurplus);
    }

    // ---- MINIMUM FLOOR ----
    const minCalories = gender === 'female' ? 1200 : 1500;
    rawTarget = Math.max(rawTarget, minCalories);

    // ---- FINAL TARGET ----
    const finalTarget = Math.round(rawTarget);
    const calorieAdjustment = Math.abs(finalTarget - tdee);

    return {
        bmi: calculateBMI(height, weight),
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        activityLevel: activityLevel,
        activityLevelLabel: {
            'sedentary': 'Sedentary (Little/No Exercise)',
            'lightly': 'Lightly Active (1-3 days/week)',
            'moderate': 'Moderately Active (3-5 days/week)',
            'very': 'Very Active (6-7 days/week)',
            'extra': 'Extra Active (Physical job/training 2x/day)'
        }[activityLevel],
        recommendedDailyCalories: finalTarget,
        weeklyGoal: Math.abs(weeklyChange).toFixed(2),
        calorieAdjustment: Math.round(calorieAdjustment),
        direction: direction
    };
}

// ==================== NAVIGATION ====================
function goToUserForm() {
    appState.currentPage = 'form';
    sessionStorage.setItem("currentPage", "form");
    showPage('formPage');
}

function goToAuth() {
    appState.currentPage = 'auth';
    sessionStorage.setItem("currentPage", "auth");
    showPage('authPage');
}

function backToLanding() {
    appState.currentPage = 'landing';
    sessionStorage.setItem("currentPage", "landing");
    showPage('landingPage');
    resetForm();
}

function backToForm() {
    appState.currentPage = 'form';
    sessionStorage.setItem("currentPage", "form");
    showPage('formPage');
    requestAnimationFrame(() => {
        populateFormFromProfile();
    });
}

function backFromForm() {
    if (currentUser || (appState.mealPlan && appState.mealPlan.length > 0)) {
        appState.currentPage = 'mealplan';
        sessionStorage.setItem("currentPage", "mealplan");
        showPage('mealPlanPage');
        if (appState.mealPlan && appState.mealPlan.length > 0) {
            displayMealPlan();
        }
        return;
    }

    backToLanding();
}




function setAuthMessage(message, isError = true) {
    const msg = document.getElementById('authMessage');
    if (!msg) return;
    msg.textContent = message;
    if (!message) {
        msg.classList.remove('show');
        return;
    }
    msg.classList.add('show');
    msg.style.color = isError ? '#d32f2f' : '#138808';
}

async function loginWithEmail() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    if (!email || !password) {
        setAuthMessage('Please enter email and password');
        return;
    }

    setAuthMessage('Signing in...', false);

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) {
            console.error('Login error:', error);
            throw error;
        }

        setAuthMessage('Login successful!', false);
        
        // Try to load saved meal plan
        const hasData = await loadMealPlanFromDatabase();
        
 setTimeout(() => {
    if (hasData) {
        appState.currentPage = 'mealplan';
        sessionStorage.setItem("currentPage", "mealplan");

        showPage('mealPlanPage');
        displayMealPlan();
    } else {
        goToUserForm();
    }
}, 800);

    } catch (error) {
        console.error('Login failed:', error);
        setAuthMessage(error.message || 'Login failed. Check console for details.');
    }
}

async function signupWithEmail() {
    const email = document.getElementById('authEmail').value;
    const password = document.getElementById('authPassword').value;

    if (!email || !password) {
        setAuthMessage('Please enter email and password');
        return;
    }

    if (password.length < 6) {
        setAuthMessage('Password must be at least 6 characters');
        return;
    }

    setAuthMessage('Creating account...', false);

    try {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: window.location.origin
            }
        });

        if (error) {
            console.error('Signup error:', error);
            throw error;
        }

        setAuthMessage('Account created! Redirecting...', false);

        setTimeout(() => {
            document.getElementById('authPassword').value = '';

            appState.currentPage = 'form';
            sessionStorage.setItem("currentPage", "form");

            showPage('formPage');
        }, 1200);

    } catch (error) {
        console.error('Signup failed:', error);
        setAuthMessage(error.message || 'Signup failed. Check console for details.');
    }
}


async function logout() {
    try {
        await supabase.auth.signOut();
    } catch (error) {
        console.error('Logout failed:', error);
    }
    currentUser = null;
    
    // Clear app state
    appState.mealPlan = [];
    appState.userProfile = {
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        activityLevel: 'lightly',
        diets: [],
        allergies: [],
        customAllergy: '',
        targetWeight: '',
        timeframe: ''
    };
    appState.calorieRequirements = null;

    sessionStorage.removeItem('currentPage');
    sessionStorage.removeItem('userProfile');
    sessionStorage.removeItem('mealPlan');
    sessionStorage.removeItem('guestMealPlan');

    backToLanding();
}

// ==================== FORM HELPERS ====================
function toggleDiet(button) {
    const diet = button.dataset.diet;
    button.classList.toggle('active');
    
    if (button.classList.contains('active')) {
        if (!appState.userProfile.diets.includes(diet)) {
            appState.userProfile.diets.push(diet);
        }
    } else {
        appState.userProfile.diets = appState.userProfile.diets.filter(d => d !== diet);
    }
    
    document.getElementById('dietError').classList.remove('show');
    validateAndUpdateGoalWarning();
}

function toggleAllergy(button) {
    const allergy = button.dataset.allergy;
    
    if (allergy === 'none') {
        if (button.classList.contains('active')) {
            button.classList.remove('active');
            appState.userProfile.allergies = [];
        } else {
            document.querySelectorAll('#allergyGroup .toggle-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            appState.userProfile.allergies = ['none'];
            document.getElementById('customAllergyInput').classList.remove('show');
        }
    } else {
        document.querySelector('[data-allergy="none"]').classList.remove('active');
        button.classList.toggle('active');
        
        if (button.classList.contains('active')) {
            if (!appState.userProfile.allergies.includes(allergy)) {
                appState.userProfile.allergies.push(allergy);
            }
        } else {
            appState.userProfile.allergies = appState.userProfile.allergies.filter(a => a !== allergy);
        }
        
        if (allergy === 'other' && button.classList.contains('active')) {
            document.getElementById('customAllergyInput').classList.add('show');
        } else if (allergy === 'other' && !button.classList.contains('active')) {
            document.getElementById('customAllergyInput').classList.remove('show');
            appState.userProfile.customAllergy = '';
        }
    }
}

function resetForm() {
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('height').value = '';
    document.getElementById('weight').value = '';
    document.getElementById('activityLevel').value = 'lightly';
    document.getElementById('targetWeight').value = '';
    document.getElementById('timeframe').value = '';
    document.getElementById('customAllergy').value = '';
    
    document.querySelectorAll('.toggle-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.error-message').forEach(msg => msg.classList.remove('show'));
    document.getElementById('warningBox').classList.remove('show');
    document.getElementById('customAllergyInput').classList.remove('show');
    
    appState.userProfile = {
        name: '',
        age: '',
        gender: '',
        height: '',
        weight: '',
        activityLevel: 'lightly',
        diets: [],
        allergies: [],
        customAllergy: '',
        targetWeight: '',
        timeframe: ''
    };
    appState.goalWarning = null;
    appState.acceptedWarning = false;
}

function populateFormFromProfile() {
    const profile = appState.userProfile;
    if (!profile) return;

    document.getElementById('name').value = profile.name || '';
    document.getElementById('age').value = profile.age || '';
    document.getElementById('gender').value = profile.gender || '';
    document.getElementById('height').value = profile.height || '';
    document.getElementById('weight').value = profile.weight || '';
    document.getElementById('activityLevel').value = profile.activityLevel || 'lightly';
    document.getElementById('targetWeight').value = profile.targetWeight || '';
    document.getElementById('timeframe').value = profile.timeframe || '';
    document.getElementById('customAllergy').value = profile.customAllergy || '';

    document.querySelectorAll('#dietGroup .toggle-btn').forEach(btn => btn.classList.remove('active'));
    (profile.diets || []).forEach(diet => {
        const btn = document.querySelector(`#dietGroup .toggle-btn[data-diet="${diet}"]`);
        if (btn) btn.classList.add('active');
    });

    document.querySelectorAll('#allergyGroup .toggle-btn').forEach(btn => btn.classList.remove('active'));
    const allergies = profile.allergies || [];
    if (allergies.includes('none')) {
        const noneBtn = document.querySelector('#allergyGroup .toggle-btn[data-allergy="none"]');
        if (noneBtn) noneBtn.classList.add('active');
        document.getElementById('customAllergyInput').classList.remove('show');
    } else {
        allergies.forEach(allergy => {
            const btn = document.querySelector(`#allergyGroup .toggle-btn[data-allergy="${allergy}"]`);
            if (btn) btn.classList.add('active');
        });
        if (allergies.includes('other')) {
            document.getElementById('customAllergyInput').classList.add('show');
        } else {
            document.getElementById('customAllergyInput').classList.remove('show');
        }
    }
}

// ==================== VALIDATION ====================
function validateHeightWeight() {
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    let isValid = true;

    const heightError = document.getElementById('heightError');
    const weightError = document.getElementById('weightError');

    if (isNaN(height) || height < 50 || height > 250) {
        heightError.textContent = 'Height must be between 50 and 250 cm';
        heightError.classList.add('show');
        isValid = false;
    } else {
        heightError.classList.remove('show');
    }

    if (isNaN(weight) || weight < 10 || weight > 300) {
        weightError.textContent = 'Weight must be between 10 and 300 kg';
        weightError.classList.add('show');
        isValid = false;
    } else {
        weightError.classList.remove('show');
    }

    return isValid;
}

function validateAndUpdateGoalWarning() {
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const targetWeight = parseInt(document.getElementById('targetWeight').value);
    const timeframe = parseInt(document.getElementById('timeframe').value);

    if (isNaN(height) || isNaN(weight) || isNaN(targetWeight) || isNaN(timeframe)) {
        return;
    }

    if (!validateHeightWeight()) {
        return;
    }

    const warning = analyzeGoal(weight, targetWeight, timeframe);
    appState.goalWarning = warning;

    if (warning) {
        document.getElementById('warningBox').classList.add('show');
        document.getElementById('warningText').textContent = warning.message;
    } else {
        document.getElementById('warningBox').classList.remove('show');
        appState.acceptedWarning = false;
    }
}

function analyzeGoal(currentWeight, targetWeight, monthsTimeframe) {
    const weightDifference = Math.abs(currentWeight - targetWeight);
    const weeks = monthsTimeframe * 4.33;
    const requiredWeeklyRate = weightDifference / weeks;
    
    // Safe rates
    const safeMaxLoss = 1.0; // kg/week
    const safeMaxGain = 0.5; // kg/week
    const optimalLoss = 0.5; // kg/week
    const optimalGain = 0.35; // kg/week
    
    if (targetWeight < currentWeight) {
        // Weight loss
        if (requiredWeeklyRate > safeMaxLoss) {
            const safeWeeks = Math.ceil(weightDifference / optimalLoss);
            const safeMonths = Math.ceil(safeWeeks / 4.33);
            return {
                isUnrealistic: true,
                message: `Your goal requires losing ${weightDifference.toFixed(1)} kg in ${monthsTimeframe} months (${requiredWeeklyRate.toFixed(2)} kg/week). The maximum safe rate is ${safeMaxLoss} kg/week. For sustainable fat loss and muscle preservation, we recommend ${safeMonths} months at ${optimalLoss} kg/week. Would you like to accept our suggested timeframe?`,
                suggestedMonths: safeMonths,
                reason: 'Too aggressive weight loss can slow metabolism and cause muscle loss'
            };
        }
    } else if (targetWeight > currentWeight) {
        // Weight gain
        if (requiredWeeklyRate > safeMaxGain) {
            const safeWeeks = Math.ceil(weightDifference / optimalGain);
            const safeMonths = Math.ceil(safeWeeks / 4.33);
            return {
                isUnrealistic: true,
                message: `Your goal requires gaining ${weightDifference.toFixed(1)} kg in ${monthsTimeframe} months (${requiredWeeklyRate.toFixed(2)} kg/week). The maximum recommended rate is ${safeMaxGain} kg/week. For lean muscle gain with minimal fat, we recommend ${safeMonths} months at ${optimalGain} kg/week. Would you like to accept our suggested timeframe?`,
                suggestedMonths: safeMonths,
                reason: 'Rapid weight gain leads to excessive fat gain instead of muscle'
            };
        }
    }

    return null;
}

function acceptGoal() {
    if (appState.goalWarning && appState.goalWarning.suggestedMonths) {
        document.getElementById('timeframe').value = appState.goalWarning.suggestedMonths;
        appState.acceptedWarning = true;
        document.getElementById('warningBox').classList.remove('show');
    }
}

function editGoal() {
    document.getElementById('targetWeight').focus();
}

function submitForm() {
    // Validate height and weight
    if (!validateHeightWeight()) {
        return;
    }

    // Validate diet selection
    if (appState.userProfile.diets.length === 0) {
        document.getElementById('dietError').textContent = 'Please select at least one diet type';
        document.getElementById('dietError').classList.add('show');
        return;
    }

    // Validate all required fields
    if (!document.getElementById('age').value || !document.getElementById('gender').value || 
        !document.getElementById('targetWeight').value || !document.getElementById('timeframe').value) {
        alert('Please fill in all required fields');
        return;
    }

    // Check goal warning
    if (appState.goalWarning && !appState.acceptedWarning) {
        alert('Please address the weight goal warning before proceeding');
        return;
    }

    // Save form data
    appState.userProfile.name = document.getElementById('name').value || 'Guest';
    appState.userProfile.age = document.getElementById('age').value;
    appState.userProfile.gender = document.getElementById('gender').value;
    appState.userProfile.height = document.getElementById('height').value;
    appState.userProfile.weight = document.getElementById('weight').value;
    appState.userProfile.activityLevel = document.getElementById('activityLevel').value;
    appState.userProfile.targetWeight = document.getElementById('targetWeight').value;
    appState.userProfile.timeframe = document.getElementById('timeframe').value;
    appState.userProfile.customAllergy = document.getElementById('customAllergy').value;

    // Calculate calorie requirements
    appState.calorieRequirements = calculateHealthyCalories(
        parseInt(appState.userProfile.height),
        parseInt(appState.userProfile.weight),
        parseInt(appState.userProfile.age),
        appState.userProfile.gender,
        parseInt(appState.userProfile.targetWeight),
        parseInt(appState.userProfile.timeframe),
        appState.userProfile.activityLevel
    );
// Save user profile locally so user doesn't need to re-enter
sessionStorage.setItem("userProfile", JSON.stringify(appState.userProfile));

    // Generate meal plan
    generateAndDisplayMealPlan();
}

async function saveProfileOnly() {
    if (!validateHeightWeight()) {
        return;
    }

    if (appState.userProfile.diets.length === 0) {
        document.getElementById('dietError').textContent = 'Please select at least one diet type';
        document.getElementById('dietError').classList.add('show');
        return;
    }

    if (!document.getElementById('age').value || !document.getElementById('gender').value ||
        !document.getElementById('targetWeight').value || !document.getElementById('timeframe').value) {
        alert('Please fill in all required fields');
        return;
    }

    if (appState.goalWarning && !appState.acceptedWarning) {
        alert('Please address the weight goal warning before saving');
        return;
    }

    appState.userProfile.name = document.getElementById('name').value || 'Guest';
    appState.userProfile.age = document.getElementById('age').value;
    appState.userProfile.gender = document.getElementById('gender').value;
    appState.userProfile.height = document.getElementById('height').value;
    appState.userProfile.weight = document.getElementById('weight').value;
    appState.userProfile.activityLevel = document.getElementById('activityLevel').value;
    appState.userProfile.targetWeight = document.getElementById('targetWeight').value;
    appState.userProfile.timeframe = document.getElementById('timeframe').value;
    appState.userProfile.customAllergy = document.getElementById('customAllergy').value;

    appState.calorieRequirements = calculateHealthyCalories(
        parseInt(appState.userProfile.height),
        parseInt(appState.userProfile.weight),
        parseInt(appState.userProfile.age),
        appState.userProfile.gender,
        parseInt(appState.userProfile.targetWeight),
        parseInt(appState.userProfile.timeframe),
        appState.userProfile.activityLevel
    );

    sessionStorage.setItem("userProfile", JSON.stringify(appState.userProfile));

    if (currentUser && appState.mealPlan && appState.mealPlan.length > 0) {
        await saveMealPlanToDatabase();
        alert('Profile saved. Your plan remains available.');
        return;
    }

    if (currentUser) {
        await createOrUpdateProfile();
        alert('Profile saved. Generate a plan to store full details.');
        return;
    }

    sessionStorage.setItem('guestMealPlan', JSON.stringify({
        profile: appState.userProfile,
        plan: appState.mealPlan || [],
        calories: appState.calorieRequirements
    }));
    alert('Profile saved locally.');
}

// ==================== DATABASE OPERATIONS ====================
async function createOrUpdateProfile() {
    if (!currentUser) return;

    try {
        const { error } = await supabase
            .from('profiles')
            .upsert({
                user_id: currentUser.id,
                email: currentUser.email,
                name: appState.userProfile.name || null
            }, {
                onConflict: 'user_id',
                ignoreDuplicates: false
            });

        if (error) {
            console.error('Profile save error:', error);
        } else {
            console.log('Profile saved/updated');
        }
    } catch (error) {
        console.error('Error creating profile:', error);
    }
}

async function saveMealPlanToDatabase() {
    if (!currentUser) {
        console.log('No user logged in, saving to sessionStorage instead');
        sessionStorage.setItem('guestMealPlan', JSON.stringify({
            profile: appState.userProfile,
            plan: appState.mealPlan,
            calories: appState.calorieRequirements
        }));
        return;
    }

    try {
        // Create/update profile first
        await createOrUpdateProfile();

        // Delete old meal plans for this user
        await supabase
            .from('meal_plans')
            .delete()
            .eq('user_id', currentUser.id);

        // Insert new meal plan
        const { error } = await supabase
            .from('meal_plans')
            .insert({
                user_id: currentUser.id,
                profile_data: appState.userProfile,
                meal_plan_data: appState.mealPlan,
                calorie_requirements: appState.calorieRequirements,
                updated_at: new Date().toISOString()
            });
        
        if (error) throw error;
        console.log('Meal plan saved to database');
    } catch (error) {
        console.error('Error saving meal plan:', error);
    }
}

async function loadMealPlanFromDatabase() {
    if (!currentUser) {
        console.log('No user logged in, checking sessionStorage');
        const guestData = sessionStorage.getItem('guestMealPlan');
        if (guestData) {
            const parsed = JSON.parse(guestData);
            appState.userProfile = parsed.profile;
            appState.mealPlan = parsed.plan;
            appState.calorieRequirements = parsed.calories;
            return true;
        }
        return false;
    }

    try {
        const { data, error } = await supabase
            .from('meal_plans')
            .select('*')
            .eq('user_id', currentUser.id)
            .order('updated_at', { ascending: false })
            .limit(1);

        if (error) throw error;
        
        if (data && data.length > 0) {
            const plan = data[0];
            appState.userProfile = plan.profile_data;
            appState.mealPlan = plan.meal_plan_data;
            appState.calorieRequirements = plan.calorie_requirements;
            console.log('Meal plan loaded from database');
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error loading meal plan:', error);
        return false;
    }
}

// ==================== MEAL GENERATION ====================
function pickMeal(mealType, dayIndex, mealIndex) {
    const validMeals = foodDataset.filter(food => {
        // Match meal type
        if (food.mealType !== mealType) return false;

        // Match at least one diet
        const dietMatch = appState.userProfile.diets.some(diet => food.diets.includes(diet));
        if (!dietMatch) return false;

        // Check allergens
        if (appState.userProfile.allergies.includes('none')) {
            if (food.allergens.length > 0) return false;
        } else {
            const hasAllergen = appState.userProfile.allergies.some(allergy => {
                if (allergy === 'other') {
                    return false; // Handle custom allergen separately if needed
                }
                return food.allergens.includes(allergy);
            });
            if (hasAllergen) return false;
        }

        return true;
    });

    if (validMeals.length === 0) {
        return {
            name: 'No meal available',
            calories: 0,
            parts: [],
            mealType: mealType
        };
    }

    // Random selection - deep copy to avoid modifying original dataset
    const randomIndex = Math.floor(Math.random() * validMeals.length);
    const meal = validMeals[randomIndex];
    return { ...meal, parts: meal.parts.map(p => ({ ...p })) };
}

function selectMeal(mealType, dayIndex, mealIndex) {
    return pickMeal(mealType, dayIndex, mealIndex);
}

function generatePlan() {
    // Reset meal tracking for new plan - maximize variety across the week
    usedMealsThisWeek = {
        breakfast: new Set(),
        lunch: new Set(),
        snack: new Set(),
        dinner: new Set()
    };
    
    const mealPlan = [];
    const targetDailyCalories = appState.calorieRequirements.recommendedDailyCalories;
    const mealTypes = ['breakfast', 'lunch', 'snack', 'dinner'];

    for (let day = 0; day < 7; day++) {
        const dayMeals = {};
        let dayTotalCalories = 0;
        
        // Select meals targeting specific calorie ranges
        mealTypes.forEach(mealType => {
            const targetMealCalories = targetDailyCalories * CALORIE_SPLIT[mealType];
            dayMeals[mealType] = selectMealByCalories(mealType, day, targetMealCalories);
            dayTotalCalories += dayMeals[mealType].calories;
        });
        
        // Adjust portions to hit target within ±50 kcal
        const calorieGap = targetDailyCalories - dayTotalCalories;
        if (Math.abs(calorieGap) > 50) {
            adjustMealPortions(dayMeals, calorieGap, targetDailyCalories);
        }
        
        mealPlan.push(dayMeals);
    }

    return mealPlan;
}

function selectMealByCalories(mealType, dayIndex, targetCalories) {

    const tolerance = 0.20; // allow 20% variation

    // Step 1: Filter by diet + allergies + type
    let candidates = foodDataset.filter(food => {
        if (food.mealType !== mealType) return false;

        const dietMatch = appState.userProfile.diets.some(d => food.diets.includes(d));
        if (!dietMatch) return false;

        if (!appState.userProfile.allergies.includes('none')) {
            const hasAllergen = appState.userProfile.allergies.some(a => food.allergens.includes(a));
            if (hasAllergen) return false;
        }

        return true;
    });

    if (candidates.length === 0) {
        return { name: 'No meal available', calories: 0, parts: [], mealType };
    }

    // Step 2: Prefer meals not used this week
    let unusedMeals = candidates.filter(m => !usedMealsThisWeek[mealType].has(m.name));

    // If no unused meals, allow repeats (fallback)
    if (unusedMeals.length === 0) {
        unusedMeals = candidates;
    }

    // Step 3: Filter by calorie range
    const min = targetCalories * (1 - tolerance);
    const max = targetCalories * (1 + tolerance);

    let finalMeals = unusedMeals.filter(m => m.calories >= min && m.calories <= max);

    if (finalMeals.length === 0) {
        finalMeals = unusedMeals;
    }

// Step 4: Pick RANDOM from top closest meals

// sort by closeness to target calories
const sortedMeals = finalMeals.sort((a, b) => {
    return Math.abs(a.calories - targetCalories) - Math.abs(b.calories - targetCalories);
});

// take top 5 closest matches (or fewer if less available)
const topChoices = sortedMeals.slice(0, 5);

// randomly select one among them
const selected = topChoices[Math.floor(Math.random() * topChoices.length)];


    // Mark as used
    usedMealsThisWeek[mealType].add(selected.name);

    return { ...selected, parts: selected.parts.map(p => ({ ...p })) };
}


function adjustMealPortions(dayMeals, calorieGap, targetDailyCalories) {
    // More sophisticated portion adjustment
    // Scale portions to bridge the gap between selected meals and target
    const currentTotal = Object.values(dayMeals).reduce((sum, meal) => sum + (meal.calories || 0), 0);
    if (currentTotal <= 0) return;
    
    // Calculate needed adjustment percentage
    const targetTotal = currentTotal + calorieGap;
    const overallScale = targetTotal / currentTotal;
    
    // Allow more aggressive scaling (±50%) to hit targets
    const cappedScale = Math.max(0.5, Math.min(1.5, overallScale));
    
    if (Math.abs(overallScale - cappedScale) > 0.01) {
        console.warn(`Meal portions scaled ${Math.round((cappedScale - 1) * 100)}% to hit target`);
    }
    
    // Apply scaling to all meals
    Object.values(dayMeals).forEach(meal => {
        if (meal.parts && meal.parts.length > 0) {
            meal.parts.forEach(part => {
                const num = parseFloat(String(part.quantity).replace(/[^0-9.]/g, '')) || 0;
                const newQty = Math.max(10, Math.round(num * cappedScale)); // Min 10g
                part.quantity = String(newQty);
                part.kcal = Math.round((parseFloat(part.kcal) || 0) * cappedScale);
            });
            meal.calories = Math.round((meal.calories || 0) * cappedScale);
        }
    });
}

function shuffleArray(items) {
    const arr = items.slice();
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getBaseMealKey(name) {
    if (!name) return '';
    const lowered = name.toLowerCase();
    const splitters = [' with ', ' and ', ' & ', ' + ', ' - ', ',', '/'];
    let base = lowered;
    splitters.forEach(token => {
        if (base.includes(token)) {
            base = base.split(token)[0];
        }
    });
    return base.replace(/\s+/g, ' ').trim();
}

function getTargetCaloriesForMealType(mealType) {
    if (!appState.calorieRequirements) return null;
    const split = CALORIE_SPLIT[mealType];
    if (!split) return null;
    return appState.calorieRequirements.recommendedDailyCalories * split;
}

function findAlternativeMeals(currentMeal, mealType, targetCalories) {
    const baseCalories = targetCalories || currentMeal.calories || 0;
    const filtered = foodDataset.filter(food => {
        // Match meal type
        if (food.mealType !== mealType) return false;

        // Don't include current meal
        if (food.name === currentMeal.name) return false;

        // Exclude meals already used this week (for more variety)
        if (usedMealsThisWeek[mealType].has(food.name)) return false;

        // Match at least one diet
        const dietMatch = appState.userProfile.diets.some(diet => food.diets.includes(diet));
        if (!dietMatch) return false;

        // Check allergens
        if (appState.userProfile.allergies.includes('none')) {
            if (food.allergens.length > 0) return false;
        } else {
            const hasAllergen = appState.userProfile.allergies.some(allergy => {
                if (allergy === 'other') return false;
                return food.allergens.includes(allergy);
            });
            if (hasAllergen) return false;
        }

        return true;
    });

    if (baseCalories > 0) {
        const minCalories = baseCalories * 0.85;
        const maxCalories = baseCalories * 1.15;
        const withinRange = filtered.filter(food => food.calories >= minCalories && food.calories <= maxCalories);
        if (withinRange.length > 0) return shuffleArray(withinRange).slice(0, 5);
    }

    const closest = filtered
        .slice()
        .sort((a, b) => Math.abs(a.calories - baseCalories) - Math.abs(b.calories - baseCalories))
        .slice(0, Math.min(10, filtered.length));

    return shuffleArray(closest).slice(0, 5);
}

function changeMeal(dayIndex, mealType) {
    const currentMeal = appState.mealPlan[dayIndex][mealType];
    const targetCalories = getTargetCaloriesForMealType(mealType);
    const alternatives = findAlternativeMeals(currentMeal, mealType, targetCalories);

    appState.currentDayIndex = dayIndex;
    appState.currentMealIndex = mealType;

    const alternativesGrid = document.getElementById('alternativesGrid');
    alternativesGrid.innerHTML = '';

    if (alternatives.length === 0) {
        alternativesGrid.innerHTML = '<p style="color: #999;">No alternative meals available with your constraints.</p>';
    } else {
        alternatives.forEach(meal => {
            const totalGrams = computeTotalGrams(meal);
            const per100 = totalGrams > 0 ? Math.round((meal.calories / totalGrams) * 100) : 0;
            const mealElement = document.createElement('div');
            mealElement.className = 'alternative-meal';
            mealElement.innerHTML = `
                <div class="alternative-meal-name">${meal.name}</div>
                <div class="alternative-meal-calories">${meal.calories} kcal • ${totalGrams} g (${per100} kcal/100g)</div>
                <div class="alternative-meal-parts">
                    ${meal.parts.map(p => `${p.ingredient} ${isNumeric(p.quantity) ? p.quantity + ' g' : p.quantity}`).join('<br>')}
                </div>
            `;
            mealElement.onclick = () => selectAlternativeMeal(meal, dayIndex, mealType);
            alternativesGrid.appendChild(mealElement);
        });
    }

    document.getElementById('changeMealModal').classList.add('show');
}

function selectAlternativeMeal(meal, dayIndex, mealType) {
    appState.mealPlan[dayIndex][mealType] = meal;
    closeMealModal();
    displayMealPlan();
}
function generateNewPlan() {
    if (!appState.userProfile || !appState.calorieRequirements) {
        alert("Please fill your profile first.");
        goToUserForm();
        return;
    }

    // 🔥 Clear used meals to avoid repetition
    usedMealsThisWeek = {
        breakfast: new Set(),
        lunch: new Set(),
        snack: new Set(),
        dinner: new Set()
    };

    // 🔥 Generate fresh plan
    appState.mealPlan = generatePlan();

    // 🔥 Save to sessionStorage (so login users keep it)
    localStorage.setItem("mealPlan", JSON.stringify(appState.mealPlan));

    // 🔥 IMPORTANT: Re-render UI
    displayMealPlan();

    console.log("✅ New plan generated and displayed");
}


function closeMealModal() {
    document.getElementById('changeMealModal').classList.remove('show');
    appState.currentDayIndex = null;
    appState.currentMealIndex = null;
}

// ==================== DISPLAY ====================
function DisplayMealPlan() {
    // Generate meal plan
    appState.mealPlan = generatePlan();

    // Save meal plan locally
    localStorage.setItem("mealPlan", JSON.stringify(appState.mealPlan));

    // Set current page
    appState.currentPage = 'mealplan';
    sessionStorage.setItem("currentPage", "mealplan");

    // Show meal plan page using smooth transition
    showPage('mealPlanPage');

    // Display the meal plan UI
    displayMealPlan();

    // Save to database
    saveMealPlanToDatabase();
}

function displayMealPlan() {
    // Show logout button if user is logged in
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.style.display = 'inline-flex';
    }
    
    // Display plan info
    const totalCalories = appState.mealPlan.reduce((total, day) => {
        return total + Object.values(day).reduce((dayTotal, meal) => dayTotal + meal.calories, 0);
    }, 0);
    const avgDailyCalories = Math.round(totalCalories / 7);
    
    // Get calorie requirements
    const cal = appState.calorieRequirements;
    const diffFromRecommended = avgDailyCalories - cal.recommendedDailyCalories;
    const diffPercentage = ((diffFromRecommended / cal.recommendedDailyCalories) * 100).toFixed(1);

    const planInfo = document.getElementById('planInfo');
    
    planInfo.innerHTML = `
        <div class="info-card">
            <div class="info-label">Name</div>
            <div class="info-value">${appState.userProfile.name || 'Guest'}</div>
        </div>
        <div class="info-card">
            <div class="info-label">Current Stats</div>
            <div class="info-value" style="font-size: 14px;">
                ${appState.userProfile.weight} kg • BMI ${cal.bmi} • ${appState.userProfile.age}y
            </div>
        </div>
        <div class="info-card">
            <div class="info-label">Goal</div>
            <div class="info-value">${appState.userProfile.weight} → ${appState.userProfile.targetWeight} kg</div>
            <div style="font-size: 11px; color: #666; margin-top: 3px;">
                ${Math.abs(appState.userProfile.weight - appState.userProfile.targetWeight).toFixed(1)} kg ${cal.direction} • ${appState.userProfile.timeframe} month${appState.userProfile.timeframe > 1 ? 's' : ''}
            </div>
        </div>
        <div class="info-card">
            <div class="info-label">Weekly Target</div>
            <div class="info-value">${cal.weeklyGoal} kg/week</div>
            ${cal.warning ? `<div style="margin-top: 5px; font-size: 11px; color: #ff9800;">${cal.warning}</div>` : '<div style="margin-top: 5px; font-size: 11px; color: #138808;">✓ Safe & Achievable</div>'}
        </div>
        <div class="info-card">
            <div class="info-label">BMR (Resting)</div>
            <div class="info-value">${cal.bmr} kcal/day</div>
            <div style="font-size: 11px; color: #666; margin-top: 3px;">Base metabolic rate</div>
        </div>
        <div class="info-card">
            <div class="info-label">Activity Level</div>
            <div class="info-value" style="font-size: 13px;">${cal.activityLevelLabel.split(' (')[0]}</div>
            <div style="font-size: 11px; color: #666; margin-top: 3px;">TDEE: ${cal.tdee} kcal/day</div>
        </div>
        <div class="info-card wide" style="border-left: 4px solid #138808; background: #f0f8f0;">
            <div class="info-label">✓ Target Daily Calories</div>
            <div class="info-value" style="color: #138808; font-size: 22px;">${cal.recommendedDailyCalories} kcal</div>
            <div style="font-size: 12px; color: #666; margin-top: 5px;">
                ${cal.direction === 'loss' ? 'Deficit' : cal.direction === 'gain' ? 'Surplus' : 'Maintenance'}: ${Math.abs(cal.calorieAdjustment)} kcal/day
            </div>
        </div>
        <div class="info-card wide">
            <div class="info-label">Actual Plan Average</div>
            <div class="info-value" style="color: ${Math.abs(diffFromRecommended) > 100 ? '#ff9800' : '#138808'};">
                ${avgDailyCalories} kcal
                <span style="font-size: 12px; display: block; margin-top: 5px;">
                    (${diffFromRecommended > 0 ? '+' : ''}${diffFromRecommended} kcal, ${diffPercentage}%)
                </span>
            </div>
        </div>
    `;

    // Display daily meals
    const mealPlanContainer = document.getElementById('mealPlanContainer');
    mealPlanContainer.innerHTML = '';

    appState.mealPlan.forEach((day, dayIndex) => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        const dayDates = new Date();
        dayDates.setDate(dayDates.getDate() + dayIndex);
        const dayName = dayDates.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

        let dayHTML = `<div class="day-header">📅 Day ${dayIndex + 1} - ${dayName}</div>`;
        dayHTML += '<div class="meals-grid">';

        ['breakfast', 'lunch', 'snack', 'dinner'].forEach(mealType => {
            const meal = day[mealType];
            const mealTypeLabel = mealType.charAt(0).toUpperCase() + mealType.slice(1);
            const mealTypeIcon = {
                breakfast: '🌅',
                lunch: '🍜',
                snack: '🥨',
                dinner: '🌙'
            }[mealType];

            const totalGrams = computeTotalGrams(meal);
            const per100 = totalGrams > 0 ? Math.round((meal.calories / totalGrams) * 100) : 0;
            dayHTML += `
              <div class="meal-item">
                <div class="meal-type">${mealTypeIcon} ${mealTypeLabel}</div>
                <div class="meal-header">
                  <strong>${meal.name}</strong> | ${meal.calories} kcal • ${totalGrams} g <span style="color:#999; font-size:12px;">(${per100} kcal/100g)</span>
                </div>
                <div class="macro-summary">
                  <span class="macro-item">🥩 Protein: ${meal.protein || 0}g</span>
                  <span class="macro-item">🍚 Carbs: ${meal.carbs || 0}g</span>
                  <span class="macro-item">🫒 Fat: ${meal.fat || 0}g</span>
                </div>
                <div class="meal-ingredients-label">Ingredients:</div>
                <div class="meal-parts">
                  ${meal.parts.map(p => {
                      let qty = p.quantity;
                      if (isNumeric(qty)) {
                          qty = qty + ' g';
                      }
                      return `<span class="meal-part">• ${p.ingredient} ${qty}</span>`;
                  }).join('')}
                </div>
                <button class="btn-change" onclick="changeMeal(${dayIndex}, '${mealType}')">Change meal</button>
              </div>
            `;
        });

        dayHTML += '</div>';
        dayCard.innerHTML = dayHTML;
        mealPlanContainer.appendChild(dayCard);
    });

    // Close modal if open
    document.getElementById('changeMealModal').classList.remove('show');
    
    // Display grocery list
    displayGroceryList();
}

// ==================== GROCERY LIST GENERATION ====================

function generateGroceryList() {
    const groceryMap = {};

    appState.mealPlan.forEach(day => {
        Object.values(day).forEach(meal => {
            if (!meal.parts) return;

            meal.parts.forEach(part => {
                const name = part.ingredient;

                // Extract numeric grams
                const qty = parseFloat(String(part.quantity).replace(/[^0-9.]/g, '')) || 0;

                if (!groceryMap[name]) {
                    groceryMap[name] = 0;
                }

                groceryMap[name] += qty;
            });
        });
    });

    return groceryMap;
}

function displayGroceryList() {
    const groceryMap = generateGroceryList();
    const groceryContainer = document.getElementById('groceryListContainer');

    if (!groceryContainer) return;

    // Keep collapsed by default (only remove if already expanded)
    const isCollapsed = groceryContainer.classList.contains('collapsed') || groceryContainer.innerHTML === "";

    // Build header
    let html = `
        <div class="grocery-header" onclick="toggleGroceryList()">
            <span class="grocery-title">🛒 Weekly Grocery List</span>
            <span id="groceryToggleIcon">${isCollapsed ? '▼' : '▲'}</span>
        </div>
        <div id="groceryContent" class="grocery-content">
            <ul class="grocery-list">
    `;

    // Add items
    Object.entries(groceryMap).forEach(([ingredient, totalQty]) => {
        html += `
            <li class="grocery-item">
                <span>${ingredient}</span>
                <span>${Math.round(totalQty)} g</span>
            </li>
        `;
    });

    html += `
            </ul>
        </div>
    `;

    groceryContainer.innerHTML = html;

    // Set initial collapsed state
    if (isCollapsed) {
        groceryContainer.classList.add('collapsed');
        document.getElementById('groceryContent').style.display = 'none';
    } else {
        groceryContainer.classList.remove('collapsed');
        document.getElementById('groceryContent').style.display = 'block';
    }
}

function toggleGroceryList() {
    const container = document.getElementById('groceryListContainer');
    const content = document.getElementById('groceryContent');
    const icon = document.getElementById('groceryToggleIcon');

    if (!container || !content || !icon) return;

    if (container.classList.contains('collapsed')) {
        // OPEN
        container.classList.remove('collapsed');
        content.style.display = 'block';
        icon.textContent = '▲';
    } else {
        // CLOSE
        container.classList.add('collapsed');
        content.style.display = 'none';
        icon.textContent = '▼';
    }
}

function showPage(pageId) {
    document.querySelectorAll('.app-page').forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });

    const page = document.getElementById(pageId);
    if (!page) return;

    const useFlex = page.classList.contains('landing-page') || page.classList.contains('auth-page');
    page.style.display = useFlex ? 'flex' : 'block';

    const headerActions = document.getElementById('headerActions');
    if (headerActions) {
        headerActions.style.display = pageId === 'mealPlanPage' ? 'flex' : 'none';
    }

    requestAnimationFrame(() => {
        page.classList.add('active');
    });
}



// ==================== GENERATE NEW PLAN (WITHOUT RESETTING USER) ====================
// ==================== GENERATE NEW PLAN (FORCE REFRESH) ====================
function generateNewPlan() {

    if (!appState.userProfile || !appState.userProfile.height) {
        alert("Please fill your profile first");
        goToUserForm();
        return;
    }

    console.log("Generating new plan...");

    // 🔁 reset used meals so new variety appears
    usedMealsThisWeek = {
        breakfast: new Set(),
        lunch: new Set(),
        snack: new Set(),
        dinner: new Set()
    };

    // 🔁 recalculate calories
    appState.calorieRequirements = calculateHealthyCalories(
        parseInt(appState.userProfile.height),
        parseInt(appState.userProfile.weight),
        parseInt(appState.userProfile.age),
        appState.userProfile.gender,
        parseInt(appState.userProfile.targetWeight),
        parseInt(appState.userProfile.timeframe),
        appState.userProfile.activityLevel
    );

    // 🔁 generate completely new plan
    const newPlan = generatePlan();
    appState.mealPlan = newPlan;

    // 🔁 save new plan
    sessionStorage.setItem("mealPlan", JSON.stringify(newPlan));

    // 🔁 update UI page state explicitly
    appState.currentPage = 'mealplan';
    sessionStorage.setItem("currentPage", "mealplan");
    showPage('mealPlanPage');

    // 🔁 force UI refresh
    displayMealPlan();

    console.log("New plan generated successfully!");
}



// ==================== INITIALIZATION ====================

// One-time demo runner (fills the form and generates a plan)
function runDemoProfile() {
    if (window.__demo_ran) return;
    window.__demo_ran = true;
    // Open form
    goToUserForm();

    // Small delay to ensure DOM elements (age/timeframe) are populated
    setTimeout(() => {
        try {
            document.getElementById('name').value = 'Demo User';
            const ageSelect = document.getElementById('age');
            if (ageSelect) ageSelect.value = '28';
            document.getElementById('gender').value = 'male';
            document.getElementById('height').value = '175';
            document.getElementById('weight').value = '75';
            document.getElementById('activityLevel').value = 'moderate';

            // Diet: Vegetarian (toggle and update state) - better coverage for all meal types
            document.querySelectorAll('#dietGroup .toggle-btn').forEach(btn => btn.classList.remove('active'));
            const veg = document.querySelector('#dietGroup .toggle-btn[data-diet="vegetarian"]');
            if (veg) veg.classList.add('active');
            appState.userProfile.diets = ['vegetarian'];

            // Allergies: None
            document.querySelectorAll('#allergyGroup .toggle-btn').forEach(btn => btn.classList.remove('active'));
            const noneAll = document.querySelector('#allergyGroup .toggle-btn[data-allergy="none"]');
            if (noneAll) { noneAll.classList.add('active'); appState.userProfile.allergies = ['none']; }

            document.getElementById('targetWeight').value = '72';
            document.getElementById('timeframe').value = '2';
            document.getElementById('customAllergy').value = '';

            // Mirror into appState (submitForm reads many fields from DOM but not toggles)
            appState.userProfile.name = 'Demo User';
            appState.userProfile.age = '28';
            appState.userProfile.gender = 'male';
            appState.userProfile.height = '175';
            appState.userProfile.weight = '75';
            appState.userProfile.activityLevel = 'moderate';
            appState.userProfile.targetWeight = '72';
            appState.userProfile.timeframe = '2';

            // Trigger generation
            setTimeout(() => submitForm(), 250);
        } catch (err) {
            console.error('Demo runner error:', err);
        }
    }, 200);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('changeMealModal');
        if (event.target === modal) {
            closeMealModal();
        }
    };

    const restoreApp = async () => {
        const savedPage = sessionStorage.getItem("currentPage") || "landing";
        const savedProfile = sessionStorage.getItem("userProfile");
        const savedMealPlan = sessionStorage.getItem("mealPlan");
        const guestData = sessionStorage.getItem("guestMealPlan");

        if (savedProfile) {
            appState.userProfile = JSON.parse(savedProfile);
        }

        if (guestData && !savedMealPlan) {
            const parsed = JSON.parse(guestData);
            appState.userProfile = parsed.profile;
            appState.mealPlan = parsed.plan || [];
            appState.calorieRequirements = parsed.calories || null;
        }

        if (savedMealPlan) {
            appState.mealPlan = JSON.parse(savedMealPlan);
        }

        if (!appState.calorieRequirements && appState.userProfile && appState.userProfile.height) {
            appState.calorieRequirements = calculateHealthyCalories(
                parseInt(appState.userProfile.height),
                parseInt(appState.userProfile.weight),
                parseInt(appState.userProfile.age),
                appState.userProfile.gender,
                parseInt(appState.userProfile.targetWeight),
                parseInt(appState.userProfile.timeframe),
                appState.userProfile.activityLevel
            );
        }

        let hasData = Array.isArray(appState.mealPlan) && appState.mealPlan.length > 0;

        if (!hasData && typeof supabase !== 'undefined') {
            try {
                const { data } = await supabase.auth.getSession();
                if (data && data.session && data.session.user) {
                    currentUser = data.session.user;
                    hasData = await loadMealPlanFromDatabase();
                }
            } catch (error) {
                console.error('Restore session error:', error);
            }
        }

        if (hasData) {
            appState.currentPage = 'mealplan';
            sessionStorage.setItem("currentPage", "mealplan");
            showPage('mealPlanPage');
            displayMealPlan();
            return;
        }

        showPage(
            savedPage === "auth" ? "authPage" :
            savedPage === "form" ? "formPage" :
            "landingPage"
        );
    };

    restoreApp();
});

