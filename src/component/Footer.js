import React from "react";
import { useContext } from "react";
import { RoomDetails } from "./Context";
import { Button } from "reactstrap";
import { MyContext } from "./Context";

const Footer = () => {
  const {
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
  } = useContext(MyContext);

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
export default Footer;
