import React, { useState } from "react";
import { Fruit, GroupByField } from "../App";
import { useFruitContext } from "../contexts/FruitContext";

const FruitList = () => {
  const { state, dispatch } = useFruitContext();
  const { fruits, groupByField } = state;

  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({}); // Track collapsed groups

  const groupedFruits = groupBy(fruits, groupByField);

  // // Group fruits by the specified field (family, order, genus)
  function groupBy(
    fruits: Fruit[],
    key: GroupByField
  ): Record<string, Fruit[]> {
    if (key === "None") return { None: fruits }; // If grouping by 'None', return a flat list

    return fruits.reduce((result, fruit) => {
      const groupValue = fruit[key]; // Safely access group by field (family, order, genus)
      // Ensure groupValue is valid and defined
      if (groupValue && typeof groupValue === "string") {
        if (!result[groupValue]) {
          result[groupValue] = [];
        }
        result[groupValue].push(fruit);
      }

      return result;
    }, {} as Record<string, Fruit[]>);
  }

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
              <button
                onClick={() =>
                  dispatch({ type: "ADD_GROUP_TO_JAR", payload: fruits })
                }
              >
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
                  <button
                    onClick={() =>
                      dispatch({ type: "ADD_TO_JAR", payload: fruit })
                    }
                  >
                    Add
                  </button>
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
