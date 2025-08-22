import React from "react";
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import {
  FaFire,
  FaDrumstickBite,
  FaBreadSlice,
  FaHamburger,
} from "react-icons/fa";
import { useFood } from "@/context/FoodContext";

const Summary: React.FC = () => {
  const { foods } = useFood();

  const totalCalories = foods.reduce(
    (acc, food) =>
      acc + food.quantity_grams * food.macro_nutrients_per_gram.calories,
    0
  );
  const totalProtein = foods.reduce(
    (acc, food) =>
      acc + food.quantity_grams * food.macro_nutrients_per_gram.protein,
    0
  );
  const totalCarbs = foods.reduce(
    (acc, food) =>
      acc + food.quantity_grams * food.macro_nutrients_per_gram.carbohydrates,
    0
  );
  const totalFat = foods.reduce(
    (acc, food) =>
      acc + food.quantity_grams * food.macro_nutrients_per_gram.fat,
    0
  );
  return (
    <Box p={4} bg="gray.50" borderRadius="lg">
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={5}>
        <Stat>
          <HStack>
            <FaFire color="orange.400" />
            <StatLabel>Calories</StatLabel>
          </HStack>
          <StatNumber>{totalCalories.toFixed(0)} kcal</StatNumber>
          <StatHelpText>Total energy</StatHelpText>
        </Stat>

        <Stat>
          <HStack>
            <FaDrumstickBite color="brown.400" />
            <StatLabel>Protein</StatLabel>
          </HStack>
          <StatNumber>{totalProtein.toFixed(1)} g</StatNumber>
          <StatHelpText>Muscle building</StatHelpText>
        </Stat>

        <Stat>
          <HStack>
            <FaBreadSlice color="yellow.600" />
            <StatLabel>Carbs</StatLabel>
          </HStack>
          <StatNumber>{totalCarbs.toFixed(1)} g</StatNumber>
          <StatHelpText>Energy source</StatHelpText>
        </Stat>

        <Stat>
          <HStack>
            <FaHamburger color="green.600" />
            <StatLabel>Fat</StatLabel>
          </HStack>
          <StatNumber>{totalFat.toFixed(1)} g</StatNumber>
          <StatHelpText>Healthy fats</StatHelpText>
        </Stat>
      </SimpleGrid>
    </Box>
  );
};

export default Summary;
