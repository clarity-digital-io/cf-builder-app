import React from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";

import { Input, Button } from "@salesforce/design-system-react";
import styled from "styled-components";

export const FormEdit = () => {
  const { form, setFormUpdate } = useBuilderContext();

  return <section className="slds-ui-gen__vertical-layout">
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      <Input
        id="base-id"
        label="Title"
        placeholder="My placeholder"
        value={form.cforms__Title__c}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormUpdate({
          ...form,
          cforms__Title__c: e.target.value
        })}
      />
    </div>
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      <Input
        id="base-id"
        label="Description"
        placeholder="My placeholder"
        value={form.cforms__Description__c}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormUpdate({
          ...form,
          cforms__Description__c: e.target.value
        })}
      />
    </div>
    <div className="slds-p-top_medium slds-ui-gen__layout-item">

      <div className="slds-form-element">
        <label className="slds-form-element__label" htmlFor="text-input-id-49">Connections</label>
        <div className="slds-form-element__control">
          <FullWidthButton variant="neutral" onClick={() => console.log("CONNECT")}>
            Add Connection
          </FullWidthButton>
        </div>
      </div>

    </div>

    <div className="slds-p-top_medium slds-ui-gen__layout-item">

      <div className="slds-form-element">
        <label className="slds-form-element__label" htmlFor="text-input-id-49">Field Mapping</label>
        <div className="slds-form-element__control">
          <FullWidthButton variant="neutral" onClick={() => console.log("CONNECT")}>
            Add Mapping
          </FullWidthButton>
        </div>
      </div>

    </div>
  </section>
}

const FullWidthButton = styled(Button)`
  width: 100%
`