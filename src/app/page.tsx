
'use client';

  import { Box, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react';
import React, { useState } from 'react';
import Meal from '@/components/Meal';
import Summary from '@/components/Summary';
import AddFoodForm from '@/components/AddFoodForm';
import { mockFoodData } from '@/lib/mock-data';
import { Food } from '@/app/model/food-nutrient';

const Home: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>(mockFoodData);
  const [accordionIndex, setAccordionIndex] = useState<number[]>([]);

  const addFood = (food: Food) => {
    setFoods([...foods, food]);
    setAccordionIndex([0, 1]); // Open both accordions
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

      <Accordion allowMultiple index={accordionIndex} onChange={(expandedIndex) => setAccordionIndex(expandedIndex as number[])}>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Summary
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Summary
              totalCalories={totalCalories}
              totalProtein={totalProtein}
              totalCarbs={totalCarbs}
              totalFat={totalFat}
            />
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Individual Meal Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box mt={4}>
              <Meal mealName="Breakfast" foods={breakfastFoods} />
              <Meal mealName="Lunch" foods={lunchFoods} />
              <Meal mealName="Dinner" foods={dinnerFoods} />
              <Meal mealName="Snacks" foods={snackFoods} />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Home;
