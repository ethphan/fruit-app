import React from "react";
import { GroupByField } from "../App";

interface GroupBySelectProps {
  groupByField: GroupByField;
  setGroupByField: (field: GroupByField) => void;
}

const groupByOptions: GroupByField[] = ["None", "family", "order", "genus"];

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
        {groupByOptions.map((option) => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}{" "}
            {/* Capitalize options */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GroupBySelect;

export {};
