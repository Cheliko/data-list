import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppWithProvider from './App';
import ItemDetail from './components/ItemDetail';
import { DataProvider } from './DataContext';

const AppRouter = () => {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<AppWithProvider />} />
          <Route path="/item/:id" element={<ItemDetail />} />
        </Routes>
      </DataProvider>
    </Router>
  );
};

export default AppRouter;
