import React from "react";
import { Box, Heading, Grid, Text } from "@chakra-ui/react";

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
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Box mb={2}>
          <Text fontWeight="bold">Calories</Text>
          <Text>{totalCalories.toFixed(0)} kcal</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">Protein</Text>
          <Text>{totalProtein.toFixed(1)} g</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">Carbs</Text>
          <Text>{totalCarbs.toFixed(1)} g</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">Fat</Text>
          <Text>{totalFat.toFixed(1)} g</Text>
        </Box>
      </Grid>
    </Box>
  );
};

export default Summary;