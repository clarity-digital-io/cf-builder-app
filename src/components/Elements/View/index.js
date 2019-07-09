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

    ${props => props.border && css`
      border-bottom: 1px solid ${Main.color.greyBorder}
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
      background: ${Main.color.white}
      height: 7vh;
    `}

    ${props => props.display && css`
      background: ${Main.color.body};
    `}

    ${props => props.header && css`
      box-shadow: 0 0 3px 0 ${Main.color.silver}
      background: ${Main.color.lighter};
      font-weight: 900; 
      height: 5vh; 
    `}

    #connect {
      font-weight: 900; 
      color: ${Main.color.body};
      padding: .5em;
      border-radius: 4px; 
    }

    #salesforce {
      font-weight: 900; 
      color: ${Main.color.bright};
    }

`;

export default View;
