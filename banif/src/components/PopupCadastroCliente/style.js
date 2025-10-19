import styled, { keyframes } from "styled-components";
import InputSeguro from "../InputSeguro";


const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

export const Container = styled.div`
  display: flex;
  position: fixed;
  background: rgba(255, 255, 255, 0.7);
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 15;
  opacity: 1;
  transition: opacity 0.25s ease;

  &.fade-out {
    opacity: 0;
  }
`;

export const Popup = styled.div`
  display: flex;
  position: relative;
  flex-flow: column;
  background: linear-gradient(45deg, #002f6c, #0047ab);
  width: calc(calc(60vh + 50vw) / 2);
  height: calc(calc(65vh + 60vw) / 2);
  max-height: 75vh;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 71, 171, 0.8);
  animation: ${fadeIn} 0.3s ease;
`;

export const Formulario = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1vh;
  width: 100%;
`;

export const Label = styled.label`
  color: #f8f9fa;
  font-size: calc(calc(3.5vw + 0.5vh) / 2);
  font-weight: 500;
  align-self: flex-start;
`;

export const LinhaEndereco = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  gap: 10px;

  & > div {
    width: 100%;
  }
`;

export const BotaoFechar = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const BotaoEnviar = styled.button`
  margin-top: 15px;
  padding: 8px 25px;
  background: linear-gradient(45deg, #00aaff, #0047ab);
  color: #fff;
  font-size: calc(calc(3vw + 0.5vh) / 2);
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #0077cc, #003c99);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const SelectSeguro = styled.select`
  background-color: #f8f9fa;
  flex: 1;
  height: calc(calc(3vh + 3vw) / 2);
  border: none;
  border-radius: 50px;
  font-size: calc(calc(2vw + 0.5vh) / 2);
  color: #000;
  outline: none;
  cursor: pointer;
  transition: 0.3s;

  &:focus {
    background-color: #fff;
    box-shadow: 0 0 0 2px #1e90ff;
  }
`;