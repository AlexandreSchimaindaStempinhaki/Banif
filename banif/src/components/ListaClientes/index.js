// src/components/ListaClientes/index.js
import { useState } from "react";
import {
  ListaContainer,
  ClienteCard,
  NomeCliente,
  InfoCliente,
  ContainerBotoes,
  BotaoAcao,
} from "./style";
import PopupExtrato from "../PopupExtrato";
import { clientes } from "../../data/clientes"; 

export default function ListaClientes (){
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

  return (
    <>
      <ListaContainer>
        {clientes.map((cliente, index) => {
          const mostrarEndereco = enderecoAtivo === index;
          const isAnimating = animando === index;

          return (
            <ClienteCard key={index} ativo={mostrarEndereco}>
              <NomeCliente>{cliente.nome}</NomeCliente>

              <div className={`info-wrapper ${isAnimating ? "animar" : ""}`}>
                {mostrarEndereco ? (
                  <>
                    <InfoCliente>
                      <strong>Rua:</strong> {cliente.endereco.rua}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Número:</strong> {cliente.endereco.numero}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Cidade:</strong> {cliente.endereco.cidade}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Estado:</strong> {cliente.endereco.estado}
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
                      <strong>Agência:</strong> {cliente.agencia}
                    </InfoCliente>
                    <InfoCliente>
                      <strong>Conta:</strong> {cliente.conta}
                    </InfoCliente>
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
