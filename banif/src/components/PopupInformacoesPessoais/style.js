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
  z-index: 9999;
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
  background: transparent;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease;
  overflow-y: auto;
`;

export const ClienteCard = styled.div`
  background: ${({ ativo }) =>
    ativo
      ? "linear-gradient(135deg, #dbe6ff, #5dade2)"
      : "linear-gradient(135deg, #ffffff, #f1f1f1)"};
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.3s ease-in-out;
  width: 100%;
  max-width: 600px;
  position: relative; /* 🔧 ADICIONADO: Para o botão fechar se posicionar relativamente ao card */

  .info-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .info-wrapper.animar {
    transform: translateY(-10px);
    opacity: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
  }
`;

export const BotaoFechar = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const InfoCliente = styled.p`
  font-size: 1rem;
  color: #333333;
  margin: 0;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 0.5rem;
  border-left: 4px solid #0047ab;

  strong {
    color: #002f6c;
  }
`;

export const NomeCliente = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  background: linear-gradient(45deg, #002f6c, #0047ab);
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin: 0 0 1rem 0;
  padding-right: 40px; /* 🔧 ADICIONADO: Para não sobrepor o botão X */
`;

export const ContainerBotoes = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

export const BotaoAcao = styled.button`
  cursor: pointer;
  font-weight: 600;
  border: none;
  border-radius: 0.6rem;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  color: #ffffff;
  background: linear-gradient(90deg, #002f6c, #0047ab);
  transition: all 0.3s ease;
  min-width: 150px;

  &:hover {
    filter: brightness(1.15);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 47, 108, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
