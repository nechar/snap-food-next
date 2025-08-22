"use client";

import MainLayout from "@/components/Layout";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Input,
  Select,
  Button,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Spinner,
  Alert,
  AlertIcon,
  CloseButton,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  FaUtensils,
  FaWeight,
  FaFire,
  FaDrumstickBite,
  FaBreadSlice,
  FaHamburger,
} from "react-icons/fa";
import { Food, FoodNutrient } from "@/app/model/food-nutrient";
import { useFood } from "@/context/FoodContext";
import { useRouter } from "next/navigation";

const AddFood: React.FC = () => {
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
  const [showMacros, setShowMacros] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { addFood } = useFood();

  const confirm = (e: React.FormEvent) => {
    addFood({
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
    router.push("/dashboard");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null); // Clear any previous errors
    }
  };

  const handleFileUpload = async () => {
    setIsUploading(true);
    setError(null); // Clear any previous errors
    if (!selectedFile) {
      setError("Please select a file first.");
      setIsUploading(false);
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
        setError(
          errorData.message || "Failed to analyze food. Please try again."
        );
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      setError("Error during file upload. Check console for details.");
    }
    setIsUploading(false);
  };

  const handleCancel = () => {
    setFoodName("");
    setQuantityGrams(undefined);
    setCaloriesPerGram(undefined);
    setProteinPerGram(undefined);
    setCarbohydratesPerGram(undefined);
    setFatPerGram(undefined);
    setMeal("Breakfast");
    setSelectedFile(null);
    setShowMacros(false);
    setError(null);
  };

  return (
    <MainLayout title="Food Log">
      <Box as="form">
        {!showMacros && (
          <VStack spacing={4} align="stretch">
            <Text fontSize="xl" fontWeight="bold" mb={2} color="gray.700">
              What did you eat today?
            </Text>
            <FormControl>
              <FormLabel htmlFor="food-image">Upload Food Image</FormLabel>
              <HStack spacing={3}>
                <Input
                  id="food-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  p={1}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                />
                <Button
                  onClick={handleFileUpload}
                  colorScheme="brand"
                  isLoading={isUploading}
                  isDisabled={!selectedFile}
                  leftIcon={isUploading ? undefined : <FaUtensils />}
                >
                  {isUploading ? "Uploading..." : "Analyze"}
                </Button>
              </HStack>
              {error && (
                <Alert status="error" mt={3} borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}
            </FormControl>
          </VStack>
        )}

        {showMacros && (
          <VStack spacing={4} align="stretch">
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold" color="gray.700">
                Confirm Food Details
              </Text>
              <CloseButton onClick={handleCancel} />
            </HStack>

            <FormControl id="food-name">
              <FormLabel>Food Name</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUtensils color="gray.300" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="e.g., Apple"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="quantity-grams">
              <FormLabel>Quantity (grams)</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaWeight color="gray.300" />
                </InputLeftElement>
                <Input
                  type="number"
                  placeholder="e.g., 150"
                  value={quantityGrams ?? ""}
                  onChange={(e) =>
                    setQuantityGrams(
                      e.target.value === ""
                        ? undefined
                        : parseInt(e.target.value)
                    )
                  }
                />
              </InputGroup>
            </FormControl>

            <Grid
              templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
              gap={4}
            >
              <Box p={3} bg="gray.50" borderRadius="md">
                <HStack>
                  <FaFire color="orange.400" />
                  <Text fontWeight="bold">Calories:</Text>
                </HStack>
                <Text ml={6}>
                  {caloriesPerGram ?? "-"} per gram /{" "}
                  {((caloriesPerGram || 0) * (quantityGrams || 0)).toFixed(0)}{" "}
                  total
                </Text>
              </Box>
              <Box p={3} bg="gray.50" borderRadius="md">
                <HStack>
                  <FaDrumstickBite color="brown.400" />
                  <Text fontWeight="bold">Protein:</Text>
                </HStack>
                <Text ml={6}>
                  {proteinPerGram ?? "-"} per gram /{" "}
                  {((proteinPerGram || 0) * (quantityGrams || 0)).toFixed(1)}{" "}
                  total
                </Text>
              </Box>
              <Box p={3} bg="gray.50" borderRadius="md">
                <HStack>
                  <FaBreadSlice color="yellow.600" />
                  <Text fontWeight="bold">Carbohydrates:</Text>
                </HStack>
                <Text ml={6}>
                  {carbohydratesPerGram ?? "-"} per gram /{" "}
                  {((carbohydratesPerGram || 0) * (quantityGrams || 0)).toFixed(
                    1
                  )}{" "}
                  total
                </Text>
              </Box>
              <Box p={3} bg="gray.50" borderRadius="md">
                <HStack>
                  <FaHamburger color="green.600" />
                  <Text fontWeight="bold">Fat:</Text>
                </HStack>
                <Text ml={6}>
                  {fatPerGram ?? "-"} per gram /{" "}
                  {((fatPerGram || 0) * (quantityGrams || 0)).toFixed(1)} total
                </Text>
              </Box>
            </Grid>

            <FormControl id="meal-type">
              <FormLabel>Meal Type</FormLabel>
              <Select
                value={meal_type}
                onChange={(e) => setMeal(e.target.value)}
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snacks">Snacks</option>
              </Select>
            </FormControl>

            <HStack spacing={4} justifyContent="flex-end">
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                onClick={confirm}
              >
                Confirm
              </Button>
              <Button variant="outline" onClick={handleCancel} size="lg">
                Cancel
              </Button>
            </HStack>
          </VStack>
        )}
      </Box>
    </MainLayout>
  );
};

export default AddFood;
