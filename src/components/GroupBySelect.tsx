import React from "react";
import { GroupByField } from "../App";
import { useFruitContext } from "../contexts/FruitContext";

interface GroupByOption {
  value: GroupByField;
  display: string;
}

const groupByOptions: GroupByOption[] = [
  { value: "None", display: "None" },
  { value: "family", display: "Family" },
  { value: "order", display: "Order" },
  { value: "genus", display: "Genus" },
];

const GroupBySelect = () => {
  const { state, dispatch } = useFruitContext();
  const { groupByField } = state;
  return (
    <div className="group-by-select">
      <label htmlFor="groupBy">Group by:</label>
      <select
        id="groupBy"
        value={groupByField}
        onChange={(e) =>
          dispatch({
            type: "SET_GROUP_BY_FIELD",
            payload: e.target.value as GroupByField,
          })
        }
      >
        {groupByOptions.map(({ value, display }) => (
          <option key={value} value={value}>
            {display}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroupBySelect;

export {};
