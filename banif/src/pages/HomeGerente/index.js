import { Corpo } from "./style";
import CabecalhoGerente from "../../components/CabecalhoGerente";
import ListaClientes from "../../components/ListaClientes";
import Rodape from "../../components/Rodape";
import { getDataUser } from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { getPermissions } from "../../service/PermissionService";
import { useEffect } from "react";

export default function HomeGerente() {

  const dataUser  = getDataUser()
  const navigate = useNavigate();
  const permissions = getPermissions()


  function verifyPermission() {
        if(!dataUser) navigate('/')
        else if(permissions.viewUser === false) navigate(-1)
    }

    useEffect(() => {
        verifyPermission()
    }, []);

  return (
    <Corpo>
      <CabecalhoGerente />
      <ListaClientes />
      <Rodape />
    </Corpo>
  );
}
