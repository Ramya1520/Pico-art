import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "../App.css";
import { SoftShadows, CameraControls, useGLTF } from "@react-three/drei";
import { Button, Container, Row } from "reactstrap";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Header from "./Header.js";
function Room() {
  const { materials } = useGLTF("/silvania_e_adilson.glb");
  const [show2DView, setShow2DView] = useState(false);
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [depth, setDepth] = useState(5);
  const [show3Dimage, setShow3Dimage] = useState([]);
  const [thickness, setThickness] = useState(0.2);
  const meshRef = useRef();

  let table_sofa = useLoader(GLTFLoader, "/table_sofa.glb");
  let table = useLoader(GLTFLoader, "/modern_dining_table.glb");
  let showcase = useLoader(GLTFLoader, "/showcase.glb");
  let television = useLoader(GLTFLoader, "/tv_stand.glb");
  let cup = useLoader(GLTFLoader, "/cup_and_plate.glb");
  let table_sofa_1 = useLoader(GLTFLoader, "/table_sofa_1.glb");
  let table_1 = useLoader(GLTFLoader, "/modern_dining_table_1.glb");
  let showcase_1 = useLoader(GLTFLoader, "/showcase_1.glb");
  let television_1 = useLoader(GLTFLoader, "/tv_stand_1.glb");
  let cup_1 = useLoader(GLTFLoader, "/cup_and_plate_1.glb");

  const items = [table_sofa, table, showcase, cup, television];
  const duplicate_items = [
    table_sofa_1,
    table_1,
    showcase_1,
    cup_1,
    television_1,
  ];

  const Furnitures = () => {
    const tablePositions = [
      { x: 0, y: 3, z: 0 },
      { x: 0, y: 2, z: 0 },
      { x: 0, y: 1, z: 0 },
      { x: 0, y: 0.5, z: 0 },
      { x: 0, y: -1, z: 0 },
    ];
    const tableScales = [
      { x: 0.0004, y: 0.0004, z: 0.0004 },
      { x: 0.0004, y: 0.0004, z: 0.0004 }, // Example scale 2
      { x: 0.002, y: 0.002, z: 0.002 },
      { x: 50, y: 50, z: 50 },
      { x: 0.05, y: 0.05, z: 0.05 },
    ];
    return (
      <>
        {items.map((furniture, index) => (
          <>
            <mesh
              key={index}
              onClick={(tbl) =>
                setShow3Dimage([...show3Dimage, duplicate_items[index]])
              }
              position={[
                tablePositions[index].x,
                tablePositions[index].y,
                tablePositions[index].z,
              ]}
            >
              <primitive
                object={furniture.scene}
                ref={meshRef}
                scale={[
                  tableScales[index].x,
                  tableScales[index].y,
                  tableScales[index].z,
                ]}
              />
            </mesh>
          </>
        ))}
      </>
    );
  };

  const RoomFurniture = () => {
    const tablePosition = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 0, z: 0 },
      { x: 2, y: 1, z: 0 },
      { x: 0, y: 0, z: 8 },
    ];
    const tableScale = [
      { x: 0.001, y: 0.001, z: 0.001 },
      { x: 0.0002, y: 0.0002, z: 0.0002 },
      { x: 0.006, y: 0.006, z: 0.006 },
      { x: 0.05, y: 0.05, z: 0.05 },
      { x: 0.0005, y: 0.0005, z: 0.0005 },
    ];

    const handleFurnitureClick = (selectedFurniture) => {
      setShow3Dimage((prevFurniture) =>
        prevFurniture.filter((furniture) => furniture !== selectedFurniture)
      );
    };

    return (
      <>
        {show3Dimage.map((selected_table, index) => (
          <mesh
            key={index}
            className="card"
            onClick={() => handleFurnitureClick(selected_table)}
            position={[
              tablePosition[index].x,
              tablePosition[index].y,
              tablePosition[index].z,
            ]}
          >
            <primitive
              object={selected_table.scene}
              ref={meshRef}
              scale={[
                tableScale[index].x,
                tableScale[index].y,
                tableScale[index].z,
              ]}
            />
          </mesh>
        ))}
      </>
    );
  };

  function Box(props) {
    const mesh = useRef();
    return (
      <mesh {...props} ref={mesh} castShadow material={props.material}>
        <boxBufferGeometry />
      </mesh>
    );
  }

