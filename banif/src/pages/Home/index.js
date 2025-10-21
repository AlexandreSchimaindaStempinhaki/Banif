import { useEffect, useState } from 'react'
import { Corpo } from "./style";
import { OrbitProgress } from "react-loading-indicators";
import Cabecalho from "../../components/Cabecalho";
import Rodape from "../../components/Rodape";
import useClientes from "../../data/clientes";
import Extrato from "../../components/Extrato";
import { Client } from '../../api/client'
import { getDataUser } from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { getPermissions } from "../../service/PermissionService";


import { ContainerLoading } from "../../components/CredenciaisLogin/style";

export default function Home() {
  const [cliente, setCliente] = useState(null);
  const { data } = useClientes()

  const dataUser = getDataUser()
  const navigate = useNavigate();
  const permissions = getPermissions()

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


  function verifyPermission() {
    if (!dataUser) navigate('/')
    else if (permissions.viewUser === false) navigate(-1)
  }
  useEffect(() => {
    verifyPermission()
    fetchData()
  }, [data])

  return (
      <Corpo>
        <Cabecalho cliente={cliente} />
        <Extrato cliente={cliente} />
        <Rodape />
      </Corpo>

  );
}
