import { DragOverlay, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@salesforce/design-system-react";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useBuilderContext } from "../../../../context/BuilderContext";
import { FieldType } from "../../../../utils/constants/fields";

export const Fields = ({ fieldActive }) => {
  const { availableFields } = useBuilderContext();

  return <Panel header="Fields">
    <section>
      <ul>
        {
          availableFields.map((field, index) => <AvailableFieldItem key={index} field={field} />)
        }
      </ul>
    </section>

  </Panel>
}

const AvailableFieldItem = ({ field }: { field: any }) => {

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `field-${field.id}`,
    data: {
      field: field,
      type: 'fields',
      supports: ['fields']
    }
  });

  const style = {
    // transform: CSS.Transform.toString(transform),
    opacity: isDragging ? .5 : 1,
  };


  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return <FieldListItem
    ref={setNodeRef}
    style={style}
    key={field.id}
    className={isHovering ? "slds-theme_shade slds-p-around_x-small" : "slds-p-around_x-small"}
  >
    <div
      {...attributes}
      {...listeners}
      className="slds-grid slds-grid_vertical-align-center slds-p-left_large"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <FieldItem field={field} dragOverlay={false} />
    </div>
  </FieldListItem>

}

export const FieldItem = ({ field, dragOverlay }: { field: FieldType, dragOverlay: boolean }) => {

  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
    'zIndex': dragOverlay ? 8001 : 100,
    opacity: dragOverlay ? .75 : 1
  };

  return <div className={dragOverlay ? "slds-theme_shade slds-p-around_x-small" : "slds-col slds-col_bump-left"} style={style}>
    <span className="slds-p-right_xx-small slds-m-bottom_xx-small">
      <Icon
        assistiveText={{ label: field.name }}
        category="standard"
        name={field.icon}
        size="x-small"
      />
    </span>
    <FieldListName className="slds-text-body_normal slds-m-top_medium">{field.name}</FieldListName>
  </div>
}

const FieldListItem = styled.li`
cursor: grab;
opacity: 1 !important;
user-select: none;
`

const FieldListName = styled.span`
  top: .1em; 
  position:relative; 
`

const Panel = ({ header, children }: { header: string, children: ReactElement[] }) => {
  return <div className="slds-panel slds-size_medium slds-panel_docked slds-panel_docked-left slds-is-open" aria-hidden="false">
    <div className="slds-panel__header">
      <h2 className="slds-panel__header-title slds-text-heading_small slds-truncate" title="Panel Header">{header}</h2>
    </div>
    <div>
      {children}
    </div>
  </div>
}