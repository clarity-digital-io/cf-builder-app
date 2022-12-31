import { QuestionTypes } from "../types/fields";

export type FieldType = {
  id: number,
  active: boolean,
  name: string,
  type: QuestionTypes,
  icon: string
  quantity?: number
}

export const types: FieldType[] = [
  {
    id: 1,
    active: false,
    name: "Connected Object",
    type: QuestionTypes.ConnectedObject,
    icon: "account"
  },
  {
    id: 2,
    active: true,
    name: "Multiple Choice",
    type: QuestionTypes.MultipleChoice,
    icon: "picklist_choice"
  },
  {
    id: 3,
    active: true,
    name: "Comment",
    type: QuestionTypes.Comment,
    icon: "answer_public"
  },
  {
    id: 4,
    active: true,
    name: "Dropdown",
    type: QuestionTypes.Dropdown,
    icon: 'multi_picklist'
  },
  {
    id: 5,
    active: true,
    name: "Slider",
    type: QuestionTypes.Slider,
    icon: "product_transfer"
  },
  {
    id: 6,
    active: true,
    name: "Date",
    type: QuestionTypes.Date,
    icon: "event"
  },
  {
    id: 7,
    active: true,
    name: "Email",
    type: QuestionTypes.Email,
    icon: "email"
  },
  {
    id: 8,
    active: true,
    name: "Number",
    type: QuestionTypes.Number,
    icon: "number_input"
  },
  {
    id: 9,
    active: true,
    name: "Lookup",
    type: QuestionTypes.Lookup,
    icon: "record_lookup"
  },
  {
    id: 10,
    active: true,
    name: "Record Group",
    type: QuestionTypes.RecordGroup,
    icon: "record_create"
  },
  {
    id: 11,
    active: false,
    name: "Image",
    type: QuestionTypes.Image,
    icon: "photo"
  },
  {
    id: 12,
    active: true,
    name: "Checkbox",
    type: QuestionTypes.Checkbox,
    icon: "multi_select_checkbox"
  },
  {
    id: 13,
    active: true,
    name: "Attachments",
    type: QuestionTypes.Attachments,
    icon: "file"
  },
  {
    id: 14,
    active: true,
    name: "Free Text",
    type: QuestionTypes.FreeText,
    icon: "display_text"
  },
  {
    id: 15,
    active: true,
    name: "Input Field",
    type: QuestionTypes.InputField,
    icon: "textbox"
  },
  {
    id: 16,
    active: true,
    name: "Mobile Geo Location",
    type: QuestionTypes.GeoLocation,
    icon: "address"
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
