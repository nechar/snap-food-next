import React from "react";
import { Grid } from "@chakra-ui/react";
import FoodItem from "../FoodItem";
import { Food } from "@/app/model/food-nutrient";

interface FoodListProps {
  foods: Food[];
}

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (

    <Grid templateColumns="repeat(6, 1fr)" gap={2}>
      {foods.map((food, index) => (
        <FoodItem key={index} food={food} />
      ))}
    </Grid>
  );
};

export default FoodList;