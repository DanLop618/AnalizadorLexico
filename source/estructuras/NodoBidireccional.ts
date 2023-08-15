import { Cadena } from "../class/Cadena";

/**
 * @brief NodoBidireccional de datos
 * @template T El tipo de dato a almacenar
 * @property { T } Dato_ El dato a almacenar
 * @property { NodoBidireccional<T> | null } RefIzq_ La referencia al @c NodoBidireccional izquierdo
 * @property { NodoBidireccional<T> | null } RefDer_ La referencia al @c NodoBidireccional derecho
 * @param { T } Dato El dato que se almacenará en este @c NodoBidireccional
 * @param { NodoBidireccional<T> | null } RefIzq La referencia al @c NodoBidireccional izquierdo
 * @param { NodoBidireccional<T> | null } RefDer La referencia al @c NodoBidireccional derecho
 */
export class NodoBidireccional<T> {

  private Dato_: T;
  private RefIzq_: NodoBidireccional<T> | null;
  private RefDer_: NodoBidireccional<T> | null;

  public constructor( Dato: T, RefIzq: NodoBidireccional<T> | null, RefDer: NodoBidireccional<T> | null ) {
    this.Dato_ = Dato;
    this.RefIzq_ = RefIzq;
    this.RefDer_ = RefDer;
  }

  /**
   * @brief Devuelve el dato almacenado en este @c NodoBidireccional
   * @returns { T }
   */
  public get Dato(): T {
    return this.Dato_;
  }

  /**
   * @brief Obtiene la referencia izquierda de este @c NodoBidireccional
   * @returns { NodoBidireccional<T> | null }
   */
  public get RefIzq(): NodoBidireccional<T>| null {
    return this.RefIzq_;
  }

  /**
   * @brief Obtiene la referencia derecha de este @c NodoBidireccional
   * @returns { NodoBidireccional<T> | null }
   */
  public get RefDer(): NodoBidireccional<T> | null {
    return this.RefDer_;
  }

  /**
   * @brief Actualiza la referencia izquierda de este @c NodoBidireccional
   * @returns { NodoBidireccional<T> | null }
   */
  public set RefIzq( RefIzq: NodoBidireccional<T> | null ) {
    this.RefIzq_ = RefIzq;
  }

  /**
   * @brief Actualiza la referencia derecha de este @c NodoBidireccional
   * @returns { NodoBidireccional<T> | null }
   */
  public set RefDer( RefDer: NodoBidireccional<T> | null ) {
    this.RefDer_ = RefDer;
  }

  /**
   * @brief Devuelve el @c NodoBidireccional en forma de cadena
   * @returns { string }
   */
  private _RaizACadena( Raiz: NodoBidireccional<T> | null ): String {
    if ( !Raiz ) return "";
    var Resultante = new Cadena( `${ Raiz.Dato }` );
    const PunteroDerecho = "└──";
    const PunteroIzquierdo = Raiz.RefDer !== null ?  "├──" : "└──";
    this._HijoACadena( Resultante, "", PunteroIzquierdo, Raiz.RefIzq, Raiz.RefDer !== null );
    this._HijoACadena( Resultante, "", PunteroDerecho, Raiz.RefDer, false );
    return Resultante;
  }

  private _HijoACadena( Resultante: Cadena, Espaciado: string, Puntero: string, Raiz: NodoBidireccional<T> | null, ReferenciaDerecha: boolean ): void {
    if ( Raiz !== null ) {
      Resultante.Valor = Resultante.Concatenar( '\n', Espaciado, Puntero, `${ Raiz.Dato }` );
      const NuevoEspaciado = ReferenciaDerecha ? Espaciado.concat( "│  " ) : Espaciado.concat( "   " );
      const PunteroDerecho = "└──";
      const PunteroIzquierdo = Raiz.RefDer !== null ? "├──" : "└──";
      this._HijoACadena( Resultante, NuevoEspaciado, PunteroIzquierdo, Raiz.RefIzq, Raiz.RefDer !== null );
      this._HijoACadena( Resultante, NuevoEspaciado, PunteroDerecho, Raiz.RefDer, false );
    }
  }

  /**
   * Override de la función @c toString() por defeto de JavaScript
   */
  public toString(): string {
    return this._RaizACadena( this ).toString();
  }
}