import { TokenBase } from "../../util/types";
import { CategoriasToken } from "../CategoriasToken";

/**
 * @brief Tokens de símbolo especiales
 */
export const SimbolosEspeciales: Array<TokenBase> = [
  {
    Tipo: "APERTURA_TERNARIA",
    Categoria: CategoriasToken.SimbolosEspeciales,
    Valor: "?"
  },
  {
    Tipo: "DECISION_TERNARIA",
    Categoria: CategoriasToken.SimbolosEspeciales,
    Valor: ":"
  },
  {
    Tipo: "APERTURA_LITERAL",
    Categoria: CategoriasToken.SimbolosEspeciales,
    Valor: "$"
  }
];