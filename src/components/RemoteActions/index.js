import LCC from 'lightning-container';
import { openNotificationWithIcon } from '../Elements/Notification';

export const call = (func, params, callback, status) => {

    process.env.NODE_ENV == 'development' ? mockCall(func.split('.')[1], params, callback, status) : prodCall(func, params, callback, status); 
    
}

const prodCall = (func, params, callback, status) => {
    
  	const managedPackageFunction = 'forms.' + func; 

    const handler = (result, e) => {

        if(e.statusCode != 200) {
            openNotificationWithIcon('error', e.method)
        } else {
            openNotificationWithIcon('success', e.method);
            callback(result, e);
        }

		}

		let extraParams = { buffer: false, escape: true, timeout: 3000 };
		
		console.log('managedPackageFunction', managedPackageFunction, params); 

    switch (params.length) {
        case 0:
            LCC.callApex(managedPackageFunction, handler, extraParams);
            break;
        case 1:
            LCC.callApex(managedPackageFunction, params[0], handler, extraParams);
            break;
        case 2:
            LCC.callApex(managedPackageFunction, params[0], params[1], handler, extraParams);
            break;
        case 3:
        case 4:
            LCC.callApex(managedPackageFunction, params, handler, extraParams);
            break;
        default:
            break;
    }

}

