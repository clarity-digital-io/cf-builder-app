import styled, { css } from "styled-components";
import Main from "../Theme";

const View = styled.div`
  margin-right: 0em;
  margin-left: 0em;
  padding: 0;

  ${(props) =>
    props.full &&
    css`
      height: 92.5vh;
    `}

  ${(props) =>
    props.body &&
    css`
      height: 89vh;
      background: ${Main.color.white};
    `}
		
		${(props) =>
    props.editBG &&
    css`
      background: ${Main.color.edit};
    `}

		${(props) =>
    props.whiteBG &&
    css`
      background: ${Main.color.white};
    `}

    ${(props) =>
    props.fullBody &&
    css`
      height: 89vh;
    `}

    ${(props) =>
    props.space &&
    css`
      padding: 0.75em;
    `}

    ${(props) =>
    props.border &&
    css`
      border-bottom: 1px solid ${Main.color.border};
    `}
	
		${(props) =>
    props.borderLeft &&
    css`
      border-left: 1px solid ${Main.color.border};
    `}

		${(props) =>
    props.borderRight &&
    css`
      border-right: 1px solid ${Main.color.border};
    `}

    ${(props) =>
    props.white &&
    css`
      background: ${Main.color.white};
      border-top: 1px solid ${Main.color.border};
      border-bottom: 1px solid ${Main.color.border};
    `}

    ${(props) =>
    props.extraspace &&
    css`
      padding: 3em;
    `}
		
		${(props) =>
    props.bigspace &&
    css`
      padding: 2em;
    `}

    #connect {
    font-weight: 900;
    color: ${Main.color.body};
    padding: 0.5em;
    border-radius: 4px;
  }

  #salesforce {
    font-weight: 900;
    color: ${Main.color.bright};
  }

  ${(props) =>
    props.main &&
    css`
      display: flex;
    `}

  ${(props) =>
    props.nav &&
    css`
      max-width: 54px;
      flex-grow: 1;
    `}

		${(props) =>
    props.edit &&
    css`
      width: 600px;
    `}

		${(props) =>
    props.form &&
    css`
      flex-grow: 1;
    `}
`;

export default View;
