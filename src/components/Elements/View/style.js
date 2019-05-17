import styled, { css } from 'styled-components';
import Main from '../Theme';

const ViewStyle = styled.div`

    padding: 1em 0em 1em 0;

    h1 {
        font-weight: 900;
        padding-bottom: 1em;
    }

    h2 {
        font-weight: 900;
        padding-bottom: 1em;
    }

    p {
        line-height: 2em;
    }

    span {
        font-weight: 900;
    }

    ${props => props.top && css `
        padding: .5em;
    `}

    ${props => props.border && css`
        border-bottom: 1px solid ${Main.color.light}
    `}

    ${props => props.space && css`
        padding: 2em 1em 2em 1em; 
    `}

    ${props => props.scroll && css`
        overflow: scroll;
        height: 51vh;
    `}

    ${props => props.scrollAutomate && css`
        overflow: scroll;
        height: 38;
    `}
`;

export default ViewStyle;