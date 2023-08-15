import { TokenBase } from "../../util/types"
import { CategoriasToken } from "../CategoriasToken";

/**
 * @brief Tokens de delimitadores
 */
export const Delimitadores: Array<TokenBase> = [
  {
    Tipo: "PARENTESIS_ABIERTO",
    Categoria: CategoriasToken.Delimitadores,
    Valor: '('
  },
  {
    Tipo: "PARENTESIS_CERRADO",
    Categoria: CategoriasToken.Delimitadores,
    Valor: ')'
  },
  {
    Tipo: "CORCHETE_ABIERTO",
    Categoria: CategoriasToken.Delimitadores,
    Valor: '['
  },
  {
    Tipo: "CORCHETE_CERRADO",
    Categoria: CategoriasToken.Delimitadores,
    Valor: ']'
  },
  {
    Tipo: "LLAVE_ABIERTA",
    Categoria: CategoriasToken.Delimitadores,
    Valor: '{'
  },
  {
    Tipo: "LLAVE_CERRADA",
    Categoria: CategoriasToken.Delimitadores,
    Valor: '}'
  },
  {
    Tipo: "SEPARADOR_PARAMETROS",
    Categoria: CategoriasToken.Delimitadores,
    Valor: ','
  },
  {
    Tipo: "FIN_EXPRESION",
    Categoria: CategoriasToken.Delimitadores,
    Valor: ';'
  },
];