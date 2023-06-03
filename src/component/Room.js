import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import "../App.css";
import { SoftShadows, CameraControls, useGLTF } from "@react-three/drei";
import { Container, Row } from "reactstrap";
import Header from "./Header.js";
import { useContext } from "react";
import { MyContext } from "./Context";
import Furnitures from "./Sidebar";

function Room() {
  const { materials } = useGLTF("/silvania_e_adilson.glb");

  const {
    show2DView,
    width,
    height,
    depth,
    thickness,
    show3Dimage,
    setShow3Dimage,
  } = useContext(MyContext);
  const meshRef = useRef();

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

  function TwoD({ width, depth, thickness, materials }) {
    const groupRef = useRef();

    return (
      <group ref={groupRef} dispose={null}>
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

  return (
    <div>
      <Header />
      <Container fluid className="all">
        <Row>
          <div className="col-lg-2">
            <Furnitures />
          </div>
          <div className="col-lg-10">
            <div id="canvas-container" className="canvas-container">
              {show2DView ? (
                <Canvas
                  className="canvas-room"
                  shadows
                  camera={{ position: [0, 80, 0], fov: 10 }}
                >
                  <ambientLight intensity={0.5} />
                  <pointLight position={[10, 10, 10]} />

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
                <Canvas
                  className="canvas-room"
                  shadows
                  camera={{ position: [0, 80, 0], fov: 10 }}
                >
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
    </div>
  );
}
export default Room;
