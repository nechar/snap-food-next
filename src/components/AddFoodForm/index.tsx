import React, { useState } from "react";
import {
  Box,
  Heading,
  Grid,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

interface AddFoodFormProps {
  onAddFood: (food: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal: string;
  }) => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAddFood }) => {
  const [name, setName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [meal, setMeal] = useState("Breakfast");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFood({
      name,
      calories: parseInt(calories),
      protein: parseInt(protein),
      carbs: parseInt(carbs),
      fat: parseInt(fat),
      meal,
    });
    setName("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Heading as="h2" size="lg" mb={2}>
        Add Food
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={2}>
        <Input
          type="text"
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Protein (g)"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Carbs (g)"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Fat (g)"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
        />
        <Select value={meal} onChange={(e) => setMeal(e.target.value)}>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
        </Select>
      </Grid>
      <Button type="submit" mt={2} colorScheme="blue">
        Add
      </Button>
    </Box>
  );
};

export default AddFoodForm;