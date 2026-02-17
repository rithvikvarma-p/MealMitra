const foodDataset = [

/* =========================================================
   BREAKFAST (30+ items)
   ========================================================= */

{
  name: "Idli Sambar",
  mealType: "breakfast",
  cuisine: "South Indian",
  diets: ["vegetarian","vegan"],
  calories: 320,
  carbs: 50, protein: 12, fat: 4, fiber: 5,
  servingSize: "3 idlis + sambar (300g)",
  parts: [
    { ingredient: "Idli", quantity: "180", kcal: 210 },
    { ingredient: "Sambar", quantity: "150", kcal: 110 }
  ],
  allergens: [],
  region: "Tamil Nadu",
  description: "Steamed rice cakes with lentil vegetable stew"
},

{
  name: "Masala Dosa",
  mealType: "breakfast",
  cuisine: "South Indian",
  diets: ["vegetarian"],
  calories: 420,
  carbs: 55, protein: 10, fat: 18, fiber: 4,
  servingSize: "1 dosa (280g)",
  parts: [
    { ingredient: "Dosa", quantity: "200", kcal: 280 },
    { ingredient: "Potato masala", quantity: "120", kcal: 120 }
  ],
  allergens: ["gluten"],
  region: "Karnataka",
  description: "Crispy rice crepe stuffed with spiced potatoes"
},

{
  name: "Plain Dosa",
  mealType: "breakfast",
  cuisine: "South Indian",
  diets: ["vegetarian","vegan"],
  calories: 350,
  carbs: 50, protein: 9, fat: 12, fiber: 3,
  servingSize: "1 dosa (240g)",
  parts: [
    { ingredient: "Dosa", quantity: "240", kcal: 350 }
  ],
  allergens: ["gluten"],
  region: "Tamil Nadu",
  description: "Fermented rice crepe served with chutney"
},

{
  name: "Rava Dosa",
  mealType: "breakfast",
  cuisine: "South Indian",
  diets: ["vegetarian"],
  calories: 380,
  carbs: 52, protein: 8, fat: 15, fiber: 2,
  servingSize: "1 dosa (260g)",
  parts: [
    { ingredient: "Rava dosa", quantity: "260", kcal: 380 }
  ],
  allergens: ["gluten"],
  region: "Karnataka",
  description: "Crispy semolina dosa with spices"
},

{
  name: "Vegetable Upma",
  mealType: "breakfast",
  cuisine: "South Indian",
  diets: ["vegetarian"],
  calories: 340,
  carbs: 50, protein: 9, fat: 10, fiber: 3,
  servingSize: "1 bowl (250g)",
  parts: [
    { ingredient: "Upma", quantity: "250", kcal: 340 }
  ],
  allergens: ["gluten"],
  region: "Karnataka",
  description: "Savory semolina dish with vegetables"
},

{
  name: "Poha",
  mealType: "breakfast",
  cuisine: "Maharashtrian",
  diets: ["vegetarian","vegan"],
  calories: 320,
  carbs: 60, protein: 8, fat: 8, fiber: 3,
  servingSize: "1 plate (250g)",
  parts: [
    { ingredient: "Poha", quantity: "220", kcal: 260 },
    { ingredient: "Peanuts", quantity: "30", kcal: 60 }
  ],
  allergens: ["peanuts"],
  region: "Maharashtra",
  description: "Flattened rice cooked with peanuts and spices"
},

{
  name: "Aloo Paratha with Curd",
  mealType: "breakfast",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 480,
  carbs: 60, protein: 10, fat: 20, fiber: 4,
  servingSize: "1 paratha + curd (300g)",
  parts: [
    { ingredient: "Aloo paratha", quantity: "200", kcal: 360 },
    { ingredient: "Curd", quantity: "100", kcal: 120 }
  ],
  allergens: ["gluten","dairy"],
  region: "Punjab",
  description: "Stuffed flatbread served with curd"
},

{
  name: "Paneer Paratha",
  mealType: "breakfast",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 500,
  carbs: 50, protein: 15, fat: 25, fiber: 3,
  servingSize: "1 paratha (250g)",
  parts: [
    { ingredient: "Paneer paratha", quantity: "250", kcal: 500 }
  ],
  allergens: ["gluten","dairy"],
  region: "Punjab",
  description: "Flatbread stuffed with spiced paneer"
},

{
  name: "Pongal",
  mealType: "breakfast",
  cuisine: "South Indian",
  diets: ["vegetarian"],
  calories: 380,
  carbs: 60, protein: 12, fat: 10, fiber: 3,
  servingSize: "1 bowl (300g)",
  parts: [
    { ingredient: "Pongal", quantity: "300", kcal: 380 }
  ],
  allergens: ["dairy"],
  region: "Tamil Nadu",
  description: "Rice and lentil dish cooked with ghee and pepper"
},

{
  name: "Pesarattu",
  mealType: "breakfast",
  cuisine: "Andhra",
  diets: ["vegetarian","vegan"],
  calories: 330,
  carbs: 40, protein: 12, fat: 8, fiber: 5,
  servingSize: "2 pesarattu (250g)",
  parts: [
    { ingredient: "Pesarattu", quantity: "250", kcal: 330 }
  ],
  allergens: [],
  region: "Andhra Pradesh",
  description: "Green gram dosa rich in protein"
},

{
  name: "Egg Bhurji Toast",
  mealType: "breakfast",
  cuisine: "Indian",
  diets: ["eggetarian","nonveg"],
  calories: 390,
  carbs: 30, protein: 18, fat: 20, fiber: 2,
  servingSize: "1 plate (260g)",
  parts: [
    { ingredient: "Egg bhurji", quantity: "180", kcal: 260 },
    { ingredient: "Toast", quantity: "80", kcal: 130 }
  ],
  allergens: ["gluten","egg"],
  region: "Pan India",
  description: "Spiced scrambled eggs served with bread"
},

{
  name: "Boiled Eggs & Toast",
  mealType: "breakfast",
  cuisine: "Indian",
  diets: ["eggetarian","nonveg"],
  calories: 320,
  carbs: 30, protein: 18, fat: 12, fiber: 2,
  servingSize: "2 eggs + toast (240g)",
  parts: [
    { ingredient: "Eggs", quantity: "120", kcal: 160 },
    { ingredient: "Toast", quantity: "80", kcal: 160 }
  ],
  allergens: ["gluten","egg"],
  region: "Pan India",
  description: "Simple protein-rich breakfast"
},

/* =========================================================
   LUNCH (40+ items)
   ========================================================= */

{
  name: "Rajma Chawal",
  mealType: "lunch",
  cuisine: "North Indian",
  diets: ["vegetarian","vegan"],
  calories: 540,
  carbs: 70, protein: 18, fat: 12, fiber: 10,
  servingSize: "1 plate (400g)",
  parts: [
    { ingredient: "Rice", quantity: "200", kcal: 260 },
    { ingredient: "Rajma curry", quantity: "200", kcal: 280 }
  ],
  allergens: [],
  region: "Delhi",
  description: "Kidney bean curry served with rice"
},

{
  name: "Dal Tadka Rice",
  mealType: "lunch",
  cuisine: "North Indian",
  diets: ["vegetarian","vegan"],
  calories: 520,
  carbs: 65, protein: 16, fat: 12, fiber: 8,
  servingSize: "1 plate (380g)",
  parts: [
    { ingredient: "Rice", quantity: "200", kcal: 260 },
    { ingredient: "Dal tadka", quantity: "180", kcal: 260 }
  ],
  allergens: [],
  region: "North India",
  description: "Yellow lentils tempered with spices served with rice"
},

{
  name: "Paneer Butter Masala",
  mealType: "lunch",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 320,
  carbs: 28, protein: 18, fat: 18, fiber: 1.5,
  servingSize: "1 serving (280g)",
  parts: [
    { ingredient: "Paneer", quantity: "100", kcal: 240 },
    { ingredient: "Tomato gravy", quantity: "120", kcal: 50 },
    { ingredient: "Cream", quantity: "20", kcal: 30 }
  ],
  allergens: ["dairy"],
  region: "Punjab",
  description: "Paneer cubes in creamy tomato gravy"
},

{
  name: "Palak Paneer",
  mealType: "lunch",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 300,
  carbs: 20, protein: 16, fat: 18, fiber: 3,
  servingSize: "1 bowl (250g)",
  parts: [
    { ingredient: "Paneer", quantity: "100", kcal: 240 },
    { ingredient: "Spinach gravy", quantity: "150", kcal: 60 }
  ],
  allergens: ["dairy"],
  region: "Punjab",
  description: "Paneer cubes in spinach gravy"
},

{
  name: "Chicken Curry Rice",
  mealType: "lunch",
  cuisine: "Indian",
  diets: ["nonveg"],
  calories: 620,
  carbs: 60, protein: 30, fat: 25, fiber: 2,
  servingSize: "1 plate (380g)",
  parts: [
    { ingredient: "Chicken curry", quantity: "180", kcal: 360 },
    { ingredient: "Rice", quantity: "200", kcal: 260 }
  ],
  allergens: [],
  region: "Pan India",
  description: "Spicy chicken curry served with rice"
},

{
  name: "Fish Curry Rice",
  mealType: "lunch",
  cuisine: "Coastal",
  diets: ["nonveg"],
  calories: 580,
  carbs: 60, protein: 28, fat: 20, fiber: 2,
  servingSize: "1 plate (380g)",
  parts: [
    { ingredient: "Fish curry", quantity: "180", kcal: 320 },
    { ingredient: "Rice", quantity: "200", kcal: 260 }
  ],
  allergens: ["fish"],
  region: "Kerala",
  description: "Coconut-based spicy fish curry"
},

{
  name: "Chicken Biryani",
  mealType: "lunch",
  cuisine: "Hyderabadi",
  diets: ["nonveg"],
  calories: 650,
  carbs: 70, protein: 32, fat: 22, fiber: 3,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Chicken biryani", quantity: "350", kcal: 650 }
  ],
  allergens: [],
  region: "Hyderabad",
  description: "Aromatic basmati rice with spiced chicken"
},

