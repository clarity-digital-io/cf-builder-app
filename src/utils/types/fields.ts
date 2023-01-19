export enum QuestionTypes {
  None,
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
  Photo,
  File,
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

export enum QuestionCategory {
  Input,
  Display,
  Guide
}

export type Category = {
  [key: string]: QuestionCategory
}

export type ComboQuestionField = {
  id: string,
  label: string
  type: QuestionTypes
}

export type ComboSObjectField = {
  id: string,
  label: string
  type: string
}
