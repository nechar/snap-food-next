import React, { useState } from "react";
import {
  Box,
  Heading,
  Grid,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";
import { Food, FoodNutrient } from "@/app/model/food-nutrient";

interface AddFoodFormProps {
  onAddFood: (food: Food) => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAddFood }) => {
  const [foodName, setFoodName] = useState("");
  const [quantityGrams, setQuantityGrams] = useState<number | undefined>(undefined);
  const [caloriesPerGram, setCaloriesPerGram] = useState<number | undefined>(undefined);
  const [proteinPerGram, setProteinPerGram] = useState<number | undefined>(undefined);
  const [carbohydratesPerGram, setCarbohydratesPerGram] = useState<number | undefined>(undefined);
  const [fatPerGram, setFatPerGram] = useState<number | undefined>(undefined);
  const [meal_type, setMeal] = useState("Breakfast");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFood({
      food_name: foodName,
      quantity_grams: quantityGrams || 0,
      macro_nutrients_per_gram: {
        calories: caloriesPerGram || 0,
        protein: proteinPerGram || 0,
        carbohydrates: carbohydratesPerGram || 0,
        fat: fatPerGram || 0,
      },
      meal_type: meal_type,
    });
    setFoodName("");
    setQuantityGrams(undefined);
    setCaloriesPerGram(undefined);
    setProteinPerGram(undefined);
    setCarbohydratesPerGram(undefined);
    setFatPerGram(undefined);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      console.log("Uploading file:", selectedFile.name);
      const formData = new FormData();
      formData.append('foodImage', selectedFile);

      try {
        const response = await fetch('/api/analyse-food', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result: FoodNutrient = await response.json();
          // Add the result to the form fields
          setFoodName(result.food_name);
          setQuantityGrams(result.quantity_grams);
          setCaloriesPerGram(result.macro_nutrients_per_gram.calories);
          setProteinPerGram(result.macro_nutrients_per_gram.protein);
          setCarbohydratesPerGram(result.macro_nutrients_per_gram.carbohydrates);
          setFatPerGram(result.macro_nutrients_per_gram.fat);


        } else {
          const errorData = await response.json();
          console.error('File upload failed:', response.status, errorData);
        }
      } catch (error) {
        console.error('Error during file upload:', error);
        alert('Error during file upload. Check console for details.');
      }
    } else {
      alert("Please select a file first.");
    }
  };

  return (
    <>
      <Box  p={4} borderWidth="1px" borderRadius="lg" mb={4}>
        <Input type="file" onChange={handleFileChange} p={1} mb={2} />
        <Button onClick={handleFileUpload} colorScheme="teal">
          Upload File
        </Button>
      </Box>
      <Box
        as="form"
        onSubmit={handleSubmit}
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
          />
          <Select value={meal_type} onChange={(e) => setMeal(e.target.value)}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
          </Select>
          <Input
            type="number"
            readOnly={true}
            placeholder="Quantity (grams)"
            value={quantityGrams ?? ''}
            onChange={(e) => setQuantityGrams(e.target.value === '' ? undefined : parseInt(e.target.value))}
          />

          <Input
            type="number"
            readOnly={true}
            placeholder="Calories (per gram)"
            value={caloriesPerGram ?? ''}
            onChange={(e) => setCaloriesPerGram(e.target.value === '' ? undefined : parseFloat(e.target.value))}
          />
          <Input
            type="number"
            readOnly={true}
            placeholder="Protein (g per gram)"
            value={proteinPerGram ?? ''}
            onChange={(e) => setProteinPerGram(e.target.value === '' ? undefined : parseFloat(e.target.value))}
          />
          <Input
            type="number"
            readOnly={true}
            placeholder="Carbs (g per gram)"
            value={carbohydratesPerGram ?? ''}
            onChange={(e) => setCarbohydratesPerGram(e.target.value === '' ? undefined : parseFloat(e.target.value))}
          />
          <Input
            type="number"
            readOnly={true}
            placeholder="Fat (g per gram)"
            value={fatPerGram ?? ''}
            onChange={(e) => setFatPerGram(e.target.value === '' ? undefined : parseFloat(e.target.value))}
          />
          
        </Grid>

        <Button type="submit" mt={4} colorScheme="blue">
          Add
        </Button>
      </Box>
    </>
  );
};

export default AddFoodForm;