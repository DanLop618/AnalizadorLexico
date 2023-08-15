import { CategoriasToken } from "../constants/CategoriasToken";

/**
 * @brief Datos básicos de un @c Token
 */
export interface TokenBase {
  Tipo: string;
  Categoria: CategoriasToken;
  Valor: string;
}