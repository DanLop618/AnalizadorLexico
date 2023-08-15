import { TokenBase } from "../../util/types";
import { CategoriasToken } from "../CategoriasToken";

/**
 * @brief Tokens de operadores
 */
export const Operadores: Array<TokenBase> = [
  {
    Tipo: "TRIPLE_DIRECCION_POTENCIA",
    Categoria: CategoriasToken.Operadores,
    Valor: "**="
  },
  {
    Tipo: "IGUALDAD",
    Categoria: CategoriasToken.Operadores,
    Valor: "==="
  },
  {
    Tipo: "DESIGUALDAD",
    Categoria: CategoriasToken.Operadores,
    Valor: "!=="
  },
  {
    Tipo: "BITS_IZQUIERDOS",
    Categoria: CategoriasToken.Operadores,
    Valor: '<<',
  },
  {
    Tipo: "BITS_DERECHOS",
    Categoria: CategoriasToken.Operadores,
    Valor: '>>',
  },
  {
    Tipo: "MAYOR_IGUAL_QUE",
    Categoria: CategoriasToken.Operadores,
    Valor: '>=',
  },
  {
    Tipo: "MENOR_IGUAL_QUE",
    Categoria: CategoriasToken.Operadores,
    Valor: '<=',
  },
  {
    Tipo: "LOGICO_AND",
    Categoria: CategoriasToken.Operadores,
    Valor: "&&"
  },
  {
    Tipo: "LOGICO_OR",
    Categoria: CategoriasToken.Operadores,
    Valor: "||"
  },
  {
    Tipo: "TRIPLE_DIRECCION_SUMA",
    Categoria: CategoriasToken.Operadores,
    Valor: "+="
  },
  {
    Tipo: "TRIPLE_DIRECCION_RESTA",
    Categoria: CategoriasToken.Operadores,
    Valor: "-="
  },
  {
    Tipo: "TRIPLE_DIRECCION_COCIENTE",
    Categoria: CategoriasToken.Operadores,
    Valor: "/="
  },
  {
    Tipo: "TRIPLE_DIRECCION_PRODUCTO",
    Categoria: CategoriasToken.Operadores,
    Valor: "*="
  },
  {
    Tipo: "POTENCIA",
    Categoria: CategoriasToken.Operadores,
    Valor: '**',
  },
  {
    Tipo: "COMPARACION_NULA",
    Categoria: CategoriasToken.Operadores,
    Valor: '??',
  },
  {
    Tipo: "SUMA",
    Categoria: CategoriasToken.Operadores,
    Valor: '+',
  },
  {
    Tipo: "RESTA",
    Categoria: CategoriasToken.Operadores,
    Valor: '-',
  },
  {
    Tipo: "PRODUCTO",
    Categoria: CategoriasToken.Operadores,
    Valor: '*',
  },
  {
    Tipo: "COCIENTE",
    Categoria: CategoriasToken.Operadores,
    Valor: '/',
  },
  {
    Tipo: "MODULO",
    Categoria: CategoriasToken.Operadores,
    Valor: '%',
  },
  {
    Tipo: "MENOR_QUE",
    Categoria: CategoriasToken.Operadores,
    Valor: '<',
  },
  {
    Tipo: "MAYOR_QUE",
    Categoria: CategoriasToken.Operadores,
    Valor: '>',
  },
  {
    Tipo: "BITWISEAND",
    Categoria: CategoriasToken.Operadores,
    Valor: '&',
  },
  {
    Tipo: "BITWISE_OR",
    Categoria: CategoriasToken.Operadores,
    Valor: '|',
  },
  {
    Tipo: "BITWISE_XOR",
    Categoria: CategoriasToken.Operadores,
    Valor: '^',
  },
  {
    Tipo: "NEGACION",
    Categoria: CategoriasToken.Operadores,
    Valor: '!',
  },
  {
    Tipo: "ACCESO",
    Categoria: CategoriasToken.Operadores,
    Valor: '.',
  },
  {
    Tipo: "ASIGNACION",
    Categoria: CategoriasToken.Operadores,
    Valor: '=',
  }
]