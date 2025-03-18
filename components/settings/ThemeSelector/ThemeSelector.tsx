"use client"
import React, { useState } from "react";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset", "caramelatte",
  "abyss", "silk"
];


const ThemeSelector = () => {
  const [selectedTheme, setSelectedTheme] = useState("dark");

  const changeTheme = (theme:any) => {
    document.documentElement.setAttribute("data-theme", theme);
    setSelectedTheme(theme);
  };

  return (
    <div className="p-4 bg-base-200 min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-center">Select a Theme</h2>
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => changeTheme(theme)}
            className={`p-3 rounded-lg shadow-md text-center ${
              selectedTheme === theme ? "border-2 border-primary" : ""
            }`}
            data-theme={theme}
          >
            <div>
                <span className="bg-primary"></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
