/**
 * @brief Cadena de texto de tipo objeto para permitir el traspaso de punteros
 * @property { string } Valor_ El contenido de esta @c Cadena
 * @param { string } Valor El contenido que contendrá esta @c Cadena
 */
export class Cadena extends String {

  private Valor_: string;

  public constructor( Valor: string ) {
    super( Valor );
    this.Valor_ = Valor;
  }

  /**
   * @brief Devuelve el valor de esta @c Cadena
   * @returns { string }
   */
  public get Valor(): string {
    return this.Valor_;
  }

  /**
   * @brief Actualiza el valor de esta @c Cadena
   * @param { string } Valor El nuevo valor de esta @c Cadena
   */
  public set Valor( Valor: string ) {
    this.Valor_ = Valor;
  }

  /**
   * Concatena cadenas primitivas con el valor que contiene esta @c Cadena
   * @param { Array<string> } CadenasPrimitivas Las cadenas primitivas a concatenar con esta @c Cadena
   * @returns { string }
   */
  public Concatenar( ...CadenasPrimitivas: Array<string> ): string {
    return this.Valor_.concat( CadenasPrimitivas.join( '' ) );
  }

  /**
   * Override de la función @c toString() por defeto de JavaScript
   */
  public toString(): string {
    return this.Valor_;
  }
}