{
  name: "Vegetable Biryani",
  mealType: "lunch",
  cuisine: "Hyderabadi",
  diets: ["vegetarian"],
  calories: 550,
  carbs: 75, protein: 12, fat: 18, fiber: 4,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Veg biryani", quantity: "350", kcal: 550 }
  ],
  allergens: [],
  region: "Hyderabad",
  description: "Rice cooked with vegetables and spices"
},

/* ====================== MORE LUNCH OPTIONS ====================== */

{
  name: "Chole Bhature",
  mealType: "lunch",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 650,
  carbs: 80, protein: 18, fat: 25, fiber: 9,
  servingSize: "2 bhature + chole (400g)",
  parts: [
    { ingredient: "Chole", quantity: "200", kcal: 300 },
    { ingredient: "Bhature", quantity: "200", kcal: 350 }
  ],
  allergens: ["gluten"],
  region: "Punjab",
  description: "Spicy chickpea curry served with deep fried bread"
},

{
  name: "Kadhi Chawal",
  mealType: "lunch",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 500,
  carbs: 65, protein: 14, fat: 16, fiber: 4,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Rice", quantity: "200", kcal: 260 },
    { ingredient: "Kadhi", quantity: "180", kcal: 240 }
  ],
  allergens: ["dairy"],
  region: "Rajasthan",
  description: "Yogurt-based curry served with rice"
},

