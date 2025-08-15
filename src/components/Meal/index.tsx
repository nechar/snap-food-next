
import React from 'react';
import FoodList from '../FoodList';

interface Food {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealProps {
  mealName: string;
  foods: Food[];
}

const Meal: React.FC<MealProps> = ({ mealName, foods }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">{mealName}</h2>
      <FoodList foods={foods} />
    </div>
  );
};

export default Meal;
