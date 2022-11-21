import React from "react";
import moment from "moment";
import { Datepicker } from "@salesforce/design-system-react";

export const Date = ({ question, disabled }) => {
  return (
    <Datepicker
      required={question.forms__Required__c}
      labels={{
        label: question.forms__Title__c,
      }}
      onChange={(event, data) => {}}
      onCalendarFocus={(event, data) => {}}
      formatter={(date) => {
        return date ? moment(date).format("M/D/YYYY") : "";
      }}
      parser={(dateString) => {
        return moment(dateString, "MM-DD-YYYY").toDate();
      }}
      value={""}
    />
  );
};
