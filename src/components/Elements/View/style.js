import styled, { css } from 'styled-components';
import Main from '../Theme';

const ViewStyle = styled.div`

    padding: 1em 0em 1em 0;

    h1 {
        font-weight: 900;
        padding-bottom: 1em;
    }

    ${props => props.border && css`
        border-bottom: 1px solid ${Main.color.light}
    `}

    ${props => props.space && css`
        padding: 2em 1em 2em 1em; 
    `}

    ${props => props.scroll && css`
        overflow: scroll;
        height: 56vh;
    `}

`;

export default ViewStyle;