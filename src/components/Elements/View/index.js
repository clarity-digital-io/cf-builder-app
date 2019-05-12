import styled, { css } from 'styled-components';

const View = styled.div`
    margin-right: 0em; 
    margin-left: 0em; 

    padding: 0; 

    ${props => props.full && css`
      height:100%;
    `}

`;

export default View;
