import { useState } from "react";
import { FiX } from "react-icons/fi";
import {
  Overlay,
  PopupContainer,
  Header,
  Body,
  Transferencia,
  Footer,
  BotaoPagina,
  Titulo,
  Saldo,
} from "./style";

export default function PopupExtrato({ cliente, onClose }) {
  const [paginaAtual, setPaginaAtual] = useState(0);
  const porPagina = 7;
  const movimentacoesOrigem = cliente?.conta?.movimentacoesOrigem || [];
  const movimentacoesDestino = cliente?.conta?.movimentacoesDestino || [];

  const extrato = [...movimentacoesOrigem, ...movimentacoesDestino]
  .map(m => ({
    ...m,
    createdAt: m.createdAt ? new Date(m.createdAt) : new Date(m.created_at),
  }))
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());





  const totalPaginas = Math.ceil(extrato.length / porPagina);

  const start = paginaAtual * porPagina;
  const end = start + porPagina;
  const transferenciasPagina = extrato.slice(start, end);

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
    <Overlay>
      <PopupContainer>
        <Header>
          <Titulo>Extrato</Titulo>
          <FiX size={24} cursor="pointer" onClick={onClose} />
        </Header>

        <Saldo>
          Saldo:{" "}
          {(cliente?.conta?.saldo ?? 0).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Saldo>

        <Body>
          {transferenciasPagina.map((trans, idx) => {
            let descricao = trans.tipo || trans.descricao;
            let valor = trans.valor;

            console.log(trans)
            if (!trans.conta_origem?.id) {

              descricao = 'Dinheiro Resgatado';
              valor = Math.abs(valor);
            } 
            
            if (!trans.conta_destino?.id) {

              descricao = 'Dinheiro Aplicado';
              valor = -Math.abs(valor);
            }
            
            else if (trans.conta_origem?.id === cliente.conta?.id) {

              valor = -Math.abs(valor);
              descricao = `Enviado para ${trans.conta_destino?.cliente?.nome}`;

            } else if (trans.conta_destino?.id === cliente.conta?.id) {

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


        <Footer>
          <BotaoPagina
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 0}
          >
            Anterior
          </BotaoPagina>
          <span>
            {paginaAtual + 1} / {totalPaginas}
          </span>
          <BotaoPagina
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual + 1 >= totalPaginas}
          >
            Próxima
          </BotaoPagina>
        </Footer>
      </PopupContainer>
    </Overlay>
  );
}