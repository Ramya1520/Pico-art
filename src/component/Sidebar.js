import React, { useState } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { CameraControls } from "@react-three/drei";
import { useContext } from "react";
import { MyContext } from "./Context";
import { Canvas } from "@react-three/fiber";
import { Button } from "reactstrap";
import Searchbar from "./Searchbar";
const Furnitures = () => {
  let table_sofa = useLoader(GLTFLoader, "/table_sofa.glb");
  let table = useLoader(GLTFLoader, "/modern_dining_table.glb");
  let showcase = useLoader(GLTFLoader, "/showcase.glb");
  let television = useLoader(GLTFLoader, "/80s_retro_television.glb");
  let cup = useLoader(GLTFLoader, "/cup_and_plate.glb");
  let bed = useLoader(GLTFLoader, "/stylized_bed.glb");

  let table_sofa_1 = useLoader(GLTFLoader, "/table_sofa_1.glb");
  let table_1 = useLoader(GLTFLoader, "/modern_dining_table_1.glb");
  let showcase_1 = useLoader(GLTFLoader, "/showcase_1.glb");
  let television_1 = useLoader(GLTFLoader, "/80s_retro_television_1.glb");
  let cup_1 = useLoader(GLTFLoader, "/cup_and_plate_1.glb");
  let bed_1 = useLoader(GLTFLoader, "/stylized_bed_1.glb");

  // const items = [{ table_sofa, table, showcase, cup, television, bed }];

  const duplicate_items = [
    table_sofa_1,
    table_1,
    showcase_1,
    cup_1,
    television_1,
    bed_1,
  ];
  const { searchText, show3Dimage, setShow3Dimage, items } =
    useContext(MyContext);

  const tableScales = [
    { x: 0.005, y: 0.005, z: 0.005 },
    { x: 0.003, y: 0.003, z: 0.003 }, // Example scale 2
    { x: 0.05, y: 0.05, z: 0.05 },
    { x: 500, y: 500, z: 500 },
    { x: 10, y: 10, z: 10 },
    { x: 0.5, y: 0.5, z: 0.5 },
  ];
  // console.log(items);
  console.log(searchText);

  return (
    <div className="overall-item border">
      <div className="sidebar row">
        <Searchbar />
      </div>
      <div className="row row-gap-9 d-flex justify-content-around">
        {items.map((furniture, index) => (
          <div className="card col-lg-5 card-highlight" key={index}>
            <Canvas
              className=" canvas-item"
              camera={{ position: [0, 80, 0], fov: 10 }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <CameraControls />

              <mesh
                onClick={() =>
                  setShow3Dimage([...show3Dimage, duplicate_items[index]])
                }
              >
                <primitive
                  className="ooo"
                  object={furniture.scene}
                  scale={[
                    tableScales[index].x,
                    tableScales[index].y,
                    tableScales[index].z,
                  ]}
                />
              </mesh>
            </Canvas>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Furnitures;
