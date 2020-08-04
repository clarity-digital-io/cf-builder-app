export const openNotificationWithIcon = (type, method, setError) => {

		if(type == 'success') return; 

    const message = StatusMessage[type][method];
    if(message == null) return;
		setError({ message: message[1], open: true })

};
  
const StatusMessage = {
    error: {
        getForm: ['Error', 'Something went wrong on startup.'],
        save: ['Error', 'Something went wrong on startup.'],
        saveQuestion: ['Error', 'Something went wrong on startup.'],
        saveQuestionWithOptions: ['Error', 'Something went wrong on startup.'],
        deleteQuestion: ['Error', 'Something went wrong on startup.'],
        pageDelete: ['Error', 'Something went wrong on startup.'],
        saveQuestionWithCriteria: ['Error', 'Something went wrong on startup.'],
        createAssignment: ['Error', 'Something went wrong on startup.'],
        saveAssignmentRules: ['Error', 'Something went wrong on startup.'],
        saveRecordGroupFields: ['Error', 'Something went wrong on startup.'],
        saveActiveFieldConnections: ['Error', 'Something went wrong on startup.'],
        saveConnections: ['Error', 'Something went wrong on while saving connections, please report and refresh this error.'],
        updateStatus: ['Error', 'Something went wrong on while saving the status, please report and refresh this error.'],
        updateForm: ['Error', 'Form setting errors.'],
        FormPublished: ['Error', 'Changes to form will not be saved because form has been published.']
    },
    success: {
				getForm: ['Success', 'Everything went right on startup.'],
        save: ['Success', 'New question created, nice.'],
        saveQuestion: ['Success', 'Question successfully updated.'],
        saveQuestionWithOptions: ['Success', 'You\'ve successfully added an option.'],
        deleteQuestion: ['Success', 'Question deleted.'],
        pageDelete: ['Success', 'Page deleted.'],
        saveQuestionWithCriteria: ['Success', 'Page deleted.'],
        createAssignment: ['Success', 'Assignment created.'],
        saveAssignmentRules: ['Success', 'Assignment rules saved.'],
        saveRecordGroupFields: ['Success', 'Record group fields saved.'],
        saveActiveFieldConnections: ['Success', 'Field Connections successfully saved.'],
        saveConnections: ['Success', 'Connections saved.'],
        updateStatus: ['Success', 'Form status updated.'],
        updateForm: ['Success', 'Form settings updated.']
    }
}

export const StatusHandler = (status, setUpdate, cb, setUpdateSecond, setError) => {

    if(status != null && status == 'Published') {

				openNotificationWithIcon('error', 'FormPublished', setError);

				setUpdate();

        if(setUpdateSecond != null) {
            setUpdateSecond();
        }

				return;

    }

		if(cb != null) {
			cb();
		}

}
