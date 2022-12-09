type StatusMessage = {
  [key: string]: string
}

export const Error: StatusMessage = {
  getForm: "Something went wrong on startup.",
  save: "Something went wrong on startup.",
  saveQuestion: "Something went wrong on startup.",
  saveQuestionWithOptions: "Something went wrong on startup.",
  deleteQuestion: "Something went wrong on startup.",
  pageDelete: "Something went wrong on startup.",
  saveQuestionWithCriteria: "Something went wrong on startup.",
  createAssignment: "Something went wrong on startup.",
  saveAssignmentRules: "Something went wrong on startup.",
  saveRecordGroupFields: "Something went wrong on startup.",
  saveActiveFieldConnections: "Something went wrong on startup.",
  saveConnections: "Something went wrong on startup.",
  updateStatus: "Something went wrong on while saving the status, please report and refresh this error.",
  updateForm: "Form setting errors.",
  FormPublished: "Changes to form will not be saved because form has been published.",
};