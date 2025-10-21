// src/components/PopupInformacoesPessoais/index.js
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useCallback } from "react";
import {
  Container,
  Popup,
  ClienteCard,
  NomeCliente,
  InfoCliente,
  ContainerBotoes,
  BotaoAcao,
  BotaoFechar,
} from "./style";

export default function PopupInformacoesPessoais({ cliente, fechar }) {
  const [fechando, setFechando] = useState(false);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [mostrarEndereco, setMostrarEndereco] = useState(false);
  const [animando, setAnimando] = useState(false);

  const toggleEndereco = () => {
    setAnimando(true);
    setTimeout(() => {
      setMostrarEndereco(!mostrarEndereco);
      setAnimando(false);
    }, 300);
  };

  const toggleSenhaVisivel = () => {
    setSenhaVisivel(!senhaVisivel);
  };

  const handleFechar = useCallback(() => {
    setFechando(true);
    setTimeout(() => {
      if (fechar) fechar();
    }, 250);
  }, [fechar]);

  // const formatarSenha = () => {
  //   if (senhaVisivel) {
  //     return cliente.senha;
  //   } else {
  //     return "•".repeat(cliente.senha);
  //   }
  // };

  return (
    <Container className={fechando ? "fade-out" : ""}>
      <Popup>
        <ClienteCard ativo={mostrarEndereco}>
          <BotaoFechar onClick={handleFechar}>
            <FiX size={28} color="#002f6c" /> {/* 🔧 CORRIGIDO: Cor do X */}
          </BotaoFechar>
          <NomeCliente>{cliente.nome}</NomeCliente>

          <div className={`info-wrapper ${animando ? "animar" : ""}`}>
            {mostrarEndereco ? (
              <>
                <InfoCliente>
                  <strong>Rua:</strong> {cliente.rua}
                </InfoCliente>
                <InfoCliente>
                  <strong>Número:</strong> {cliente.numero}
                </InfoCliente>
                <InfoCliente>
                  <strong>Cidade:</strong> {cliente.cidade}
                </InfoCliente>
                <InfoCliente>
                  <strong>Estado:</strong> {cliente.estado}
                </InfoCliente>
              </>
            ) : (
              <>
                <InfoCliente>
                  <strong>CPF:</strong> {cliente.cpf}
                </InfoCliente>
                <InfoCliente>
                  <strong>Email:</strong> {cliente.email}
                </InfoCliente>
                <InfoCliente>
                  <strong>Agência:</strong> {cliente?.conta?.numeroAgencia}
                </InfoCliente>
                <InfoCliente>
                  <strong>Conta:</strong> {cliente?.conta?.numeroConta}
                </InfoCliente>
                <InfoCliente>
                  <strong>Saldo:</strong>{" "}
                  {cliente?.conta?.saldo.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </InfoCliente>
                {/* <InfoCliente>
                  <strong>Senha:</strong> {formatarSenha()}
                  <button
                    onClick={toggleSenhaVisivel}
                    style={{
                      background: "none",
                      border: "none",
                      marginLeft: "10px",
                      cursor: "pointer",
                      color: "#002f6c",
                    }}
                  >
                    {senhaVisivel ? (
                      <FiEyeOff size={16} />
                    ) : (
                      <FiEye size={16} />
                    )}
                  </button>
                </InfoCliente> */}
              </>
            )}
          </div>

          <ContainerBotoes>
            <BotaoAcao onClick={toggleEndereco}>
              {mostrarEndereco ? "Ver Informações" : "Ver Endereço"}
            </BotaoAcao>
          </ContainerBotoes>
        </ClienteCard>
      </Popup>
    </Container>
  );
}
