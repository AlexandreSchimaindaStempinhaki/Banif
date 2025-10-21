import { useState } from "react";
import {
  ListaContainer,
  ClienteCard,
  NomeCliente,
  InfoCliente,
  ContainerBotoes,
  BotaoAcao,
  ContainerLoading,
} from "./style";
import PopupExtrato from "../PopupExtrato";
import useClientes  from "../../data/clientes";
import { OrbitProgress } from "react-loading-indicators";

export default function ListaClientes (){
  const { data, load } = useClientes()
  const [extratoAtivo, setExtratoAtivo] = useState(null);
  const [enderecoAtivo, setEnderecoAtivo] = useState(null);
  const [animando, setAnimando] = useState(null);

  const toggleEndereco = (index) => {
    setAnimando(index);
    setTimeout(() => {
      setEnderecoAtivo(enderecoAtivo === index ? null : index);
      setAnimando(null);
    }, 300);
  };

  if (load) {
    return (
       <ContainerLoading>
          <OrbitProgress variant="spokes" color="#002F6C" size="medium" text="" textColor="" />
       </ContainerLoading>
    );
  }

  return (
    <>
      <ListaContainer>
        {data.map((cliente, index) => {
          const mostrarEndereco = enderecoAtivo === index;
          const isAnimating = animando === index;

          return (
            <ClienteCard key={index} ativo={mostrarEndereco}>
              <NomeCliente>{cliente.nome}</NomeCliente>

              <div className={`info-wrapper ${isAnimating ? "animar" : ""}`}>
                {mostrarEndereco ? (
                  <>
                    <InfoCliente>
                      <strong>Rua:</strong> {cliente.rua}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Número:</strong> {cliente.numero}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Cidade:</strong> {cliente.cidade}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Estado:</strong> {cliente.estado}
                    </InfoCliente>
                  </>
                ) : (
                  <>
                    <InfoCliente>
                      <strong>CPF:</strong> {cliente.cpf}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Email:</strong> {cliente.email}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Agência:</strong> {cliente.conta.numeroAgencia}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Conta:</strong> {cliente.conta.numeroConta}
                    </InfoCliente>
                    {/* <InfoCliente>
                      <strong>Senha:</strong> {cliente.senha}
                    </InfoCliente> */}
                  </>
                )}
              </div>

              <ContainerBotoes>
                <BotaoAcao onClick={() => setExtratoAtivo(cliente)}>
                  Ver Extrato
                </BotaoAcao>
                <BotaoAcao onClick={() => toggleEndereco(index)}>
                  {mostrarEndereco ? "Ver Conta" : "Ver Endereço"}
                </BotaoAcao>
              </ContainerBotoes>
            </ClienteCard>
          );
        })}
      </ListaContainer>

      {extratoAtivo && (
        <PopupExtrato
          cliente={extratoAtivo}
          onClose={() => setExtratoAtivo(null)}
        />
      )}
    </>
  );
};
