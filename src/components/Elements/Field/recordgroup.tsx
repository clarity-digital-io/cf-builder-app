import React from "react";

import {
  Card,
  DataTable,
  DataTableColumn,
  Icon,
  Button,
} from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";

export const RecordGroup = ({ question }: { question: Question__c }) => {
  return (
    <div className="slds-grid slds-grid_vertical">
      <Card
        id="ExampleCard"
        headerActions={<Button label="Add Items" />}
        heading={question.cforms__Title__c}
        icon={<Icon category="standard" name="document" size="small" />}
      >
        <DataTable items={[]} id="DataTableExample-1">
          <DataTableColumn key={0} label={'Salesforce Field'} property={0} truncate />
        </DataTable>
      </Card>
    </div>
  );
};
