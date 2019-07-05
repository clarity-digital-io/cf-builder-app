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
      height: 93vh;
    `}

    ${props => props.space && css`
      padding: .75em;
    `}

    ${props => props.silver && css`
      border-left: 1px solid ${Main.color.greyBorder}
      border-right: 1px solid ${Main.color.greyBorder}
      background: ${Main.color.lighter};
    `}

    ${props => props.footer && css`
      border-left: 1px solid ${Main.color.greyBorder}
      border-right: 1px solid ${Main.color.greyBorder}
      border-top:1px solid ${Main.color.greyBorder};
      background: ${Main.color.bright}
      height: 7vh;
    `}

    ${props => props.header && css`
      box-shadow: 0 0 3px 0 ${Main.color.silver}
      border-bottom: 1px solid ${Main.color.greyBorder}
      background: ${Main.color.lighter};
      font-weight: 900; 
    `}

`;

export default View;
