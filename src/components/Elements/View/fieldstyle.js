import styled, { css } from 'styled-components';
import Main from '../Theme';
import { Form } from 'antd';

const FormItem = Form.Item;

export const FormItemStyled = styled(FormItem)`
    text-transform: capitalize;
    label {
      font-weight: 500;        
      color: ${Main.color.grey};
      font-size: 1.2em;
    }

    .ant-select-selection {
      border-radius: 0px; 
      font-size: 1em;
      font-weight: 300;        
      height: auto; 
      padding: .5em; 
    }
    .ant-input {
      border-radius: 0px; 
      font-size: 1em;
      font-weight: 300;   
      height: auto; 
      padding: .5em; 
    }
    .ant-radio-button-wrapper {
      font-size: 1em;
      font-weight: 300;   
      height: auto; 
      padding: 1em; 
    }
    .ant-radio-button-wrapper:first-child {
      border-radius: 0px;
    }
    .ant-radio-button-wrapper:last-child {
      border-radius: 0px;
    }
    .ant-input-number {
      height: auto;
      border-radius: 0px;
    }
    .ant-input-number-input {
      border-radius: 0px;
      font-size: 1em;
      font-weight: 300;   
      height: auto; 
      padding: .5em; 
    }
    .ant-upload.ant-upload-select-picture-card {
      border-radius: 0px;
    }
`;

export const TextStyle = styled.div`
    font-size: 2.5em; 
    font-weight: 900 !important; 
    margin-bottom: .5em;
    padding-bottom: .5em;
`

export const ParagraphStyle = styled.p`
    margin-bottom: .5em;
    padding-bottom: .5em;
`