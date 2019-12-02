import { notification } from 'antd';

export const openNotificationWithIcon = (type, method) => {

    const message = StatusMessage[type][method];

    if(message == null) return;

    notification[type]({
      message: message[0],
      description: message[1]
    });

};
  
const StatusMessage = {
    error: {
        startup: ['Error', 'Something went wrong on startup.'],
        save: ['Error', 'Something went wrong on startup.'],
        saveQuestion: ['Error', 'Something went wrong on startup.'],
        saveQuestionWithOptions: ['Error', 'Something went wrong on startup.'],
        deleteQuestion: ['Error', 'Something went wrong on startup.'],
        pageDelete: ['Error', 'Something went wrong on startup.'],
        saveQuestionWithCriteria: ['Error', 'Something went wrong on startup.'],
        createAssignment: ['Error', 'Something went wrong on startup.'],
        saveAssignmentRules: ['Error', 'Something went wrong on startup.'],
        updateDesign: ['Error', 'Something went wrong on startup.'],
        saveRecordGroupFields: ['Error', 'Something went wrong on startup.'],
        saveActiveFieldConnections: ['Error', 'Something went wrong on startup.'],
        saveConnections: ['Error', 'Something went wrong on startup.'],
        updateStatus: ['Error', 'Something went wrong on startup.'],
        updateForm: ['Error', 'Form setting errors.']
    },
    success: {
        startup: ['Success', 'Everything went right on startup.'],
        save: ['Success', 'New question created, nice.'],
        saveQuestion: ['Success', 'Question successfully updated.'],
        saveQuestionWithOptions: ['Success', 'You\'ve successfully added an option.'],
        deleteQuestion: ['Success', 'Question deleted.'],
        pageDelete: ['Success', 'Page deleted.'],
        saveQuestionWithCriteria: ['Success', 'Page deleted.'],
        createAssignment: ['Success', 'Assignment created.'],
        saveAssignmentRules: ['Success', 'Assignment rules saved.'],
        updateDesign: ['Success', 'Design updated.'],
        saveRecordGroupFields: ['Success', 'Record group fields saved.'],
        saveActiveFieldConnections: ['Success', 'Field Connections successfully saved.'],
        saveConnections: ['Success', 'Connections saved.'],
        updateStatus: ['Success', 'Form status updated.'],
        updateForm: ['Success', 'Form settings updated.']
    }
}

// startup
// updateForm
// getQuestions
// save
// saveQuestionWithOptions
// saveQuestion
// deleteQuestion
// getQuestionEditDetails
// getQuestionOptions
// pageDelete
// saveFlowDesign
// savQuestionWithCriteria
// getSObjectsAvailable
// getSObjectFields
// getUsers
// createAssignment
// getAssignmentRules
// saveAssignmentRules
// updateDesign
// saveRecordGroupFields
// getConnections
// getConnectionFieldMapping
// saveActiveFieldConnections
// saveConnections
// getDesigns
// updateStatus