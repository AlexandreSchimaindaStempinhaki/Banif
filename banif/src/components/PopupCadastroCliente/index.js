import { FiX } from "react-icons/fi";
import { useState } from "react";
import {
  Container,
  Popup,
  Formulario,
  Input,
  Label,
  LinhaEndereco,
  BotaoFechar,
  BotaoEnviar,
} from "./style";
import PopupMensagem from "../PopupMensagem";

export default function PopupCadastroCliente({ fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const handleFechar = () => {
    setFechando(true);
    setTimeout(() => fechar(), 250); // Espera o fade-out
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // exemplo: validação simples
    const sucesso = true; // ou false se houver erro

    if (sucesso) {
      setMensagem({
        texto: "Cliente cadastrado com sucesso!",
        tipo: "success",
      });
      setTimeout(() => fechar(), 300);
    } else {
      setMensagem({ texto: "Erro ao cadastrar cliente!", tipo: "error" });
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
            <Label>Nome</Label>
            <Input
              placeholder="Nome completo"
              name="nome"
              type="text"
              pattern="[A-Za-zÀ-ÿ ]+"
              required
            />

            <Label>CPF</Label>
            <Input
              placeholder="000.000.000-00"
              name="cpf"
              pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
              required
            />

            <Label>Email</Label>
            <Input
              placeholder="email@email.com"
              name="email"
              type="email"
              required
            />

            <Label>Endereço</Label>
            <LinhaEndereco>
              <Input placeholder="Cidade" name="cidade" required />
              <Input placeholder="Estado" name="estado" required />
            </LinhaEndereco>

            <LinhaEndereco>
              <Input placeholder="Rua" name="rua" required />
              <Input
                placeholder="Número"
                name="numero"
                type="number"
                required
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
          fechar={() => setMensagem(null)}
        />
      )}
    </>
  );
}
