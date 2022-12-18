import React from "react";
import styled from "styled-components";
import { useEditFormContext } from "../../../../../../context/EditContext";
import { QuestionTypes } from "../../../../../../utils/types/fields";

const Item = ({ id, dragOverlay }) => {

  const { initQuestionEdit } = useEditFormContext();

  const style = {
    cursor: dragOverlay ? "grabbing" : "grab",
  };

  return (
    <ItemStyle style={style} className="item" onClick={() => initQuestionEdit({ Id: '0', Name: 'Test', cforms__Title__c: 'test', cforms__Required__c: false, cforms__Type__c: QuestionTypes.InputField })}>
      Item {id}
    </ItemStyle>
  );
};

const ItemStyle = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 110px;
  height: 30px;
  margin-bottom: 5px;
  padding-left: 5px;
  border: 1px solid gray;
  border-radius: 5px;
  user-select: none;
  background-color: white;
`

export default Item;
