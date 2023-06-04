import React from "react";
import { useContext } from "react";
import { MyContext } from "./Context";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Button } from "reactstrap";
function Searchbar() {
  let table_sofa = useLoader(GLTFLoader, "/table_sofa.glb");
  let table = useLoader(GLTFLoader, "/modern_dining_table.glb");

  const { searchText, setItems, items, setSearchText } = useContext(MyContext);
  console.log(items);
  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleclick = () => {
    if (searchText === "table") {
      setItems([table_sofa, table]);
    }
    if (searchText === "sofa") {
      setItems([table_sofa]);
    }
  };
  return (
    <div>
      <div className="sidebar row">
        <input
          className="col-lg-7"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={handleSearch}
        />
        <Button className="col-lg-3" onClick={handleclick}>
          Search
        </Button>
      </div>
    </div>
  );
}
export default Searchbar;
