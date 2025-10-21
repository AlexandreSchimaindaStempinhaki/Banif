import { useState } from "react";
import { Header, Titulo, Button, Sidebar, SidebarButton } from "./style";
import Logo from "../../images/logo.png";
import LogoBlack from "../../images/logoBlack.png";
import { useNavigate } from "react-router-dom";
import PopupInformacoesPessoais from "../PopupInformacoesPessoais";
import PopupTransferencia from "../PopupTransferencia";
import PopupAplicacao from "../PopupAplicacao";
import PopupDeposito from "../PopupDeposito";
import PopupMensagem from "../PopupMensagem";
import { Client, removeToken } from "../../api/client";
import { getDataUser, removeDataUser } from "../../service/UserService";
import { removePermissions } from "../../service/PermissionService";

export default function Cabecalho({ cliente }) {
  const [clicado, setClicado] = useState(false);
  const [sidebarAberta, setSidebarAberta] = useState(false);
  const [mostrarInformacoes, setMostrarInformacoes] = useState(false);
  const [mostrarTransferencia, setMostrarTransferencia] = useState(false);
  const [mostrarAplicacao, setMostrarAplicacao] = useState(false);
  const [mostrarDeposito, setMostrarDeposito] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const navigate = useNavigate();

  const handleClick = () => {
    setClicado(!clicado);
    setSidebarAberta(!sidebarAberta);
  };

  const handleLogout = () => {
    setSidebarAberta(false);
    setClicado(false);
    setTimeout(() => {
      Client.post("auth/logout")
        .then((res) => {
          removeToken();
          removePermissions();
          removeDataUser();
          navigate("/");
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => { });
    }, 1000);
    navigate("/");
  };

  const handleInformacoesPessoais = () => {
    setSidebarAberta(false);
    setClicado(false);
    setMostrarInformacoes(true);
  };

  const handleFecharInformacoes = () => {
    setMostrarInformacoes(false);
  };

  const handleAbrirTransferencia = () => {
    setSidebarAberta(false);
    setClicado(false);
    setMostrarTransferencia(true);
  };

  const handleFecharTransferencia = () => {
    setMostrarTransferencia(false);
  };

  const handleAbrirAplicacao = () => {
    setSidebarAberta(false);
    setClicado(false);
    setMostrarAplicacao(true);
  };

  const handleFecharAplicacao = () => {
    setMostrarAplicacao(false);
  };

  const handleAbrirDeposito = () => {
    setSidebarAberta(false);
    setClicado(false);
    setMostrarDeposito(true);
  };

  const handleFecharDeposito = () => {
    setMostrarDeposito(false);
  };

  const handleResgatarAplicacao = async () => {
    setSidebarAberta(false);
    setClicado(false);

    const aplicacoesAtivas = cliente?.conta?.aplicacoes?.filter(a => a.status === "ativo") || [];

    if (aplicacoesAtivas.length === 0) {
      setMensagem({ texto: "Não há aplicações ativas para resgatar.", tipo: "error" });
      return;
    }

    try {
      for (const aplicacao of aplicacoesAtivas) {
        await Client.put(`aplicacoes/${aplicacao.id}`, { status: "resgatado" });
      }

      setMensagem({ texto: "Todas as aplicações foram resgatadas com sucesso!", tipo: "success" });

      window.location.reload();

    } catch (error) {
      const msgBackend = error.response?.data?.details || error.response?.data?.message;
      setMensagem({ texto: msgBackend || "Erro ao resgatar aplicações.", tipo: "error" });
    }
  };


  const handleFecharMensagem = () => {
    setMensagem(null);
  };

  return (
    <>
      <Header>
        <Button
          onClick={handleClick}
          clicado={clicado}
          imagem={clicado ? LogoBlack : Logo}
        />
        <Titulo>BANIF DIGITAL BANK</Titulo>

        <Sidebar aberta={sidebarAberta}>
          <SidebarButton onClick={handleInformacoesPessoais}>
            Informações Pessoais
          </SidebarButton>
          <SidebarButton onClick={handleAbrirTransferencia}>
            Realizar Transferência
          </SidebarButton>
          <SidebarButton onClick={handleAbrirAplicacao}>
            Realizar Aplicação
          </SidebarButton>
          <SidebarButton onClick={handleAbrirDeposito}>
            Realizar Depósito
          </SidebarButton>
          <SidebarButton onClick={handleResgatarAplicacao}>
            Resgatar Aplicação
          </SidebarButton>
          <SidebarButton onClick={handleLogout}>Sair</SidebarButton>
        </Sidebar>
      </Header>

      {mostrarInformacoes && cliente && (
        <PopupInformacoesPessoais
          cliente={cliente}
          fechar={handleFecharInformacoes}
        />
      )}

      {mostrarTransferencia && cliente && (
        <PopupTransferencia
          cliente={cliente}
          fechar={handleFecharTransferencia}
        />
      )}

      {mostrarAplicacao && cliente && (
        <PopupAplicacao cliente={cliente} fechar={handleFecharAplicacao} />
      )}

      {mostrarDeposito && cliente && (
        <PopupDeposito cliente={cliente} fechar={handleFecharDeposito} />
      )}

      {mensagem && (
        <PopupMensagem
          mensagem={mensagem.texto}
          tipo={mensagem.tipo}
          fechar={handleFecharMensagem}
          duracao={3000}
        />
      )}
    </>
  );
}
