import { useState } from "react";
import {
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import {
  Container,
  PopupContainer,
  Header,
  Body,
  Transferencia,
  Titulo,
  Saldo,
  BotaoExtrato,
  ConteudoExtrato,
  ContainerSaldo,
  ContainerSaldoAplicacoes,
  IconeOlho,
  LinhaSaldoAplicacoes,
  Coluna,
} from "./style";

export default function Extrato({ cliente }) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [extratoAberto, setExtratoAberto] = useState(false);
  const [saldoVisivel, setSaldoVisivel] = useState(false);
  const [aplicacoesVisivel, setAplicacoesVisivel] = useState(false);
  const porPagina = 10;
  const movimentacoesOrigem = cliente?.conta?.movimentacoesOrigem || [];
  const movimentacoesDestino = cliente?.conta?.movimentacoesDestino || [];

  const extrato = [...movimentacoesOrigem, ...movimentacoesDestino]
    .map(m => ({
      ...m,
      createdAt: m.createdAt ? new Date(m.createdAt) : new Date(m.created_at),
    }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const start = paginaAtual * porPagina;
  const end = start + porPagina;
  const transferenciasPagina = extrato.slice(start, end);

  const toggleExtrato = () => {
    setExtratoAberto(!extratoAberto);
  };

  const toggleSaldoVisivel = () => {
    setSaldoVisivel(!saldoVisivel);
  };

  const toggleAplicacoesVisivel = () => {
    setAplicacoesVisivel(!aplicacoesVisivel);
  };

  const formatarSaldo = () => {
    if (saldoVisivel) {
      return cliente?.conta?.saldo.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      return "••••••••";
    }
  };

  const formatarAplicacoes = () => {
    if (aplicacoesVisivel) {
      const aplicacoes = cliente.aplicacoes || 1500;
      return aplicacoes.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    } else {
      return "••••••••";
    }
  };

  const getTipoValor = (transacao) => {
    if (transacao.valor < 0) {
      return "negativo";
    }
    else if (transacao.valor > 0) {
      return "positivo";
    }
    return "neutro";
  };

  const formatarValor = (valor) => {
    const valorAbsoluto = Math.abs(valor);
    const sinal = valor < 0 ? "- " : valor > 0 ? "+ " : "";

    return `${sinal}${valorAbsoluto.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`;
  };

  return (
    <Container>
      <PopupContainer>
        <Header>
          <Titulo>Olá, {cliente?.nome || "Cliente"}!</Titulo>
        </Header>
        <LinhaSaldoAplicacoes>
          <Coluna>
            <ContainerSaldo>
              <Saldo>Saldo: {formatarSaldo()}</Saldo>
              <IconeOlho onClick={toggleSaldoVisivel}>
                {saldoVisivel ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </IconeOlho>
            </ContainerSaldo>
          </Coluna>

          <Coluna>
            <ContainerSaldoAplicacoes>
              <Saldo>Aplicações: {formatarAplicacoes()}</Saldo>
              <IconeOlho onClick={toggleAplicacoesVisivel}>
                {aplicacoesVisivel ? (
                  <FiEyeOff size={20} />
                ) : (
                  <FiEye size={20} />
                )}
              </IconeOlho>
            </ContainerSaldoAplicacoes>
          </Coluna>
        </LinhaSaldoAplicacoes>

        <BotaoExtrato onClick={toggleExtrato} aberto={extratoAberto}>
          <span>Extrato</span>
          {extratoAberto ? (
            <FiChevronUp size={20} />
          ) : (
            <FiChevronDown size={20} />
          )}
        </BotaoExtrato>

        <ConteudoExtrato aberto={extratoAberto}>
          <Body>
            {transferenciasPagina.map((trans, idx) => {
              let descricao = trans.tipo || trans.descricao;
              let valor = trans.valor;

              if (!trans.conta_origem?.id) {
                descricao = 'Dinheiro Resgatado';
                valor = Math.abs(valor);
              }
              else if (!trans.conta_destino?.id) {
                descricao = 'Dinheiro Aplicado';
                valor = -Math.abs(valor);
              }
              else if (trans.conta_origem?.id === cliente.conta?.id) {
                valor = -Math.abs(valor);
                descricao = `Enviado para ${trans.conta_destino?.cliente?.nome}`;
              }
              else if (trans.conta_destino?.id === cliente.conta?.id) {
                valor = Math.abs(valor);
                descricao = `Recebido de ${trans.conta_origem?.cliente?.nome}`;
              }

              return (
                <Transferencia key={idx} tipo={getTipoValor({ valor })}>
                  <span>{descricao}</span>
                  <span>{formatarValor(valor)}</span>
                </Transferencia>
              );
            })}
          </Body>
        </ConteudoExtrato>

      </PopupContainer>
    </Container>
  );
}
