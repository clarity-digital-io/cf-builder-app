import styled, { css } from 'styled-components';
import Main from '../Theme';

const View = styled.div`
    margin-right: 0em; 
    margin-left: 0em; 

    padding: 0; 

    ${props => props.full && css`
      height: 100vh;
    `}

    ${props => props.body && css`
      height: 94vh;
    `}

    ${props => props.space && css`
      padding: .75em;
    `}

    ${props => props.silver && css`
      background: ${Main.color.lighter};
      box-shadow: 3px 0 6px 0 ${Main.color.silver}
    `}

`;

export default View;
