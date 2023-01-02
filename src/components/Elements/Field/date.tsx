import React from "react";
import moment from "moment";
import { Datepicker } from "@salesforce/design-system-react";
import { Question__c } from "../../../utils/types/sObjects";

export const Date = ({ question }: { question: Question__c }) => {
  return (
    <Datepicker
      required={question.cforms__Required__c}
      labels={{
        label: question.cforms__Title__c,
      }}
      parser={(dateString: string) => {
        return moment(dateString, "MM-DD-YYYY").toDate();
      }}
      value={""}
    />
  );
};
