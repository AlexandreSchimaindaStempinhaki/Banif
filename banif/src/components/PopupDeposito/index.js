import { FiX } from "react-icons/fi";
import { useState, useCallback } from "react";
import {
  Container,
  Popup,
  Formulario,
  Label,
  BotaoFechar,
  BotaoEnviar,
  Titulo,
} from "./style";
import PopupMensagem from "../PopupMensagem";
import InputSeguro from "../InputSeguro";
import { Client } from "../../api/client";

export default function PopupDeposito({ cliente, fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const [valor, setValor] = useState("");
  const [senha, setSenha] = useState("");

  const fecharMensagem = useCallback(() => setMensagem(null), []);

  const handleFechar = useCallback(() => {
    setFechando(true);
    setTimeout(() => fechar?.(), 250);
  }, [fechar]);

  const validarFormulario = () => {
    const erros = [];

    // Valor
    if (!valor.trim()) {
      erros.push("Valor é obrigatório");
    } else {
      const valorNum = parseFloat(valor.replace(",", "."));
      if (isNaN(valorNum) || valorNum <= 0)
        erros.push("Valor deve ser positivo");
    }

    if (!senha.trim()) erros.push("Senha é obrigatória");
    // else if (senha.length !== 8) erros.push("Senha deve ter 8 números");
    // else if (!/^\d{8}$/.test(senha)) erros.push("Senha deve conter apenas números");

    return erros;
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const erros = validarFormulario();

      if (erros.length > 0) {
        setMensagem({
          texto: `Erros de validação:\n${erros.map((e) => `• ${e}`).join("\n")}`,
          tipo: "error",
        });
        return;
      }

      try {
        const valorNum = parseFloat(valor.replace(",", "."));

        const deposito = {
          tipo: 'deposito',
          valor: valorNum,
          conta_origem_id: null,
          conta_destino_id: cliente?.conta?.id,
          senha: senha,
        };

        const response = await Client.post("movimentacoes", deposito);

        setMensagem({
          texto:
            response.data?.message ||
            `Depósito de R$ ${valorNum.toFixed(2)} realizado com sucesso!`,
          tipo: "success",
        });

        setTimeout(() => {
          fechar?.();
          window.location.reload();
        }, 2000);
      } catch (error) {
        const msgBackend =
          error.response?.data?.details || error.response?.data?.message;
        setMensagem({
          texto: msgBackend || "Erro ao realizar depósito!",
          tipo: "error",
        });
      }
    },
    [valor, senha, cliente, fechar]
  );



  return (
    <>
      <Container className={fechando ? "fade-out" : ""}>
        <Popup>
          <BotaoFechar onClick={handleFechar}>
            <FiX size={28} color="#fff" />
          </BotaoFechar>

          <Formulario onSubmit={handleSubmit}>
            <Titulo>Depósito</Titulo>

            <Label>Valor do Depósito</Label>
            <InputSeguro
              placeholder="0,00"
              value={valor}
              onChange={(e) =>
                setValor(e.target.value.replace(/[^\d,]/g, ""))
              }
            />

            <Label>Senha para Confirmação</Label>
            <InputSeguro
              placeholder="Digite sua senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <BotaoEnviar type="submit">Depositar</BotaoEnviar>
          </Formulario>
        </Popup>
      </Container>

      {mensagem && (
        <PopupMensagem
          mensagem={mensagem.texto}
          tipo={mensagem.tipo}
          fechar={fecharMensagem}
          duracao={mensagem.tipo === "error" ? 5000 : 3000}
        />
      )}
    </>
  );
}
