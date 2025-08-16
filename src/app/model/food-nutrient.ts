export interface Food {
  food_name: string
  quantity_grams: number
  macro_nutrients_per_gram: MacroNutrientsPerGram
  meal_type: string
}

export interface MacroNutrientsPerGram {
  calories: number
  protein: number
  carbohydrates: number
  fat: number
}

export type FoodNutrient = Food;