import { FilterLogicTypes, OperatorTypes } from "../criteria";
import { QuestionTypes } from "./fields";

export const namespace = 'cforms__';

export type sObjectMetaData = {
  Id: string,
  DeveloperName: string
}

export type Field__mdt = {
  cforms__Level__c: string,
  cforms__Type__c: string
} & sObjectMetaData;

export type sObject = {
  id: string
  Id?: string // if it's a new record wont have a Id yet
  Name?: string
}

export type Account = {
  cforms__Checklist_Group__c: string
} & sObject;

export type Answer__c = {
  cforms__Answer__c: string
  cforms__ContentDocument__c: string
  cforms__ContentVersion__c: string
  cforms__Date_Answer__c: string
  cforms__Question__c: string
  cforms__Record__c: string
  cforms__Response__c: string
  cforms__UUID__c: string
} & sObject;

export type Checklist__c = {
  cforms__Checklist_Group__c: string
} & sObject;

export type Checklist_Group__c = {
  cforms__Standard__c: boolean
} & sObject;

export type Form__c = {
  cforms__Checklist_Group__c: string
  cforms__Completion_Rate__c: string
  cforms__Connected_Object__c: string
  cforms__Description__c: string
  cforms__End_Date__c: string
  cforms__Has_Thank_You__c: string
  cforms__Label__c: string
  cforms__Multi_Page__c: string
  cforms__Multi_Page_Info__c: string
  cforms__Multi_Page_Val__c: string
  cforms__Responses_Completed__c: string
  cforms__Responses_Started__c: string
  cforms__Status__c: string
  cforms__Sync_Status__c: string
  cforms__Thank_You_Redirect__c: string
  cforms__Title__c: string
} & sObject;

export type Form_Connection__c = {
  cforms__Form__c: string
  cforms__New__c: boolean
  cforms__Result_Holder__c: string
  cforms__Salesforce_Object__c: string
  cforms__End_Date__c: string
} & sObject;

export type Form_Connection_Field__c = {
  cforms__Custom_Value__c?: string
  cforms__Form_Connection__c: string
  cforms__PreFill__c: boolean
  cforms__Question__c?: string
  cforms__Salesforce_Field__c?: string
} & sObject;

export type Form_Connection_Process__c = {
  cforms__Description__c: string
  cforms__Form_Connection__c: string
  cforms__Response__c: string
  cforms__Salesforce_Connection_Object__c: string
  cforms__Status__c: string
} & sObject;

export type Question__c = {
  cforms__Attachment_Type__c?: string[] // allowed types
  cforms__Connected_Object__c?: string
  cforms__Form__c?: string
  cforms__FreeText_Type__c?: string
  cforms__Lookup__c?: string
  cforms__Max_Length__c?: string
  cforms__Max_Range__c?: string
  cforms__Min_Range__c?: string
  cforms__Order__c: number
  cforms__Page__c: number
  cforms__Prefill_Type__c?: boolean
  cforms__Record_Group__c?: string
  cforms__Required__c?: boolean
  cforms__Salesforce_Field__c?: string
  cforms__Salesforce_Object__c?: string
  cforms__Step__c?: string
  cforms__Title__c: string
  cforms__Type__c: QuestionTypes
  cforms__Logic__c?: string // picklist
  cforms__Custom_Logic__c?: FilterLogicTypes
  cforms__Question_Criteria__r?: Question_Criteria__c[]
  cforms__Question_Options__r?: Question_Option__c[]
} & sObject;

export type Question_Criteria__c = {
  cforms__Field__c: string
  cforms__Operator__c: OperatorTypes | string
  cforms__Question__c: string
  cforms__Type__c: string
  cforms__Value__c: string
} & sObject;

export type Question_Filter__c = {
  cforms__Field_Name__c: string
  cforms__Question__c: string
} & sObject;

export type Question_Option__c = {
  cforms__Active_Flow__c?: string
  cforms__Choice_Image__c?: string
  cforms__Label__c: string
  cforms__Order__c: number
  cforms__Question__c: string
} & sObject;

export type Response__c = {
  cforms__Account__c: string
  cforms__Checklist__c: string
  cforms__Completion__c: string
  cforms__Display_Time__c: string
  cforms__Form__c: string
  cforms__Status__c: string
  cforms__Submitted_Date__c: string
  cforms__Time__c: string
  cforms__UUID__c: string
} & sObject;

export type Response_Connection__c = {
  cforms__Form_Connection__c: string
  cforms__Record__c: string
  cforms__Response__c: string
} & sObject;
