import React, { useState } from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";

import { Input, Button } from "@salesforce/design-system-react";
import styled from "styled-components";
import { FormConnections } from "./FormConnections";
import { Form_Connection__c } from "../../../../../utils/types/sObjects";


export const FormEdit = () => {
  const { formId, form, formConnections, setFormUpdate, setNewFormConnection, initFormConnection } = useBuilderContext();

  const [isOpen, setOpen] = useState(false);

  const handleNewFormConnection = () => {
    const _formConnectionId = formConnections.length.toString();
    const formConnectionSObject: Form_Connection__c = {
      id: _formConnectionId,
      cforms__Form__c: formId,
      cforms__New__c: false,
      cforms__Result_Holder__c: '',
      cforms__Salesforce_Object__c: '',
      cforms__End_Date__c: ''
    }

    setNewFormConnection(formConnectionSObject);
    initFormConnection(_formConnectionId);
  }

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


        {
          formConnections.map((formConnection: Form_Connection__c, index: number) => {
            return <div key={index} className="slds-form-element__control">
              <FullWidthButton key={index} variant="neutral"
                onClick={() => {
                  setOpen(!isOpen)
                  // set index to find connections
                  initFormConnection(formConnection.id);
                }}
              >
                Connection: {formConnection.cforms__Salesforce_Object__c}
              </FullWidthButton>
            </div>
          })
        }


        <div className="slds-form-element__control">

          <FullWidthButton
            variant="brand"
            onClick={() => {
              setOpen(!isOpen)
              handleNewFormConnection();
            }}
            iconCategory="utility"
            iconName="new"
            iconPosition="left"
            label="Add Form Connection"
          />

        </div>

        <FormConnections isOpen={isOpen} setOpen={setOpen} />

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