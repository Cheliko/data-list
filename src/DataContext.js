import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchData } from "./services/api";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      const result = await fetchData();
      if (Array.isArray(result)) {
        setData(result);
        console.log("Data set in context:", result); // Log data set in context
      } else {
        console.error("Data is not an array:", result);
        setError(new Error("Data is not an array"));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};
