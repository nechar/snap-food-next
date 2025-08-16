import React from "react";
import { Box, Heading,Text } from "@chakra-ui/react";
import { Food } from "@/app/model/food-nutrient";

import { Grid } from "@chakra-ui/react";
import FoodItem from "../FoodItem";

interface MealProps {
  mealName: string;
  foods: Food[];
}

const Meal: React.FC<MealProps> = ({ mealName, foods }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Heading as="h3" size="md" mb={2}>
        {mealName}
      </Heading>
      {foods.length > 0 ? (
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={4}
          alignItems="start" // ensures all items align at the top
        >
          {foods.map((food, index) => (
            <Box key={index} h="100%">
              <FoodItem food={food} />
            </Box>
          ))}
        </Grid>
      ) : (
        <Text  color={"gray.500"}>
          Not loggged yet
          </Text>
      )}
    </Box>
  );
};

export default Meal;
