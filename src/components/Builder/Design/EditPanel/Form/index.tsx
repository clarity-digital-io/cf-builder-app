import React, { useState } from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";

import { Input, Button } from "@salesforce/design-system-react";
import styled from "styled-components";
import { Connections } from "./Connections";
import { Form_Connection__c } from "../../../../../utils/types/sObjects";

export const FormEdit = () => {
  const { form, formConnections, setFormUpdate, addFormConnection, setFormConnection } = useBuilderContext();

  const [isOpen, setOpen] = useState(false);

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

          {
            formConnections.map((formConnection: Form_Connection__c, index: number) => {
              return <FullWidthButton key={index} variant="neutral"
                onClick={() => {
                  setOpen(!isOpen)
                  // set index to find connections
                  setFormConnection(formConnection);
                }}
              >
                Connection: {formConnection.cforms__Salesforce_Object__c}
              </FullWidthButton>
            })
          }

          <FullWidthButton variant="neutral"
            onClick={() => {
              setOpen(!isOpen)
              // set index to find connections
              addFormConnection();
            }}
          >
            Add Connection
          </FullWidthButton>
          <Connections isOpen={isOpen} setOpen={setOpen} />

        </div>
      </div>

    </div>

    <div className="slds-p-top_medium slds-ui-gen__layout-item">
    </div>

  </section>
}

const FullWidthButton = styled(Button)`
  width: 100%;
  display: block; 
  margin-bottom: 4px; 
`