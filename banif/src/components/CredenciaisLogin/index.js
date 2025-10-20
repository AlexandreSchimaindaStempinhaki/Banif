import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import UserContext from '../../contexts/UserContext'
import { Client, setToken } from '../../api/client'
import { setPermissions } from '../../service/PermissionService'
import { setDataUser } from '../../service/UserService'
import { OrbitProgress } from "react-loading-indicators"
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
  ContainerLoading,
  MsgBox,
} from "./style";

export default function CredenciaisLogin() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [load, setLoad] = useState(false)
  const [avisarErro, setAvisarErro] = useState(false)

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext)

  async function autenticar() {
    const user = { email: email, senha: senha }

    setAvisarErro(false);
    setLoad(true);

    setTimeout(() => {
      Client.post('auth/login', user).then(res => {
        const load = res.data
        console.log(res.data)

        console.log(load)

        setUser(load)

        setDataUser(load.user)
        setToken(load.token.value)
        setPermissions(load.permissions)
        if(load.user.papel_id === 1){
          navigate('/Home/Gerente')
        }
        else if(load.user.papel_id === 2){
          navigate('/Home/Cliente')
        }
      })
        .catch(function (error) {
          setAvisarErro(true);
          console.log(error)
        })
        .finally(() => {
          setLoad(false)
        })
    }, 1000)
  }

  return (
    <Container>
      <Titulo>Login</Titulo>

      {
        load
          ?
          <ContainerLoading>
            <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
          </ContainerLoading>
          :
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

            {
              avisarErro
              ?
                <MsgBox>
                  <p>Usuário e Senha Inválidos</p>
                </MsgBox>
              :
                ''
            }
            <SenhaEsquecida>Esqueceu sua Senha?</SenhaEsquecida>
            <BotaoLogar onClick={autenticar}>Realizar Login</BotaoLogar>
          </SubContainer>
      }
    </Container>
  );
}
