import { useEffect, useState } from 'react'
import { Corpo } from "./style";
import { OrbitProgress } from "react-loading-indicators";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import useClientes from "../../data/clientes";
import Extrato from "../../components/Extrato";
import { Client } from '../../api/client'


import { ContainerLoading } from "../../components/CredenciaisLogin/style";



export default function Home() {
  const [cliente, setCliente] = useState(null);
  const { data, load } = useClientes()

  function fetchData() {

    setTimeout(() => {
      Client.get('auth/me').then(res => {
        const user = res.data.user

        const clienteEncontrado = data.find(c => c.id === user.id);

        setCliente(clienteEncontrado)
      })
        .catch(function (error) {
          console.log(error)
        })
    }, 1000)
  }

  useEffect(() => {
    fetchData()
  }, [data])

  return (
    load
      ?
      <ContainerLoading>
        <OrbitProgress variant="spokes" color="#32cd32" size="medium" text="" textColor="" />
      </ContainerLoading>
      :
      <Corpo>
        <Cabecalho cliente={cliente} />
        <Extrato cliente={cliente} />
        <Rodape />
      </Corpo>

  );
}
