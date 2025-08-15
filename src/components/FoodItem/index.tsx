import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

interface FoodItemProps {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const FoodItem: React.FC<FoodItemProps> = ({
  name,
  calories,
  protein,
  carbs,
  fat,
}) => {
  return (
    <Flex  justifyContent="space-between" p={2} borderBottomWidth="1px">
      <Box>
        <Text fontWeight="bold">{name}</Text>
        <Text fontSize="sm" color="gray.500">
          {calories} kcal, {protein}g P, {carbs}g C, {fat}g F
        </Text>
      </Box>
    </Flex>
  );
};

export default FoodItem;