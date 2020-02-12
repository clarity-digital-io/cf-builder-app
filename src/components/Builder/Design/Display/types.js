import React from 'react';
import { InputField, FreeText, Attachments, Checkbox, Comment, ConnectedObject, Date, Dropdown, Email, Image, Lookup, MultipleChoice, NetPromoterScore, Number, Ranking, RecordGroup, Slider, PictureChoice } from '../../../Elements/Field';

export const getType = (question) => {
		console.log('question.forms__Type__c', question.forms__Type__c); 
    switch (question.forms__Type__c) {
        case 'ConnectedObject':
            return <ConnectedObject question={question} />
						break;
				case 'PictureChoice':
						return <PictureChoice question={question} />
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
        case 'Ranking':
            return <Ranking question={question} />
            break;
        case 'NetPromoterScore':
            return <NetPromoterScore question={question} />
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
    }

}
