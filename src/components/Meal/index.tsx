import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import FoodList from "../FoodList";
import { Food } from "@/app/model/food-nutrient";

interface MealProps {
  mealName: string;
  foods: Food[];
}

const Meal: React.FC<MealProps> = ({ mealName, foods }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Heading as="h2" size="lg" mb={2}>
        {mealName}
      </Heading>
      <FoodList foods={foods} />
    </Box>
  );
};

export default Meal;