{
  name: "Sambar Rice",
  mealType: "lunch",
  cuisine: "South Indian",
  diets: ["vegetarian","vegan"],
  calories: 480,
  carbs: 65, protein: 15, fat: 10, fiber: 8,
  servingSize: "1 bowl (350g)",
  parts: [
    { ingredient: "Rice", quantity: "200", kcal: 260 },
    { ingredient: "Sambar", quantity: "200", kcal: 220 }
  ],
  allergens: [],
  region: "Tamil Nadu",
  description: "Rice mixed with lentil vegetable sambar"
},

{
  name: "Curd Rice",
  mealType: "lunch",
  cuisine: "South Indian",
  diets: ["vegetarian"],
  calories: 450,
  carbs: 60, protein: 12, fat: 12, fiber: 2,
  servingSize: "1 bowl (300g)",
  parts: [
    { ingredient: "Curd rice", quantity: "300", kcal: 450 }
  ],
  allergens: ["dairy"],
  region: "Tamil Nadu",
  description: "Cooling yogurt rice with seasoning"
},

{
  name: "Lemon Rice",
  mealType: "lunch",
  cuisine: "South Indian",
  diets: ["vegetarian","vegan"],
  calories: 480,
  carbs: 65, protein: 10, fat: 18, fiber: 4,
  servingSize: "1 plate (300g)",
  parts: [
    { ingredient: "Lemon rice", quantity: "300", kcal: 480 }
  ],
  allergens: ["peanuts"],
  region: "Andhra Pradesh",
  description: "Tangy rice flavored with lemon and spices"
},

{
  name: "Vegetable Fried Rice",
  mealType: "lunch",
  cuisine: "Indo-Chinese",
  diets: ["vegetarian","vegan"],
  calories: 520,
  carbs: 75, protein: 10, fat: 16, fiber: 4,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Veg fried rice", quantity: "350", kcal: 520 }
  ],
  allergens: ["soy"],
  region: "Pan India",
  description: "Stir fried rice with vegetables and soy sauce"
},

{
  name: "Egg Fried Rice",
  mealType: "lunch",
  cuisine: "Indo-Chinese",
  diets: ["eggetarian","nonveg"],
  calories: 580,
  carbs: 70, protein: 18, fat: 20, fiber: 3,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Egg fried rice", quantity: "350", kcal: 580 }
  ],
  allergens: ["egg","soy"],
  region: "Pan India",
  description: "Rice stir fried with egg and vegetables"
},

{
  name: "Chicken Fried Rice",
  mealType: "lunch",
  cuisine: "Indo-Chinese",
  diets: ["nonveg"],
  calories: 620,
  carbs: 70, protein: 28, fat: 22, fiber: 3,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Chicken fried rice", quantity: "350", kcal: 620 }
  ],
  allergens: ["soy"],
  region: "Pan India",
  description: "Rice stir fried with chicken and vegetables"
},

