import { useState } from "react";
import { Header, Titulo, Button, Sidebar, SidebarButton } from "./style";
import Logo from "../../images/logo.png";
import LogoBlack from "../../images/logoBlack.png";

export default function CabeçalhoCliente({ cliente }) {
  // 🔧 RECEBE CLIENTE COMO PROP
  const [clicado, setClicado] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(false);

  const handleClick = () => {
    setClicado(!clicado);
    setSidebarAberta(!sidebarAberta);
  };

  return (
    <>
      <Header>
        <Button
          onClick={handleClick}
          clicado={clicado}
          imagem={clicado ? LogoBlack : Logo}
        />
        {/* 🔧 TÍTULO DINÂMICO COM NOME DO CLIENTE */}
        <Titulo>Bem Vindo, {cliente?.nome || "Cliente"}!</Titulo>

        <Sidebar aberta={sidebarAberta}>
          {/* <SidebarButton onClick={() => setPopupClienteAberto(true)}>
            Cadastrar Cliente
          </SidebarButton> */}
        </Sidebar>
      </Header>

      {/* {popupClienteAberto && (
        <PopupCadastroCliente fechar={() => setPopupClienteAberto(false)} />
      )} */}
    </>
  );
}
