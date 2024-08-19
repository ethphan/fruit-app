import React from "react";
import { GroupByField } from "../App";

interface GroupBySelectProps {
  groupByField: GroupByField;
  setGroupByField: (field: GroupByField) => void;
}

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

const GroupBySelect: React.FC<GroupBySelectProps> = ({
  groupByField,
  setGroupByField,
}) => {
  return (
    <div className="group-by-select">
      <label htmlFor="groupBy">Group by:</label>
      <select
        id="groupBy"
        value={groupByField}
        onChange={(e) => setGroupByField(e.target.value as GroupByField)}
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
