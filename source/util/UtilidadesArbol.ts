import { Token } from "../class/Token";
import { CategoriasToken } from "../constants/CategoriasToken";
import { DigitosHexadecimales } from "../constants/DigitosHexadecimales";
import { NodoBidireccional } from "../estructuras/NodoBidireccional";
import { Pila } from "../estructuras/Pila";
import Sleep from "./Sleep";

/**
 * @brief Árbol de expresiones binario
 */
export class UtilidadesArbol {

  /**
   * @brief Valida si un caracter es o no un operador
   * @param Caracter El caracter a validar
   * @returns 
   */
  private static EsOperador( Caracter: string ): boolean {
    return [
      '+',
      '-',
      '*',
      '/',
      '**'
    ].includes( Caracter );
  }

  /**
   * @brief Verifica la prioridad de un caracter operador
   * @param { string } Caracter El caracter que se verificará
   * @returns 
   */
  private static ObtenerPrioridad( Caracter: string ): number {
    return {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
      '^': 3
    }[ Caracter ] ?? 0;
  }

  /**
   * @brief Genera un sub-árbol a partir de los nodos ingresados
   * @param { NodoBidireccional<Token> } Raiz El @c NodoBidireccional raíz
   * @param { NodoBidireccional<Token> | null } RefIzq La referencia del @c NodoBidireccional izquierdo
   * @param { NodoBidireccional<Token> | null } RefDer La referencia del @c NodoBidireccional derecho
   * @returns NodoBidireccional<Token>
   */
  private static CrearSubArbol( Raiz: NodoBidireccional<Token>, RefIzq: NodoBidireccional<Token> | null, RefDer: NodoBidireccional<Token> | null ): NodoBidireccional<Token> {
    Raiz.RefIzq = RefIzq;
    Raiz.RefDer = RefDer;
    return Raiz;
  }

  /**
   * @brief Genera un árbol de expresiones a partir de una expresión dada
   * @param { string } Expresion La expresión a partir de la cuál se generará el árbol
   * @returns { NodoBidireccional<Token> }
   */
  public static async DesdeTokens( Tokens: Array<Token> ): Promise<NodoBidireccional<Token>> {
    const Nodos: Pila<NodoBidireccional<Token>> = new Pila<NodoBidireccional<Token>>();
    const Operadores: Pila<NodoBidireccional<Token>> = new Pila<NodoBidireccional<Token>>();
    for ( const SubToken of Tokens ) {
        const Token: NodoBidireccional<Token> = new NodoBidireccional<Token>( SubToken, null, null );
        if ( SubToken.Categoria === CategoriasToken.Delimitadores ) {
          if (
            SubToken.Tipo === "PARENTESIS_ABIERTO" ||
            SubToken.Tipo === "CORCHETE_ABIERTO"   ||
            SubToken.Tipo === "LLAVE_ABIERTA"
          ) {
            // console.log( "\n¡Delimitador encontrado!" );
            Operadores.Agregar( Token );
            // console.log( `Pila Nodos: ${ Nodos }` );
            // console.log( `Pila Operadores: ${ Operadores }` );
            // await Sleep( 250 );
          } else {
            let Apertura: string  = "";
            switch ( SubToken.Tipo ) {
              case "PARENTESIS_CERRADO":
                Apertura = "PARENTESIS_ABIERTO";
                break;
              case "CORCHETE_CERRADO":
                Apertura = "CORCHETE_ABIERTO";
                break;
              case "LLAVE_CERRADA":
                Apertura = "LLAVE_ABIERTA";
                break;
            }
            while ( !Operadores.Vacio() && Operadores.VerTope().Dato.Tipo !== Apertura ) {
              const Operando1: NodoBidireccional<Token> = Nodos.RemoverTope();
              const Operando2: NodoBidireccional<Token> = Nodos.RemoverTope();
              const Operador: NodoBidireccional<Token> = Operadores.RemoverTope();
              Nodos.Agregar( UtilidadesArbol.CrearSubArbol( Operador, Operando2, Operando1 ) );
            }
            Operadores.RemoverTope();
            // console.log( `Pila Nodos: ${ Nodos }` );
            // console.log( `Pila Operadores: ${ Operadores }` );
            // await Sleep( 250 );
          }
        } else if ( SubToken.Categoria === CategoriasToken.LiteralNumerico ) {
          // console.log( "\n¡Operando Encontrado!" );
          Nodos.Agregar( Token );
          // console.log( `Pila Nodos: ${ Nodos }` );
          // console.log( `Pila Operadores: ${ Operadores }` );
          // await Sleep( 250 );
        } else if ( SubToken.Categoria === CategoriasToken.Operadores ) {
          // console.log( "\n¡Operador Encontrado!" );
          while ( !Operadores.Vacio() && Operadores.VerTope().Dato.Tipo !== 'PARENTESIS_ABIERTO' && UtilidadesArbol.ObtenerPrioridad( SubToken.Valor ) <= UtilidadesArbol.ObtenerPrioridad( Operadores.VerTope().Dato.Valor ) ) {
            const Operando1: NodoBidireccional<Token> = Nodos.RemoverTope();
            const Operando2: NodoBidireccional<Token> = Nodos.RemoverTope();
            const Operador: NodoBidireccional<Token> = Operadores.RemoverTope();
            Nodos.Agregar( UtilidadesArbol.CrearSubArbol( Operador, Operando2, Operando1 ) );
            // console.log( "¡Sub-árbol Generado!" );
          }
          Operadores.Agregar( Token );
          // console.log( `Pila Nodos: ${ Nodos }` );
          // console.log( `Pila Operadores: ${ Operadores }` );
          // await Sleep( 250 );
        }
      }
      while ( !Operadores.Vacio() ) {
        const Operando1: NodoBidireccional<Token> = Nodos.RemoverTope();
        const Operando2: NodoBidireccional<Token> = Nodos.RemoverTope();
        const Operador: NodoBidireccional<Token> = Operadores.RemoverTope();
        Nodos.Agregar( UtilidadesArbol.CrearSubArbol( Operador, Operando2, Operando1 ) );
      }
    // }
    return Nodos.RemoverTope();
  }

