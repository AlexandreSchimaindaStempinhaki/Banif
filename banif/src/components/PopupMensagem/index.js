import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { Container, MensagemPopup, BotaoFechar } from "./style";

export default function PopupMensagem({
  mensagem,
  tipo = "success",
  fechar,
  duracao = 3000,
}) {
  // Fecha automaticamente depois de duracao ms
  useEffect(() => {
    const timer = setTimeout(() => {
      fechar();
    }, duracao);
    return () => clearTimeout(timer);
  }, [duracao, fechar]);

  return (
    <Container>
      <MensagemPopup tipo={tipo}>
        {mensagem}
        <BotaoFechar onClick={fechar}>
          <FiX size={20} color="#fff" />
        </BotaoFechar>
      </MensagemPopup>
    </Container>
  );
}
