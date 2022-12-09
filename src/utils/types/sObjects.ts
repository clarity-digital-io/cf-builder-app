export const namespace = 'forms__';

type sObject = {
  id: string
  name: string
}

export type Account = {
  forms__Checklist_Group__c: string
} & sObject;

export type Answer__c = {
  forms__Answer__c: string
  forms__ContentDocument__c: string
  forms__ContentVersion__c: string
  forms__Date_Answer__c: string
  forms__Question__c: string
  forms__Record__c: string
  forms__Response__c: string
  forms__UUID__c: string
} & sObject;

export type Checklist__c = {
  forms__Checklist_Group__c: string
} & sObject;

export type Checklist_Group__c = {
  forms__Standard__c: boolean
} & sObject;

export type Form__c = {
  forms__Checklist_Group__c: string
  forms__Completion_Rate__c: string
  forms__Connected_Object__c: string
  forms__Description__c: string
  forms__End_Date__c: string
  forms__Has_Thank_You__c: string
  forms__Label__c: string
  forms__Multi_Page__c: string
  forms__Multi_Page_Info__c: string
  forms__Multi_Page_Val__c: string
  forms__Responses_Completed__c: string
  forms__Responses_Started__c: string
  forms__Status__c: string
  forms__Sync_Status__c: string
  forms__Thank_You_Redirect__c: string
  forms__Title__c: string
} & sObject;

export type Form_Connection__c = {
  forms__Form__c: string
  forms__New__c: boolean
  forms__Result_Holder__c: string
  forms__Salesforce_Object__c: string
  End_Date__c: string
} & sObject;

export type Form_Connection_Field__c = {
  forms__Custom_Value__c: string
  forms__Form_Connection__c: string
  forms__PreFill__c: string
  forms__Question__c: string
  forms__Salesforce_Field__c: string
} & sObject;

export type Form_Connection_Process__c = {
  forms__Description__c: string
  forms__Form_Connection__c: string
  forms__Response__c: string
  forms__Salesforce_Connection_Object__c: string
  forms__Status__c: string
} & sObject;

enum QuestionTypes {
  MultipleChoice,
  Comment,
  Dropdown,
  Slider,
  Date,
  Email,
  Number,
  Lookup,
  RecordGroup,
  Image,
  Checkbox,
  FreeText,
  PictureChoice,
  InputField,
  GeoLocation,
  Attachments,
  BOOLEAN,
  DATETIME,
  CURRENCY,
  COMBOBOX,
  ADDRESS,
  ANYTTYPE,
  BASE64,
  DOUBLE,
  ENCRYPTEDSTRING,
  INTEGER,
  LONG,
  MULTIPICKLIST,
  PERCENT,
  PHONE,
  PICKLIST,
  TEXTAREA,
  TIME,
  URL,
  REFERENCE,
  STRING
}

export type Question__c = {
  forms__Attachment_Type__c: string
  forms__Connected_Object__c: string
  forms__Form__c: string
  forms__FreeText_Type__c: string
  forms__Logic__c: string
  forms__Lookup__c: string
  forms__Max_Length__c: string
  forms__Max_Range__c: string
  forms__Min_Range__c: string
  forms__Order__c: string
  forms__Page__c: string
  forms__Prefill_Type__c: boolean
  forms__Record_Group__c: string
  forms__Required__c: string
  forms__Salesforce_Field__c: string
  forms__Salesforce_Object__c: string
  forms__Step__c: string
  forms__Title__c: string
  forms__Type__c: QuestionTypes
} & sObject;

export type Question_Criteria__c = {
  forms__Field__c: string
  forms__Field_Type__c: string
  forms__Operator__c: string
  forms__Question__c: string
  forms__Type__c: string
  forms__Value__c: string
} & sObject;

export type Question_Filter__c = {
  forms__Field_Name__c: string
  forms__Question__c: string
} & sObject;

export type Question_Option__c = {
  forms__Active_Flow__c: string
  forms__Choice_Image__c: string
  forms__Label__c: string
  forms__Order__c: string
  forms__Question__c: string
} & sObject;

export type Response__c = {
  forms__Account__c: string
  forms__Checklist__c: string
  forms__Completion__c: string
  forms__Display_Time__c: string
  forms__Form__c: string
  forms__Status__c: string
  forms__Submitted_Date__c: string
  forms__Time__c: string
  forms__UUID__c: string
} & sObject;

export type Response_Connection__c = {
  forms__Form_Connection__c: string
  forms__Record__c: string
  forms__Response__c: string
} & sObject;
