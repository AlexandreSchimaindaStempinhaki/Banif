import { Corpo } from "./style";
import CabecalhoGerente from "../../components/CabecalhoGerente";
import ListaClientes from "../../components/ListaClientes";
import Rodape from "../../components/Rodape";
export default function HomeGerente() {
  return (
    <Corpo>
      <CabecalhoGerente />
      <ListaClientes />
      <Rodape />
    </Corpo>
  );
}
