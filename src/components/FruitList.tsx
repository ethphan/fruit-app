import React, { useState } from "react";
import { Fruit, GroupByField } from "../App";

interface FruitListProps {
  fruits: Fruit[];
  groupByField: GroupByField;
  addToJar: (fruit: Fruit) => void;
  addGroupToJar: (group: Fruit[]) => void;
}

// Group fruits by the specified field (family, order, genus)
function groupBy(fruits: Fruit[], key: GroupByField): Record<string, Fruit[]> {
  if (key === "None") return { None: fruits }; // If grouping by 'None', return a flat list
  console.log("key", key);
  return fruits.reduce((result, fruit) => {
    const groupValue = fruit[key]; // Safely access group by field (family, order, genus)
    console.log("groupValue", groupValue);
    console.log("fruit", fruit);

    // Ensure groupValue is valid and defined
    if (groupValue && typeof groupValue === "string") {
      if (!result[groupValue]) {
        result[groupValue] = [];
      }
      result[groupValue].push(fruit);
    }
    console.log("result", result);

    return result;
  }, {} as Record<string, Fruit[]>);
}

const FruitList: React.FC<FruitListProps> = ({
  fruits,
  groupByField,
  addToJar,
  addGroupToJar,
}) => {
  const groupedFruits = groupBy(fruits, groupByField);
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({}); // Track collapsed groups

  console.log("groupedFruits", groupedFruits);
  console.log("collapsedGroups", collapsedGroups);

  // Toggle collapse/expand for a group
  const toggleGroup = (groupName: string) => {
    setCollapsedGroups({
      ...collapsedGroups,
      [groupName]: !collapsedGroups[groupName],
    });
  };

  return (
    <div className="fruit-list">
      <h2>Fruit List</h2>
      {Object.entries(groupedFruits).map(([groupName, fruits]) => (
        <div key={groupName} className="fruit-group">
          {groupByField !== "None" && (
            <div
              className="group-header"
              onClick={() => toggleGroup(groupName)}
            >
              <h3>{groupName}</h3>
              <button onClick={() => addGroupToJar(fruits)}>
                Add Group to Jar
              </button>
              <button>
                {collapsedGroups[groupName] ? "Expand" : "Collapse"}
              </button>
            </div>
          )}
          {!collapsedGroups[groupName] && (
            <ul>
              {fruits.map((fruit) => (
                <li key={fruit.name}>
                  <span>
                    {fruit.name} ({fruit.nutritions.calories} calories)
                  </span>
                  <button onClick={() => addToJar(fruit)}>Add</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default FruitList;

export {};
