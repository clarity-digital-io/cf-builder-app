import { Category, QuestionCategory, QuestionTypes } from "../types/fields";

export type FieldType = {
  id: number,
  active: boolean,
  name: string,
  type: QuestionTypes,
  icon: string
  quantity?: number
  category?: QuestionCategory
}

export type FieldIcon = {
  [key: string]: string
}

export const FieldCategories: Category = {
  'Input': QuestionCategory.Input,
  'Display': QuestionCategory.Display,
  'Guide': QuestionCategory.Guide,
}

export const iconTypes: FieldIcon = {
  ['PictureChoice']: 'account',
  ['MultipleChoice']: 'picklist_choice',
  ['Comment']: 'answer_public',
  ['Dropdown']: 'multi_picklist',
  ['Slider']: 'product_transfer',
  ['Date']: 'event',
  ['Email']: 'email',
  ['Number']: 'number_input',
  ['Lookup']: 'record_lookup',
  ['RecordGroup']: 'record_create',
  ['Image']: 'file',
  ['Checkbox']: 'multi_select_checkbox',
  ['Attachments']: 'file',
  ['InputField']: 'textbox',
  ['GeoLocation']: 'address',
  ['Photo']: 'file',
  ['FreeText']: 'display_text',
  ['File']: 'file',
}

export const questionTypes: Record<string, QuestionTypes> = {
  'None': QuestionTypes.None,
  'MultipleChoice': QuestionTypes.MultipleChoice,
  'Comment': QuestionTypes.Comment,
  'Dropdown': QuestionTypes.Dropdown,
  'Slider': QuestionTypes.Slider,
  'Date': QuestionTypes.Date,
  'Email': QuestionTypes.Email,
  'Number': QuestionTypes.Number,
  'Lookup': QuestionTypes.Lookup,
  'RecordGroup': QuestionTypes.RecordGroup,
  'Image': QuestionTypes.Image,
  'Checkbox': QuestionTypes.Checkbox,
  'FreeText': QuestionTypes.FreeText,
  'PictureChoice': QuestionTypes.PictureChoice,
  'InputField': QuestionTypes.InputField,
  'GeoLocation': QuestionTypes.GeoLocation,
  'Attachments': QuestionTypes.Attachments,
  'Photo': QuestionTypes.Photo,
  'File': QuestionTypes.File,
  'BOOLEAN': QuestionTypes.None,
  'DATETIME': QuestionTypes.None,
  'CURRENCY': QuestionTypes.None,
  'COMBOBOX': QuestionTypes.None,
  'ADDRESS': QuestionTypes.None,
  'ANYTTYPE': QuestionTypes.None,
  'BASE64': QuestionTypes.None,
  'DOUBLE': QuestionTypes.None,
  'ENCRYPTEDSTRING': QuestionTypes.None,
  'INTEGER': QuestionTypes.None,
  'LONG': QuestionTypes.None,
  'MULTIPICKLIST': QuestionTypes.None,
  'PERCENT': QuestionTypes.None,
  'PHONE': QuestionTypes.None,
  'PICKLIST': QuestionTypes.None,
  'TEXTAREA': QuestionTypes.None,
  'TIME': QuestionTypes.None,
  'URL': QuestionTypes.None,
  'REFERENCE': QuestionTypes.None,
  'STRING': QuestionTypes.None
}

export const types: FieldType[] = [
  {
    id: 1,
    active: false,
    name: "Picture Choice",
    type: QuestionTypes.PictureChoice,
    icon: "account",
    category: QuestionCategory.Input
  },
  {
    id: 2,
    active: true,
    name: "Multiple Choice",
    type: QuestionTypes.MultipleChoice,
    icon: "picklist_choice",
    category: QuestionCategory.Input
  },
  {
    id: 3,
    active: true,
    name: "Comment",
    type: QuestionTypes.Comment,
    icon: "answer_public",
    category: QuestionCategory.Input
  },
  {
    id: 4,
    active: true,
    name: "Dropdown",
    type: QuestionTypes.Dropdown,
    icon: 'multi_picklist',
    category: QuestionCategory.Input
  },
  {
    id: 5,
    active: true,
    name: "Slider",
    type: QuestionTypes.Slider,
    icon: "product_transfer",
    category: QuestionCategory.Input
  },
  {
    id: 6,
    active: true,
    name: "Date",
    type: QuestionTypes.Date,
    icon: "event",
    category: QuestionCategory.Input
  },
  {
    id: 7,
    active: true,
    name: "Email",
    type: QuestionTypes.Email,
    icon: "email",
    category: QuestionCategory.Input
  },
  {
    id: 8,
    active: true,
    name: "Number",
    type: QuestionTypes.Number,
    icon: "number_input",
    category: QuestionCategory.Input
  },
  {
    id: 9,
    active: true,
    name: "Lookup",
    type: QuestionTypes.Lookup,
    icon: "record_lookup",
    category: QuestionCategory.Input
  },
  {
    id: 10,
    active: true,
    name: "Record Group",
    type: QuestionTypes.RecordGroup,
    icon: "record_create",
    category: QuestionCategory.Input
  },
  {
    id: 11,
    active: false,
    name: "Image",
    type: QuestionTypes.Image,
    icon: "file",
    category: QuestionCategory.Display
  },
  {
    id: 12,
    active: true,
    name: "Checkbox",
    type: QuestionTypes.Checkbox,
    icon: "multi_select_checkbox",
    category: QuestionCategory.Input
  },
  {
    id: 13,
    active: true,
    name: "Attachments",
    type: QuestionTypes.Attachments,
    icon: "file",
    category: QuestionCategory.Input
  },
  {
    id: 14,
    active: true,
    name: "Input Field",
    type: QuestionTypes.InputField,
    icon: "textbox",
    category: QuestionCategory.Input
  },
  {
    id: 15,
    active: true,
    name: "Mobile Geo Location",
    type: QuestionTypes.GeoLocation,
    icon: "address",
    category: QuestionCategory.Input
  },
  {
    id: 16,
    active: true,
    name: "Photo",
    type: QuestionTypes.Photo,
    icon: "file",
    category: QuestionCategory.Input
  },
  {
    id: 17,
    active: true,
    name: "Free Text",
    type: QuestionTypes.FreeText,
    icon: "display_text",
    category: QuestionCategory.Display
  },
  {
    id: 18,
    active: true,
    name: "File",
    type: QuestionTypes.File,
    icon: "file",
    category: QuestionCategory.Guide
  },
];

export const sortedTypes = types
  .sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }

    if (a.name > b.name) {
      return 1;
    }
  })
  .filter((type) => type.active);

export type FieldMap = {
  field: string,
  required: boolean,
  type: string,
  reference: string | null
}
