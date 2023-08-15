/**
 * @brief Nodo unidireccional contendor
 * @template T El tipo de dato que almacenará este contenedor
 * @property { T } Dato_ El dato almacenado en este @c NodoUnidireccional
 * @property { NodoUnidireccional<T> | null } Ref_ El contenedor referenciado en este @c NodoUnidireccional
 * @param { T } Dato El dato a almacenar
 * @param { NodoUnidireccional<T> | null } Ref La referencia al @c NodoUnidireccional contenedor siguiente
 */
export class NodoUnidireccional<T> {

  protected Dato_: T;
  protected Ref_: NodoUnidireccional<T> | null;

  public constructor( Dato: T, Ref: NodoUnidireccional<T> | null ) {
    this.Dato_ = Dato;
    this.Ref_ = Ref;
  }

  /**
   * @brief Obtiene el dato contenido en este @c Nodo
   * @returns { T }
   */
  public get Dato(): T {
    return this.Dato_;
  }

  /**
   * @brief Obtiene el contenedor referenciado en este @c Nodo
   * @returns { NodoUnidireccional<T> | null }
   */
  public get Ref(): NodoUnidireccional<T> | null {
    return this.Ref_;
  }

  /**
   * @brief Devuelve el @c NodoUnidireccional en forma de cadena
   * @returns { string }
   */
  public ACadena(): string {
    let Ref = this.Ref_ ? `<*>` : `<NULL>`;
    return `NodoUnidireccional<'${ this.Dato_ }'> -> ${ Ref }`;
  }
}

/**
 * Override de la función @c toString() por defeto de JavaScript
 */
NodoUnidireccional.prototype.toString = function(): string {
  return this.ACadena();
}