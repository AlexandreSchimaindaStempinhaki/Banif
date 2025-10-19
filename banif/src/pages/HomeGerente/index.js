import { Corpo } from "./style";
import CabecalhoGerente from "../../components/CabecalhoGerente";
import ListaClientes from "../../components/ListaClientes";
export default function HomeGerente() {
  return (
    <Corpo>
      <CabecalhoGerente />
      <ListaClientes />
    </Corpo>
  );
}