const mockCall = (func, params, callback, status) => {

    let date = new Date();
    let timestamp = date.getTime();

    switch (func) {
        case 'startup':
            callback({
                Id: 1, 
                Name: 'Clarity Form', 
                forms__Limit__c: 10, 
                forms__End_Date__c: '2019-12-31',
                forms__Connected_Object__c: 'Account',
                forms__Clarity_Form_Style__c: 15, 
                forms__Status__c: 'Draft', 
                forms__Clarity_Form_Assignment__c: 1,
                forms__Clarity_Form_Style__r: { Id: 15, Name:'Greens', forms__Background_Image__c: '', forms__Background_Color__c: '#FFF', forms__Color__c: '#333', forms__Button_Color__c: '', forms__Multi_Page__c: false }, 
                //Clarity_Form_Style__r: { Id: 15, Name:'Greens', Background_Image__c: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2565&q=80', Background_Color__c: '#333333', Color__c: '#FFFFFF', Button_Color__c: '', Multi_Page__c: false }, 
                forms__Clarity_Form_Assignment__r: { Id: 1, Name: 'Clarity Form Assignment', forms__Assign__c: 1, forms__Default_Assign__c: 2 } 
            }); 
            break;
        case 'updateForm':
            callback({ Id: 1, Name: 'Clarity Form Title', forms__End_Date__c: '2019-12-31', forms__Limit__c: 1000 })
            break;
        case 'getQuestions':
            callback([
								{ Id: 'CF-8.1', forms__Logic__c: 'AND', forms__Type__c: 'PictureChoice', forms__Title__c: 'Which of these describe your current emotion?', forms__Order__c: 0, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0 , 
									forms__Clarity_Form_Question_Options__r: [
											{ Id: 801, forms__Label__c: 'Option 1', forms__Clarity_Form_Question__c: 'CF-8.1', forms__Choice_Image__c: '' },
											{ Id: 802, forms__Label__c: 'Option 2', forms__Clarity_Form_Question__c: 'CF-8.1', forms__Choice_Image__c: '' },
											{ Id: 803, forms__Label__c: 'Option 3', forms__Clarity_Form_Question__c: 'CF-8.1', forms__Choice_Image__c: '' }
									]
								}, 
                { Id: 1, forms__Logic__c: 'AND', forms__Type__c: 'Checkbox', forms__Title__c: 'Checkbox', forms__Order__c: 0, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0 }, 
                { Id: 2, forms__Logic__c: 'AND', forms__Type__c: 'Comment', forms__Title__c: 'Comment', forms__Order__c: 1, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0 },
                { Id: 3, forms__Logic__c: 'OR', forms__Type__c: 'Date', forms__Title__c: 'Date', forms__Order__c: 2, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0, 
                    forms__Clarity_Form_Question_Criteria__r: [
                        { Id: 31, forms__Clarity_Form_Question__c: 3, forms__Field__c: 1, forms__Field_Type__c: 'Comment', forms__Operator__c: 'Is Not Null', forms__Type__c: 'Boolean', forms__Value__c: 'True'  },
                        { Id: 32, forms__Clarity_Form_Question__c: 3, forms__Field__c: 2, forms__Field_Type__c: 'Comment', forms__Operator__c: 'Is Not Null', forms__Type__c: 'Boolean', forms__Value__c: 'True'  },
                        { Id: 33, forms__Clarity_Form_Question__c: 3, forms__Field__c: 3, forms__Field_Type__c: 'Comment', forms__Operator__c: 'Is Not Null', forms__Type__c: 'Boolean', forms__Value__c: 'True'  }
                    ]
                },                
                { Id: 4, forms__Logic__c: 'AND', forms__Type__c: 'Dropdown', forms__Title__c: 'Dropdown', forms__Order__c: 3, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0, 
                    forms__Clarity_Form_Question_Options__r: [
                        { Id: 41, forms__Label__c: 'Dropdown 1', forms__Clarity_Form_Question__c: 4 },
                        { Id: 42, forms__Label__c: 'Dropdown 2', forms__Clarity_Form_Question__c: 4 },
                        { Id: 43, forms__Label__c: 'Dropdown 3', forms__Clarity_Form_Question__c: 4 }
                    ]
                }, 
                { Id: 5, forms__Logic__c: 'AND', forms__Type__c: 'Email', forms__Title__c: 'Email', forms__Order__c: 4, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0 }, 
                { Id: 6, forms__Logic__c: 'AND', forms__Type__c: 'Lookup', forms__Title__c: 'Lookup', forms__Lookup__c: 'Case', forms__Order__c: 5, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0 },
                { Id: 7, forms__Logic__c: 'AND', forms__Type__c: 'MultipleChoice', forms__Title__c: 'MultipleChoice', forms__Order__c: 6, forms__Max_Length__c: 10, Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0, 
                forms__Clarity_Form_Question_Options__r: [
                        { Id: 71, forms__Label__c: 'MultipleChoice 1', forms__Clarity_Form_Question__c: 7 },
                        { Id: 72, forms__Label__c: 'MultipleChoice 2', forms__Clarity_Form_Question__c: 7 },
                        { Id: 73, forms__Label__c: 'MultipleChoice 3', forms__Clarity_Form_Question__c: 7 }
                    ]
                }, 
                { Id: 8, forms__Logic__c: 'AND', forms__Type__c: 'NetPromoterScore', forms__Title__c: 'NetPromoterScore', forms__Order__c: 7, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0 }, 
                { Id: 9, forms__Logic__c: 'AND', forms__Type__c: 'Number', forms__Title__c: 'Number', forms__Order__c: 8, forms__Page__c: 0 },
								{ Id: 11, forms__Logic__c: 'AND', forms__Type__c: 'RecordGroup', forms__Title__c: 'Create Opportunity Line Items', forms__Salesforce_Object__c: 'OpportunityLineItem', forms__Order__c: 10, forms__Page__c: 0 }, 
                { Id: 12, forms__Logic__c: 'AND', forms__Type__c: 'REFERENCE', forms__Title__c: 'Add an account:', forms__Salesforce_Field__c: 'OpportunityId', forms__Record_Group__c: 11, forms__Order__c: 11, forms__Page__c: 0 },
                { Id: 13, forms__Logic__c: 'AND', forms__Type__c: 'Slider', forms__Title__c: 'Slider', forms__Order__c: 12, forms__Max_Length__c: 10, forms__Min_Range__c: 0, forms__Max_Range__c: 100, forms__Step__c: 10, forms__Page__c: 0 }, 
                { Id: 14, forms__Logic__c: 'AND', forms__Type__c: 'PICKLIST', forms__Title__c: 'Type', forms__Salesforce_Field__c: 'Type', forms__Record_Group__c: 11, forms__Order__c: 2, forms__Page__c: 0 }
            ]); 
            break;
        case 'save': 
            callback([timestamp]);
            break;
        case 'saveQuestionWithOptions': 
            callback({
                'Question': [{ Id: 1, Type__c: 'Checkbox', Title__c: 'Checkbox', Order__c: 0  }], 
                'Options': [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 2}]
            });
            break;
        case 'saveQuestion':
            callback(2);
            break;
        case 'deleteQuestion':
            callback([{ Id: 2, Type__c: 'Comment', Title__c: 'Comment', Order__c: 0 }]);
            break;
        case 'getQuestionEditDetails':
            callback({
                'Criteria': [{Id: 31, forms__Clarity_Form_Question__c: 2, forms__Field__c: 2, forms__Field_Type__c: 'Comment', forms__Operator__c: 'Is Not Null', forms__Type__c: 'Boolean', forms__Value__c: 'True' }],
                'Options' : [{ Id: 31, forms__Label__c: 'Pickture Option 1', forms__Active_Flow__c: true, forms__Clarity_Form_Question__c: 2, forms__Choice_Image__c: 'https://images.unsplash.com/photo-1562743338-51caec0b0e65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80'},{ Id: 32, forms__Label__c: 'Pickture Option 2', forms__Active_Flow__c: false, forms__Clarity_Form_Question__c: 2, forms__Choice_Image__c: 'https://images.unsplash.com/photo-1562743338-51caec0b0e65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80'}],
                'FlowDesign': [{ Id: 31, forms__Clarity_Form_Question__c: 123, forms__Form_Submission__c: true, forms__Active__c: false }]
            });
            break;
        case 'getQuestionOptions':
            callback([{ Id: 31, forms__Label__c: 'Option 1', forms__Active_Flow__c: true, forms__Clarity_Form_Question__c: 1, forms__Choice_Image__c: 'https://images.unsplash.com/photo-1562743338-51caec0b0e65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80'},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 1, forms__Choice_Image__c: 'https://images.unsplash.com/photo-1562743338-51caec0b0e65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1955&q=80'}]);
            break; 
        case 'pageDelete': 
            callback([
                { Id: 1, Logic__c: 'AND', Type__c: 'Comment', Title__c: 'Comment', Order__c: 1, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 0 }, 
                { Id: 5, Logic__c: 'OR', Type__c: 'Date', Title__c: 'Date', Order__c: 5, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 0, 
                forms__Clarity_Form_Question_Criteria__r: [
                        { Id: 1, forms__Clarity_Form_Question__c: 5, forms__Field__c: 1, forms__Field_Type__c: 'Comment', forms__Operator__c: 'Is Not Null', forms__Type__c: 'Boolean', forms__Value__c: 'True'  },
                        { Id: 2, forms__Clarity_Form_Question__c: 5, forms__Field__c: 2, forms__Field_Type__c: 'Comment', forms__Operator__c: 'Is Not Null', forms__Type__c: 'Boolean', forms__Value__c: 'True'  },
                        { Id: 3, forms__Clarity_Form_Question__c: 5, forms__Field__c: 3, forms__Field_Type__c: 'Comment', forms__Operator__c: 'Is Not Null', forms__Type__c: 'Boolean', forms__Value__c: 'True'  }
                    ]
                },
                { Id: 6, Logic__c: 'AND', Type__c: 'Lookup', Title__c: 'Add a Related Case:', Lookup__c: 'Case', Order__c: 6, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 0 },
                { Id: 7, Logic__c: 'AND', Type__c: 'RecordGroup', Title__c: 'Create Opportunity Line Items', Salesforce_Object__c: 'OpportunityLineItem', Order__c: 7, Page__c: 2 }, 
                { Id: 8, Logic__c: 'AND', Type__c: 'REFERENCE', Title__c: 'Add an account:', Salesforce_Field__c: 'OpportunityId', Record_Group__c: 7, Order__c: 0, Page__c: 0 },
                { Id: 9, Logic__c: 'AND', Type__c: 'Number', Title__c: 'Add the quantity:', Salesforce_Field__c: 'Quantity', Record_Group__c: 7, Order__c: 1, Page__c: 0 }
            ]); 
            break; 
        case 'saveFlowDesign':
            callback({
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: true, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'saveQuestionWithCriteria':
            callback({
                'Question' : [{ Id: 1, Type__c: 'RecordGroup', Title__c: 'RecordGroup', Order__c: 0, Logic__c: 'OR'  }],
                'Criteria': [{Id: 31, Clarity_Form_Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True' }]
            });
            break;
        case 'getSObjectsAvailable': 
            callback(['Account', 'Case', 'Contact', 'Opportunity', 'AccountRole', 'OpportunityLineItem', 'Service_Request__c']);
            break; 
        case 'getSObjectFields': 
            callback({ Required: {'OwnerId': { 'REFERENCE' : 'User' }, 'Name': { 'Text' : null } }, NotRequired: {'OpportunityId': { 'REFERENCE' : 'Opportunity' }, 'UnitPrice': { 'Currency' : null }, 'Product2Id': { 'REFERENCE' : 'Product2' }, 'Quantity': { 'Number' : null } }});
            break; 
        case 'getUsers':
            callback([{Id: 1, Name: 'Test User1', UserName: 'User1'}, {Id: 2, Name: 'Test User2', UserName: 'User2'}]);
            break; 
        case 'createAssignment':
            callback({Id: 1, Name: 'Clarity Form Assignment', Assign__c: 1, Default_Assign__c: 2 });
            break; 
        case 'getAssignmentRules': 
            callback([{ Id: 1, Clarity_Form_Assignment__c: 1, Field__c: 1, Field_Type__c: 'Checkbox', Operator__c: 'Equals', Type__c: 'Picklist', Value__c: 'Option 1' }]);
            break; 
        case 'saveAssignmentRules':
            callback([]);
            break; 
        case 'updateDesign':
            callback([{ Background_Color__c: '#FFF', Color: '#333', Button_Color__c: '#333', Multi_Page__c: false }]);
            break; 
        case 'saveRecordGroupFields':
            callback([
                { Id: 8, Logic__c: 'AND', Type__c: 'REFERENCE', Title__c: 'Add an account:', Salesforce_Field__c: 'OpportunityId', Record_Group__c: 7, Order__c: 0, Page__c: 0 },
                { Id: 9, Logic__c: 'AND', Type__c: 'Number', Title__c: 'Add the quantity:', Salesforce_Field__c: 'Quantity', Record_Group__c: 7, Order__c: 1, Page__c: 0 },
                { Id: 10, Logic__c: 'AND', Type__c: 'REFERENCE', Title__c: '', Salesforce_Field__c: 'Product2Id', Record_Group__c: 7, Order__c: 2, Page__c: 0 }
            ]);
            break; 
        case 'getConnections':
            callback([
                { Id: 12, Clarity_Form__c: 1, Salesforce_Object__c: 'Case', Type__c: 'Create', Active__c: true, Order__c: 0, Result_Holder: '{Connection_Case}' },
                { Id: 13, Clarity_Form__c: 1, Salesforce_Object__c: 'Service_Request__c', Type__c: 'Create', Active__c: true, Order__c: 1, Result_Holder: '{Connection_Service_Request__c}' }
            ]);
            break; 
        case 'getConnectionFieldMapping': 
            callback({
                'Mapping': [{ Id: 16, Clarity_Form_Connection__c: 12, Salesforce_Field__c: 'Subject', Custom_Value__c: 'This is from Clarity Form' }],
                'Prefills': [{ Id: 15, Clarity_Form_Connection__c: 12, Salesforce_Field__c: 'AccountId', Clarity_Form_Question__c: 2, PreFill__c: true }],
                'Fields' : ['AccountId', 'Subject', 'OwnerId']            
            });
            break;
        case 'saveActiveFieldConnections':
            callback([{ Id: 14, Clarity_Form_Connection__c: 12, Salesforce_Field__c: 'Subject', Clarity_Form_Question__c: 1 }, { Id: 15, Clarity_Form_Connection__c: 12, Salesforce_Field__c: 'AccountId', Clarity_Form_Question__c: 3 }, { Id: 16, Clarity_Form_Connection__c: 12, Salesforce_Field__c: 'OwnerId', Clarity_Form_Question__c: 4 }]);
            break; 
        case 'saveConnections': 
            callback([
                { Id: 12, Clarity_Form__c: 1, Salesforce_Object__c: 'Case', Type__c: 'Create', Active__c: true },
                { Id: 13, Clarity_Form__c: 1, Salesforce_Object__c: 'Service_Request__c', Type__c: 'Create', Active__c: true },
                { Id: 14, Clarity_Form__c: 1, Salesforce_Object__c: 'Account', Type__c: 'Create', Active__c: true }
            ]);
            break;
        case 'getDesigns': 
            callback([
                { Name: 'Dark', Id: 15, Background_Color__c: '#333333', Color__c: '#FFFFFF', Button_Color__c: '#FFFFFF', Background_Image__c: '', Multi_Page__c: true },
                { Name: 'Light', Id: 16, Background_Color__c: '#FFFFFF', Color__c: '#333333', Button_Color__c: '#FFFFFF', Background_Image__c: '', Multi_Page__c: true },
                { Name: 'Forest', Id: 17, Background_Color__c: '#F1F1F1', Color__c: '#FFFFFF', Button_Color__c: '#FFFFFF', Background_Image__c: 'https://images.unsplash.com/photo-1525577288853-c6f0a020a162?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', Multi_Page__c: true },
                { Name: 'Palm Trees', Id: 18, Background_Color__c: '#F1F1F1', Color__c: '#FFFFFF', Button_Color__c: '#FFFFFF', Background_Image__c: 'https://images.unsplash.com/photo-1517267075966-848c4c4cd883?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80', Multi_Page__c: true },
                { Name: 'Spring', Id: 19, Background_Color__c: '#F1F1F1', Color__c: '#FFFFFF', Button_Color__c: '#FFFFFF', Background_Image__c: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2565&q=80', Multi_Page__c: true }
            ])
            break; 
        case 'updateStatus':
            callback({ Status: 'Success', Form: { Id: 1, Status__c: 'Success' } })
            break;
        default:
            break;
    }
}