{
  name: "Paneer Fried Rice",
  mealType: "lunch",
  cuisine: "Indo-Chinese",
  diets: ["vegetarian"],
  calories: 600,
  carbs: 65, protein: 20, fat: 24, fiber: 3,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Paneer fried rice", quantity: "350", kcal: 600 }
  ],
  allergens: ["dairy","soy"],
  region: "Pan India",
  description: "Fried rice with paneer cubes"
},

{
  name: "Chicken Tikka with Roti",
  mealType: "lunch",
  cuisine: "North Indian",
  diets: ["nonveg"],
  calories: 550,
  carbs: 40, protein: 35, fat: 25, fiber: 3,
  servingSize: "2 roti + chicken tikka (300g)",
  parts: [
    { ingredient: "Chicken tikka", quantity: "180", kcal: 350 },
    { ingredient: "Roti", quantity: "120", kcal: 200 }
  ],
  allergens: ["dairy","gluten"],
  region: "Punjab",
  description: "Grilled chicken pieces served with roti"
},

{
  name: "Mutton Curry with Rice",
  mealType: "lunch",
  cuisine: "North Indian",
  diets: ["nonveg"],
  calories: 700,
  carbs: 60, protein: 30, fat: 35, fiber: 2,
  servingSize: "1 plate (380g)",
  parts: [
    { ingredient: "Mutton curry", quantity: "180", kcal: 440 },
    { ingredient: "Rice", quantity: "200", kcal: 260 }
  ],
  allergens: [],
  region: "North India",
  description: "Spicy mutton curry served with rice"
},

{
  name: "Tofu Curry with Rice",
  mealType: "lunch",
  cuisine: "Fusion",
  diets: ["vegan"],
  calories: 520,
  carbs: 60, protein: 22, fat: 20, fiber: 5,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Tofu curry", quantity: "180", kcal: 260 },
    { ingredient: "Rice", quantity: "200", kcal: 260 }
  ],
  allergens: ["soy"],
  region: "Pan India",
  description: "Plant protein tofu cooked in Indian spices"
},

{
  name: "Vegetable Thali",
  mealType: "lunch",
  cuisine: "Indian",
  diets: ["vegetarian"],
  calories: 650,
  carbs: 80, protein: 18, fat: 25, fiber: 8,
  servingSize: "1 thali (450g)",
  parts: [
    { ingredient: "Rice", quantity: "150", kcal: 200 },
    { ingredient: "Roti", quantity: "100", kcal: 180 },
    { ingredient: "Dal", quantity: "100", kcal: 130 },
    { ingredient: "Sabzi", quantity: "100", kcal: 140 }
  ],
  allergens: ["gluten"],
  region: "Pan India",
  description: "Complete Indian meal with dal, roti, rice and vegetables"
},

{
  name: "Fish Fry with Rice",
  mealType: "lunch",
  cuisine: "Coastal",
  diets: ["nonveg"],
  calories: 600,
  carbs: 60, protein: 28, fat: 25, fiber: 2,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Fish fry", quantity: "150", kcal: 340 },
    { ingredient: "Rice", quantity: "200", kcal: 260 }
  ],
  allergens: ["fish"],
  region: "Kerala",
  description: "Spicy pan fried fish served with rice"
},

{
  name: "Vegetable Khichdi",
  mealType: "lunch",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 420,
  carbs: 65, protein: 14, fat: 8, fiber: 6,
  servingSize: "1 bowl (300g)",
  parts: [
    { ingredient: "Khichdi", quantity: "300", kcal: 420 }
  ],
  allergens: [],
  region: "Gujarat",
  description: "Rice and lentils cooked together for a light meal"
},


/* =========================================================
   SNACKS (20+ items)
   ========================================================= */

{
  name: "Roasted Chana",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 180,
  carbs: 30, protein: 8, fat: 2, fiber: 6,
  servingSize: "1 bowl (60g)",
  parts: [
    { ingredient: "Chana", quantity: "60", kcal: 180 }
  ],
  allergens: [],
  region: "Pan India",
  description: "Dry roasted chickpeas rich in protein"
},

{
  name: "Fruit Bowl",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 150,
  carbs: 35, protein: 2, fat: 0, fiber: 4,
  servingSize: "1 bowl (200g)",
  parts: [
    { ingredient: "Mixed fruits", quantity: "200", kcal: 150 }
  ],
  allergens: [],
  region: "Pan India",
  description: "Fresh seasonal fruits"
},

{
  name: "Peanut Chaat",
  mealType: "snack",
  cuisine: "Street Food",
  diets: ["vegetarian","vegan"],
  calories: 220,
  carbs: 20, protein: 8, fat: 14, fiber: 3,
  servingSize: "1 bowl (150g)",
  parts: [
    { ingredient: "Peanuts", quantity: "80", kcal: 220 }
  ],
  allergens: ["peanuts"],
  region: "Mumbai",
  description: "Tangy roasted peanuts snack"
},

