import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Spinner2 } from 'styled-icons/icomoon/Spinner2';

const Loader = () => {
    return (
        <Container>
            <Spinner />
            <h1>Loading</h1>
        </Container>
    );
};

export default Loader;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
    color: #ccc;
    position: fixed;
    top: 0%;
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    h1 {
        font-size: 1.5rem;
        font-weight: 400;
    }
`;

const Spinner = styled(Spinner2)`
    animation: ${rotate} 0.75s linear infinite;
    height: 3.5rem;
    width: 3.5rem;
`;
