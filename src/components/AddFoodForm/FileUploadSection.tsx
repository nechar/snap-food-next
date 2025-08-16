import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";
import { FoodNutrient } from "@/app/model/food-nutrient";

interface FileUploadSectionProps {
  setFoodName: (name: string) => void;
  setQuantityGrams: (quantity: number | undefined) => void;
  setCaloriesPerGram: (calories: number | undefined) => void;
  setProteinPerGram: (protein: number | undefined) => void;
  setCarbohydratesPerGram: (carbs: number | undefined) => void;
  setFatPerGram: (fat: number | undefined) => void;
  onFileUploadSuccess: () => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  setFoodName,
  setQuantityGrams,
  setCaloriesPerGram,
  setProteinPerGram,
  setCarbohydratesPerGram,
  setFatPerGram,
  onFileUploadSuccess,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

        onFileUploadSuccess(); // Notify parent on success
      } else {
        const errorData = await response.json();
        console.error('File upload failed:', response.status, errorData);
      }
    } catch (error) {
      console.error('Error during file upload:', error);
      alert('Error during file upload. Check console for details.');
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="lg" mb={4}>
      <Stack direction="row" spacing={4} align="center">
        <Input type="file" onChange={handleFileChange} p={1} />
        <Button onClick={handleFileUpload} colorScheme="teal">
          Upload File
        </Button>
      </Stack>
    </Box>
  );
};

export default FileUploadSection;

