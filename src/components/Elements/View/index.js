import styled, { css } from 'styled-components';
import Main from '../Theme';

const View = styled.div`
    margin-right: 0em; 
    margin-left: 0em; 
		padding: 0; 
		margin-top: -2px; 

    ${props => props.full && css`
			height: 92.5vh;
    `}

    ${props => props.body && css`
      height: 89.5vh;
    `}

    ${props => props.fullBody && css`
      height: 89.5vh;
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

    ${props => props.white && css`
      background: ${Main.color.white};
      border-top: 1px solid ${Main.color.greyBorder}
      border-bottom: 1px solid ${Main.color.greyBorder}
    `}

    ${props => props.extraspace && css`
      padding: 3em;
    `}

    ${props => props.displayFooter && css`
      border: none; 
      border-top:1px solid ${Main.color.greyBorder};
      background: ${Main.color.body};
    `}

    ${props => props.header && css`
      box-shadow: 0 0 3px 0 ${Main.color.silver}
      background: ${Main.color.lighter};
      font-weight: 900; 
      height: 6vh; 
    `}

    ${props => props.footer && css`
      border-left: 1px solid ${Main.color.greyBorder};
      border-right: 1px solid ${Main.color.greyBorder};
      border-bottom: 1px solid ${Main.color.greyBorder};
			background: ${Main.color.white}
			margin-top: 2px; 
			padding: .5em 0 .5em 0;
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
		
		${props => props.main && css`
			display: flex; 
		`}

		${props => props.nav && css`
				max-width: 54px; 
				flex-grow: 1;
		`}

		${props => props.edit && css`
			max-width: 600px;
			flex-grow: 1;
		`}

		${props => props.form && css`
			flex-grow: 1;
		`}

`;

export default View;
