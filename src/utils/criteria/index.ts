import { QuestionTypes } from "../types/fields";

// question criteria operator
export enum OperatorTypes {
  EMPTY = '',
  EQUALS = 'Equals',
  GREATER_THAN = 'Greater Than',
  LESS_THAN = 'Less Than',
  GREATER_THAN_OR_EQUAL = 'Grater Than or Equal',
  LESS_THAN_OR_EQUAL = 'Less Than or Equal',
  IS_NOT = 'Is Not',
  IS_NOT_NULL = 'Is Not Null',
  NOT_EQUAL = 'Not Equal',
  CONTAINS = 'Contains'
}

export enum ValueTypes {
  None,
  InputText,
  InputNumber,
  Picklist,
  InputDate
}

export enum FilterLogicTypes {
  All = 'All filters are true',
  Any = 'Any filters are true',
  Custom = 'The filter logic is met'
}

// @dev important to maintain this list 
// make a type out of this that can maintain operation and value fields in order
type QuestionTypeOperator = {
  [QuestionTypes.None]: [OperatorTypes.EMPTY],
  [QuestionTypes.MultipleChoice]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.Comment]: [OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.Dropdown]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.Slider]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.GREATER_THAN, OperatorTypes.GREATER_THAN_OR_EQUAL, OperatorTypes.LESS_THAN, OperatorTypes.LESS_THAN_OR_EQUAL],
  [QuestionTypes.Date]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.GREATER_THAN, OperatorTypes.GREATER_THAN_OR_EQUAL, OperatorTypes.LESS_THAN, OperatorTypes.LESS_THAN_OR_EQUAL],
  [QuestionTypes.Email]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL, OperatorTypes.CONTAINS],
  [QuestionTypes.Number]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.GREATER_THAN, OperatorTypes.GREATER_THAN_OR_EQUAL, OperatorTypes.LESS_THAN, OperatorTypes.LESS_THAN_OR_EQUAL],
  [QuestionTypes.Lookup]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.RecordGroup]: [OperatorTypes.EMPTY],
  [QuestionTypes.Image]: [OperatorTypes.EMPTY],
  [QuestionTypes.Checkbox]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.FreeText]: [OperatorTypes.EMPTY],
  [QuestionTypes.PictureChoice]: [OperatorTypes.EMPTY],
  [QuestionTypes.InputField]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL, OperatorTypes.CONTAINS],
  [QuestionTypes.GeoLocation]: [OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.Attachments]: [OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.BOOLEAN]: [OperatorTypes.EMPTY],
  [QuestionTypes.DATETIME]: [OperatorTypes.EMPTY],
  [QuestionTypes.CURRENCY]: [OperatorTypes.EMPTY],
  [QuestionTypes.COMBOBOX]: [OperatorTypes.EMPTY],
  [QuestionTypes.ADDRESS]: [OperatorTypes.EMPTY],
  [QuestionTypes.ANYTTYPE]: [OperatorTypes.EMPTY],
  [QuestionTypes.BASE64]: [OperatorTypes.EMPTY],
  [QuestionTypes.DOUBLE]: [OperatorTypes.EMPTY],
  [QuestionTypes.ENCRYPTEDSTRING]: [OperatorTypes.EMPTY],
  [QuestionTypes.INTEGER]: [OperatorTypes.EMPTY],
  [QuestionTypes.LONG]: [OperatorTypes.EMPTY],
  [QuestionTypes.MULTIPICKLIST]: [OperatorTypes.EMPTY],
  [QuestionTypes.PERCENT]: [OperatorTypes.EMPTY],
  [QuestionTypes.PHONE]: [OperatorTypes.EMPTY],
  [QuestionTypes.PICKLIST]: [OperatorTypes.EMPTY],
  [QuestionTypes.TEXTAREA]: [OperatorTypes.EMPTY],
  [QuestionTypes.TIME]: [OperatorTypes.EMPTY],
  [QuestionTypes.URL]: [OperatorTypes.EMPTY],
  [QuestionTypes.REFERENCE]: [OperatorTypes.EMPTY],
  [QuestionTypes.STRING]: [OperatorTypes.EMPTY]
};

