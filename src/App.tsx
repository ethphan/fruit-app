import React, { useEffect } from "react";
import FruitList from "./components/FruitList";
import Jar from "./components/Jar";
import GroupBySelect from "./components/GroupBySelect";
import { FruitProvider, useFruitContext } from "./contexts/FruitContext";
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
  const { state, dispatch } = useFruitContext();
  const { loading, error } = state;

  useEffect(() => {
    const fetchFruitData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await fetch("/api/fruit/all");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        dispatch({ type: "SET_FRUITS", payload: data });
        dispatch({ type: "SET_LOADING", payload: false });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Failed to load fruits" });
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };
    fetchFruitData();
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Fruit Jar App</h1>
      {loading && <p>Loading fruits...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="content">
          <GroupBySelect />
          <div className="columns">
            <FruitList />
            <Jar />
          </div>
        </div>
      )}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <FruitProvider>
      <App />
    </FruitProvider>
  );
}