<<<<<<< HEAD
  function TwoD({ width, height, depth, thickness, materials }) {
    const groupRef = useRef();

    useFrame(({ mouse }) => {
      const { x, y } = mouse;
      const rotationY = (x - 0.5) * Math.PI * 2;
      const rotationX = (y - 0.5) * Math.PI * 2;
      groupRef.current.rotation.set(0, rotationY, 0);
    });

    return (
      <group ref={groupRef} dispose={null}>
        gi
=======
  function TwoD({ width, depth, thickness, materials }) {
    const groupRef = useRef();

    useFrame(({ mouse }) => {
      const { x } = mouse;
      const rotationY = (x - 0.5) * Math.PI * 2;

      groupRef.current.rotation.set(0, rotationY, 0);
    });

    return (
      <group ref={groupRef} dispose={null}>
>>>>>>> c8e3625e95192b6db30f126711929d565c4a6c7d
        <Box
          scale={[width, thickness, depth]}
          material={materials.Material_2146804362}
          position={[0, 0, 0]}
        />
      </group>
    );
  }

  function ThreeD({ width, height, depth, thickness, materials }) {
    return (
      <group dispose={null}>
        <Box
          scale={[thickness, height, depth]}
          material={materials.Material_2146804362}
          position={[-1 * (width / 2), height / 2, 0]}
        />
        <Box
          scale={[width, height, thickness]}
          material={materials.Material_2146804362}
          position={[0, height / 2, -1 * (depth / 2)]}
        />
        <Box
          scale={[thickness, height, depth]}
          material={materials.Material_2146804362}
          position={[width / 2, height / 2, 0]}
        />
        <Box
          scale={[width, thickness, depth]}
          material={materials.Material_2146804362}
          position={[0, 0, 0]}
        />
      </group>
    );
  }
  const toggleView = () => {
    setShow2DView((prev) => !prev);
  };

  const onChangeWidth = (event) => {
    setWidth(event.target.value);
  };
  const onChangeHeight = (event) => {
    setHeight(event.target.value);
  };
  const onChangeDepth = (event) => {
    setDepth(event.target.value);
  };
  const onChangethickness = (event) => {
    setThickness(event.target.value);
  };

  const Footer = () => {
    return (
      <div className="footer">
        <h3>Room Size:</h3>
        <span>Height:</span>
        <input
          type="text"
          placeholder="Height(cm)"
          onChange={(e) => onChangeHeight(e)}
          value={height}
        />
        <span>Width:</span>
        <input
          type="text"
          placeholder="Width(cm)"
          onChange={(e) => onChangeWidth(e)}
          value={width}
        />
        <span>Depth:</span>
        <input
          type="text"
          placeholder="Depth(cm)"
          onChange={(e) => onChangeDepth(e)}
          value={depth}
        />
        <span>Wall Thickness:</span>
        <input
          type="text"
          value={thickness}
          onChange={(e) => onChangethickness(e)}
        />

        <Button onClick={toggleView}>
          {show2DView ? "Switch to 3D" : "Switch to 2D"}
        </Button>
      </div>
    );
  };

  return (
    <div>
      <Header />
      <Container fluid className="all">
        <Row>
          <div className="col-lg-1">
            <Canvas>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <CameraControls />
              <Furnitures />
              <SoftShadows resolution={1024} />
            </Canvas>
          </div>
<<<<<<< HEAD
          <div className="col-lg-4">
            <div className="login-page">
              <div className="form">
                <form className="login-form">
                  <div className="property">
                    <input
                      type="text"
                      placeholder="Height(cm)"
                      onChange={onChangeHeight}
                    />
                    <input
                      type="text"
                      placeholder="Width(cm)"
                      onChange={onChangeWidth}
                    />
                    <input
                      type="text"
                      placeholder="Depth(cm)"
                      onChange={onChangeDepth}
                    />
                  </div>
                  <div>
                    <h6 className="display_flex">Color picker</h6>
                    <div className="property">
                      <InputColor
                        initialValue="#5E72E4"
                        onChange={handleColorChange}
                        placement="left"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Wall Thickness(cm)"
                      onChange={onChangeThickness}
                    />
                  </div>
                  <div className="btns property">
                    <Button className="save btn-primary">Save</Button>{" "}
                    <span> &nbsp;</span>
                    <Button className="save btn-primary">Reset</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>{" "}
          <div className="col-lg-4">
            <div id="canvas-container">
              {show2DView ? (
                <Canvas shadows camera={{ position: [0, 60, 0], fov: 10 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  {/* <CameraControls /> */}
=======
          <div className="col-lg-10">
            <div id="canvas-container" className="canvas-container">
              {show2DView ? (
                <Canvas shadows camera={{ position: [0, 80, 0], fov: 10 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />

>>>>>>> c8e3625e95192b6db30f126711929d565c4a6c7d
                  <SoftShadows resolution={12} />
                  <TwoD
                    width={width}
                    height={height}
                    depth={depth}
                    thickness={thickness}
                    materials={materials}
                  />
                  <RoomFurniture />
                </Canvas>
              ) : (
                <Canvas shadows camera={{ position: [0, 80, 0], fov: 10 }}>
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />
                  <CameraControls />
                  <SoftShadows resolution={12} />
                  <ThreeD
                    width={width}
                    height={height}
                    depth={depth}
                    thickness={thickness}
                    materials={materials}
                  />
                  <RoomFurniture />
                </Canvas>
              )}
            </div>
          </div>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
export default Room;
