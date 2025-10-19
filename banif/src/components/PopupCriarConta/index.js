import { FiX } from "react-icons/fi";
import { useState, useCallback } from "react";
import {
  Container,
  Popup,
  Formulario,
  Label,
  BotaoFechar,
  BotaoEnviar,
} from "./style";
import PopupMensagem from "../PopupMensagem";
import InputSeguro from "../InputSeguro";

export default function PopupCriarConta({ fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [formData, setFormData] = useState({
    cpf: "",
    agencia: "",
    conta: "",
    saldo: "",
  });

  const fecharMensagem = useCallback(() => {
    setMensagem(null);
  }, []);

  const handleFechar = () => {
    setFechando(true);
    setTimeout(() => fechar(), 250);
  };

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  // 🔧 FUNÇÃO DE VALIDAÇÃO
  const validarFormulario = () => {
    const erros = [];

    // Validação do CPF
    if (!formData.cpf.trim()) {
      erros.push("CPF é obrigatório");
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      erros.push("CPF deve estar no formato 000.000.000-00");
    }

    // Validação da Agência
    if (!formData.agencia.trim()) {
      erros.push("Agência é obrigatória");
    } else if (!/^\d{4}-\d{1}$/.test(formData.agencia)) {
      erros.push("Agência deve estar no formato 1234-5");
    }

    // Validação da Conta
    if (!formData.conta.trim()) {
      erros.push("Conta é obrigatória");
    } else if (!/^\d{6}-\d{1}$/.test(formData.conta)) {
      erros.push("Conta deve estar no formato 123456-7");
    }

    if (!formData.saldo.trim()) {
      erros.push("Saldo é obrigatória");
    } else if (formData.saldo && isNaN(parseFloat(formData.saldo))) {
      erros.push("Saldo deve ser um número válido");
    } else if (formData.saldo && parseFloat(formData.saldo) < 0) {
      erros.push("Saldo não pode ser negativo");
    }

    return erros;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔧 VALIDA ANTES DE ENVIAR
    const erros = validarFormulario();

    if (erros.length > 0) {
      // 🔧 FORMATA AS MENSAGENS UMA EM BAIXO DA OUTRA
      const mensagemErro = erros.map((erro) => `• ${erro}`).join("\n");

      setMensagem({
        texto: `Erros de validação:\n${mensagemErro}`,
        tipo: "error",
      });
      return;
    }

    // Se passou na validação, envia os dados
    const sucesso = true;

    if (sucesso) {
      setMensagem({
        texto: "Conta criada com sucesso!",
        tipo: "success",
      });
      setTimeout(() => fechar(), 1500);
    } else {
      setMensagem({
        texto: "Erro ao criar conta!",
        tipo: "error",
      });
    }
  };

  return (
    <>
      <Container className={fechando ? "fade-out" : ""}>
        <Popup>
          <BotaoFechar onClick={handleFechar}>
            <FiX size={28} color="#fff" />
          </BotaoFechar>

          <Formulario onSubmit={handleSubmit}>
            <Label>CPF</Label>
            <InputSeguro
              placeholder="000.000.000-00"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
            />

            <Label>Agência</Label>
            <InputSeguro
              placeholder="1234-5"
              name="agencia"
              value={formData.agencia}
              onChange={handleInputChange}
            />

            <Label>Conta</Label>
            <InputSeguro
              placeholder="123456-7"
              name="conta"
              value={formData.conta}
              onChange={handleInputChange}
            />

            <Label>Saldo</Label>
            <InputSeguro
              placeholder="0.00"
              name="saldo"
              type="number"
              value={formData.saldo}
              onChange={handleInputChange}
            />

            <BotaoEnviar type="submit">Enviar</BotaoEnviar>
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
