import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";
import { Container, MensagemPopup, MensagemTexto, BotaoFechar } from "./style";

export default function PopupMensagem({
  mensagem,
  tipo = "success",
  fechar,
  duracao = 3000,
}) {
  const [visivel, setVisivel] = useState(true);
  const timerRef = useRef(null);

  // Limpa todos os timers ao desmontar
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Fecha automaticamente depois de duracao ms
  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setVisivel(false);
    }, duracao);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duracao]);

  const handleFechar = () => {
    setVisivel(false);
    setTimeout(() => {
      fechar?.();
    }, 250);
  };

  // Fecha quando a animação terminar
  useEffect(() => {
    if (!visivel) {
      const timer = setTimeout(() => {
        fechar?.();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [visivel, fechar]);

  return (
    <Container className={!visivel ? "fade-out" : ""}>
      <MensagemPopup tipo={tipo}>
        <MensagemTexto>{mensagem}</MensagemTexto>
        <BotaoFechar onClick={handleFechar}>
          <FiX size={20} color="#fff" />
        </BotaoFechar>
      </MensagemPopup>
    </Container>
  );
}
