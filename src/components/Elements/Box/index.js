import styled, { css } from "styled-components";

const Box = styled.div`
  padding: ${(props) => props.padding};

  span#center {
    text-align: center;
    display: block;
  }
`;

export default Box;
