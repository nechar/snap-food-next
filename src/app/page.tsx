
'use client';

  import { Box, Heading, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Container, Image } from '@chakra-ui/react';
import React, { useState } from 'react';
import Meal from '@/components/Meal';
import Summary from '@/components/Summary';
import AddFoodForm from '@/components/AddFoodForm';
import { mockFoodData } from '@/lib/mock-data';
import { Food } from '@/app/model/food-nutrient';

const Home: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
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
    <Container maxW="container.lg" py={8}>
      <Box textAlign="center" mb={6}>
        <Image src="/static/logo.svg" alt="SnapFood Logo" boxSize="100px" mx="auto" mb={4} />
        <Heading as="h1" size="2xl" color="brand.600">
          Food Log
        </Heading>
      </Box>
      <Box mb={8}>
        <AddFoodForm onAddFood={addFood} />
      </Box>

      <Accordion allowMultiple index={accordionIndex} onChange={(expandedIndex) => setAccordionIndex(expandedIndex as number[])} mt={8}>
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: 'brand.500', color: 'white' }}>
              <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                Daily Summary
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
            <AccordionButton _expanded={{ bg: 'brand.500', color: 'white' }}>
              <Box as="span" flex="1" textAlign="left" fontWeight="bold">
                Individual Meal Details
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <Box>
              <Meal mealName="Breakfast" foods={breakfastFoods} />
              <Meal mealName="Lunch" foods={lunchFoods} />
              <Meal mealName="Snacks" foods={snackFoods} />
              <Meal mealName="Dinner" foods={dinnerFoods} />
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default Home;
