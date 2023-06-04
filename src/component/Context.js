import React, { createContext, useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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
  let table_sofa = useLoader(GLTFLoader, "/table_sofa.glb");
  let table = useLoader(GLTFLoader, "/modern_dining_table.glb");
  let showcase = useLoader(GLTFLoader, "/showcase.glb");
  let television = useLoader(GLTFLoader, "/80s_retro_television.glb");
  let cup = useLoader(GLTFLoader, "/cup_and_plate.glb");
  let bed = useLoader(GLTFLoader, "/stylized_bed.glb");
  const [items, setItems] = useState([
    table_sofa,
    table,
    showcase,
    cup,
    television,
    bed,
  ]);
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
        items,
        setItems,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