  /**
   * @brief Genera una cadena de texto en forma post-orden del árbol de expresiones
   * @param { NodoBidireccional<Token> | null } Raiz El @c NodoBidireccional raíz 
   * @returns { string }
   */
  public static GenerarPostOrden( Raiz: NodoBidireccional<Token> | null ): string {
    if ( !Raiz ) return "";
    return UtilidadesArbol.GenerarPostOrden( Raiz.RefIzq ) + UtilidadesArbol.GenerarPostOrden( Raiz.RefDer ) + Raiz.Dato.Valor;
  }

  /**
   * @brief Genera una cadena de texto en forma pre-orden del árbol de expresiones
   * @param { NodoBidireccional<Token> | null } Raiz El @c NodoBidireccional raíz 
   * @returns { string }
   */
  public static GenerarPreOrden( Raiz: NodoBidireccional<Token> | null ): string {
    if ( !Raiz ) return "";
    return Raiz.Dato.Valor + UtilidadesArbol.GenerarPreOrden( Raiz.RefIzq ) + UtilidadesArbol.GenerarPreOrden( Raiz.RefDer );
  }

  /**
   * @brief Genera una cadena de texto en forma pre-orden del árbol de expresiones
   * @param { NodoBidireccional<Token> | null } Raiz El @c NodoBidireccional raíz 
   * @returns { string }
   */
  public static GenerarInOrden( Raiz: NodoBidireccional<Token> | null ): string {
    if ( !Raiz ) return "";
    const ES_OPERADOR = UtilidadesArbol.EsOperador( Raiz.Dato.Valor );
    const SEPARADOR_IZQUIERDO = ES_OPERADOR ? '(' : '';
    const SEPARADOR_DERECHO   = ES_OPERADOR ? ')' : '';
    return `${ SEPARADOR_IZQUIERDO }${ this.GenerarInOrden( Raiz.RefIzq ) }${ Raiz.Dato.Valor }${ this.GenerarInOrden( Raiz.RefDer ) }${ SEPARADOR_DERECHO }`;
  }

