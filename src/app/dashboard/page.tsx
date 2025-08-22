"use client";

import { Box } from "@chakra-ui/react";
import React from "react";
import Meal from "@/components/Meal";
import Summary from "@/components/Summary";
import AddFoodForm from "@/components/AddFoodForm";
import MainLayout from "@/components/Layout";

const Dashboard: React.FC = () => {
  return (
    <MainLayout title="Food Log">
      <Box mb={8}>
        <AddFoodForm />
      </Box>
      <Box as="span" flex="1" textAlign="left" fontWeight="bold">
        Daily Summary
      </Box>

      <Summary />

      <Box>
        <Meal mealName="Breakfast" />
        <Meal mealName="Lunch" />
        <Meal mealName="Snacks" />
        <Meal mealName="Dinner" />
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
