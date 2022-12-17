import React, { ReactElement } from "react";
import { useBuilderContext } from "../../../../context/BuilderContext";

export const Fields = () => {
  const { availableFields } = useBuilderContext();

  return <Panel header="Fields">
    {
      availableFields.map(field => {
        return <div key={field.id}>{field.id}</div>
      })
    }
  </Panel>
}

const Panel = ({ header, children }: { header: string, children: ReactElement[] }) => {
  return <div className="slds-panel slds-size_medium slds-panel_docked slds-panel_docked-left slds-is-open" aria-hidden="false">
    <div className="slds-panel__header">
      <h2 className="slds-panel__header-title slds-text-heading_small slds-truncate" title="Panel Header">{header}</h2>
    </div>
    <div className="slds-panel__body">
      {children}
    </div>
  </div>
}