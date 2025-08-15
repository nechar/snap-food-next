
import React from 'react';

interface FoodItemProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const FoodItem: React.FC<FoodItemProps> = ({ name, calories, protein, carbs, fat }) => {
  return (
    <div className="flex justify-between p-2 border-b">
      <div>
        <p className="font-bold">{name}</p>
        <p className="text-sm text-gray-500">
          {calories} kcal, {protein}g P, {carbs}g C, {fat}g F
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
