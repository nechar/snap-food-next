
'use client';

  import { Box, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';
import Meal from '@/components/Meal';
import Summary from '@/components/Summary';
import AddFoodForm from '@/components/AddFoodForm';
import { mockFoodData } from '@/lib/mock-data';
import { Food } from '@/app/model/food-nutrient';

const Home: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>(mockFoodData);

  const addFood = (food: Food) => {
    setFoods([...foods, food]);
  };

  const totalCalories = foods.reduce((acc, food) => acc + (food.quantity_grams * food.macro_nutrients_per_gram.calories), 0);
  const totalProtein = foods.reduce((acc, food) => acc + (food.quantity_grams * food.macro_nutrients_per_gram.protein), 0);
  const totalCarbs = foods.reduce((acc, food) => acc + (food.quantity_grams * food.macro_nutrients_per_gram.carbohydrates), 0);
  const totalFat = foods.reduce((acc, food) => acc + (food.quantity_grams * food.macro_nutrients_per_gram.fat), 0);

  const breakfastFoods = foods.filter((food) => food.meal_type === 'Breakfast');
  const lunchFoods = foods.filter((food) => food.meal_type === 'Lunch');
  const dinnerFoods = foods.filter((food) => food.meal_type === 'Dinner');
  const snackFoods = foods.filter((food) => food.meal_type === 'Snacks');


// ... (rest of the file is the same until the return statement)

  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={4}>
        Food Log
      </Heading>
      <AddFoodForm onAddFood={addFood} />
      <Summary
        totalCalories={totalCalories}
        totalProtein={totalProtein}
        totalCarbs={totalCarbs}
        totalFat={totalFat}
      />
      <Box mt={4}>
        <Meal mealName="Breakfast" foods={breakfastFoods} />
        <Meal mealName="Lunch" foods={lunchFoods} />
        <Meal mealName="Dinner" foods={dinnerFoods} />
        <Meal mealName="Snacks" foods={snackFoods} />
      </Box>
    </Box>
  );
};

export default Home;
