import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 15;
  transition: opacity 0.25s ease;
  &.fade-out {
    opacity: 0;
  }
`;

export const PopupContainer = styled.div`
  background: #fff;
  border-radius: 1rem;
  width: 90%;
  max-width: 600px;
  max-height: 80%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${fadeIn} 0.3s ease;
`;

export const Header = styled.div`
  display: flex;
  align-itens: center;
  background: linear-gradient(135deg, #002f6c, #0047ab);
  color: #fff;
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;
`;

export const Titulo = styled.p`
  font-size: calc(calc(3vw + 4vh) / 2);
  color: #fff;
  text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.45);
`;

export const Saldo = styled.div`
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
  font-weight: bold;
  background: rgba(0, 71, 171, 0.45);
`;

export const Body = styled.div`
  padding: 1rem 1.5rem;
  overflow-y: auto;
  flex: 1;
`;

export const Transferencia = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ tipo }) => (tipo === "saida" ? "#dc3545" : "#28a745")};
  transition: color 0.3s ease;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
`;

export const BotaoPagina = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #002f6c, #0047ab);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;

  &:disabled {
    background: #aaa;
    cursor: default;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }
`;
