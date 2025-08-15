
import React, { useState } from 'react';

interface AddFoodFormProps {
  onAddFood: (food: {
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    meal: string;
  }) => void;
}

const AddFoodForm: React.FC<AddFoodFormProps> = ({ onAddFood }) => {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [meal, setMeal] = useState('Breakfast');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddFood({
      name,
      calories: parseInt(calories),
      protein: parseInt(protein),
      carbs: parseInt(carbs),
      fat: parseInt(fat),
      meal,
    });
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 rounded-lg mb-4">
      <h2 className="text-xl font-bold mb-2">Add Food</h2>
      <div className="grid grid-cols-2 gap-2">
        <input
          type="text"
          placeholder="Food name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 border rounded text-gray-800"
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          className="p-2 border rounded text-gray-800"
        />
        <input
          type="number"
          placeholder="Protein (g)"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          className="p-2 border rounded text-gray-800"
        />
        <input
          type="number"
          placeholder="Carbs (g)"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          className="p-2 border rounded text-gray-800"
        />
        <input
          type="number"
          placeholder="Fat (g)"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          className="p-2 border rounded text-gray-800"
        />
        <select value={meal} onChange={(e) => setMeal(e.target.value)} className="p-2 border rounded text-gray-800">
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Add
      </button>
    </form>
  );
};

export default AddFoodForm;