{
  name: "Boiled Eggs",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["eggetarian","nonveg"],
  calories: 160,
  carbs: 2, protein: 13, fat: 11, fiber: 0,
  servingSize: "2 eggs (120g)",
  parts: [
    { ingredient: "Eggs", quantity: "120", kcal: 160 }
  ],
  allergens: ["egg"],
  region: "Pan India",
  description: "Protein-rich boiled eggs"
},

/* ====================== MORE SNACK OPTIONS ====================== */

{
  name: "Sprouts Salad",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 180,
  carbs: 28, protein: 12, fat: 3, fiber: 7,
  servingSize: "1 bowl (200g)",
  parts: [
    { ingredient: "Mixed sprouts", quantity: "180", kcal: 160 },
    { ingredient: "Onion tomato", quantity: "20", kcal: 20 }
  ],
  allergens: [],
  region: "Pan India",
  description: "Healthy protein-rich mixed sprouts salad"
},

{
  name: "Roasted Peanuts",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 220,
  carbs: 10, protein: 9, fat: 18, fiber: 3,
  servingSize: "1 bowl (50g)",
  parts: [
    { ingredient: "Peanuts", quantity: "50", kcal: 220 }
  ],
  allergens: ["peanuts"],
  region: "Pan India",
  description: "Crunchy roasted peanuts rich in healthy fats"
},

{
  name: "Masala Corn",
  mealType: "snack",
  cuisine: "Street Food",
  diets: ["vegetarian","vegan"],
  calories: 180,
  carbs: 35, protein: 6, fat: 2, fiber: 4,
  servingSize: "1 cup (200g)",
  parts: [
    { ingredient: "Boiled corn", quantity: "200", kcal: 180 }
  ],
  allergens: [],
  region: "Pan India",
  description: "Spicy buttered corn snack"
},

{
  name: "Buttermilk",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian"],
  calories: 90,
  carbs: 8, protein: 5, fat: 3, fiber: 0,
  servingSize: "1 glass (250ml)",
  parts: [
    { ingredient: "Buttermilk", quantity: "250", kcal: 90 }
  ],
  allergens: ["dairy"],
  region: "Gujarat",
  description: "Cooling spiced buttermilk drink"
},

{
  name: "Banana Peanut Smoothie",
  mealType: "snack",
  cuisine: "Fusion",
  diets: ["vegetarian"],
  calories: 250,
  carbs: 35, protein: 8, fat: 8, fiber: 3,
  servingSize: "1 glass (250ml)",
  parts: [
    { ingredient: "Banana smoothie", quantity: "250", kcal: 250 }
  ],
  allergens: ["peanuts","dairy"],
  region: "Pan India",
  description: "Energy-rich smoothie with banana and peanuts"
},

{
  name: "Vegetable Sandwich",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian"],
  calories: 300,
  carbs: 40, protein: 8, fat: 12, fiber: 4,
  servingSize: "1 sandwich (200g)",
  parts: [
    { ingredient: "Bread sandwich", quantity: "200", kcal: 300 }
  ],
  allergens: ["gluten"],
  region: "Pan India",
  description: "Simple vegetable sandwich"
},

{
  name: "Egg Sandwich",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["eggetarian","nonveg"],
  calories: 320,
  carbs: 35, protein: 15, fat: 15, fiber: 3,
  servingSize: "1 sandwich (200g)",
  parts: [
    { ingredient: "Egg sandwich", quantity: "200", kcal: 320 }
  ],
  allergens: ["egg","gluten"],
  region: "Pan India",
  description: "Protein-rich egg sandwich"
},

{
  name: "Chicken Sandwich",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["nonveg"],
  calories: 350,
  carbs: 30, protein: 20, fat: 18, fiber: 2,
  servingSize: "1 sandwich (200g)",
  parts: [
    { ingredient: "Chicken sandwich", quantity: "200", kcal: 350 }
  ],
  allergens: ["gluten"],
  region: "Pan India",
  description: "Grilled chicken sandwich"
},

{
  name: "Bhel Puri",
  mealType: "snack",
  cuisine: "Street Food",
  diets: ["vegetarian","vegan"],
  calories: 220,
  carbs: 45, protein: 6, fat: 5, fiber: 4,
  servingSize: "1 plate (200g)",
  parts: [
    { ingredient: "Bhel puri mix", quantity: "200", kcal: 220 }
  ],
  allergens: ["gluten"],
  region: "Mumbai",
  description: "Tangy puffed rice chaat"
},

{
  name: "Sev Puri",
  mealType: "snack",
  cuisine: "Street Food",
  diets: ["vegetarian"],
  calories: 260,
  carbs: 35, protein: 5, fat: 12, fiber: 3,
  servingSize: "1 plate (180g)",
  parts: [
    { ingredient: "Sev puri", quantity: "180", kcal: 260 }
  ],
  allergens: ["gluten"],
  region: "Mumbai",
  description: "Crispy puri topped with chutneys"
},

