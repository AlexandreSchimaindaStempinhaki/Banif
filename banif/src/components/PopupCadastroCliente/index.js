import { FiX } from "react-icons/fi";
import { useState, useCallback } from "react";
import {
  Container,
  Popup,
  Formulario,
  Label,
  LinhaEndereco,
  BotaoFechar,
  BotaoEnviar,
} from "./style";
import PopupMensagem from "../PopupMensagem";
import InputSeguro from "../InputSeguro";

export default function PopupCadastroCliente({ fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    cpf: "",
    email: "",
    cidade: "",
    estado: "",
    rua: "",
    numero: "",
  });

  const fecharMensagem = useCallback(() => {
    setMensagem(null);
  }, []);

  const handleFechar = useCallback(() => {
    setFechando(true);
    setTimeout(() => {
      if (fechar) fechar();
    }, 250);
  }, [fechar]);

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

    // Validação do Nome
    if (!formData.nome.trim()) {
      erros.push("Nome é obrigatório");
    } else if (!/^[A-Za-zÀ-ÿ ]+$/.test(formData.nome)) {
      erros.push("Nome deve conter apenas letras");
    }

    // Validação do CPF
    if (!formData.cpf.trim()) {
      erros.push("CPF é obrigatório");
    } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(formData.cpf)) {
      erros.push("CPF deve estar no formato 000.000.000-00");
    }

    // Validação do Email
    if (!formData.email.trim()) {
      erros.push("Email é obrigatório");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      erros.push("Email deve estar no formato email@exemplo.com");
    }

    // Validação dos campos de endereço
    if (!formData.cidade.trim()) erros.push("Cidade é obrigatória");
    if (!formData.estado.trim()) erros.push("Estado é obrigatório");
    if (!formData.rua.trim()) erros.push("Rua é obrigatória");
    if (!formData.numero.trim()) erros.push("Número é obrigatório");

    return erros;
  };

  const handleSubmit = useCallback(
    (e) => {
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
      const sucesso = true; // Simulação de sucesso

      if (sucesso) {
        setMensagem({
          texto: "Cliente cadastrado com sucesso!",
          tipo: "success",
        });
        setTimeout(() => {
          if (fechar) fechar();
        }, 1500);
      } else {
        setMensagem({
          texto: "Erro ao cadastrar cliente!",
          tipo: "error",
        });
      }
    },
    [fechar, formData]
  );

  return (
    <>
      <Container className={fechando ? "fade-out" : ""}>
        <Popup>
          <BotaoFechar onClick={handleFechar}>
            <FiX size={28} color="#fff" />
          </BotaoFechar>

          <Formulario onSubmit={handleSubmit}>
            <Label>Nome</Label>
            <InputSeguro
              placeholder="Nome completo"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
            />

            <Label>CPF</Label>
            <InputSeguro
              placeholder="000.000.000-00"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
            />

            <Label>Email</Label>
            <InputSeguro
              placeholder="email@email.com"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />

            <Label>Endereço</Label>
            <LinhaEndereco>
              <InputSeguro
                placeholder="Cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleInputChange}
              />
              <InputSeguro
                placeholder="Estado"
                name="estado"
                value={formData.estado}
                onChange={handleInputChange}
              />
            </LinhaEndereco>

            <LinhaEndereco>
              <InputSeguro
                placeholder="Rua"
                name="rua"
                value={formData.rua}
                onChange={handleInputChange}
              />
              <InputSeguro
                placeholder="Número"
                name="numero"
                type="number"
                value={formData.numero}
                onChange={handleInputChange}
              />
            </LinhaEndereco>

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
