import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Header, Titulo, Button, Sidebar, SidebarButton } from "./style";
import Logo from "../../images/logo.png";
import LogoBlack from "../../images/logoBlack.png";
import PopupCadastroCliente from "../PopupCadastroCliente";
import { Client, removeToken } from "../../api/client";
import UserContext from "../../contexts/UserContext";
import { getDataUser, removeDataUser } from "../../service/UserService";
import { removePermissions } from "../../service/PermissionService";


export default function CabecalhoGerente() {
  const [clicado, setClicado] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [popupClienteAberto, setPopupClienteAberto] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const dataUser = getDataUser()

  const handleClick = () => {
    setClicado(!clicado);
    setSidebarAberta(!sidebarAberta);
  };

  function logout() {
  
    setTimeout(() => {
      Client.post('auth/logout').then(res => {
        removeToken()
        removePermissions()
        removeDataUser()
        navigate('/')
      })
      .catch(function(error) {
          console.log(error)
      })
      .finally( () => {
      })

    }, 1000)
  }

  const handleLogout = () => {
    setSidebarAberta(false);
    setClicado(false);
    logout()
  };

  const handleCadastrarCliente = () => {
    setPopupClienteAberto(true);
    setSidebarAberta(false);
    setClicado(false);
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
          <SidebarButton onClick={handleCadastrarCliente}>
            Cadastrar Cliente
          </SidebarButton>
          <SidebarButton onClick={handleLogout}>Sair</SidebarButton>
        </Sidebar>
      </Header>

      {popupClienteAberto && (
        <PopupCadastroCliente fechar={() => setPopupClienteAberto(false)} />
      )}
    </>
  );
}