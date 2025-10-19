import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(100px); }
  to { opacity: 1; transform: translateX(0); }
`;

export const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  animation: ${fadeIn} 0.3s ease;
  
  &.fade-out {
    opacity: 0;
    transform: translateX(100px);
    transition: opacity 0.25s ease, transform 0.25s ease;
  }
`;

export const MensagemPopup = styled.div`
  background: ${props => 
    props.tipo === "success" ? "#28a745" :
    props.tipo === "error" ? "#dc3545" :
    "#17a2b8"};
  color: white;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
  max-width: 400px;
  min-width: 300px;
  
  /* 🔧 ESTILOS PARA QUEBRA DE LINHA */
  white-space: pre-line;
  word-wrap: break-word;
  line-height: 1.5;
`;

export const MensagemTexto = styled.div`
  flex: 1;
  white-space: pre-line;
  word-wrap: break-word;
  line-height: 1.5;
`;

export const BotaoFechar = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  &:hover {
    opacity: 0.8;
  }
`;