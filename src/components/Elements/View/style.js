import styled, { css } from "styled-components";
import Main from "../Theme";

const ViewStyle = styled.div`
  padding: 0.7em;

  h1 {
    font-weight: 900;
    font-size: 1em;
    color: ${Main.color.body};
  }

  h2 {
    font-weight: 500;
    font-size: 1em;
    color: ${Main.color.body};
  }

  h2 span {
    font-weight: 500;
  }

  p {
    line-height: 2em;
  }

  span {
    font-weight: 500;
  }

  ${(props) =>
    props.border &&
    css`
      border-bottom: 1px solid ${Main.color.border};
    `}

  ${(props) =>
    props.space &&
    css`
      padding: 1em 1em 1em 1.5em;
    `}

    ${(props) =>
    props.extraSpace &&
    css`
      padding: 2em;
    `}

    ${(props) =>
    props.scroll &&
    css`
      overflow: scroll;
      height: 43vh;
    `}

    ${(props) =>
    props.scrollAutomate &&
    css`
      overflow: scroll;
      height: 38;
    `}


    ${(props) =>
    props.scrollAssign &&
    css`
      overflow-y: scroll;
      max-height: 56vh;
    `}
`;

export default ViewStyle;
