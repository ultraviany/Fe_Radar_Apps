// SaveContext.js
import React, { createContext, useState } from "react";

export const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const [savedNews, setSavedNews] = useState([]);

  const toggleSave = (item) => {
    const isSaved = savedNews.some(news => news.id === item.id);
    if (isSaved) {
      setSavedNews(savedNews.filter(news => news.id !== item.id));
    } else {
      setSavedNews([...savedNews, item]);
    }
  };

  const isNewsSaved = (id) => {
    return savedNews.some(news => news.id === id);
  };

  return (
    <SaveContext.Provider value={{ savedNews, toggleSave, isNewsSaved }}>
      {children}
    </SaveContext.Provider>
  );
};
