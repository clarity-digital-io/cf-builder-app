# clarity-forms-force

# question flows

Clarity_Form_Question_Flow_Setting___c (
    Id = '1',
    Clarity_Form_Question__c = '1', 
    Clarity_Form_Question_Options__c = '', 
    Active__c = true, 
    On_Form_Submission__c = false
)



Clarity_Form_Question_Flow (
    Clarity_Form_Question__c = '', 
    Value__c = '',
    CreatedDate = '', 
    User = '', 

)

# question logic 

# copy 

yarn build && cp dist/bundle.js ../clarity-scratch-org/force-app/main/default/staticresources/ClarityFormsApp && cd .. && cd clarity-scratch-org && sfdx force:source:push
