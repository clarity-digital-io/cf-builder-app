import React, { useContext, useEffect } from "react";

import { call } from "../../../RemoteActions";
import View from "../../../Elements/View";
import ViewStyle from "../../../Elements/View/style";

import { Button } from "../../../Elements/Button";

import { EditProvider } from "./index";

import { NewQuestion } from "./new";
import { EditQuestion } from "./Edit";
import { SalesforceFields } from "./SF";
import { LogicQuestion } from "./Logic";

import { DesignContext, EditContext, BuilderContext } from "../../../../context";
import { StatusHandler } from "../../../Elements/Notification";
import { Props } from "../../../../utils/types";
import { BuilderController } from "../../../../utils/constants/methods";
import { useDesignContext } from "../../../../context/DesignContext";
import { QuestionStates } from "../../../../reducers/DesignProvider";

export const QuestionState = () => {
  // const { activeQuestion, questionState } = useContext(DesignContext);

  const { questionState } = useDesignContext();
  console.log({ questionState })

  switch (questionState) {
    case QuestionStates.NEW:
      return <NewQuestion />;
    // case "EDIT":
    //   return (
    //     <EditProvider>
    //       <Save>
    //         <EditQuestion type={activeQuestion.forms__Type__c} />
    //       </Save>
    //     </EditProvider>
    //   );
    // case "SF":
    //   return (
    //     <EditProvider>
    //       <Save>
    //         <SalesforceFields questionId={activeQuestion.Id} />
    //       </Save>
    //     </EditProvider>
    //   );
    // case "LOGIC":
    //   return (
    //     <EditProvider>
    //       <Save>
    //         <LogicQuestion type={activeQuestion.forms__Type__c} />
    //       </Save>
    //     </EditProvider>
    //   );
    // case "CALCULATOR":
    //   return (
    //     <EditProvider>
    //       <Save>
    //         <div>calculator</div>
    //       </Save>
    //     </EditProvider>
    //   );
    default:
      return null;
  };
}

  // const Save: React.FC<Props> = ({ children }) => {
  //   const { form, setError } = useContext(BuilderContext);

  //   const {
  //     activeRecordGroup,
  //     setActiveRecordGroup,
  //     activeQuestionOptions,
  //     setActiveQuestionOptions,
  //     criteria,
  //     setCriteria,
  //   } = useContext(EditContext);

  //   const {
  //     activeQuestion,
  //     questionState,
  //     setQuestionState,
  //     questionUpdate,
  //     setQuestionUpdate,
  //     questions,
  //     setActiveQuestion,
  //     setQuestionOptions,
  //     setQuestions,
  //     setActivePageQuestions,
  //     setRecordGroup,
  //   } = useContext(DesignContext);

  //   useEffect(() => {
  //     if (
  //       questionUpdate &&
  //       activeQuestionOptions.length == 0 &&
  //       questionState == "EDIT"
  //     ) {
  //       StatusHandler(
  //         form.forms__Status__c,
  //         () => setQuestionUpdate(false),
  //         () =>
  //           call(
  //             setError,
  //             BuilderController.saveQuestion,
  //             [JSON.stringify(activeQuestion)],
  //             (result, e) =>
  //               resultHandler(
  //                 result,
  //                 e,
  //                 setQuestionUpdate,
  //                 setQuestions,
  //                 setActivePageQuestions,
  //                 activeQuestion
  //               )
  //           ),
  //         null,
  //         setError
  //       );
  //     }

  //     if (
  //       questionUpdate &&
  //       activeQuestionOptions.length &&
  //       questionState == "EDIT"
  //     ) {
  //       const question = prepare([activeQuestion]);

  //       StatusHandler(
  //         form.forms__Status__c,
  //         () => setQuestionUpdate(false),
  //         () =>
  //           call(
  //             setError,
  //             BuilderController.saveQuestionWithOptions,
  //             [
  //               JSON.stringify(question[0]),
  //               JSON.stringify(activeQuestionOptions),
  //             ],
  //             (result, e) =>
  //               resultOptionHandler(
  //                 result,
  //                 e,
  //                 setQuestionUpdate,
  //                 setQuestions,
  //                 activeQuestion,
  //                 setActiveQuestionOptions,
  //                 setQuestionOptions
  //               )
  //           ),
  //         null,
  //         setError
  //       );
  //     }

  //     if (questionUpdate && questionState == "LOGIC") {
  //       const updatedCriteria = criteria.map((c) => {
  //         delete c.Id;
  //         return c;
  //       });

  //       const question = prepare([activeQuestion]);

  //       StatusHandler(
  //         form.forms__Status__c,
  //         () => setQuestionUpdate(false),
  //         () =>
  //           call(
  //             setError,
  //             BuilderController.saveQuestionWithCriteria,
  //             [JSON.stringify(question[0]), JSON.stringify(updatedCriteria)],
  //             (result, e) =>
  //               resultCriteriaHandler(
  //                 result,
  //                 e,
  //                 setQuestionUpdate,
  //                 setQuestions,
  //                 setCriteria,
  //                 activeQuestion
  //               )
  //           ),
  //         null,
  //         setError
  //       );
  //     }

  //     if (questionUpdate && questionState == "SF") {
  //       const updatedActiveRecordFields = activeRecordGroup.map((a) => {
  //         delete a.Id;
  //         delete a.Name;
  //         return a;
  //       });
  //       console.log("updatedActiveRecordFields", updatedActiveRecordFields);
  //       StatusHandler(
  //         form.forms__Status__c,
  //         () => setQuestionUpdate(false),
  //         () =>
  //           call(
  //             setError,
  //             BuilderController.saveRecordGroupFields,
  //             [JSON.stringify(updatedActiveRecordFields), activeQuestion.Id],
  //             (result, e) =>
  //               resultRecordGroupFieldsHandler(
  //                 result,
  //                 e,
  //                 setQuestionUpdate,
  //                 setRecordGroup,
  //                 setActiveRecordGroup,
  //                 activeQuestion
  //               )
  //           ),
  //         null,
  //         setError
  //       );
  //     }
  //   }, [questionUpdate]);

  //   const edit = (questionId) => {
  //     setActiveQuestion(questions.find((question) => question.Id == questionId));
  //     setQuestionState("SF");
  //   };

  //   return [
  //     <View borderRight key={"Save"} className="row middle-xs end-xs">
  //       <View className="col-xs-12">
  //         <ViewStyle border>
  //           {activeQuestion.forms__Record_Group__c != null ? (
  //             <Button onClick={() => edit(activeQuestion.forms__Record_Group__c)}>
  //               Back
  //             </Button>
  //           ) : null}

  //           {questionState != "SF" ? (
  //             <Button onClick={() => setQuestionState("NEW")} variant="neutral">
  //               Add New Field
  //             </Button>
  //           ) : (
  //             <Button onClick={() => setQuestionState("EDIT")}>Back</Button>
  //           )}

  //           <Button onClick={() => setQuestionUpdate(true)} variant="brand">
  //             {questionUpdate ? "Saving..." : "Save Changes"}
  //           </Button>
  //         </ViewStyle>
  //       </View>
  //     </View>,
  //     <View borderRight body key={"QuestionEdit"}>
  //       {children}
  //     </View>,
  //   ];
  // };

  // const resultHandler = (
  //   result,
  //   e,
  //   setQuestionUpdate,
  //   setQuestions,
  //   setActivePageQuestions,
  //   activeQuestion
  // ) => {
  //   console.log("LOOK HERE", result, activeQuestion);
  //   setQuestions((questions) => {
  //     return questions.map((question) => {
  //       console.log(question.Id == result);

  //       if (question.Id == result) {
  //         return activeQuestion;
  //       }

  //       return question;
  //     });
  //   });

  //   setActivePageQuestions((questions) => {
  //     return questions.map((question) => {
  //       if (question.Id == result) {
  //         return activeQuestion;
  //       }

  //       return question;
  //     });
  //   });

  //   setQuestionUpdate(false);
  // };

  // const resultOptionHandler = (
  //   result,
  //   e,
  //   setQuestionUpdate,
  //   setQuestions,
  //   activeQuestion,
  //   setActiveQuestionOptions,
  //   setQuestionOptions
  // ) => {
  //   const options = result.Options;
  //   const resultQuestion = result.Question[0];

  //   setQuestions((questions) => {
  //     return questions.map((question) => {
  //       if (question.Id == resultQuestion.Id) {
  //         return activeQuestion;
  //       }

  //       return question;
  //     });
  //   });

  //   setQuestionOptions((questionOptions) => {
  //     questionOptions.set(resultQuestion.Id, options);

  //     return questionOptions;
  //   });

  //   setActiveQuestionOptions(options);

  //   setQuestionUpdate(false);
  // };

  // const resultCriteriaHandler = (
  //   result,
  //   e,
  //   setQuestionUpdate,
  //   setQuestions,
  //   setCriteria,
  //   activeQuestion
  // ) => {
  //   const criteria = result.Criteria;
  //   const resultQuestion = result.Question[0];

  //   setQuestions((questions) => {
  //     return questions.map((question) => {
  //       if (question.Id == resultQuestion.Id) {
  //         return activeQuestion;
  //       }

  //       return question;
  //     });
  //   });

  //   setCriteria(criteria);
  //   setQuestionUpdate(false);
  // };

  // const prepare = (questions) => {
  //   return questions.map((question) => {
  //     if (question.hasOwnProperty("forms__Question_Options__r")) {
  //       delete question.forms__Question_Options__r;
  //     }

  //     if (question.hasOwnProperty("forms__Question_Criteria__r")) {
  //       delete question.forms__Question_Criteria__r;
  //     }
  //     return question;
  //   });
  // };

  // const resultRecordGroupFieldsHandler = (
  //   result,
  //   e,
  //   setQuestionUpdate,
  //   setRecordGroup,
  //   setActiveRecordGroup,
  //   activeQuestion
  // ) => {
  //   setActiveRecordGroup(result);

  //   setRecordGroup((group) => {
  //     group.set(activeQuestion.Id, result);
  //     return group;
  //   });

  //   setQuestionUpdate(false);
  // }
