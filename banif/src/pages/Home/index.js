// import { useParams } from "react-router-dom";
// import { Corpo } from "./style";
// import Cabecalho from "../../components/Cabecalho";
// import Rodape from "../../components/Rodape";
// import { clientes } from "../../data/clientes";

// export default function Home() {
//   const { email } = useParams();

//   const emailDecodificado = decodeURIComponent(email);

//   const cliente = clientes.find(
//     (cliente) => cliente.email === emailDecodificado
//   );

//   if (!cliente) {
//     return <div>Cliente não encontrado!</div>;
//   }

//   return (
//     <Corpo>
//       <Cabecalho cliente={cliente} />
//       <Rodape />
//     </Corpo>
//   );
// }
