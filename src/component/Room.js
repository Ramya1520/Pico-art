import React, { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import "../App.css";
import { SoftShadows, CameraControls, useGLTF } from "@react-three/drei";
import { easing } from "maath";
import InputColor from "react-input-color";
import { Button, Container, Row, TabPane } from "reactstrap";
import { GLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Room() {
  const { materials } = useGLTF("/silvania_e_adilson.glb");
  const [show2DView, setShow2DView] = useState(false);
  const [color, setColor] = useState({});
  const [width, setWidth] = useState(5);
  const [height, setHeight] = useState(5);
  const [depth, setDepth] = useState(5);
  const [show3Dimage, setShow3Dimage] = useState([]);
  const [thickness, setThickness] = useState(0.2);
  const table1 = useLoader(GLTFLoader, "/sofa_and_table.glb");
  const table2 = useLoader(GLTFLoader, "/modern_dining_table.glb");
  const tables = [table2, table1];
  const meshRef = useRef();
  // console.log(show3Dimage)

  const Furniture = () => {
    const tablePositions = [
      { x: 0, y: 0, z: 0 }, // Example position 1
      { x: 2, y: 0, z: 0 }, // Example position 2
      { x: 0, y: 0, z: 2 }, // Example position 3
      // Add more positions as needed
    ];
    const tableScales = [
      { x: 0.0005, y: 0.0005, z: 0.0005 }, // Example scale 1
      { x: 0.002, y: 0.002, z: 0.002 }, // Example scale 2
      { x: 0.0006, y: 0.0006, z: 0.0006 }, // Example scale 3
      // Add more scales as needed
    ];
    return (
      <>
        {tables.map((furniture, index) => (
          <>
            <mesh
            key={index}
            onClick={((table) => setShow3Dimage([...show3Dimage,furniture]))}
            position={[tablePositions[index].x, tablePositions[index].y, tablePositions[index].z]}
          >
          <primitive
            object={furniture.scene}
            ref={meshRef}
            scale={[tableScales[index].x,tableScales[index].y,tableScales[index].z,]}
          />
          </mesh>
          </>
        ))}
      </>
    );
  };

  const RoomFurniture = () => {
    const tablePositions = [
      { x: 0, y: 0, z: 0 }, // Example position 1
      { x: 2, y: 0, z: 0 }, // Example position 2
      { x: 0, y: 0, z: 2 }, // Example position 3
      // Add more positions as needed
    ];
    const tableScales = [
      { x: 0.0005, y: 0.0005, z: 0.0005 }, // Example scale 1
      { x: 0.002, y: 0.002, z: 0.002 }, // Example scale 2
      { x: 0.0006, y: 0.0006, z: 0.0006 }, // Example scale 3
      // Add more scales as needed
    ];
  
    const handleFurnitureClick = (selectedFurniture) => {
      setShow3Dimage((prevFurniture) => prevFurniture.filter((furniture) => furniture !== selectedFurniture));
    };
  
    return (
      <>
        {show3Dimage.map((selected_table, index) => (
          <mesh
            key={index}
            onClick={() => handleFurnitureClick(selected_table)}
            position={[tablePositions[index].x, tablePositions[index].y, tablePositions[index].z]}
          >
            <primitive
              object={selected_table.scene}
              ref={meshRef}
              scale={[tableScales[index].x, tableScales[index].y, tableScales[index].z]}
            />
          </mesh>
        ))}
      </>
    );
  };
  
  function Light() {
    const ref = useRef();
    useFrame((state, delta) => {
      easing.dampE(
        ref.current.rotation,
        [(state.pointer.y * Math.PI) / 50, (state.pointer.x * Math.PI) / 20, 0],
        0.2,
        delta
      );
    });
    return (
      <group ref={ref}>
        <directionalLight
          position={[5, 5, -8]}
          castShadow
          intensity={5}
          shadow-mapSize={2048}
          shadow-bias={-0.001}
        >
          <orthographicCamera
            attach="shadow-camera"
            args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
          />
        </directionalLight>
      </group>
    );
  }

  function Box(props) {
    const mesh = useRef();
    return ( 
      <mesh {...props} ref={mesh} castShadow material={props.material}>
        <boxBufferGeometry />
      </mesh>
    );
  }

  const TwoD = () => {
    const { camera } = useThree();
    useFrame(() => {
      camera.position.z = 100;
      camera.lookAt(0, 2, 0);
    });

    return (
      <group dispose={null}>
        <mesh position={[0, 0, -depth / 2]} receiveShadow>
          <planeBufferGeometry args={[width, height]} />
          <meshBasicMaterial color="gray" />
        </mesh>
      </group>
    );
  };

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
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };
  const onChangeWidth = (newWidth) => {
    setWidth(parseInt(newWidth.target.value));
  };
  const onChangeHeight = (newHeight) => {
    setHeight(parseInt(newHeight.target.value));
  };
  const onChangeDepth = (newDepth) => {
    setDepth(parseInt(newDepth.target.value));
  };
  const onChangeThickness = (newThickness) => {
    setThickness(parseInt(newThickness.target.value));
  };
  return (
    <div>
      <button
        onClick={toggleView}
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: 9999,
          padding: "10px",
          backgroundColor: "transparent",
          color: "#000",
          border: "1px solid #000",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {show2DView ? "Switch to 3D" : "Switch to 2D"}
      </button>
      <Container fluid>
        <Row>
        <div className="col-lg-4">
            <Canvas>
           
              <CameraControls />
              <Light />
              <Furniture />
            </Canvas>
          </div>
         
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
          </div>
          <div className="col-lg-4">
            <div id="canvas-container">
              {show2DView ? (
                <Canvas>
                  <SoftShadows />
                  <CameraControls />
                  <Light />
                  <TwoD
                    width={width}
                    height={height}
                    depth={depth}
                    thickness={thickness}
                    materials={materials}
                  />
                </Canvas>
              ) : (
                <Canvas shadows camera={{ position: [0, 0, 80], fov: 10 }}>
                  <SoftShadows />
                  <CameraControls makeDefault />
                  <Light />
                  <ThreeD
                    width={width}
                    height={height}
                    depth={depth}
                    thickness={thickness}
                    materials={materials}
                  />
                  <RoomFurniture/>
                </Canvas>
              )}
            </div>
          </div>
       
        </Row>
      </Container>
    </div>
  );
}
export default Room;
