
import React from 'react';
import FoodItem from '../FoodItem';

interface Food {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface FoodListProps {
  foods: Food[];
}

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (
    <div>
      {foods.map((food, index) => (
        <FoodItem key={index} {...food} />
      ))}
    </div>
  );
};

export default FoodList;
