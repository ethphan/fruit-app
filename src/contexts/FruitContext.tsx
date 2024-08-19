import React, { createContext, useReducer, useContext, ReactNode } from "react";
import { Fruit, GroupByField } from "../App";

type Action =
  | { type: "SET_FRUITS"; payload: Fruit[] }
  | { type: "ADD_TO_JAR"; payload: Fruit }
  | { type: "ADD_GROUP_TO_JAR"; payload: Fruit[] }
  | { type: "SET_GROUP_BY_FIELD"; payload: GroupByField }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

interface State {
  fruits: Fruit[];
  jar: Fruit[];
  groupByField: GroupByField;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: State = {
  fruits: [],
  jar: [],
  loading: false,
  error: null,
  groupByField: "None",
};

// Create reducer
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FRUITS":
      return { ...state, fruits: action.payload };
    case "ADD_TO_JAR":
      return { ...state, jar: [...state.jar, action.payload] };
    case "ADD_GROUP_TO_JAR":
      return { ...state, jar: [...state.jar, ...action.payload] };
    case "SET_GROUP_BY_FIELD":
      return { ...state, groupByField: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

// Create context
const FruitContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Context provider component
export const FruitProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FruitContext.Provider value={{ state, dispatch }}>
      {children}
    </FruitContext.Provider>
  );
};

// Custom hook for consuming context
export const useFruitContext = () => useContext(FruitContext);

export {};
