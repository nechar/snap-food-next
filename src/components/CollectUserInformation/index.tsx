import { SimpleGrid, FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Select, Button, Heading } from '@chakra-ui/react';
import React, { useState } from 'react';

interface UserInformation {
  name: string;
  age: string;
  weight: string;
}

interface Props {
  onSave: (userInformation: UserInformation) => void;
}

const CollectUserInformation: React.FC<Props> = ({ onSave }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');

  const handleSave = () => {
    onSave({ name, age, weight });
  };

  return (
    <SimpleGrid columns={2} spacing={6}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Age</FormLabel>
          <Input type="number" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>Weight</FormLabel>
          <InputGroup>
            <InputLeftAddon>kg</InputLeftAddon>
            <Input type="number" placeholder="Enter your weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </InputGroup>
        </FormControl>
        <Button colorScheme="brand" onClick={handleSave} gridColumn="span 2">
          Save
        </Button>
      </SimpleGrid>
  );
};

export default CollectUserInformation;
