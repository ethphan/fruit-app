import React, { useEffect } from "react";
import FruitList from "./components/FruitList";
import Jar from "./components/Jar";
import GroupBySelect from "./components/GroupBySelect";
import { FruitProvider, useFruitContext } from "./contexts/FruitContext";
import "./App.css";

export interface Fruit {
  name: string;
  family: string;
  order: string;
  genus: string;
  nutritions: {
    calories: number;
  };
}

export type GroupByField = "None" | "family" | "order" | "genus";

function App() {
  const { state, dispatch } = useFruitContext();

  useEffect(() => {
    fetchFruitData();
  }, [dispatch]);

  const fetchFruitData = async () => {
    try {
      const response = await fetch("/api/fruit/all");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      dispatch({ type: "SET_FRUITS", payload: data });
    } catch (err) {
      console.error("Failed to load fruits");
    }
  };

  return (
    <div className="App">
      <h1>Fruit Jar App</h1>
      <div className="content">
        <GroupBySelect />
        <div className="columns">
          <FruitList />
          <Jar />
        </div>
      </div>
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
