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
  const { foods } = useFood();
  const [accordionIndex, setAccordionIndex] = useState<number[]>([]);

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

  return (
    <MainLayout title="Food Log">
      <Box mb={8}>
        <AddFoodForm />
      </Box>
      <Box as="span" flex="1" textAlign="left" fontWeight="bold">
        Daily Summary
      </Box>

      <Summary
        totalCalories={totalCalories}
        totalProtein={totalProtein}
        totalCarbs={totalCarbs}
        totalFat={totalFat}
      />

      <Box>
        <Meal mealName="Breakfast" />
        <Meal mealName="Lunch" />
        <Meal mealName="Snacks" />
        <Meal mealName="Dinner" />
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
