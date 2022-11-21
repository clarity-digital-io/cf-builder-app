# clarity-forms-force

# question flows

Clarity_Form_Question_Flow_Setting**\_c (
Id = '1',
Question**c = '1',
Clarity_Form_Question_Options**c = '',
Active**c = true,
On_Form_Submission\_\_c = false
)

Clarity_Form_Question_Flow (
Question**c = '',
Value**c = '',
CreatedDate = '',
User = '',

)

# question logic

Question_Criteria\_\_c

[{Id: 31, Question__c: 1, Field__c: 1, Field_Type__c: 'Comment', Operator__c: 'Equals', Type__c: 'String', Value__c: 'Option 1' }]

On Question Edit Array of Criteria records returned

Id - Criteria Salesforce RecordId
Question**c - QuestionId of Owner of Criteria
Field**c - This is the referenced QuestionId, Used to detect in a form when we should do something with the question with this criteria, used to listen to the Field
Field_Type**c - This is used when using the Control Field, on Question Field Type detection provide Operators available,
Operator**c - This is when using the Control Field, based off Field_Type**c, should Provide available Type**c (Is null, Is Equal) ideally in a combination with
Type**c - Controlled by Operator and Field_Type, String / Reference...
Value**c - Can be a number/text/boolean/reference

# copy

yarn build && cp dist/bundle.js ../clarity-scratch-org/force-app/main/default/staticresources/ClarityFormsApp && cd .. && cd clarity-scratch-org && sfdx force:source:push
