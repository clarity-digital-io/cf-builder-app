import React, { useState } from "react";
import { useBuilderContext } from "../../../../../context/BuilderContext";
import { Checkbox } from "@salesforce/design-system-react";

enum AttachmentType {
  JPG,
  PNG,
  PDF
}

const types: AttachmentType[] = [
  AttachmentType.JPG,
  AttachmentType.PNG,
  AttachmentType.PDF
]

type CheckedType = {
  [key as AttachmentType]: boolean
}

export const AttachmentsEdit = () => {
  const { question, setQuestionUpdate } = useBuilderContext();

  // const [checkedTypes, setCheckedTypes] = useState<>({});

  return <section className="slds-box slds-ui-gen__vertical-layout slds-m-top_small">
    <div className="slds-p-top_medium slds-ui-gen__layout-item">
      {/* <Checkbox
        aria-checked={allCondimentsStatus}
        aria-controls="checkbox-mayonnaise checkbox-mustard checkbox-oil checkbox-vinegar"
        assistiveText={{
          label: 'All Condiments',
        }}
        checked={allCondimentsStatus === true || undefined}
        id="checkbox-example-all-condiments"
        indeterminate={allCondimentsStatus === 'mixed'}
        labels={{
          label: 'All Condiments',
        }}
        onChange={() => {
          console.log('test all ')
        }}
      /> */}

      <ul className="slds-p-left_large slds-p-top_xx-small">
        {
          types.map((type: AttachmentType, index: number) => {
            return <li key={index}>
              <Checkbox
                assistiveText={{
                  label: type,
                }}
                checked={false}
                id="checkbox-mayonnaise"
                labels={{
                  label: type,
                }}
                onChange={() => {
                  console.log('test')
                }}
              />
            </li>
          })
        }
      </ul>
    </div>
  </section>

}
