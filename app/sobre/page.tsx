import { redirect } from "next/navigation";

// Este site agora é uma página única com rolagem — este link antigo
// continua funcionando e leva direto para a seção correspondente.
export default function SobreRedirect() {
  redirect("/#sobre");
}
