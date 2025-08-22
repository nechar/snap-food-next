import React from "react";
import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { Food } from "@/app/model/food-nutrient";
import FoodItem from "../FoodItem";
import { useFood } from "@/context/FoodContext";

interface MealProps {
  mealName: string;
}

const Meal: React.FC<MealProps> = ({ mealName }) => {
  const { foods } = useFood();

  const timeSpecificFoods: Food[] = foods.filter(
    (food) => food.meal_type === mealName
  );

  return (
    <Box p={4} bg="gray.50" borderRadius="lg" mb={4}>
      <Heading as="h3" size="lg" mb={4} color="brand.700">
        {mealName}
      </Heading>
      {timeSpecificFoods.length > 0 ? (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {timeSpecificFoods.map((food, index) => (
            <FoodItem key={index} food={food} />
          ))}
        </SimpleGrid>
      ) : (
        <Text color="gray.500" fontStyle="italic">
          No food logged for {mealName} yet.
        </Text>
      )}
    </Box>
  );
};

export default Meal;
