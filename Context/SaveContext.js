// SaveContext.js
import React, { createContext, useState } from "react";

export const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
  const [savedNews, setSavedNews] = useState([]);

  const toggleSave = (item) => {
    const isSaved = savedNews.some(news => news.image === item.image);
    if (isSaved) {
      setSavedNews(savedNews.filter(news => news.image !== item.image));
    } else {
      setSavedNews([...savedNews, item]);
    }
  };

  const isNewsSaved = (item) => {
    return savedNews.some(news => news.image === item.image);
  };

  return (
    <SaveContext.Provider value={{ savedNews, toggleSave, isNewsSaved }}>
      {children}
    </SaveContext.Provider>
  );
};
