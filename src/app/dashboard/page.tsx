"use client";

import { Box } from "@chakra-ui/react";
import React from "react";
import Meal from "@/components/Meal";
import Summary from "@/components/Summary";
import MainLayout from "@/components/Layout";

const Dashboard: React.FC = () => {
  return (
    <MainLayout title="Summary">
      <Box mb={3}>
        <Summary />
      </Box>

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
