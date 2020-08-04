import React from 'react';
import { InputField, FreeText, Attachments, Checkbox, Comment, ConnectedObject, Date, Dropdown, Email, Image, Lookup, MultipleChoice, Number, RecordGroup, Slider } from '../../../Elements/Field';

export const getType = (question) => {
    switch (question.forms__Type__c) {
        case 'ConnectedObject':
            return <ConnectedObject question={question} />
						break;
        case 'MultipleChoice':
            return <MultipleChoice question={question} />
            break;
        case 'Comment':
            return <Comment question={question} />
            break;
        case 'Dropdown':
        case 'PICKLIST':
            return <Dropdown question={question} />
            break;
        case 'Slider':
            return <Slider question={question} />
            break;
        case 'Date':
            return <Date question={question} />
            break;
        case 'Email':
            return <Email question={question} />
            break;
        case 'Number':
            return <Number question={question} />
            break;
        case 'Lookup':
        case 'REFERENCE':
            return <Lookup question={question} />
            break;
        case 'RecordGroup':
            return <RecordGroup question={question} />
            break;
        case 'Image':
            return <Image question={question} />
            break;
        case 'Checkbox':
            return <Checkbox question={question} />
            break;
        case 'Attachments':
            return <Attachments question={question} />
            break;
        case 'FreeText':
            return <FreeText question={question} />
        case 'InputField':
        case 'STRING':
            return <InputField question={question} />
						break;
				case 'GeoLocation':
						return <InputField question={question} />
						break;
    }

}
