# MealMitra - AI-Powered 7-Day Indian Meal Planner

MealMitra is a personalized meal planning application designed specifically for Indian food preferences. It uses an intelligent algorithm to generate customized 7-day meal plans based on your nutritional requirements, dietary preferences, and allergies.

## Features

✨ **Personalized Meal Planning**
- 7-day customized meal plans targeting your specific caloric needs
- Individual daily calorie splits: Breakfast 28%, Lunch 35%, Snacks 12%, Dinner 25%
- Accurate calorie calculations using the Mifflin-St Jeor BMR equation
- Support for multiple diets (Vegetarian, Vegan, Keto, Low-Carb, High-Protein)

👤 **User Authentication**
- Secure login and signup with email
- User profile management with personalized health data
- Edit profile anytime without re-authentication
- Persistent user sessions across browser sessions

🍽️ **Meal Management**
- Instant swap of individual meals without regenerating entire plan
- Smart meal alternatives based on selected diet and allergies
- Prevents repetitive meals (±20% calorie accuracy)
- Handles multiple allergies and dietary restrictions

📋 **Grocery List Generation**
- Auto-generated grocery list from selected meal plan
- Quantity calculations for each ingredient
- Estimated total cost per item (based on Indian market prices)

⚠️ **Smart Warnings & Validation**
- Weight loss/gain goal realism checks
- Allergy and dietary restriction validation
- Caloric requirement confirmation before plan generation

## Tech Stack

### Frontend
- **Vanilla JavaScript** - Core app logic and state management
- **HTML5** - Semantic markup
- **CSS3** - Responsive design with flexbox and grid layouts

### Backend & Database
- **Supabase** - PostgreSQL database with real-time sync
- **Supabase Auth** - Email-based user authentication

### Data
- Comprehensive Indian food dataset with 500+ meal options
- Nutritional data: calories, protein, carbs, fats
- Allergen and dietary classification

## Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for Supabase authentication)
- Optional: Python 3.x for local HTTP server

### Local Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rithvikvarma-p/MealMitra.git
   cd MealMitra
   ```

2. **Configure Supabase**
   - Create an account at [supabase.com](https://supabase.com)
   - Create a new project
   - Update `supabase.js` with your project URL and API key:
     ```javascript
     const supabaseUrl = 'your_project_url'
     const supabaseKey = 'your_anon_key'
     ```

3. **Set up the Database**
   - Create a `user_profiles` table in Supabase with columns matching the user profile structure
   - Create a `meal_plans` table for storing user meal plans
   - Refer to [TECHNICAL_IMPLEMENTATION.md](TECHNICAL_IMPLEMENTATION.md) for schema details

4. **Start Local Server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   ```

5. **Access the App**
   - Open browser and navigate to `http://localhost:8000`

## Usage Guide

### Getting Started

1. **Landing Page**
   - Click "Get Started" to begin

2. **User Authentication**
   - Create a new account with email and password, OR
   - Log in if you already have an account

3. **Enter Your Profile**
   - Fill in personal details (age, height, weight, gender)
   - Select activity level (Sedentary, Lightly Active, Moderately Active, Very Active)
   - Choose dietary preferences (Vegetarian, Vegan, Keto, etc.)
   - Specify allergies (peanuts, shellfish, dairy, etc.)
   - Set weight loss/gain goal and timeframe

4. **Generate Your Meal Plan**
   - Review any warnings about unrealistic targets
   - Tap "Generate Plan" to create your personalized meal plan
   - Meal plan is automatically saved to your profile

5. **View & Manage Your Plan**
   - See 7-day summary with daily calorie breakdowns
   - Tap any meal card to swap it with alternatives
   - View complete grocery list with estimated costs
   - Scroll through per-meal calorie details

6. **Edit Your Profile**
   - Click "Edit Profile" to update your information
   - Changes are saved without logging out
   - Generate a new plan with updated requirements

7. **Manage Your Account**
   - Click "Logout" to securely log out
   - Login again anytime to restore your previous meal plan

## Database Structure

### User Profiles Table (`user_profiles`)
- `id` (UUID) - Primary key
- `email` (text) - User email
- `name` (text) - Full name
- `age` (integer) - Age in years
- `gender` (text) - Male/Female
- `height` (integer) - Height in CM
- `weight` (integer) - Weight in KG
- `activityLevel` (text) - Activity level selection
- `diets` (array) - Dietary preferences
- `allergies` (array) - Allergy list
- `targetWeight` (integer) - Goal weight
- `timeframe` (text) - Weight change timeframe
- `created_at` (timestamp) - Account creation date
- `updated_at` (timestamp) - Last profile update

### Meal Plans Table (`meal_plans`)
- `id` (UUID) - Primary key
- `user_id` (UUID) - Foreign key to user
- `meal_plan` (json) - Complete 7-day meal plan data
- `created_at` (timestamp) - Plan generation date

## Key Calculations

### Basal Metabolic Rate (BMR)
Uses the Mifflin-St Jeor equation for accuracy:
- **Male:** BMR = 10×weight + 6.25×height - 5×age + 5
- **Female:** BMR = 10×weight + 6.25×height - 5×age - 161

### Daily Caloric Needs
- Base: BMR × Activity Factor (1.2 to 1.9)
- Adjustment: ±300-500 kcal based on weight goal

### Meal Plan Distribution
- **Breakfast:** 28% of daily calories
- **Lunch:** 35% of daily calories
- **Snacks:** 12% of daily calories
- **Dinner:** 25% of daily calories

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Support

For issues, bugs, or feature requests, please open an issue on the [GitHub repository](https://github.com/rithvikvarma-p/MealMitra/issues).

---

**Made with ❤️ for healthier Indian eating**
