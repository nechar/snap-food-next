import React from "react";
import { Box, Grid } from "@chakra-ui/react";
import FoodItem from "../FoodItem";
import { Food } from "@/app/model/food-nutrient";

interface FoodListProps {
  foods: Food[];
}

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (

    <Grid
  templateColumns="repeat(3, 1fr)"
  gap={4}
  alignItems="start"   // ensures all items align at the top
>
  {foods.map((food, index) => (
    <Box key={index} h="100%">
      <FoodItem food={food} />
    </Box>
  ))}
</Grid>

  );
};

export default FoodList;