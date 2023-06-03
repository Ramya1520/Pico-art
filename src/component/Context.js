import React, { createContext, useState } from "react";

// Create a new context
const MyContext = createContext();

// Create a provider component to wrap your app and provide the context values
const MyContextProvider = ({ children }) => {
  const [show2DView, setShow2DView] = useState(false);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [depth, setDepth] = useState(5);
  const [thickness, setThickness] = useState(0.2);
  const [searchText, setSearchText] = useState("");
  const [show3Dimage, setShow3Dimage] = useState([]);

  return (
    <MyContext.Provider
      value={{
        show2DView,
        setShow2DView,
        width,
        setWidth,
        height,
        setHeight,
        depth,
        setDepth,
        thickness,
        setThickness,
        searchText,
        setSearchText,
        show3Dimage,
        setShow3Dimage,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
