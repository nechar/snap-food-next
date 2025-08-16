import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { Food } from "@/app/model/food-nutrient";

interface FoodItemProps {
  food: Food;
}

const FoodItem: React.FC<FoodItemProps> = ({
  food
}) => {
  const { food_name, quantity_grams, macro_nutrients_per_gram } = food;
  const totalCalories = quantity_grams * macro_nutrients_per_gram.calories;
  const totalProtein = quantity_grams * macro_nutrients_per_gram.protein;
  const totalCarbohydrates = quantity_grams * macro_nutrients_per_gram.carbohydrates;
  const totalFat = quantity_grams * macro_nutrients_per_gram.fat;

  return (
    <Flex justifyContent="space-between" alignItems="center" py={2}    >
      <Box>
        <Text fontWeight="bold">{food_name}</Text>
        <Text fontSize="sm" color="gray.500">
          {totalCalories.toFixed(0)} kcal, {totalProtein.toFixed(1)}g protein, {totalCarbohydrates.toFixed(1)}g carbs, {totalFat.toFixed(1)}g fat
        </Text>
      </Box>
    </Flex>
  );
};

export default FoodItem;