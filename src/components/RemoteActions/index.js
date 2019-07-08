import LCC from 'lightning-container';

export const call = (func, params, callback) => {

    process.env.NODE_ENV == 'development' ? mockCall(func.split('.')[1], params, callback) : prodCall(func, params, callback); 
    
}

const prodCall = (func, params, callback) => {
    
    switch (params.length) {
        case 0:
            LCC.callApex(func, callback, { escape: true });
            break;
        case 1:
            LCC.callApex(func, params[0], callback, { escape: true });
            break;
        case 2:
            LCC.callApex(func, params[0], params[1], callback, { escape: true });
            break;
        default:
            break;
    }

}

const mockCall = (func, params, callback) => {

    let date = new Date();
    let timestamp = date.getTime();

    switch (func) {
        case 'startup':
            callback({
                Id: 1, 
                Name: 'Clarity Form', 
                Limit__c: 10, 
                End_Date__c: null,
                Connected_Object__c: 'Account',
                Clarity_Form_Style__c: 1, 
                Clarity_Form_Assignment__c: 1,
                Clarity_Form_Style__r: { Background_Color__c: '#333333', Color__c: '#FFFFFF', Button_Color__c: '', Multi_Page__c: true }, 
                Clarity_Form_Assignment__r: { Id: 1, Name: 'Clarity Form Assignment', Assign__c: 1, Default_Assign__c: 2 } 
            }); 
            break;
        case 'updateForm':
            callback({ Id: 1, Name: 'Clarity Form Title', End_Date__c: null, Limit__c: 1000 })
            break;
        case 'getQuestions':
            callback([
                { Id: 1, Logic__c: 'AND', Type__c: 'Comment', Title__c: 'Comment', Order__c: 1, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 0 }, 
                { Id: 2, Logic__c: 'AND', Type__c: 'Comment', Title__c: 'Comment', Order__c: 2, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 1 },
                { Id: 3, Logic__c: 'AND', Type__c: 'Dropdown', Title__c: 'Dropdown', Order__c: 3, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 1, 
                    Clarity_Form_Question_Options__r: [
                        { Id: 1, Label__c: 'Option 1', Clarity_Form_Question__c: 1 },
                        { Id: 2, Label__c: 'Option 2', Clarity_Form_Question__c: 1 },
                        { Id: 3, Label__c: 'Option 3', Clarity_Form_Question__c: 1 }
                    ]
                }, 
                { Id: 4, Logic__c: 'AND', Type__c: 'Lookup', Title__c: 'Add a Related Account:', Lookup__c: 'Account', Order__c: 4, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 1 }, 
                { Id: 5, Logic__c: 'OR', Type__c: 'Date', Title__c: 'Date', Order__c: 5, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 0, 
                    Clarity_Form_Question_Criteria__r: [
                        { Id: 1, Clarity_Form_Question__c: 5, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True'  },
                        { Id: 2, Clarity_Form_Question__c: 5, Field__c: 2, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True'  },
                        { Id: 3, Clarity_Form_Question__c: 5, Field__c: 3, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True'  }
                    ]
                },
                { Id: 6, Logic__c: 'AND', Type__c: 'Lookup', Title__c: 'Add a Related Case:', Lookup__c: 'Case', Order__c: 6, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10, Page__c: 0 },
                { Id: 7, Logic__c: 'AND', Type__c: 'RecordGroup', Title__c: 'Create Opportunity Line Items', Salesforce_Object__c: 'OpportunityLineItem', Order__c: 7, Page__c: 2 }, 
                { Id: 8, Logic__c: 'AND', Type__c: 'REFERENCE', Title__c: 'Add an account:', Salesforce_Field__c: 'OpportunityId', Record_Group__c: 7, Order__c: 0, Page__c: 0 },
                { Id: 9, Logic__c: 'AND', Type__c: 'Number', Title__c: 'Add the quantity:', Salesforce_Field__c: 'Quantity', Record_Group__c: 7, Order__c: 1, Page__c: 0 }
            ]); 
            break;
        case 'save': 
            callback([timestamp]);
            break;
        case 'saveQuestionWithOptions': 
            callback({
                'Question': [{ Id: 1, Type__c: 'Comment', Title__c: 'Comment', Order__c: 0  }], 
                'Options': [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 2}]
            });
            break;
        case 'saveQuestion':
            callback(2);
            break;
        case 'deleteQuestion':
            callback([{ Id: 1, Type__c: 'Comment', Title__c: 'Comment', Order__c: 0 }]);
            break;
        case 'getQuestionEditDetails':
            callback({
                'Criteria': [{Id: 31, Clarity_Form_Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True' }],
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'getQuestionOptions':
            callback([{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 1},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 1}]);
            break; 
        case 'saveFlowDesign':
            callback({
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: true, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'savQuestionWithCriteria':
            callback({
                'Question' : [{ Id: 1, Type__c: 'RecordGroup', Title__c: 'RecordGroup', Order__c: 0, Logic__c: 'OR'  }],
                'Criteria': [{Id: 31, Clarity_Form_Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True' }]
            });
            break;
        case 'getSObjectsAvailable': 
            callback(['Account', 'Case', 'Contact', 'Opportunity', 'AccountRole', 'OpportunityLineItem', 'Service_Request__c']);
            break; 
        case 'getSObjectFields': 
            callback({ Required: {'OwnerId': 'Reference', 'Name': 'Text'}, NotRequired: {'OpportunityId': 'REFERENCE', 'UnitPrice': 'Currency', 'Product2Id': 'REFERENCE', 'Quantity': 'Number'}});
            break; 
        case 'getUsers':
            callback([{Id: 1, Name: 'Test User1', UserName: 'User1'}, {Id: 2, Name: 'Test User2', UserName: 'User2'}]);
            break; 
        case 'createAssignment':
            callback({Id: 1, Name: 'Clarity Form Assignment', Assign__c: 1, Default_Assign__c: 2 });
            break; 
        case 'getAssignmentRules': 
            callback([{ Id: 1, Clarity_Form_Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Is Not Null', Type__c: 'Boolean', Value__c: 'True' }]);
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
                { Id: 12, Clarity_Form__c: 1, Salesforce_Object__c: 'Case', Type__c: 'Create', Active__c: true },
                { Id: 13, Clarity_Form__c: 1, Salesforce_Object__c: 'Service_Request__c', Type__c: 'Create', Active__c: true }
            ]);
            break; 
        case 'getConnectionFieldMapping': 
            callback([
                { Id: 14, Clarity_Form_Connection__c: 12, Salesforce_Field__c: 'Subject', Clarity_Form_Question__c: 1 },
                { Id: 15, Clarity_Form_Connection__c: 12, Salesforce_Field__c: 'AccountId', Clarity_Form_Question__c: 3 }
            ]);
            break;
        case 'saveConnections': 
            callback([
                { Id: 12, Clarity_Form__c: 1, Salesforce_Object__c: 'Case', Type__c: 'Create', Active__c: true },
                { Id: 13, Clarity_Form__c: 1, Salesforce_Object__c: 'Service_Request__c', Type__c: 'Create', Active__c: true },
                { Id: 14, Clarity_Form__c: 1, Salesforce_Object__c: 'Account', Type__c: 'Create', Active__c: true }
            ]);
            break;
        default:
            break;
    }
}

const handler = () => {

}

const error = () => {

}