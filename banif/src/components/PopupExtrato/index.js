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
  const porPagina = 10;
  const extrato = cliente.extrato;
  const totalPaginas = Math.ceil(extrato.length / porPagina);

  const start = paginaAtual * porPagina;
  const end = start + porPagina;
  const transferenciasPagina = extrato.slice(start, end);

  return (
    <Overlay>
      <PopupContainer>
        <Header>
          <Titulo>Extrato</Titulo>
          <FiX size={24} cursor="pointer" onClick={onClose} />
        </Header>

        <Saldo>
          Saldo:{" "}
          {cliente.saldo.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </Saldo>

        <Body>
          {transferenciasPagina.map((trans, idx) => (
            <Transferencia key={idx} tipo={trans.tipo}>
              <span>{trans.descricao}</span>
              <span>
                {trans.valor.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </Transferencia>
          ))}
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
