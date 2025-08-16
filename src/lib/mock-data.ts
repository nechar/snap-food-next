import { Food } from "@/app/model/food-nutrient";

export const mockFoodData: Food[] = [
  {
    food_name: 'Oats',
    quantity_grams: 100,
    macro_nutrients_per_gram: {
      calories: 1.5,
      protein: 0.05,
      carbohydrates: 0.27,
      fat: 0.03,
    },
    meal_type: 'Breakfast',
  },
  {
    food_name: 'Banana',
    quantity_grams: 100,
    macro_nutrients_per_gram: {
      calories: 1.05,
      protein: 0.01,
      carbohydrates: 0.27,
      fat: 0,
    },
    meal_type: 'Breakfast',
  },
  {
    food_name: 'Almonds',
    quantity_grams: 100,
    macro_nutrients_per_gram: {
      calories: 6.0,
      protein: 0.21,
      carbohydrates: 0.21,
      fat: 0.49,
    },
    meal_type: 'Snacks',
  },
];