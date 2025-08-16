import React, { useState } from "react";
import {
  Box,
  Heading,
  Grid,
  Input,
  Select,
  Button,
  Text,
} from "@chakra-ui/react";
import { Food, FoodNutrient } from "@/app/model/food-nutrient";

interface AddFoodFormProps {
  onAddFood: (food: Food) => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAddFood }) => {
  const [foodName, setFoodName] = useState("");
  const [quantityGrams, setQuantityGrams] = useState<number | undefined>();
  const [caloriesPerGram, setCaloriesPerGram] = useState<number | undefined>();
  const [proteinPerGram, setProteinPerGram] = useState<number | undefined>();
  const [carbohydratesPerGram, setCarbohydratesPerGram] = useState<
    number | undefined
  >();
  const [fatPerGram, setFatPerGram] = useState<number | undefined>();
  const [meal_type, setMeal] = useState("Breakfast");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showMacros, setShowMacros] = useState(false); // 👈 new state

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
      meal_type,
    });
    setFoodName("");
    setQuantityGrams(undefined);
    setCaloriesPerGram(undefined);
    setProteinPerGram(undefined);
    setCarbohydratesPerGram(undefined);
    setFatPerGram(undefined);
    setShowMacros(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    console.log("Uploading file:", selectedFile.name);
    const formData = new FormData();
    formData.append("foodImage", selectedFile);

    try {
      const response = await fetch("/api/analyse-food", {
        method: "POST",
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

        setShowMacros(true); // 👈 only show macros after upload success
      } else {
        const errorData = await response.json();
        console.error("File upload failed:", response.status, errorData);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("Error during file upload. Check console for details.");
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      mb={4}
    >


      {/* File upload */}
      {!showMacros && (
        <Box mb={4}>
          <Input type="file" onChange={handleFileChange} p={1} mb={2} />
          <Button onClick={handleFileUpload} colorScheme="blue">
            Add Food
          </Button>
        </Box>
      )}

      {/* Macro nutrient calculations (hidden until upload) */}
      {showMacros && (
        <>
          <Grid templateColumns="repeat(2, 1fr)" gap={2}>
            <Input
              type="text"
              placeholder="Food name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Quantity (grams)"
              value={quantityGrams ?? ""}
              onChange={(e) =>
                setQuantityGrams(
                  e.target.value === "" ? undefined : parseInt(e.target.value)
                )
              }
            />
            <Box ml={2}>
              <Text fontWeight="bold">Calories:</Text>
              <Text>
                {caloriesPerGram ?? "-"} per gram /{" "}
                {((caloriesPerGram || 0) * (quantityGrams || 0)).toFixed(0)}{" "}
                total
              </Text>
            </Box>
            <Box ml={2}>
              <Text fontWeight="bold">Protein:</Text>
              <Text>
                {proteinPerGram ?? "-"} per gram /{" "}
                {((proteinPerGram || 0) * (quantityGrams || 0)).toFixed(1)}{" "}
                total
              </Text>
            </Box>
            <Box ml={2}>
              <Text fontWeight="bold">Carbohydrates:</Text>
              <Text>
                {carbohydratesPerGram ?? "-"} per gram /{" "}
                {((carbohydratesPerGram || 0) * (quantityGrams || 0)).toFixed(
                  1
                )}{" "}
                total
              </Text>
            </Box>
            <Box ml={2}>
              <Text fontWeight="bold">Fat:</Text>
              <Text>
                {fatPerGram ?? "-"} per gram /{" "}
                {((fatPerGram || 0) * (quantityGrams || 0)).toFixed(1)} total
              </Text>
            </Box>
            <Select value={meal_type} onChange={(e) => setMeal(e.target.value)}>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
            </Select>
          </Grid>
          <Button type="submit" mt={4} colorScheme="blue">
            Confirm
          </Button>

             
          <Button
            mt={4}
            ml={5}
            colorScheme="red"
            variant="outline"
            onClick={() => {
              setFoodName("");
              setQuantityGrams(undefined);
              setCaloriesPerGram(undefined);
              setProteinPerGram(undefined);
              setCarbohydratesPerGram(undefined);
              setFatPerGram(undefined);
              setMeal("Breakfast");
              setSelectedFile(null);
              setShowMacros(false);
            }}
          >
            Cancel
          </Button>

        </>
      )}
    </Box>
  );
};

export default AddFoodForm;
