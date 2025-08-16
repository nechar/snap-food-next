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

interface SummaryProps {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

const Summary: React.FC<SummaryProps> = ({
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFat,
}) => {
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
