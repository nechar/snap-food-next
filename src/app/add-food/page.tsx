"use client";

import { Box } from "@chakra-ui/react";
import React from "react";
import AddFoodForm from "@/components/AddFoodForm";
import MainLayout from "@/components/Layout";

const AddFood: React.FC = () => {
  return (
    <MainLayout title="Food Log">
      <Box mb={8}>
        <AddFoodForm />
      </Box>
    </MainLayout>
  );
};

export default AddFood;
