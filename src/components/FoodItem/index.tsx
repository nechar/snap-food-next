import React from "react";
import { Box, Text, Flex,List, ListItem } from "@chakra-ui/react";
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

<List  fontSize="sm" color="gray.500">
  <ListItem>Calories: {totalCalories.toFixed(0)} kcal</ListItem>
  <ListItem>Protein: {totalProtein.toFixed(1)} gm</ListItem>
  <ListItem>Carbohydrates {totalCarbohydrates.toFixed(1)} gm</ListItem>
  <ListItem>Fats: {totalFat.toFixed(1)} gm</ListItem>
</List>

      </Box>
    </Flex>
  );
};

export default FoodItem;