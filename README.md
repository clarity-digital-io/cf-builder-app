# clarity-forms-force

# question flows

Clarity_Form_Question_Flow_Setting___c (
    Id = '1',
    Question__c = '1', 
    Clarity_Form_Question_Options__c = '', 
    Active__c = true, 
    On_Form_Submission__c = false
)



Clarity_Form_Question_Flow (
    Question__c = '', 
    Value__c = '',
    CreatedDate = '', 
    User = '', 

)

# question logic 

Question_Criteria__c

[{Id: 31, Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Equals', Type__c: 'String', Value__c: 'Option 1' }]

On Question Edit Array of Criteria records returned

Id - Criteria Salesforce RecordId 
Question__c - QuestionId of Owner of Criteria
Field__c - This is the referenced QuestionId, Used to detect in a form when we should do something with the question with this criteria, used to listen to the Field
Field_Type__c - This is used when using the Control Field, on Question Field Type detection provide Operators available, 
Operator__c - This is when using the Control Field, based off Field_Type__c, should Provide available Type__c (Is null, Is Equal) ideally in a combination with 
Type__c - Controlled by Operator and Field_Type, String / Reference...
Value__c - Can be a number/text/boolean/reference 

# copy 

yarn build && cp dist/bundle.js ../clarity-scratch-org/force-app/main/default/staticresources/ClarityFormsApp && cd .. && cd clarity-scratch-org && sfdx force:source:push