{
  name: "Dhokla",
  mealType: "snack",
  cuisine: "Gujarati",
  diets: ["vegetarian"],
  calories: 160,
  carbs: 25, protein: 7, fat: 3, fiber: 2,
  servingSize: "1 plate (150g)",
  parts: [
    { ingredient: "Dhokla", quantity: "150", kcal: 160 }
  ],
  allergens: ["gluten"],
  region: "Gujarat",
  description: "Steamed gram flour savory cake"
},

{
  name: "Samosa",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian"],
  calories: 300,
  carbs: 35, protein: 6, fat: 16, fiber: 3,
  servingSize: "1 samosa (150g)",
  parts: [
    { ingredient: "Samosa", quantity: "150", kcal: 300 }
  ],
  allergens: ["gluten"],
  region: "Pan India",
  description: "Deep fried pastry stuffed with potatoes"
},

{
  name: "Chicken Samosa",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["nonveg"],
  calories: 320,
  carbs: 30, protein: 12, fat: 18, fiber: 2,
  servingSize: "1 samosa (150g)",
  parts: [
    { ingredient: "Chicken samosa", quantity: "150", kcal: 320 }
  ],
  allergens: ["gluten"],
  region: "Pan India",
  description: "Deep fried pastry filled with chicken"
},

{
  name: "Paneer Tikka",
  mealType: "snack",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 300,
  carbs: 8, protein: 18, fat: 22, fiber: 1,
  servingSize: "1 plate (200g)",
  parts: [
    { ingredient: "Paneer tikka", quantity: "200", kcal: 300 }
  ],
  allergens: ["dairy"],
  region: "Punjab",
  description: "Grilled paneer cubes with spices"
},

{
  name: "Chicken Tikka",
  mealType: "snack",
  cuisine: "North Indian",
  diets: ["nonveg"],
  calories: 320,
  carbs: 5, protein: 28, fat: 18, fiber: 1,
  servingSize: "1 plate (200g)",
  parts: [
    { ingredient: "Chicken tikka", quantity: "200", kcal: 320 }
  ],
  allergens: ["dairy"],
  region: "Punjab",
  description: "Grilled spiced chicken pieces"
},

{
  name: "Boiled Sweet Corn",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 150,
  carbs: 32, protein: 5, fat: 2, fiber: 4,
  servingSize: "1 cup (180g)",
  parts: [
    { ingredient: "Corn", quantity: "180", kcal: 150 }
  ],
  allergens: [],
  region: "Pan India",
  description: "Simple boiled sweet corn"
},

{
  name: "Dry Fruits Mix",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 250,
  carbs: 20, protein: 6, fat: 18, fiber: 3,
  servingSize: "1 bowl (50g)",
  parts: [
    { ingredient: "Mixed dry fruits", quantity: "50", kcal: 250 }
  ],
  allergens: ["nuts"],
  region: "Pan India",
  description: "Energy-rich mixed nuts and dry fruits"
},

{
  name: "Protein Lassi",
  mealType: "snack",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 200,
  carbs: 18, protein: 10, fat: 8, fiber: 0,
  servingSize: "1 glass (250ml)",
  parts: [
    { ingredient: "Lassi", quantity: "250", kcal: 200 }
  ],
  allergens: ["dairy"],
  region: "Punjab",
  description: "Yogurt drink rich in protein"
},

{
  name: "Vegetable Cutlet",
  mealType: "snack",
  cuisine: "Indian",
  diets: ["vegetarian"],
  calories: 260,
  carbs: 35, protein: 6, fat: 10, fiber: 3,
  servingSize: "2 cutlets (180g)",
  parts: [
    { ingredient: "Cutlet", quantity: "180", kcal: 260 }
  ],
  allergens: ["gluten"],
  region: "Pan India",
  description: "Crispy vegetable patties"
},



/* =========================================================
   DINNER (20+ items)
   ========================================================= */

{
  name: "Vegetable Khichdi",
  mealType: "dinner",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 420,
  carbs: 65, protein: 14, fat: 8, fiber: 6,
  servingSize: "1 bowl (300g)",
  parts: [
    { ingredient: "Khichdi", quantity: "300", kcal: 420 }
  ],
  allergens: [],
  region: "Gujarat",
  description: "Rice and lentils comfort meal"
},

{
  name: "Roti Sabzi",
  mealType: "dinner",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 450,
  carbs: 55, protein: 12, fat: 15, fiber: 6,
  servingSize: "2 roti + sabzi (300g)",
  parts: [
    { ingredient: "Roti", quantity: "150", kcal: 250 },
    { ingredient: "Vegetable sabzi", quantity: "150", kcal: 200 }
  ],
  allergens: ["gluten"],
  region: "Punjab",
  description: "Whole wheat flatbread with vegetable curry"
},

