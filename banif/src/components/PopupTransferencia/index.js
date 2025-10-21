import { FiX } from "react-icons/fi";
import { useState, useCallback, useEffect } from "react";
import {
  Container,
  Popup,
  Formulario,
  Label,
  LinhaCampos,
  BotaoFechar,
  BotaoEnviar,
  SaldoInfo,
} from "./style";
import PopupMensagem from "../PopupMensagem";
import InputSeguro from "../InputSeguro";
import useClientes from "../../data/clientes";
import { Client } from "../../api/client";

export default function PopupTransferencia({ cliente, fechar }) {
  const [fechando, setFechando] = useState(false);
  const [mensagem, setMensagem] = useState(null);

  const [valor, setValor] = useState("");
  const [contaDestino, setContaDestino] = useState("");
  const [agenciaDestino, setAgenciaDestino] = useState("");
  const [senha, setSenha] = useState("");


  const { data, load } = useClientes()

  async function sendData() {
    const movimentacao = {
      valor: parseFloat(valor.replace(",", ".")), // garante que é number
      conta_origem_id: cliente.conta.id, // conta do usuário logado
      conta_destino_id: null, // você precisará buscar pelo numero/agencia
      senha: senha,
    };


    try {
      const response = await Client.post('movimentacoes', movimentacao);
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

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    // eslint-disable-next-line default-case
    switch (name) {
      case "valor":
        const valorFormatado = value.replace(/[^\d,]/g, "");
        setValor(valorFormatado);
        break;

      case "senha":
        const senhaFormatada = value.replace(/\D/g, "").slice(0, 8);
        setSenha(senhaFormatada);
        break;
    }
  }, []);


  const validarContaDestino = (agencia, conta) => {
    return data.some(
      (cliente) => cliente?.conta.numeroAgencia === agencia && cliente?.conta?.numeroConta === conta
    );
  };

  // 🔧 FUNÇÃO DE VALIDAÇÃO
  const validarFormulario = () => {
    const erros = [];

    // Validação do Valor
    if (!valor.trim()) {
      erros.push("Valor é obrigatório");
    } else {
      const valorNumerico = parseFloat(valor.replace(",", "."));
      if (isNaN(valorNumerico) || valorNumerico <= 0) {
        erros.push("Valor deve ser um número positivo");
      } else if (valorNumerico > cliente.saldo) {
        erros.push("Saldo insuficiente para realizar a transferência");
      }
    }

    // Validação da Conta Destino
    if (!contaDestino.trim()) {
      erros.push("Conta destino é obrigatória");
    }

    // Validação da Agência Destino
    if (!agenciaDestino.trim()) {
      erros.push("Agência destino é obrigatória");
    }

    // Validação se a conta destino existe
    if (agenciaDestino.trim() && contaDestino.trim()) {
      const contaExiste = validarContaDestino(
        agenciaDestino,
        contaDestino
      );
      if (!contaExiste) {
        erros.push("Conta destino não encontrada");
      }
    }

    // 🔧 VALIDAÇÃO DA SENHA
    if (senha.trim()) {
      erros.push("Senha é obrigatória");
    } else if (senha.length !== 8) {
      erros.push("Senha deve ter exatamente 8 números");
    } else if (!/^\d{8}$/.test(senha)) {
      erros.push("Senha deve conter apenas números");
    } else if (senha !== cliente.senha) {
      erros.push("Senha incorreta");
    }

    return erros;
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // 🔧 VALIDA ANTES DE ENVIAR
      const erros = validarFormulario();

      if (erros.length > 0) {
        const mensagemErro = erros.map((erro) => `• ${erro}`).join("\n");

        setMensagem({
          texto: `Erros de validação:\n${mensagemErro}`,
          tipo: "error",
        });
        return;
      }

      // 🔧 SIMULAÇÃO DA TRANSFERÊNCIA
      try {
        const valorTransferencia = parseFloat(valor.replace(",", "."));

        // Aqui você faria a chamada API real para a transferência
        const transferenciaSucesso = true; // Simulação

        if (transferenciaSucesso) {
          setMensagem({
            texto: `Transferência de R$ ${valorTransferencia.toFixed(
              2
            )} realizada com sucesso!`,
            tipo: "success",
          });
          setTimeout(() => {
            if (fechar) fechar();
          }, 2000);
        } else {
          setMensagem({
            texto: "Erro ao realizar transferência!",
            tipo: "error",
          });
        }
      } catch (error) {
        setMensagem({
          texto: "Erro inesperado ao processar transferência",
          tipo: "error",
        });
      }
    },
    [fechar, cliente]
  );

  // 🔧 FORMATA O VALOR PARA EXIBIÇÃO
  const formatarSaldo = () => {
    return cliente?.conta?.saldo.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <>
      <Container className={fechando ? "fade-out" : ""}>
        <Popup>
          <BotaoFechar onClick={handleFechar}>
            <FiX size={28} color="#fff" />
          </BotaoFechar>

          <Formulario onSubmit={handleSubmit}>
            <SaldoInfo>Saldo Disponível: {formatarSaldo()}</SaldoInfo>

            <Label>Valor da Transferência</Label>
            <InputSeguro
              placeholder="0,00"
              name="valor"
              value={valor}
              onChange={handleInputChange}
            />

            <LinhaCampos>
              <div style={{ width: "100%" }}>
                <Label>Agência Destino</Label>
                <InputSeguro
                  placeholder="0000"
                  name="agenciaDestino"
                  value={agenciaDestino}
                  maxLength={4}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, "");
                    if (val.length > 4) val = val.slice(0, 4);
                    setAgenciaDestino(val);
                  }}
                />
              </div>

              <div style={{ width: "100%" }}>
                <Label>Conta Destino</Label>
                <InputSeguro
                  placeholder="00000-0"
                  name="contaDestino"
                  value={contaDestino}
                  maxLength={7}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, "");
                    if (val.length > 7) val = val.slice(0, 7);
                    setContaDestino(val);
                  }}
                />
              </div>
            </LinhaCampos>



            <Label>Senha para Confirmação</Label>
            <InputSeguro
              placeholder="Digite sua senha"
              name="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <BotaoEnviar type="submit">Transferir</BotaoEnviar>
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