type OperationTypeValue = {
  [OperatorTypes.EMPTY]?: ValueTypes,
  [OperatorTypes.EQUALS]?: ValueTypes,
  [OperatorTypes.GREATER_THAN]?: ValueTypes,
  [OperatorTypes.LESS_THAN]?: ValueTypes,
  [OperatorTypes.GREATER_THAN_OR_EQUAL]?: ValueTypes,
  [OperatorTypes.LESS_THAN_OR_EQUAL]?: ValueTypes,
  [OperatorTypes.IS_NOT]?: ValueTypes,
  [OperatorTypes.IS_NOT_NULL]?: ValueTypes,
  [OperatorTypes.NOT_EQUAL]?: ValueTypes,
  [OperatorTypes.CONTAINS]?: ValueTypes
};

export const QuestionTypeOperators: QuestionTypeOperator = {
  [QuestionTypes.None]: [OperatorTypes.EMPTY],
  [QuestionTypes.MultipleChoice]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.Comment]: [OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.Dropdown]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.Slider]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.GREATER_THAN, OperatorTypes.GREATER_THAN_OR_EQUAL, OperatorTypes.LESS_THAN, OperatorTypes.LESS_THAN_OR_EQUAL],
  [QuestionTypes.Date]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.GREATER_THAN, OperatorTypes.GREATER_THAN_OR_EQUAL, OperatorTypes.LESS_THAN, OperatorTypes.LESS_THAN_OR_EQUAL],
  [QuestionTypes.Email]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL, OperatorTypes.CONTAINS],
  [QuestionTypes.Number]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.GREATER_THAN, OperatorTypes.GREATER_THAN_OR_EQUAL, OperatorTypes.LESS_THAN, OperatorTypes.LESS_THAN_OR_EQUAL],
  [QuestionTypes.Lookup]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.RecordGroup]: [OperatorTypes.EMPTY],
  [QuestionTypes.Image]: [OperatorTypes.EMPTY],
  [QuestionTypes.Checkbox]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.FreeText]: [OperatorTypes.EMPTY],
  [QuestionTypes.PictureChoice]: [OperatorTypes.EMPTY],
  [QuestionTypes.InputField]: [OperatorTypes.EQUALS, OperatorTypes.NOT_EQUAL, OperatorTypes.IS_NOT_NULL, OperatorTypes.CONTAINS],
  [QuestionTypes.GeoLocation]: [OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.Attachments]: [OperatorTypes.IS_NOT_NULL],
  [QuestionTypes.BOOLEAN]: [OperatorTypes.EMPTY],
  [QuestionTypes.DATETIME]: [OperatorTypes.EMPTY],
  [QuestionTypes.CURRENCY]: [OperatorTypes.EMPTY],
  [QuestionTypes.COMBOBOX]: [OperatorTypes.EMPTY],
  [QuestionTypes.ADDRESS]: [OperatorTypes.EMPTY],
  [QuestionTypes.ANYTTYPE]: [OperatorTypes.EMPTY],
  [QuestionTypes.BASE64]: [OperatorTypes.EMPTY],
  [QuestionTypes.DOUBLE]: [OperatorTypes.EMPTY],
  [QuestionTypes.ENCRYPTEDSTRING]: [OperatorTypes.EMPTY],
  [QuestionTypes.INTEGER]: [OperatorTypes.EMPTY],
  [QuestionTypes.LONG]: [OperatorTypes.EMPTY],
  [QuestionTypes.MULTIPICKLIST]: [OperatorTypes.EMPTY],
  [QuestionTypes.PERCENT]: [OperatorTypes.EMPTY],
  [QuestionTypes.PHONE]: [OperatorTypes.EMPTY],
  [QuestionTypes.PICKLIST]: [OperatorTypes.EMPTY],
  [QuestionTypes.TEXTAREA]: [OperatorTypes.EMPTY],
  [QuestionTypes.TIME]: [OperatorTypes.EMPTY],
  [QuestionTypes.URL]: [OperatorTypes.EMPTY],
  [QuestionTypes.REFERENCE]: [OperatorTypes.EMPTY],
  [QuestionTypes.STRING]: [OperatorTypes.EMPTY]
}

type QuestionOperationTypeValue = {
  [key in QuestionTypes]: OperationTypeValue
}

