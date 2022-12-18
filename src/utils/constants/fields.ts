import { QuestionTypes } from "../types/fields";

enum IconTypes {
  picklist_type,

}

type FieldType = {
  id: number,
  active: boolean,
  name: string,
  type: string | QuestionTypes,
  icon?: IconTypes
}

export const types: FieldType[] = [
  {
    id: 1,
    active: false,
    name: "Connected Object",
    type: "ConnectedObject",
    icon: IconTypes.picklist_type
  },
  {
    id: 2,
    active: true,
    name: "Multiple Choice",
    type: "MultipleChoice",
    icon: IconTypes.picklist_type
  },
  {
    id: 3,
    active: true,
    name: "Comment",
    type: "Comment",
    icon: IconTypes.picklist_type
  },
  {
    id: 4,
    active: true,
    name: "Dropdown",
    type: "Dropdown",
    icon: IconTypes.picklist_type
  },
  {
    id: 5,
    active: true,
    name: "Slider",
    type: "Slider",
    icon: IconTypes.picklist_type
  },
  {
    id: 6,
    active: true,
    name: "Date",
    type: "Date",
    icon: IconTypes.picklist_type
  },
  {
    id: 7,
    active: true,
    name: "Email",
    type: "Email",
    icon: IconTypes.picklist_type
  },
  {
    id: 8,
    active: true,
    name: "Number",
    type: "Number",
    icon: IconTypes.picklist_type
  },
  {
    id: 9,
    active: true,
    name: "Lookup",
    type: "Lookup",
    icon: IconTypes.picklist_type
  },
  {
    id: 10,
    active: true,
    name: "Record Group",
    type: "RecordGroup",
    icon: IconTypes.picklist_type
  },
  {
    id: 11,
    active: false,
    name: "Image",
    type: "Image",
    icon: IconTypes.picklist_type
  },
  {
    id: 12,
    active: true,
    name: "Checkbox",
    type: "Checkbox",
    icon: IconTypes.picklist_type
  },
  {
    id: 13,
    active: true,
    name: "Attachments",
    type: "Attachments",
    icon: IconTypes.picklist_type
  },
  {
    id: 14,
    active: true,
    name: "Free Text",
    type: "FreeText",
    icon: IconTypes.picklist_type
  },
  {
    id: 15,
    active: true,
    name: "Input Field",
    type: "InputField",
    icon: IconTypes.picklist_type
  },
  {
    id: 16,
    active: true,
    name: "Mobile Geo Location",
    type: "GeoLocation",
    icon: IconTypes.picklist_type
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