  /**
   * @brief Valida una expresión algebráica y devuelve el resultado si esta es correcta
   * @param { NodoBidireccional<Token> | null } Raiz EL @c NodoBidireccional raíz
   * @returns { Number }
   */
  public static Validar( Raiz: NodoBidireccional<Token> | null ) {
    if ( Raiz === null ) return 0;
    if ( UtilidadesArbol.EsOperador( Raiz.Dato.Valor ) ) {
      const ResultadoIzquierdo = UtilidadesArbol.Validar( Raiz.RefIzq );
      const ResultadoDerecho = UtilidadesArbol.Validar( Raiz.RefDer );
      switch( Raiz.Dato.Valor ) {
        case '+':
          console.log( `SUMA: ${ ResultadoIzquierdo } + ${ ResultadoDerecho }` );
          return ResultadoIzquierdo + ResultadoDerecho;
        case '-':
          console.log( `RESTA: ${ ResultadoIzquierdo } - ${ ResultadoDerecho }` );
          return ResultadoIzquierdo - ResultadoDerecho;
        case '/':
          if ( ResultadoDerecho === 0 ) throw "ErrorValidacion: No se puede dividir un número entre 0."
          console.log( `DIVISION: ${ ResultadoIzquierdo } / ${ ResultadoDerecho }` );
          return ResultadoIzquierdo / ResultadoDerecho;
        case '*':
          console.log( `MULTIPLICACION: ${ ResultadoIzquierdo } * ${ ResultadoDerecho }` );
          return ResultadoIzquierdo * ResultadoDerecho;
        case '**':
          console.log( `POTENCIA: ${ ResultadoIzquierdo } ^ ${ ResultadoDerecho }` );
          return Math.pow( ResultadoIzquierdo, ResultadoDerecho );
      }
    }
    if ( Raiz.Dato.Valor.match( /b/ ) ) return UtilidadesArbol.ObtenerBinario( Raiz.Dato.Valor.replace( /b/g, '' ) );
    else if ( Raiz.Dato.Valor.match( /h/ ) ) return UtilidadesArbol.ObtenerHex( Raiz.Dato.Valor.replace( /h/g, '' ) );
    else return Number.parseFloat( Raiz.Dato.Valor.replace( /d/g, '' ) );
  }

  /**
   * @brief Convierte u número hexadecimal a decimal
   * @param { string } Numero El número hexadecimal
   * @returns { Number }
   */
  private static ObtenerHex( Numero: string ) {
    const Entero = Number.parseInt( Numero.split( '.' )[ 0 ], 16 ).toString();
    const DecimalesHex = Numero.split( '.' )[ 1 ];
    let Decimales = 0;
    if ( DecimalesHex ) {
      for ( let i = 0, j = -1; i < DecimalesHex.length; i++, j-- ) {
        if ( DecimalesHex[ i ] === '0' ) continue;
        const Conversion = Math.pow( DigitosHexadecimales[ DecimalesHex[ i ] ], j );
        Decimales = Decimales + Conversion;
      }
    }
    return Number.parseFloat( `${ Entero }.${ Decimales }` );
  }
  
  /**
   * @brief Convierte un número binario a decimal
   * @param { string } Numero El número binario
   * @returns { Number }
   */
  private static ObtenerBinario( Numero: string ) {
    const Entero = Number.parseInt( Numero.split( '.' )[ 0 ], 2 ).toString();
    const DecimalesBin = Numero.split( '.' )[ 1 ];
    let Decimales = 0;
    if ( DecimalesBin ) {
      for ( let i = 0, j = -1; i < DecimalesBin.length; i++, j-- ) {
        if ( DecimalesBin[ i ] === '0' ) continue;
        const Conversion = Math.pow( Number.parseInt( DecimalesBin[ i ] ), j );
        Decimales = Decimales + Conversion;
      }
    }
    return Number.parseFloat( `${ Entero }.${ Decimales }` );
  }
}