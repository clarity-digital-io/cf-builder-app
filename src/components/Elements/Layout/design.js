import React from "react";
import styled from "styled-components";
import Main from "../Theme";
import Box from "../Box";
import View from "../View";

import DesignNavigation from "../Navigation/design";

const DesignLayout = ({ children }) => {
  return [<DesignNavigation />, children];
};

export default DesignLayout;