{
  name: "Grilled Chicken Salad",
  mealType: "dinner",
  cuisine: "Fusion",
  diets: ["nonveg"],
  calories: 400,
  carbs: 12, protein: 35, fat: 18, fiber: 4,
  servingSize: "1 bowl (300g)",
  parts: [
    { ingredient: "Grilled chicken", quantity: "180", kcal: 300 },
    { ingredient: "Vegetables", quantity: "120", kcal: 100 }
  ],
  allergens: [],
  region: "Pan India",
  description: "High protein chicken with vegetables"
},

{
  name: "Dal Tadka with Roti",
  mealType: "dinner",
  cuisine: "North Indian",
  diets: ["vegetarian","vegan"],
  calories: 460,
  carbs: 60, protein: 18, fat: 12, fiber: 8,
  servingSize: "2 roti + dal (350g)",
  parts: [
    { ingredient: "Roti", quantity: "150", kcal: 250 },
    { ingredient: "Dal tadka", quantity: "200", kcal: 210 }
  ],
  allergens: ["gluten"],
  region: "Punjab",
  description: "Yellow lentils tempered with spices served with roti"
},

{
  name: "Jeera Rice with Dal",
  mealType: "dinner",
  cuisine: "North Indian",
  diets: ["vegetarian","vegan"],
  calories: 500,
  carbs: 70, protein: 16, fat: 10, fiber: 6,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Jeera rice", quantity: "200", kcal: 260 },
    { ingredient: "Dal", quantity: "180", kcal: 240 }
  ],
  allergens: [],
  region: "North India",
  description: "Cumin-flavored rice with simple dal"
},

{
  name: "Vegetable Pulao with Raita",
  mealType: "dinner",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 520,
  carbs: 70, protein: 12, fat: 18, fiber: 5,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Vegetable pulao", quantity: "280", kcal: 420 },
    { ingredient: "Raita", quantity: "100", kcal: 100 }
  ],
  allergens: ["dairy"],
  region: "North India",
  description: "Mildly spiced vegetable rice served with yogurt raita"
},

{
  name: "Paneer Bhurji with Roti",
  mealType: "dinner",
  cuisine: "North Indian",
  diets: ["vegetarian"],
  calories: 520,
  carbs: 40, protein: 22, fat: 30, fiber: 3,
  servingSize: "2 roti + paneer bhurji (300g)",
  parts: [
    { ingredient: "Paneer bhurji", quantity: "180", kcal: 320 },
    { ingredient: "Roti", quantity: "120", kcal: 200 }
  ],
  allergens: ["dairy","gluten"],
  region: "Punjab",
  description: "Scrambled paneer cooked with spices"
},

{
  name: "Palak Dal with Rice",
  mealType: "dinner",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 480,
  carbs: 65, protein: 18, fat: 8, fiber: 9,
  servingSize: "1 plate (350g)",
  parts: [
    { ingredient: "Rice", quantity: "200", kcal: 260 },
    { ingredient: "Palak dal", quantity: "180", kcal: 220 }
  ],
  allergens: [],
  region: "North India",
  description: "Spinach lentil curry served with rice"
},

{
  name: "Vegetable Oats Khichdi",
  mealType: "dinner",
  cuisine: "Indian",
  diets: ["vegetarian","vegan"],
  calories: 350,
  carbs: 55, protein: 14, fat: 6, fiber: 8,
  servingSize: "1 bowl (300g)",
  parts: [
    { ingredient: "Oats khichdi", quantity: "300", kcal: 350 }
  ],
  allergens: ["gluten"],
  region: "Pan India",
  description: "Light oats and vegetable one-pot meal"
},

{
  name: "Grilled Paneer Salad",
  mealType: "dinner",
  cuisine: "Fusion",
  diets: ["vegetarian"],
  calories: 420,
  carbs: 15, protein: 25, fat: 28, fiber: 4,
  servingSize: "1 bowl (300g)",
  parts: [
    { ingredient: "Grilled paneer", quantity: "150", kcal: 320 },
    { ingredient: "Vegetables", quantity: "150", kcal: 100 }
  ],
  allergens: ["dairy"],
  region: "Pan India",
  description: "High-protein paneer salad with vegetables"
},

{
  name: "Egg Curry with Roti",
  mealType: "dinner",
  cuisine: "North Indian",
  diets: ["eggetarian","nonveg"],
  calories: 500,
  carbs: 40, protein: 20, fat: 25, fiber: 3,
  servingSize: "2 roti + egg curry (300g)",
  parts: [
    { ingredient: "Egg curry", quantity: "180", kcal: 300 },
    { ingredient: "Roti", quantity: "120", kcal: 200 }
  ],
  allergens: ["egg","gluten"],
  region: "North India",
  description: "Boiled eggs cooked in spicy gravy"
},

{
  name: "Chicken Stir Fry with Veggies",
  mealType: "dinner",
  cuisine: "Indo-Chinese",
  diets: ["nonveg"],
  calories: 450,
  carbs: 15, protein: 35, fat: 20, fiber: 4,
  servingSize: "1 plate (300g)",
  parts: [
    { ingredient: "Chicken stir fry", quantity: "200", kcal: 350 },
    { ingredient: "Vegetables", quantity: "100", kcal: 100 }
  ],
  allergens: ["soy"],
  region: "Pan India",
  description: "Light sautéed chicken with vegetables"
},

