import React from "react";
import {
  Box,
  Heading,
  Grid,
  Input,
  Select,
  Text,
  Flex,
} from "@chakra-ui/react";

interface FoodDetailsFormProps {
  foodName: string;
  setFoodName: (name: string) => void;
  quantityGrams: number | undefined;
  setQuantityGrams: (quantity: number | undefined) => void;
  caloriesPerGram: number | undefined;
  proteinPerGram: number | undefined;
  carbohydratesPerGram: number | undefined;
  fatPerGram: number | undefined;
  meal_type: string;
  setMeal: (meal: string) => void;
}

const FoodDetailsForm: React.FC<FoodDetailsFormProps> = ({
  foodName,
  setFoodName,
  quantityGrams,
  setQuantityGrams,
  caloriesPerGram,
  proteinPerGram,
  carbohydratesPerGram,
  fatPerGram,
  meal_type,
  setMeal,
}) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      mb={4}
    >
      <Heading as="h2" size="lg" mb={2}>
        Add Food
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Input
          type="text"
          placeholder="Food name"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
          mb={2}
        />
        <Input
          type="number"
          placeholder="Quantity (grams)"
          value={quantityGrams ?? ''}
          onChange={(e) => setQuantityGrams(e.target.value === '' ? undefined : parseInt(e.target.value))}
          mb={2}
        />
        <Box mb={2}>
          <Text fontWeight="bold">Calories:</Text>
          <Text>{caloriesPerGram ?? '-'} per gram / {( (caloriesPerGram || 0) * (quantityGrams || 0) ).toFixed(0)} total</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">Protein:</Text>
          <Text>{proteinPerGram ?? '-'} per gram / {( (proteinPerGram || 0) * (quantityGrams || 0) ).toFixed(1)} total</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">Carbohydrates:</Text>
          <Text>{carbohydratesPerGram ?? '-'} per gram / {( (carbohydratesPerGram || 0) * (quantityGrams || 0) ).toFixed(1)} total</Text>
        </Box>
        <Box mb={2}>
          <Text fontWeight="bold">Fat:</Text>
          <Text>{fatPerGram ?? '-'} per gram / {( (fatPerGram || 0) * (quantityGrams || 0) ).toFixed(1)} total</Text>
        </Box>
        <Select value={meal_type} onChange={(e) => setMeal(e.target.value)} mb={2}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
        </Select>
      </Grid>
    </Box>
  );
};

export default FoodDetailsForm;

