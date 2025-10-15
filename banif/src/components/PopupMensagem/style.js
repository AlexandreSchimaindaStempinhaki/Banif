import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 20;
  display: flex;
  justify-content: flex-end;
  width: auto;
`;

export const MensagemPopup = styled.div`
  background-color: #f1f3f5;
  padding: 15px 20px;
  border-radius: 10px;
  min-width: 250px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: ${fadeIn} 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

  /* cores por tipo */
  background-color: ${(props) =>
    props.tipo === "success"
      ? "#28a745"
      : props.tipo === "error"
      ? "#dc3545"
      : props.tipo === "warning"
      ? "#ffc107"
      : "#17a2b8"};
`;

export const BotaoFechar = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;
