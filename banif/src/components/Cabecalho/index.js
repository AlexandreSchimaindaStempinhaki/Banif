import { useState } from "react";
import { Header, Titulo, Button, Sidebar, SidebarButton } from "./style";
import Logo from "../../images/logo.png";
import LogoBlack from "../../images/logoBlack.png";
import PopupCadastroCliente from "../PopupCadastroCliente";
import PopupCriarConta from "../PopupCriarConta";

export default function Cabecalho() {
  const [clicado, setClicado] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [popupClienteAberto, setPopupClienteAberto] = useState(false);
  const [popupContaAberto, setPopupContaAberto] = useState(false);

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
        <Titulo>Bem Vindo ao Banif</Titulo>

        <Sidebar aberta={sidebarAberta}>
          <SidebarButton onClick={() => setPopupClienteAberto(true)}>
            Cadastrar Cliente
          </SidebarButton>
          <SidebarButton onClick={() => setPopupContaAberto(true)}>
            Criar Conta
          </SidebarButton>
        </Sidebar>
      </Header>

      {popupClienteAberto && (
        <PopupCadastroCliente fechar={() => setPopupClienteAberto(false)} />
      )}
      {popupContaAberto && (
        <PopupCriarConta fechar={() => setPopupContaAberto(false)} />
      )}
    </>
  );
}
