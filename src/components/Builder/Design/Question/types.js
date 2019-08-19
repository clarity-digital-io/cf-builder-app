import React from 'react';
import { MessageDetail1DarkIcon, RecordGroup2DarkIcon, Images2DarkIcon, DownArrowOutlineDarkIcon, CalculatorDarkIcon, PaperClipDarkIcon, NetPromoterScoreDarkIcon, TextDarkIcon, CheckboxCheckedDarkIcon, RecordGroup1DarkIcon, LookupDarkIcon, EmailDarkIcon, CalendarDarkIcon, SliderDarkIcon, SelectMultipleDarkIcon, InputDarkIcon } from '../../../Elements/Icons';

export const getType = (type) => {

    switch (type) {
        case 'MultipleChoice':
            return <SelectMultipleDarkIcon />
            break;
        case 'Comment':
            return <MessageDetail1DarkIcon />
            break;
        case 'Dropdown':
            return <DownArrowOutlineDarkIcon />
            break;
        case 'NetPromoterScore':
            return <NetPromoterScoreDarkIcon />
            break;
        case 'Slider':
            return <SliderDarkIcon />
            break;
        case 'Date':
            return <CalendarDarkIcon />
            break;
        case 'Email':
            return <EmailDarkIcon />
            break;
        case 'Number':
            return <CalculatorDarkIcon />
            break;
        case 'Lookup':
            return <LookupDarkIcon />
            break;
        case 'RecordGroup':
            return <RecordGroup2DarkIcon />
            break;
        case 'Image':
            return <ImageAlt1DarkIcon />
            break;
        case 'Checkbox':
            return <CheckboxCheckedDarkIcon />
            break;
        case 'Attachments':
            return <PaperClipDarkIcon />
            break;
        case 'FreeText':
            return <TextDarkIcon />
            break;
        case 'PictureChoice':
            return <Images2DarkIcon/>
            break;
        case 'Rating':
            return <StarDarkIcon/>
            break;
        case 'Input':
            return <InputDarkIcon/>
            break;
    }

}