{
  name: "Fish Tawa Fry with Veggies",
  mealType: "dinner",
  cuisine: "Coastal",
  diets: ["nonveg"],
  calories: 420,
  carbs: 10, protein: 30, fat: 22, fiber: 3,
  servingSize: "1 plate (280g)",
  parts: [
    { ingredient: "Fish fry", quantity: "150", kcal: 320 },
    { ingredient: "Vegetables", quantity: "130", kcal: 100 }
  ],
  allergens: ["fish"],
  region: "Kerala",
  description: "Pan-fried fish served with vegetables"
},

{
  name: "Mushroom Masala with Roti",
  mealType: "dinner",
  cuisine: "North Indian",
  diets: ["vegetarian","vegan"],
  calories: 460,
  carbs: 45, protein: 14, fat: 18, fiber: 5,
  servingSize: "2 roti + mushroom curry (300g)",
  parts: [
    { ingredient: "Mushroom curry", quantity: "180", kcal: 260 },
    { ingredient: "Roti", quantity: "120", kcal: 200 }
  ],
  allergens: ["gluten"],
  region: "Punjab",
  description: "Mushroom curry in spiced tomato gravy"
},

{
  name: "Lemon Rice with Peanut Chutney",
  mealType: "dinner",
  cuisine: "South Indian",
  diets: ["vegetarian","vegan"],
  calories: 480,
  carbs: 65, protein: 10, fat: 18, fiber: 4,
  servingSize: "1 plate (320g)",
  parts: [
    { ingredient: "Lemon rice", quantity: "250", kcal: 400 },
    { ingredient: "Peanut chutney", quantity: "70", kcal: 80 }
  ],
  allergens: ["peanuts"],
  region: "Tamil Nadu",
  description: "Tangy lemon flavored rice with chutney"
},

{
  name: "Curd Rice with Pickle",
  mealType: "dinner",
  cuisine: "South Indian",
  diets: ["vegetarian"],
  calories: 420,
  carbs: 60, protein: 12, fat: 12, fiber: 2,
  servingSize: "1 bowl (300g)",
  parts: [
    { ingredient: "Curd rice", quantity: "280", kcal: 400 },
    { ingredient: "Pickle", quantity: "20", kcal: 20 }
  ],
  allergens: ["dairy"],
  region: "Tamil Nadu",
  description: "Cooling curd rice served with pickle"
},

{
  name: "Vegetable Stew with Appam",
  mealType: "dinner",
  cuisine: "Kerala",
  diets: ["vegetarian"],
  calories: 500,
  carbs: 60, protein: 12, fat: 20, fiber: 4,
  servingSize: "2 appam + stew (350g)",
  parts: [
    { ingredient: "Appam", quantity: "200", kcal: 260 },
    { ingredient: "Vegetable stew", quantity: "150", kcal: 240 }
  ],
  allergens: ["dairy"],
  region: "Kerala",
  description: "Soft rice pancakes with coconut vegetable stew"
},

{
  name: "Tofu Stir Fry with Veggies",
  mealType: "dinner",
  cuisine: "Fusion",
  diets: ["vegan"],
  calories: 380,
  carbs: 20, protein: 20, fat: 18, fiber: 4,
  servingSize: "1 plate (300g)",
  parts: [
    { ingredient: "Tofu", quantity: "150", kcal: 250 },
    { ingredient: "Vegetables", quantity: "150", kcal: 130 }
  ],
  allergens: ["soy"],
  region: "Pan India",
  description: "Plant protein tofu with sautéed vegetables"
},

{
  name: "Chicken Soup with Roti",
  mealType: "dinner",
  cuisine: "Indian",
  diets: ["nonveg"],
  calories: 420,
  carbs: 35, protein: 28, fat: 14, fiber: 2,
  servingSize: "1 bowl soup + roti (300g)",
  parts: [
    { ingredient: "Chicken soup", quantity: "180", kcal: 220 },
    { ingredient: "Roti", quantity: "120", kcal: 200 }
  ],
  allergens: ["gluten"],
  region: "Pan India",
  description: "Light chicken soup with whole wheat roti"
},

{
  name: "Vegetable Clear Soup",
  mealType: "dinner",
  cuisine: "Indo-Chinese",
  diets: ["vegetarian","vegan"],
  calories: 120,
  carbs: 15, protein: 4, fat: 3, fiber: 3,
  servingSize: "1 bowl (250g)",
  parts: [
    { ingredient: "Vegetable soup", quantity: "250", kcal: 120 }
  ],
  allergens: ["soy"],
  region: "Pan India",
  description: "Light vegetable broth soup"
}



];
