import { CategoriasToken } from "../constants/CategoriasToken";

/**
 * @brief Token léxico
 * @property { string } Categoria_ La categoría de este @c Token
 * @property { string } Tipo_ El tipo de este @c Token
 * @property { string } Valor_ El contenido de este @c Token
 * @param { string } Categoria La categoría que tendrá este @c Token
 * @param { string } Tipo El tipo de este @c Token
 * @param { string } Valor El contenido que contendrá este @c Token
 */
export class Token {

  private Categoria_: CategoriasToken;
  private Tipo_: string;
  private Valor_: string;

  public constructor( Tipo: string, Categoria: CategoriasToken, Valor: string ) {
    this.Tipo_ = Tipo;
    this.Categoria_ = Categoria;
    this.Valor_ = Valor;
  }

  /**
   * @brief Obtiene el contenido de este @c Token
   * @returns { string }
   */
  public get Valor(): string {
    return this.Valor_.valueOf();
  }

  /**
   * @brief Obtiene el tipo de este @c Token
   * @returns { string }
   */
  public get Tipo(): string {
    return this.Tipo_.valueOf();
  }

  /**
   * @brief Obtiene la categoría de este @c Token
   * @returns { CategoriasToken }
   */
  public get Categoria(): string {
    return this.Categoria_.valueOf();
  }

  /**
   * @brief Override de la función @c toString() por defeto de JavaScript
   */
  public toString(): string {
    return `<${ this.Tipo_ }:${ this.Categoria_ }:${ this.Valor_ }>`
  }
}