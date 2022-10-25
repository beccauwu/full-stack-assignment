import React from "react";
import HashLoader from "react-spinners/HashLoader";
import "./style.css";
import type { LoadingProps } from "types/ComponentPropsTypes";

const Loading: React.FC<LoadingProps> = (props) => (
  <HashLoader
    color={props.color || "#ea8bff"}
    speedMultiplier={props.speedMultiplier || 1}
    className={"loaderComponent" + props.className}
  />
);

export default Loading;
