'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Food } from '@/app/model/food-nutrient';

interface FoodContextType {
  foods: Food[];
  addFood: (food: Food) => void;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider = ({ children }: { children: ReactNode }) => {
  const [foods, setFoods] = useState<Food[]>([]);

  const addFood = (food: Food) => {
    setFoods((prevFoods) => [...prevFoods, food]);
  };

  return (
    <FoodContext.Provider value={{ foods, addFood }}>
      {children}
    </FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (context === undefined) {
    throw new Error('useFood must be used within a FoodProvider');
  }
  return context;
};
