import React from "react";
import {
  Box,
  Text,
  Flex,
  List,
  ListItem,
  Card,
  CardBody,
  HStack,
  VStack,
} from "@chakra-ui/react";
import {
  FaFire,
  FaDrumstickBite,
  FaBreadSlice,
  FaHamburger,
} from "react-icons/fa";
import { Food } from "@/app/model/food-nutrient";

interface FoodItemProps {
  food: Food;
}

const FoodItem: React.FC<FoodItemProps> = ({
  food
}) => {
  const { food_name, quantity_grams, macro_nutrients_per_gram } = food;
  const totalCalories = quantity_grams * macro_nutrients_per_gram.calories;
  const totalProtein = quantity_grams * macro_nutrients_per_gram.protein;
  const totalCarbohydrates = quantity_grams * macro_nutrients_per_gram.carbohydrates;
  const totalFat = quantity_grams * macro_nutrients_per_gram.fat;

  return (
    <Card size="sm" variant="outline" borderColor="gray.200">
      <CardBody>
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold" fontSize="md" color="gray.700">
            {food_name} ({quantity_grams}g)
          </Text>
          <List fontSize="sm" color="gray.600" spacing={1}>
            <ListItem>
              <HStack>
                <FaFire color="orange.400" />
                <Text>Calories: {totalCalories.toFixed(0)} kcal</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <FaDrumstickBite color="brown.400" />
                <Text>Protein: {totalProtein.toFixed(1)} gm</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <FaBreadSlice color="yellow.600" />
                <Text>Carbohydrates: {totalCarbohydrates.toFixed(1)} gm</Text>
              </HStack>
            </ListItem>
            <ListItem>
              <HStack>
                <FaHamburger color="green.600" />
                <Text>Fats: {totalFat.toFixed(1)} gm</Text>
              </HStack>
            </ListItem>
          </List>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default FoodItem;
