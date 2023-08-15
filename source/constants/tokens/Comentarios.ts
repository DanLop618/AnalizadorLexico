import { TokenBase } from "../../util/types"
import { CategoriasToken } from "../CategoriasToken";

/**
 * @brief Tokens de comentarios
 */
export const Comentarios: Array<TokenBase> = [
  {
    Tipo: "COMENTARIO_SIMPLE",
    Categoria: CategoriasToken.Comentarios,
    Valor: '//'
  },
  {
    Tipo: "COMENTARIO_BLOQUE_ABIERTO",
    Categoria: CategoriasToken.Comentarios,
    Valor: '/*'
  },
  {
    Tipo: "COMENTARIO_BLOQUE_CERRADO",
    Categoria: CategoriasToken.Comentarios,
    Valor: '*/'
  },
  {
    Tipo: "COMENTARIO_PYTHON",
    Categoria: CategoriasToken.Comentarios,
    Valor: '#'
  }
];