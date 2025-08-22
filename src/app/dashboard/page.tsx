"use client";

import { Box, Button, Icon } from "@chakra-ui/react";
import React from "react";
import Meal from "@/components/Meal";
import Summary from "@/components/Summary";
import MainLayout from "@/components/Layout";
import Link from "next/link"; // Import Link
import { Plus } from "lucide-react";

const Dashboard: React.FC = () => {
  return (
    <MainLayout title="Food Log"> {/* Changed title back to "Food Log" */}
      <Box mb={3}>
        <Summary />
      </Box>

      <Box>
        <Meal mealName="Breakfast" />
        <Meal mealName="Lunch" />
        <Meal mealName="Snacks" />
        <Meal mealName="Dinner" />
      </Box>

      {/* Floating Add Meal Button */}
      <Link href="/add-food" passHref> {/* Use Link component */}
        <Button
          position="fixed"
          bottom="6"
          right="6"
          size="lg"
          borderRadius="full"
          shadow="xl"
          px={6}
          py={6}
          leftIcon={<Icon as={Plus} />}
          _hover={{ transform: "scale(1.05)" }}
        >
          Add Meal
        </Button>
      </Link>
    </MainLayout>
  );
};

export default Dashboard;
