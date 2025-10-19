import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 12vh;
  background: linear-gradient(135deg, #000000, #002f6c);
  z-index: 10;
`;

export const Titulo = styled.h1`
  font-size: calc(calc(4vw + 4vh) / 2);
  color: #fff;
  text-shadow: 2px 2px 2px rgba(255, 255, 255, 0.45);
`;

export const Button = styled.button`
  width: calc(calc(8vw + 8vh) / 2);
  height: calc(calc(8vw + 8vh) / 2); /* define altura para a imagem aparecer */
  border: none;
  border-radius: 25%;
  cursor: pointer;
  position: absolute;
  left: 5px;
  z-index: 12;
  background-color: ${(props) => (props.clicado ? "#fff" : "transparent")};
  background-image: ${(props) => `url(${props.imagem})`}; /* <- correção */

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  transition: background-color 1s ease, background-image 1s ease;

  &:hover {
    border: 2px solid #fff;
  }
`;

export const Sidebar = styled.div`
  position: fixed; /* FIXO para deslizar corretamente */
  top: 0;
  left: ${(props) =>
    props.aberta ? "0" : "-25vw"}; /* ajusta conforme a largura */
  width: 22vw;
  height: 100vh; /* ocupa toda a altura */
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 12vh;
  transition: left 0.3s ease;
  z-index: 11;
  border-top-right-radius: 10px;
  border-botton-right-radius: 10px;
  box-shadow: 10px 0 10px -5px rgba(255, 255, 255, 0.4);
`;

export const SidebarButton = styled.button`
  width: 80%;
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  font-weight: 500;
  font-size: calc(calc(2.8vw + 0.8vh) / 2);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ccc;
  }
`;
