"use client";

import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Meal from "@/components/Meal";
import Summary from "@/components/Summary";
import AddFoodForm from "@/components/AddFoodForm";
import { useFood } from "@/context/FoodContext";
import MainLayout from "@/components/Layout";
import { Food } from "../model/food-nutrient";

const Dashboard: React.FC = () => {
  const { foods, addFood } = useFood();
  const [accordionIndex, setAccordionIndex] = useState<number[]>([]);

  const handleAddFood = (food: Food) => {
    addFood(food);
    setAccordionIndex([0, 1]); // Open both accordions
  };

  const totalCalories = foods.reduce(
    (acc, food) =>
      acc + food.quantity_grams * food.macro_nutrients_per_gram.calories,
    0
  );
  const totalProtein = foods.reduce(
    (acc, food) =>
      acc + food.quantity_grams * food.macro_nutrients_per_gram.protein,
    0
  );
  const totalCarbs = foods.reduce(
    (acc, food) =>
      acc + food.quantity_grams * food.macro_nutrients_per_gram.carbohydrates,
    0
  );
  const totalFat = foods.reduce(
    (acc, food) =>
      acc + food.quantity_grams * food.macro_nutrients_per_gram.fat,
    0
  );

  const breakfastFoods = foods.filter((food) => food.meal_type === "Breakfast");
  const lunchFoods = foods.filter((food) => food.meal_type === "Lunch");
  const dinnerFoods = foods.filter((food) => food.meal_type === "Dinner");
  const snackFoods = foods.filter((food) => food.meal_type === "Snacks");

  return (
    <MainLayout title="Food Log">
      <Box mb={8}>
        <AddFoodForm onAddFood={handleAddFood} />
      </Box>

      <Accordion
        allowMultiple
        index={accordionIndex}
        onChange={(expandedIndex) =>
          setAccordionIndex(expandedIndex as number[])
        }
        mt={8}
      >
        <AccordionItem>
          <h2>
            <AccordionButton _expanded={{ bg: "brand.500", color: "white" }}>
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
            <AccordionButton _expanded={{ bg: "brand.500", color: "white" }}>
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
    </MainLayout>
  );
};

export default Dashboard;
