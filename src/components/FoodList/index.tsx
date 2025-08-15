import React from "react";
import { Box } from "@chakra-ui/react";
import FoodItem from "../FoodItem";
import { Food } from "@/lib/mock-data";

interface FoodListProps {
  foods: Food[];
}

const FoodList: React.FC<FoodListProps> = ({ foods }) => {
  return (
    <Box>
      {foods.map((food, index) => (
        <FoodItem key={index} {...food} />
      ))}
    </Box>
  );
};

export default FoodList;