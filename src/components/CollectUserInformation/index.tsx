import { SimpleGrid, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Button, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';

interface UserInformation {
  age: string;
  weight: string;
  gender: string;
  goal: string;
}

interface Props {
  onSave: (userInformation: UserInformation) => void;
}

const CollectUserInformation: React.FC<Props> = ({ onSave }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [goal, setGoal] = useState('');

  const genders = ['Male', 'Female', 'Other'];
  const goals = ['Lose Weight', 'Build Muscle', 'Stay Fit', 'Improve Endurance'];

  const handleSave = () => {
    onSave({ age, weight, gender, goal });
  };

  return (
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
              variant={gender === g ? 'solid' : 'outline'}
              colorScheme={gender === g ? 'brand' : 'gray'}
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

      <FormControl gridColumn="span 2">
        <FormLabel>Goal</FormLabel>
        <ButtonGroup spacing={4} isAttached>
          {goals.map((g) => (
            <Button
              key={g}
              variant={goal === g ? 'solid' : 'outline'}
              colorScheme={goal === g ? 'brand' : 'gray'}
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
  );
};

export default CollectUserInformation;
