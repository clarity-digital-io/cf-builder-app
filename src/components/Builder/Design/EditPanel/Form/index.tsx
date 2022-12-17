import React from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";

import { Input } from "@salesforce/design-system-react";

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
  </section>
}