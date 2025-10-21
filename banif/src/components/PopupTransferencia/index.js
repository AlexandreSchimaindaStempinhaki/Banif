import { FiX } from "react-icons/fi";
import { useState, useCallback } from "react";
import {
  Container,
  Popup,
  Formulario,
  Label,
  LinhaCampos,
  BotaoFechar,
  BotaoEnviar,
  SaldoInfo,
} from "./style";
import PopupMensagem from "../PopupMensagem";
import InputSeguro from "../InputSeguro";
import useClientes from "../../data/clientes";
import { Client } from "../../api/client";

export default function PopupTransferencia({ cliente, fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const [valor, setValor] = useState("");
  const [contaDestino, setContaDestino] = useState("");
  const [agenciaDestino, setAgenciaDestino] = useState("");
  const [senha, setSenha] = useState("");

  const { data } = useClientes();

  const encontrarContaDestino = (agencia, conta) => {
    return data.find(
      (c) =>
        c?.conta?.numeroAgencia === agencia &&
        c?.conta?.numeroConta === conta
    );
  };

  const validarFormulario = () => {
    const erros = [];
    const valorNum = parseFloat(valor.replace(",", "."));

    if (isNaN(valorNum) || valorNum <= 0)
      erros.push("Informe um valor válido para a transferência.");
    else if (valorNum > cliente?.conta?.saldo)
      erros.push("Saldo insuficiente.");

    if (!agenciaDestino.trim()) erros.push("Agência destino é obrigatória.");
    if (!contaDestino.trim()) erros.push("Conta destino é obrigatória.");
    if (!senha.trim()) erros.push("Senha é obrigatória.");
    // else if (senha.length !== 8) erros.push("Senha deve ter 8 números.");

    return erros;
  };

  async function sendData() {
    const destino = encontrarContaDestino(agenciaDestino, contaDestino);

    if (!destino) {
      setMensagem({ texto: "Conta destino não encontrada.", tipo: "error" });
      return;
    }

    const movimentacao = {
      tipo: 'transferencia',
      valor: parseFloat(valor.replace(",", ".")),
      conta_origem_id: cliente.conta.id,
      conta_destino_id: destino.conta.id,
      senha: senha,
    };

    try {
      const response = await Client.post("movimentacoes", movimentacao);
      setMensagem({ texto: "Transferência realizada com sucesso!", tipo: "success" });
      setTimeout(() => fechar?.(), 2000);
      window.location.reload();
    } catch (error) {
      console.error(error);
      console.log(({ message: error.message, stack: error.stack }))
      const msgBackend = error.response?.data?.details || error.response?.data?.message;

      setMensagem({
        texto: msgBackend || "Erro ao realizar transferência.",
        tipo: "error",
      });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const erros = validarFormulario();

    if (erros.length > 0) {
      setMensagem({
        texto: erros.map((e) => `• ${e}`).join("\n"),
        tipo: "error",
      });
      return;
    }

    sendData();
  };

  const handleFechar = () => {
    setFechando(true);
    setTimeout(() => fechar?.(), 250);
  };

  const formatarSaldo = () =>
    cliente?.conta?.saldo?.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  return (
    <>
      <Container className={fechando ? "fade-out" : ""}>
        <Popup>
          <BotaoFechar onClick={handleFechar}>
            <FiX size={28} color="#fff" />
          </BotaoFechar>

          <Formulario onSubmit={handleSubmit}>
            <SaldoInfo>Saldo Disponível: {formatarSaldo()}</SaldoInfo>

            <Label>Valor da Transferência</Label>
            <InputSeguro
              placeholder="0,00"
              name="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value.replace(/[^\d,]/g, ""))}
            />

            <LinhaCampos>
              <div style={{ width: "100%" }}>
                <Label>Agência Destino</Label>
                <InputSeguro
                  placeholder="0000"
                  name="agenciaDestino"
                  value={agenciaDestino}
                  maxLength={4}
                  onChange={(e) =>
                    setAgenciaDestino(e.target.value.replace(/\D/g, ""))
                  }
                />
              </div>

              <div style={{ width: "100%" }}>
                <Label>Conta Destino</Label>
                <InputSeguro
                  placeholder="00000-0"
                  name="contaDestino"
                  value={contaDestino}
                  maxLength={7}
                  onChange={(e) =>
                    setContaDestino(e.target.value)
                  }
                />
              </div>
            </LinhaCampos>

            <Label>Senha para Confirmação</Label>
            <InputSeguro
              placeholder="Digite sua senha"
              name="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <BotaoEnviar type="submit">Transferir</BotaoEnviar>
          </Formulario>
        </Popup>
      </Container>

      {mensagem && (
        <PopupMensagem
          mensagem={mensagem.texto}
          tipo={mensagem.tipo}
          fechar={() => setMensagem(null)}
          duracao={mensagem.tipo === "error" ? 5000 : 3000}
        />
      )}
    </>
  );
}
