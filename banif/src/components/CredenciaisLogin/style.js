
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 60vw;
  height: 100vh;
  gap: 5vh;
  @media (max-width: 800px) {
    width: 100vw;
  }
`;

export const SubContainer = styled.div`
  display: flex;
  position: relative;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  padding: 2vh;
`;

export const Titulo = styled.h1`
  font-size: calc((10vw+4vh) / 2);
  color: #000000;
`;

export const SubTitulo = styled.p`
  font-size: calc((2vw+1vh) / 2);
  align-self: start;
  color: #000000;
`;

export const CampoTexto = styled.input`
  width: 35vw;
  height: 7.5vh;
  border: 3px solid transparent;
  border-radius: 2.5vh;
  background-image: linear-gradient(#c6c6c6, #c6c6c6),
    linear-gradient(45deg, #002f6c, #000000);
  background-origin: border-box;
  background-clip: padding-box, border-box;
  color: #000000;
  padding: 1vw;
  font-size: calc((2vw+2vh) / 2);
  &:focus {
    outline: none;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }
  @media (max-width: 800px) {
    width: 65vw;
  }
`;

export const IconeOlho = styled.span`
  position: absolute;
  right: 0;
  transform: translate(10px, 10px);
  cursor: pointer;
  color: #000000;
`;

export const SenhaEsquecida = styled.p`
  justify-self: flex-start;
  font-size: calc((2vw+1vh) / 2);
  color: #002f6c;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const BotaoLogar = styled.button`
  cursor: pointer;
  width: 20vw;
  height: 8vh;
  font-size: calc((2vw+1vh) / 2);
  color: #ffffff;
  border-radius: 2.5vh;
  text-align: center;
  background: linear-gradient(90deg, #002f6c, #000000);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;

  &:hover {
    filter: brightness(1.2);
    background: linear-gradient(90deg, #000000, #002f6c);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
    transform: translateY(-0.2vw);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 800px) {
    width: 40vw;
    height: 7vh;
  }
`;

export const ContainerInput = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;
