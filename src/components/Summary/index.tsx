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
      <Heading as="h2" size="lg" mb={2}>
        Daily Summary
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Box>
          <Text fontWeight="bold">Calories</Text>
          <Text>{totalCalories} kcal</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Protein</Text>
          <Text>{totalProtein} g</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Carbs</Text>
          <Text>{totalCarbs} g</Text>
        </Box>
        <Box>
          <Text fontWeight="bold">Fat</Text>
          <Text>{totalFat} g</Text>
        </Box>
      </Grid>
    </Box>
  );
};

export default Summary;