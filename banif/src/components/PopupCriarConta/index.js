import { FiX } from "react-icons/fi";
import { useState } from "react";
import {
  Container,
  Popup,
  Formulario,
  Input,
  Label,
  BotaoFechar,
  BotaoEnviar,
} from "./style";
import PopupMensagem from "../PopupMensagem";

export default function PopupCriarConta({ fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const handleFechar = () => {
    setFechando(true);
    setTimeout(() => fechar(), 250);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // exemplo: validação simples
    const sucesso = true; // ou false se houver erro

    if (sucesso) {
      setMensagem({
        texto: "Conta criada com sucesso!",
        tipo: "success",
      });
      setTimeout(() => fechar(), 300);
    } else {
      setMensagem({ texto: "Erro ao criar conta!", tipo: "error" });
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
            <Input
              placeholder="000.000.000-00"
              name="cpf"
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              required
            />
            <Label>Conta</Label>
            <Input
              placeholder="123456-7"
              name="conta"
              pattern="\d{6}\-\d{1}"
              required
            />
            <Label>Agência</Label>
            <Input
              placeholder="1234-5"
              name="agencia"
              pattern="\d{4}\-\d{1}"
              required
            />

            <BotaoEnviar type="submit">Enviar</BotaoEnviar>
          </Formulario>
        </Popup>
      </Container>

      {mensagem && (
        <PopupMensagem
          mensagem={mensagem.texto}
          tipo={mensagem.tipo}
          fechar={() => setMensagem(null)}
        />
      )}
    </>
  );
}
