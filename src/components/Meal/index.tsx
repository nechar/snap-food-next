import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import FoodList from "../FoodList";
import { Food } from "@/lib/mock-data";

interface MealProps {
  mealName: string;
  foods: Food[];
}

const Meal: React.FC<MealProps> = ({ mealName, foods }) => {
  return (
    <Box mb={4}>
      <Heading as="h2" size="lg" mb={2}>
        {mealName}
      </Heading>
      <FoodList foods={foods} />
    </Box>
  );
};

export default Meal;