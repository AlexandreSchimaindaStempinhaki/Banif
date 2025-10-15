import { Container, Imagem, Rodape } from "./style";

import Logo from "../../images/logo.png";

export default function ImageLogin() {
  return (
    <Container>
      <Imagem src={Logo} />
      <Rodape>
        © 2025 Alexandre Schimainda & Rhuan Souza. Todos os Direitos Reservados.
      </Rodape>
    </Container>
  );
}