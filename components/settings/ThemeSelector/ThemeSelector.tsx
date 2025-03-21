"use client"
import { useCurrentUserStore } from "@/components/providers/userProvider";
import React, { useEffect, useState } from "react";

const themes = [
  "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", 
  "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden",
  "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black",
  "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
  "night", "coffee", "winter", "dim", "nord", "sunset", "caramelatte",
  "abyss", "silk"
];


const ThemeSelector = () => {
  const {currentUser, setUserTheme, isUpdatingTheme} = useCurrentUserStore();
  const [selectedTheme, setSelectedTheme] = useState(currentUser?.theme);

  useEffect(() => {
    if(currentUser) {
      setSelectedTheme(currentUser.theme);
    }
  }
  , [currentUser?.theme]);




  const changeTheme = async(theme:any) => {
    await setUserTheme(theme);
  };

  return (
    <div className="p-4 bg-base-200  w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Select a Theme</h2>
      <div className="flex flex-wrap md:grid-cols-6 gap-4">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => changeTheme(theme)}
            className={`p-3 rounded-lg shadow-md text-center m-3 cursor-pointer ${
              selectedTheme === theme ? "border-2 border-primary" : ""
            }`}
            data-theme={theme}
          >
            <span className="capitalize inline-block mb-2 font-semibold">{theme}</span>
            <div className="flex gap-2">
                <span className="rounded-full bg-primary h-6 w-6"></span>
                <span className="rounded-full bg-secondary h-6 w-6"></span>
                <span className="rounded-full bg-accent h-6 w-6"></span>
                <span className="rounded-full bg-neutral h-6 w-6"></span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
