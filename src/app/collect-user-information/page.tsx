"use client";

import MainLayout from "@/components/Layout";

import {
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  ButtonGroup,
  Select,
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
interface UserInformation {
  age: string;
  weight: string;
  gender: string;
  goal: string;
  height: any;
}

const CollectUserInformationPage = () => {
  const router = useRouter();
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [heightUnit, setHeightUnit] = useState<"cm" | "ft-in">("cm");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightInches, setHeightInches] = useState("");

  const genders = ["Male", "Female", "Other"];
  const goals = [
    "Lose Weight",
    "Build Muscle",
    "Stay Fit",
    "Improve Endurance",
    "Increase Flexibility",
    "Boost Energy",
    "Improve Overall Health",
    "Sports Performance",
    "Rehabilitation",
    "Other",
  ];

  const handleSave = () => {
    router.push("/dashboard");
  };

  return (
    <MainLayout title="User Information">
      <SimpleGrid columns={2} spacing={6}>
        <FormControl>
          <FormLabel>Age</FormLabel>
          <Input
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <ButtonGroup spacing={4} isAttached>
            {genders.map((g) => (
              <Button
                key={g}
                variant={gender === g ? "solid" : "outline"}
                colorScheme={gender === g ? "brand" : "gray"}
                onClick={() => setGender(g)}
              >
                {g}
              </Button>
            ))}
          </ButtonGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Weight</FormLabel>
          <InputGroup>
            <InputLeftAddon>kg</InputLeftAddon>
            <Input
              type="number"
              placeholder="Enter your weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </InputGroup>
        </FormControl>

        <FormControl>
          <FormLabel>Height</FormLabel>
          <Select
            value={heightUnit}
            onChange={(e) => setHeightUnit(e.target.value as "cm" | "ft-in")}
          >
            <option value="cm">cm</option>
            <option value="ft-in">ft/inches</option>
          </Select>
          {heightUnit === "cm" ? (
            <Input
              type="number"
              placeholder="Enter height in cm"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              mt={2}
            />
          ) : (
            <HStack spacing={2} mt={2}>
              <Input
                type="number"
                placeholder="ft"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
              />
              <Input
                type="number"
                placeholder="inches"
                value={heightInches}
                onChange={(e) => setHeightInches(e.target.value)}
              />
            </HStack>
          )}
        </FormControl>

        <FormControl gridColumn="span 2">
          <FormLabel>Goal</FormLabel>
          <ButtonGroup spacing={4} flexWrap="wrap">
            {goals.map((g) => (
              <Button
                key={g}
                variant={goal === g ? "solid" : "outline"}
                colorScheme={goal === g ? "brand" : "gray"}
                onClick={() => setGoal(g)}
              >
                {g}
              </Button>
            ))}
          </ButtonGroup>
        </FormControl>

        <Button colorScheme="brand" onClick={handleSave} gridColumn="span 2">
          Save
        </Button>
      </SimpleGrid>
    </MainLayout>
  );
};

export default CollectUserInformationPage;
