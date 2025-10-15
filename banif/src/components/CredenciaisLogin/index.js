
import { useState } from "react";
import {
  Container,
  Titulo,
  SubTitulo,
  SubContainer,
  CampoTexto,
  IconeOlho,
  BotaoLogar,
  SenhaEsquecida,
  ContainerInput,
} from "./style";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CredenciaisLogin() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [salvar, setSalvar] = useState(false);

  return (
    <Container>
      <Titulo>Login</Titulo>

      <SubContainer>
        <ContainerInput>
          <SubTitulo>Email</SubTitulo>
          <CampoTexto
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </ContainerInput>
        <ContainerInput>
          <SubTitulo>Senha</SubTitulo>
          <CampoTexto
            type={mostrarSenha ? "text" : "password"}
            placeholder="Digite sua Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </ContainerInput>
        <IconeOlho onClick={() => setMostrarSenha(!mostrarSenha)}>
          {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
        </IconeOlho>
        <SenhaEsquecida>Esqueceu sua Senha?</SenhaEsquecida>
        <BotaoLogar>Realizar Login</BotaoLogar>
      </SubContainer>
    </Container>
  );
}
