import { Button, Icon } from "@salesforce/design-system-react";
import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { useBuilderContext } from "../../../../context/BuilderContext";

export const Fields = () => {
  const { availableFields } = useBuilderContext();

  return <Panel header="Fields">
    <section>
      <ul>
        {
          availableFields.map(field => {
            const [isHovering, setIsHovering] = useState(false);
            const handleMouseOver = () => {
              setIsHovering(true);
            };

            const handleMouseOut = () => {
              setIsHovering(false);
            };

            return <FieldListItem
              key={field.id}
              className={isHovering ? "slds-theme_shade slds-p-around_x-small" : "slds-p-around_x-small"}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <div className="slds-grid slds-grid_vertical-align-center slds-p-left_large">
                <div className="slds-col slds-col_bump-left">
                  <span className="slds-p-right_xx-small slds-m-bottom_xx-small">
                    <Icon
                      assistiveText={{ label: field.type }}
                      category="standard"
                      name={"account"}
                      size="x-small"
                    />
                  </span>
                  <FieldListName className="slds-text-body_normal slds-m-top_medium">{field.type}</FieldListName>
                </div>
              </div>
            </FieldListItem>
          })
        }
      </ul>
    </section>

  </Panel>
}

const FieldListItem = styled.li`
cursor: grab
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