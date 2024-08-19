import React from "react";
import { Fruit } from "../App"; // Import Fruit type from App

interface JarProps {
  jar: Fruit[];
}

const Jar: React.FC<JarProps> = ({ jar }) => {
  // Calculate total calories from the nested nutritions object
  const totalCalories = jar.reduce(
    (acc, fruit) => acc + (Number(fruit.nutritions.calories) || 0),
    0
  );

  return (
    <div className="jar">
      <h2>Your Fruit Jar</h2>
      <ul>
        {jar.map((fruit, index) => (
          <li key={index}>
            {fruit.name} ({fruit.nutritions.calories} calories)
          </li>
        ))}
      </ul>
      <p>Total Calories: {totalCalories}</p>
    </div>
  );
};

export default Jar;

export {};
