import { FiX } from "react-icons/fi";
import { useState, useCallback, useEffect } from "react";
import {
  Container,
  Popup,
  Formulario,
  Label,
  LinhaEndereco,
  BotaoFechar,
  BotaoEnviar,
  SelectSeguro,
} from "./style";
import PopupMensagem from "../PopupMensagem";
import InputSeguro from "../InputSeguro";
import { Client } from '../../api/client';
import { estados } from "../../data/estados";


export default function PopupCadastroCliente({ fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');



  async function sendData() {
    const user = { nome, email, senha, cpf, cidade, estado, rua, numero, papel_id: 2 };

    try {
      const response = await Client.post('users', user);
      console.log(response.data);

      setMensagem({ texto: 'Cadastro realizado com sucesso!', tipo: 'success' });
      return true;
    } catch (error) {
      console.error(error);

      if (error.response?.status === 422 && error.response.data?.errors) {
        const erros = Object.values(error.response.data.errors)
          .map((e) => e.message)
          .join('\n');
        setMensagem({ texto: erros, tipo: 'error' });
      } else {
        setMensagem({ texto: 'Ocorreu um erro inesperado.', tipo: 'error' });
      }
    }
  }


  const fecharMensagem = useCallback(() => {
    setMensagem(null);
  }, []);

  const handleFechar = useCallback(() => {
    setFechando(true);
    setTimeout(() => {
      if (fechar) fechar();
    }, 250);
  }, [fechar]);

  const padronizarCpf = (e) => {
    let valor = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    // Aplica a máscara de CPF
    if (valor.length <= 3) {
      valor = valor;
    } else if (valor.length <= 6) {
      valor = valor.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (valor.length <= 9) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }

    setCpf(valor);
  };
  return (
    <>
      <Container className={fechando ? "fade-out" : ""}>
        <Popup>
          <BotaoFechar onClick={handleFechar}>
            <FiX size={28} color="#fff" />
          </BotaoFechar>

          <Formulario onSubmit={async (e) => {
            e.preventDefault();
            const sucesso = await sendData();
            if (sucesso) {
              handleFechar();
              window.location.reload();
            }
          }}>
            <Label>Nome</Label>
            <InputSeguro
              placeholder="Nome completo"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />

            <Label>CPF</Label>
            <InputSeguro
              placeholder="000.000.000-00"
              name="cpf"
              value={cpf}
              onChange={padronizarCpf}
            />

            <Label>Email</Label>
            <InputSeguro
              placeholder="email@email.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label>Senha</Label>
            <InputSeguro
              placeholder="Digite 8 números"
              name="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <Label>Endereço</Label>
            <LinhaEndereco>
              <InputSeguro
                placeholder="Cidade"
                name="cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />
              <SelectSeguro
                name="estado"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
              >
                <option value="">Selecione o estado</option>
                {estados.map((e) => (
                  <option key={e.sigla} value={e.sigla}>
                    {e.nome}
                  </option>
                ))}
              </SelectSeguro>

            </LinhaEndereco>

            <LinhaEndereco>
              <InputSeguro
                placeholder="Rua"
                name="rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
              <InputSeguro
                placeholder="Número"
                name="numero"
                type="number"
                value={numero}
                onChange={(e) => {
                  const valor = e.target.value.replace(/\D/g, '');
                  setNumero(valor);
                }}
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
