
'use client';

import React, { useState } from 'react';
import Meal from '@/components/Meal';
import Summary from '@/components/Summary';
import AddFoodForm from '@/components/AddFoodForm';
import { mockFoodData, Food } from '@/lib/mock-data';

const Home: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>(mockFoodData);

  const addFood = (food: Food) => {
    setFoods([...foods, food]);
  };

  const totalCalories = foods.reduce((acc, food) => acc + food.calories, 0);
  const totalProtein = foods.reduce((acc, food) => acc + food.protein, 0);
  const totalCarbs = foods.reduce((acc, food) => acc + food.carbs, 0);
  const totalFat = foods.reduce((acc, food) => acc + food.fat, 0);

  const breakfastFoods = foods.filter((food) => food.meal === 'Breakfast');
  const lunchFoods = foods.filter((food) => food.meal === 'Lunch');
  const dinnerFoods = foods.filter((food) => food.meal === 'Dinner');
  const snackFoods = foods.filter((food) => food.meal === 'Snacks');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Food Log</h1>
      <AddFoodForm onAddFood={addFood} />
      <Summary
        totalCalories={totalCalories}
        totalProtein={totalProtein}
        totalCarbs={totalCarbs}
        totalFat={totalFat}
      />
      <div className="mt-4">
        <Meal mealName="Breakfast" foods={breakfastFoods} />
        <Meal mealName="Lunch" foods={lunchFoods} />
        <Meal mealName="Dinner" foods={dinnerFoods} />
        <Meal mealName="Snacks" foods={snackFoods} />
      </div>
    </div>
  );
};

export default Home;
