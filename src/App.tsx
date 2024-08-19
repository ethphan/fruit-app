import React, { useEffect, useState } from "react";
import FruitList from "./components/FruitList";
import Jar from "./components/Jar";
import GroupBySelect from "./components/GroupBySelect";
import "./App.css";

// Define the Fruit interface
export interface Fruit {
  name: string;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
  };
}

// Define valid fields for grouping
export type GroupByField = "None" | "family" | "order" | "genus";

function App() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [jar, setJar] = useState<Fruit[]>([]);
  const [groupByField, setGroupByField] = useState<GroupByField>("None"); // Use GroupByField type
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/fruit/all");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setFruits(data);
      } catch (err) {
        setError("Failed to load fruits");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const addToJar = (fruit: Fruit) => {
    setJar([...jar, fruit]);
  };

  const addGroupToJar = (group: Fruit[]) => {
    setJar([...jar, ...group]);
  };

  return (
    <div className="App">
      <h1>Fruit Jar App</h1>
      {loading && <p>Loading fruits...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="content">
          <GroupBySelect
            groupByField={groupByField}
            setGroupByField={setGroupByField}
          />
          <div className="columns">
            <FruitList
              fruits={fruits}
              groupByField={groupByField}
              addToJar={addToJar}
              addGroupToJar={addGroupToJar}
            />
            <Jar jar={jar} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
