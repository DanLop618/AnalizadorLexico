import { NodoUnidireccional } from "./NodoUnidireccional";

/**
 * @brief Pila de nodos contenedores con comportamiento LIFO
 * @template T El tipo de dato que contendrán los nodos de esta @c Pila
 * @property { NodoUnidireccional<T> | null } Tope El tope de esta @c Pila
 * @property { number } Count Los elementos totales de esta @c Pila
 */
export class Pila<T> {

  private Tope: NodoUnidireccional<T> | null;
  private Count: number;

  public constructor() {
    this.Tope = null;
    this.Count = 0;
  }

  /**
   * @brief Añade un nuevo dato a esta @c Pila
   * @param { T } Dato El dato a agregar
   */
  public Agregar( Dato: T ): void {
    this.Tope = new NodoUnidireccional<T>( Dato, this.Tope );
    this.Count++;
  }

  /**
   * @brief Devuelve el último elemento añadido a esta @c Pila removiéndolo
   * @returns { T }
   */
  public RemoverTope(): T {
    if ( !this.Tope ) throw "";
    const Dato = this.Tope.Dato;
    let Nodo = this.Tope;
    this.Tope = Nodo.Ref;
    this.Count--;
    return Dato;
  }

  /**
   * @brief Devuelve el último elemento añadido a esta @c Pila, pero no lo remueve
   * @returns { T }
   */
  public VerTope(): T {
    if ( !this.Tope ) throw "";
    return this.Tope.Dato;
  }

  /**
   * @brief Si esta @c Pila tiene o no datos
   * @returns { boolean }
   */
  public Vacio(): boolean {
    return this.Tope === null;
  }

  /**
   * @brief Devuelve la @c Pila en forma de cadena
   * @returns { string }
   */
  public ACadena(): string {
    const PilaAuxiliar = new Pila<T>();
    let Resultado: string = "";
    while ( !this.Vacio() ) {
      let Dato = this.RemoverTope();
      PilaAuxiliar.Agregar( Dato );
      Resultado += this.Tope !== null ? Dato + ', ' : Dato;
    }
    while ( !PilaAuxiliar.Vacio() ) this.Agregar( PilaAuxiliar.RemoverTope() );
    return Resultado;
  }
}

/**
 * Override de la función @c toString() por defeto de JavaScript
 */
Pila.prototype.toString = function(): string {
  return this.ACadena();
}