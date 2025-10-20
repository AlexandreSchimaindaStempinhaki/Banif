import styled from "styled-components";

export const ClienteCard = styled.div`
  background: ${({ ativo }) =>
    ativo
      ? "linear-gradient(135deg, #dbe6ff, #5dade2)"
      : "linear-gradient(135deg, #ffffff, #f1f1f1)"};
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  transition: background 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-0.5vh);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

export const InfoCliente = styled.p`
  font-size: 1rem;
  color: #333333;
`;

export const ListaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  min-height: 76vh;
  gap: 2rem;
  padding: 3rem;
  margin-top: 12vh;
  background-color: #f8f9fa;

  .info-wrapper {
    display: grid;
    gap: 0.5rem;
    transition: transform 0.3s ease, opacity 0.3s ease;
  }

  .info-wrapper.animar {
    transform: translateY(-10px);
    opacity: 0;
  }
`;

export const NomeCliente = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  background: linear-gradient(45deg, #002f6c, #0047ab);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const ContainerBotoes = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1vh;
`;

export const BotaoAcao = styled.button`
  flex: 1;
  cursor: pointer;
  font-weight: 600;
  border: none;
  border-radius: 0.6rem;
  padding: 0.8rem;
  font-size: calc((0.5vw + 1.5vh) / 2);
  color: #ffffff;
  background: linear-gradient(90deg, #002f6c, #000000);
  transition: all 0.3s ease;

  &:hover {
    filter: brightness(1.15);
    transform: translateY(-0.2vh);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height:100vh;
  margin-top: 5vh;
`
