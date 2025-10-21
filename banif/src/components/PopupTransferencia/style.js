import styled, { keyframes } from "styled-components";

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
  top: 0;
  left: 0;

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
  height: calc(calc(65vh + 55vw) / 2);
  max-height: 75vh;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 71, 171, 0.8);
  animation: ${fadeIn} 0.3s ease;
  overflow-y: auto;
`;

export const Formulario = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1.5vh;
  width: 100%;
`;

export const SaldoInfo = styled.div`
  color: #fff;
  font-size: calc(calc(3.5vw + 0.8vh) / 2);
  font-weight: bold;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px 15px;
  border-radius: 8px;
  text-align: center;
  width: 100%;
  margin-bottom: 1vh;
`;

export const Label = styled.label`
  color: #f8f9fa;
  font-size: calc(calc(3.5vw + 0.5vh) / 2);
  font-weight: 500;
  align-self: flex-start;
  width: 100%;
`;

export const LinhaCampos = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  padding: 10px 30px;
  background: linear-gradient(45deg, #00aaff, #0047ab);
  color: #fff;
  font-size: calc(calc(2.5vw + 0.5vh) / 2);
  font-weight: bold;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease;
  width: 100%;
  width: 15vw;

  &:hover {
    transform: scale(1.05);
    background: linear-gradient(45deg, #0077cc, #003c99);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;
