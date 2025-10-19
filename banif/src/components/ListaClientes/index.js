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

const ListaClientes = ({ clientes }) => {
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

export default function Clientes() {
  const clientes = [
    {
      nome: "João Silva",
      cpf: "123.456.789-00",
      email: "joao.silva@email.com",
      agencia: "0001-0",
      conta: "123456-7",
      saldo: 3500,
      endereco: {
        rua: "Rua das Flores",
        numero: 120,
        cidade: "São Paulo",
        estado: "SP",
      },
      extrato: [
        { descricao: "Salário", valor: 3000, tipo: "entrada" },
        { descricao: "Netflix", valor: 45, tipo: "saida" },
        { descricao: "Transferência enviada", valor: 500, tipo: "saida" },
        { descricao: "Freelance", valor: 800, tipo: "entrada" },
        { descricao: "Aluguel", valor: 1200, tipo: "saida" },
        { descricao: "Supermercado", valor: 300, tipo: "saida" },
        { descricao: "Transferência recebida", valor: 200, tipo: "entrada" },
        { descricao: "Academia", valor: 150, tipo: "saida" },
        { descricao: "Pagamento Cartão", valor: 500, tipo: "saida" },
        { descricao: "Bônus", valor: 1000, tipo: "entrada" },
        { descricao: "Pix recebido", valor: 250, tipo: "entrada" },
      ],
    },
    {
      nome: "Maria Souza",
      cpf: "987.654.321-00",
      email: "maria.souza@email.com",
      agencia: "0001-0",
      conta: "654321-0",
      saldo: 4200,
      endereco: {
        rua: "Avenida Central",
        numero: 555,
        cidade: "Rio de Janeiro",
        estado: "RJ",
      },
      extrato: [
        { descricao: "Salário", valor: 4000, tipo: "entrada" },
        { descricao: "Aluguel", valor: 1200, tipo: "saida" },
        { descricao: "Supermercado", valor: 350, tipo: "saida" },
        { descricao: "Pix recebido", valor: 500, tipo: "entrada" },
        { descricao: "Restaurante", valor: 200, tipo: "saida" },
        { descricao: "Transferência enviada", valor: 300, tipo: "saida" },
        { descricao: "Freelance", valor: 600, tipo: "entrada" },
        { descricao: "Farmácia", valor: 100, tipo: "saida" },
        { descricao: "Academia", valor: 150, tipo: "saida" },
        { descricao: "Transferência recebida", valor: 250, tipo: "entrada" },
        { descricao: "Pix recebido", valor: 400, tipo: "entrada" },
      ],
    },
    {
      nome: "Carlos Pereira",
      cpf: "321.654.987-00",
      email: "carlos.pereira@email.com",
      agencia: "0002-0",
      conta: "987654-3",
      saldo: 2800,
      endereco: {
        rua: "Rua das Palmeiras",
        numero: 45,
        cidade: "Curitiba",
        estado: "PR",
      },
      extrato: [
        { descricao: "Salário", valor: 3200, tipo: "entrada" },
        { descricao: "Aluguel", valor: 1000, tipo: "saida" },
        { descricao: "Supermercado", valor: 400, tipo: "saida" },
        { descricao: "Transferência recebida", valor: 600, tipo: "entrada" },
      ],
    },
    {
      nome: "Fernanda Lima",
      cpf: "159.753.486-22",
      email: "fernanda.lima@email.com",
      agencia: "0003-0",
      conta: "112233-4",
      saldo: 2000,
      endereco: {
        rua: "Rua dos Girassóis",
        numero: 88,
        cidade: "Belo Horizonte",
        estado: "MG",
      },
      extrato: [
        { descricao: "Salário", valor: 3500, tipo: "entrada" },
        { descricao: "Aluguel", valor: 1300, tipo: "saida" },
        { descricao: "Supermercado", valor: 450, tipo: "saida" },
      ],
    },
    {
      nome: "Bruno Costa",
      cpf: "258.147.963-11",
      email: "bruno.costa@email.com",
      agencia: "0004-0",
      conta: "556677-8",
      saldo: 2500,
      endereco: {
        rua: "Travessa do Sol",
        numero: 22,
        cidade: "Rio de Janeiro",
        estado: "RJ",
      },
      extrato: [
        { descricao: "Salário", valor: 3000, tipo: "entrada" },
        { descricao: "Aluguel", valor: 1000, tipo: "saida" },
        { descricao: "Supermercado", valor: 500, tipo: "saida" },
      ],
    },
    {
      nome: "Patrícia Almeida",
      cpf: "741.852.963-33",
      email: "patricia.almeida@email.com",
      agencia: "0002-0",
      conta: "223344-5",
      saldo: 3300,
      endereco: {
        rua: "Rua Dom Pedro II",
        numero: 301,
        cidade: "Porto Alegre",
        estado: "RS",
      },
      extrato: [
        { descricao: "Salário", valor: 4000, tipo: "entrada" },
        { descricao: "Pix recebido", valor: 250, tipo: "entrada" },
        { descricao: "Aluguel", valor: 1200, tipo: "saida" },
        { descricao: "Supermercado", valor: 350, tipo: "saida" },
      ],
    },
    {
      nome: "Rafael Gomes",
      cpf: "369.258.147-77",
      email: "rafael.gomes@email.com",
      agencia: "0005-0",
      conta: "998877-0",
      saldo: 2900,
      endereco: {
        rua: "Rua São José",
        numero: 145,
        cidade: "Salvador",
        estado: "BA",
      },
      extrato: [
        { descricao: "Salário", valor: 3800, tipo: "entrada" },
        { descricao: "Aluguel", valor: 1300, tipo: "saida" },
        { descricao: "Pix recebido", valor: 200, tipo: "entrada" },
      ],
    },
    {
      nome: "Juliana Rocha",
      cpf: "852.963.741-55",
      email: "juliana.rocha@email.com",
      agencia: "0001-0",
      conta: "445566-1",
      saldo: 4100,
      endereco: {
        rua: "Avenida das Américas",
        numero: 7777,
        cidade: "Rio de Janeiro",
        estado: "RJ",
      },
      extrato: [
        { descricao: "Salário", valor: 4200, tipo: "entrada" },
        { descricao: "Transferência enviada", valor: 300, tipo: "saida" },
        { descricao: "Pix recebido", valor: 150, tipo: "entrada" },
      ],
    },
    {
      nome: "Thiago Nunes",
      cpf: "147.258.369-99",
      email: "thiago.nunes@email.com",
      agencia: "0003-0",
      conta: "334455-2",
      saldo: 3800,
      endereco: {
        rua: "Rua XV de Novembro",
        numero: 89,
        cidade: "Curitiba",
        estado: "PR",
      },
      extrato: [
        { descricao: "Salário", valor: 3600, tipo: "entrada" },
        { descricao: "Supermercado", valor: 400, tipo: "saida" },
        { descricao: "Pix recebido", valor: 200, tipo: "entrada" },
        { descricao: "Transferência enviada", valor: 500, tipo: "saida" },
        { descricao: "Cartão de crédito", valor: 800, tipo: "saida" },
        { descricao: "Freelance", valor: 600, tipo: "entrada" },
        { descricao: "Academia", valor: 150, tipo: "saida" },
        { descricao: "Pix recebido", valor: 350, tipo: "entrada" },
        { descricao: "Pagamento Uber", valor: 120, tipo: "saida" },
        { descricao: "Transferência recebida", valor: 450, tipo: "entrada" },
        { descricao: "Pix recebido", valor: 300, tipo: "entrada" },
      ],
    },
    {
      nome: "Camila Ribeiro",
      cpf: "963.852.741-44",
      email: "camila.ribeiro@email.com",
      agencia: "0004-0",
      conta: "667788-9",
      saldo: 3600,
      endereco: {
        rua: "Rua Bela Vista",
        numero: 210,
        cidade: "São Paulo",
        estado: "SP",
      },
      extrato: [
        { descricao: "Salário", valor: 3900, tipo: "entrada" },
        { descricao: "Aluguel", valor: 1200, tipo: "saida" },
        { descricao: "Supermercado", valor: 350, tipo: "saida" },
      ],
    },
  ];
  return <ListaClientes clientes={clientes} />;
}
