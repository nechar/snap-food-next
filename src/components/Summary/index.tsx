
import React from 'react';

interface SummaryProps {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

const Summary: React.FC<SummaryProps> = ({ totalCalories, totalProtein, totalCarbs, totalFat }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-2">Daily Summary</h2>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="font-bold">Calories</p>
          <p>{totalCalories} kcal</p>
        </div>
        <div>
          <p className="font-bold">Protein</p>
          <p>{totalProtein} g</p>
        </div>
        <div>
          <p className="font-bold">Carbs</p>
          <p>{totalCarbs} g</p>
        </div>
        <div>
          <p className="font-bold">Fat</p>
          <p>{totalFat} g</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;
