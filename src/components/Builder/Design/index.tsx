import React from "react";

import Design from "./design";

import DesignNavigation from "../../Elements/Navigation/design";
import styled from "styled-components";
import { DragDropUpdateProvider } from "./Provider/dragdrop";
import { DesignProvider } from "./Provider/design";

import { DndContext } from '@dnd-kit/core';
import { DesignContextProvider } from "../../../context/DesignContext";
/**
 * This provider can be split up into a DragDrop Provider and an Edit Provider
 */

export const DragDrop = () => {
  // return (
  //   <DragDropUpdateProvider>
  //     <DesignProvider>
  //       <LayoutHolder>
  //         <DesignNavigation />
  //         <Design />
  //       </LayoutHolder>
  //     </DesignProvider>
  //   </DragDropUpdateProvider>
  // );

  return (
    <Layout>

      <DesignContextProvider>
        <DesignNavigation />
        <Design />
      </DesignContextProvider>

    </Layout>
  );
};

const Layout = styled.div`
  > div:nth-of-type(1) {
    max-height: 98px;
  }
`;
