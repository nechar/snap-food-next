import { SimpleGrid, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Select, Button } from '@chakra-ui/react';
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
        <Select placeholder="Select gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Select>
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
        <FormLabel>Goal</FormLabel>
        <Input
          placeholder="Enter your fitness goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="brand" onClick={handleSave} gridColumn="span 2">
        Save
      </Button>
    </SimpleGrid>
  );
};

export default CollectUserInformation;