export const QuestionOperatorTypeValues: QuestionOperationTypeValue = {
  [QuestionTypes.None]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.MultipleChoice]: {
    [OperatorTypes.EQUALS]: ValueTypes.Picklist, // picklist field shown 
    [OperatorTypes.NOT_EQUAL]: ValueTypes.Picklist,
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None, // no field shown
  },
  [QuestionTypes.Comment]: {
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None
  },
  [QuestionTypes.Dropdown]: {
    [OperatorTypes.EQUALS]: ValueTypes.Picklist, // picklist field shown 
    [OperatorTypes.NOT_EQUAL]: ValueTypes.Picklist,
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None, // no field shown
  },
  [QuestionTypes.Slider]: {
    [OperatorTypes.EQUALS]: ValueTypes.InputNumber,
    [OperatorTypes.NOT_EQUAL]: ValueTypes.InputNumber,
    [OperatorTypes.GREATER_THAN]: ValueTypes.InputNumber,
    [OperatorTypes.GREATER_THAN_OR_EQUAL]: ValueTypes.InputNumber,
    [OperatorTypes.LESS_THAN]: ValueTypes.InputNumber,
    [OperatorTypes.LESS_THAN_OR_EQUAL]: ValueTypes.InputNumber
  },
  [QuestionTypes.Date]: {
    [OperatorTypes.EQUALS]: ValueTypes.InputDate,
    [OperatorTypes.NOT_EQUAL]: ValueTypes.InputDate,
    [OperatorTypes.GREATER_THAN]: ValueTypes.InputDate,
    [OperatorTypes.GREATER_THAN_OR_EQUAL]: ValueTypes.InputDate,
    [OperatorTypes.LESS_THAN]: ValueTypes.InputDate,
    [OperatorTypes.LESS_THAN_OR_EQUAL]: ValueTypes.InputDate
  },
  [QuestionTypes.Email]: {
    [OperatorTypes.EQUALS]: ValueTypes.InputText,
    [OperatorTypes.NOT_EQUAL]: ValueTypes.InputText,
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None,
    [OperatorTypes.CONTAINS]: ValueTypes.InputText
  },
  [QuestionTypes.Number]: {
    [OperatorTypes.EQUALS]: ValueTypes.InputNumber,
    [OperatorTypes.NOT_EQUAL]: ValueTypes.InputNumber,
    [OperatorTypes.GREATER_THAN]: ValueTypes.InputNumber,
    [OperatorTypes.GREATER_THAN_OR_EQUAL]: ValueTypes.InputNumber,
    [OperatorTypes.LESS_THAN]: ValueTypes.InputNumber,
    [OperatorTypes.LESS_THAN_OR_EQUAL]: ValueTypes.InputNumber
  },
  [QuestionTypes.Lookup]: {
    [OperatorTypes.EQUALS]: ValueTypes.InputText,
    [OperatorTypes.NOT_EQUAL]: ValueTypes.InputText,
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None,
  },
  [QuestionTypes.RecordGroup]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.Image]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.Checkbox]: {
    [OperatorTypes.EQUALS]: ValueTypes.Picklist, // picklist field shown 
    [OperatorTypes.NOT_EQUAL]: ValueTypes.Picklist,
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None, // no field shown
  },
  [QuestionTypes.FreeText]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.PictureChoice]: {
    [OperatorTypes.EQUALS]: ValueTypes.Picklist, // picklist field shown 
    [OperatorTypes.NOT_EQUAL]: ValueTypes.Picklist,
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None, // no field shown
  },
  [QuestionTypes.InputField]: {
    [OperatorTypes.EQUALS]: ValueTypes.InputText,
    [OperatorTypes.NOT_EQUAL]: ValueTypes.InputText,
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None,
    [OperatorTypes.CONTAINS]: ValueTypes.InputText
  },
  [QuestionTypes.GeoLocation]: {
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None
  },
  [QuestionTypes.Attachments]: {
    [OperatorTypes.IS_NOT_NULL]: ValueTypes.None
  },
  [QuestionTypes.BOOLEAN]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.DATETIME]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.CURRENCY]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.COMBOBOX]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.ADDRESS]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.ANYTTYPE]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.BASE64]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.DOUBLE]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.ENCRYPTEDSTRING]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.INTEGER]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.LONG]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.MULTIPICKLIST]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.PERCENT]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.PHONE]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.PICKLIST]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.TEXTAREA]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.TIME]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.URL]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.REFERENCE]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  },
  [QuestionTypes.STRING]: {
    [OperatorTypes.EMPTY]: ValueTypes.None
  }
}

export const validOperatorsForTypes = (questionType: QuestionTypes): OperatorTypes[] => {
  if (questionType === QuestionTypes.None) {
    return [];
  }
  return QuestionTypeOperators[questionType];
}

export const validValueForOperatorTypes = (questionType: QuestionTypes, operatorType: OperatorTypes): ValueTypes => {
  if (questionType === QuestionTypes.None) {
    return ValueTypes.None;
  }

  return QuestionOperatorTypeValues[questionType][operatorType] || ValueTypes.None;
}