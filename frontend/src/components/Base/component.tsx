import React from "react";
import Navbar from "./Navbar";
import type { OnlyChildren } from "types";

const BaseLayout: React.FC<OnlyChildren> = (props) => (
  <>
    <Navbar />
    {props.children}
  </>
);

export default BaseLayout;
