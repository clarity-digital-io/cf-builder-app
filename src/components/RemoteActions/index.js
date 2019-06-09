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
                Clarity_Form_Style__c: 1, 
                Clarity_Form_Assignment__c: 1,
                Clarity_Form_Style__r: { Background_Color__c: '#333333', Color: '#ffffff', Button_Color__c: '' }, 
                Clarity_Form_Assignment__r: { Id: 1, Name: 'Clarity Form Assignment', Assign__c: 1, Default_Assign__c: 2 } 
            }); 
            break;
        case 'getQuestions':
            callback([{ Id: 1, Type__c: 'Comment', Title__c: 'Comment', Order__c: 0, Max_Length__c: 10, Min_Range__c: 0, Max_Range__c: 100, Step__c: 10 }]); 
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
                'Criteria': [{Id: 31, Clarity_Form_Question__c: 2, Field__c: 'Multiple Choice', Operator__c: 'Equals', Type__c: 'String', Value__c: 'Option 1' }],
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: false, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'saveFlowDesign':
            callback({
                'Options' : [{ Id: 31, Label__c: 'Option 1', Active_Flow__c: true, Clarity_Form_Question__c: 2},{ Id: 32, Label__c: 'Option 2', Active_Flow__c: true, Clarity_Form_Question__c: 2}],
                'FlowDesign': [{ Id: 31, Clarity_Form_Question__c: 123, Form_Submission__c: true, Active__c: false }]
            });
            break;
        case 'getSObjectsAvailable': 
            callback(['Account', 'Case', 'Contact', 'Opportunity', 'AccountRole']);
            break; 
        case 'getRecordGroupFields': 
            callback({ Required: {'OwnerId': 'Reference', 'Name': 'Text'}, NotRequired: {'Time': 'Number', 'CustomField': 'Picklist'}});
            break; 
        case 'getUsers':
            callback([{Id: 1, Name: 'Test User1', UserName: 'User1'}, {Id: 2, Name: 'Test User2', UserName: 'User2'}]);
            break; 
        case 'createAssignment':
            callback({Id: 1, Name: 'Clarity Form Assignment', Assign__c: 1, Default_Assign__c: 2 });
            break; 
        case 'getAssignmentRules': 
            callback([{ Id: 1, Operator__c: 'Equals', Type__c: 'String', Value__c: 'Something', Field__c: 1, Field_Type__c: 'Comment' }]);
            break; 
        case 'saveAssignmentRules':
            callback([]);
            break; 
        default:
            break;
    }
}

const handler = () => {

}

const error = () => {

}