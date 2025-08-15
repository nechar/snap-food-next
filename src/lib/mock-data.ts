
export interface Food {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal: string;
  }
  
  export const mockFoodData: Food[] = [
    {
      name: 'Oats',
      calories: 150,
      protein: 5,
      carbs: 27,
      fat: 3,
      meal: 'Breakfast',
    },
    {
      name: 'Banana',
      calories: 105,
      protein: 1,
      carbs: 27,
      fat: 0,
      meal: 'Breakfast',
    },
    {
      name: 'Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 4,
      meal: 'Lunch',
    },
    {
      name: 'Brown Rice',
      calories: 215,
      protein: 5,
      carbs: 45,
      fat: 2,
      meal: 'Lunch',
    },
    {
      name: 'Broccoli',
      calories: 55,
      protein: 4,
      carbs: 11,
      fat: 1,
      meal: 'Lunch',
    },
    {
      name: 'Salmon',
      calories: 206,
      protein: 22,
      carbs: 0,
      fat: 13,
      meal: 'Dinner',
    },
    {
      name: 'Sweet Potato',
      calories: 86,
      protein: 2,
      carbs: 20,
      fat: 0,
      meal: 'Dinner',
    },
    {
      name: 'Almonds',
      calories: 164,
      protein: 6,
      carbs: 6,
      fat: 14,
      meal: 'Snacks',
    },
  ];
  