import React from "react";
import {
  GeoLocationDarkIcon,
  MessageDetail1DarkIcon,
  RecordGroup2DarkIcon,
  Images2DarkIcon,
  DownArrowOutlineDarkIcon,
  CalculatorDarkIcon,
  PaperClipDarkIcon,
  TextDarkIcon,
  CheckboxCheckedDarkIcon,
  RecordGroup1DarkIcon,
  LookupDarkIcon,
  EmailDarkIcon,
  CalendarDarkIcon,
  SliderDarkIcon,
  SelectMultipleDarkIcon,
  InputDarkIcon,
} from "../../../Elements/Icons";

export const getType = (type) => {
  switch (type) {
    case "GeoLocation":
      return <GeoLocationDarkIcon />;
      break;
    case "MultipleChoice":
      return <SelectMultipleDarkIcon />;
      break;
    case "Comment":
    case "InputField":
      return <MessageDetail1DarkIcon />;
      break;
    case "Dropdown":
      return <DownArrowOutlineDarkIcon />;
      break;
    case "Slider":
      return <SliderDarkIcon />;
      break;
    case "Date":
      return <CalendarDarkIcon />;
      break;
    case "Email":
      return <EmailDarkIcon />;
      break;
    case "Number":
      return <CalculatorDarkIcon />;
      break;
    case "Lookup":
      return <LookupDarkIcon />;
      break;
    case "RecordGroup":
      return <RecordGroup2DarkIcon />;
      break;
    case "Image":
      return <ImageAlt1DarkIcon />;
      break;
    case "Checkbox":
      return <CheckboxCheckedDarkIcon />;
      break;
    case "Attachments":
      return <PaperClipDarkIcon />;
      break;
    case "FreeText":
      return <TextDarkIcon />;
      break;
  }
};
