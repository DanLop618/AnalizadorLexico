import { TokenBase } from "../../util/types";
import { CategoriasToken } from "../CategoriasToken";

/**
 * @brief Tokens de palabras reservadas
 */
export const PalabrasReservadas: Array<TokenBase> = [
  {
    Tipo: "SALIR",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "break"
  },
  {
    Tipo: "CASO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "case"
  },
  {
    Tipo: "CONSTANTE",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "const"
  },
  {
    Tipo: "SALTAR_ITERACION",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "continue"
  },
  {
    Tipo: "CASO_POR_DEFECTO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "default"
  },
  {
    Tipo: "CICLO_DO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "do"
  },
  {
    Tipo: "NUMERO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "number"
  },
  {
    Tipo: "DE_OTR_FORMA",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "else"
  },
  {
    Tipo: "ENUMERACION",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "enum"
  },
  {
    Tipo: "CICLO_FOR",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "for"
  },
  {
    Tipo: "CONDICIONAL_SI",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "if"
  },
  {
    Tipo: "RETORNO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "return"
  },
  {
    Tipo: "TAMAÑO_BITS",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "sizeof"
  },
  {
    Tipo: "ESTATICO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "static"
  },
  {
    Tipo: "CLASE",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "class"
  },
  {
    Tipo: "INTERFAZ",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "interface"
  },
  {
    Tipo: "ABSTRACTO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "abstract"
  },
  {
    Tipo: "SEGUN",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "switch"
  },
  {
    Tipo: "VACIO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "void"
  },
  {
    Tipo: "CICLO_WHILE",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "while"
  },
  {
    Tipo: "POR_CADA",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "foreach"
  },
  {
    Tipo: "FALSO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "false"
  },
  {
    Tipo: "VERDADERO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "true"
  },
  {
    Tipo: "NULO",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "null"
  },
  {
    Tipo: "SIN_ELEMENTOS",
    Categoria: CategoriasToken.PalabrasReservadas,
    Valor: "empty"
  },
];