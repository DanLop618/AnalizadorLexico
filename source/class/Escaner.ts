import { CategoriasToken } from "../constants/CategoriasToken";
import { EstadosEscaner } from "../constants/EstadosEscaner";
import { Comentarios } from "../constants/tokens/Comentarios";
import { Delimitadores } from "../constants/tokens/Delimitadores";
import { Operadores } from "../constants/tokens/Operadores";
import { PalabrasReservadas } from "../constants/tokens/PalabrasReservadas";
import { SimbolosEspeciales } from "../constants/tokens/SimbolosEspeciales";
import { TokenBase } from "../util/types";
import { Token } from "./Token";

/**
 * @brief Escaner de texto para análisis léxico
 * @property { Array<Token> } Tokens Los tokens analizados por este @c Escaner
 * @property { EstadosEscaner } Estados El estado actual de este @c Escaner
 */
export class Escaner {

  private Tokens: Array<Token> = [];
  private Estados: Array<EstadosEscaner> = [];

  /**
   * @brief Escanea y analiza un texto
   * @param { string } Fuente El texto fuente a analizar
   * @returns { Array<Token> }
   */
  public Escanear( Fuente: string ) {
    const Lineas: Array<string> = Fuente.replace( / /g, '' ).split( '\n' ).filter(( el ) => el !== "");
    const Expresion: RegExp = this.ObtenerRegExp();
    for ( let i = 0; i < Lineas.length; i++ ) {
      const Coincidencias = Lineas[ i ].match( Expresion )?.filter(( el ) => el !== "");
      if ( !Coincidencias ) continue;
      for ( const Coincidencia of Coincidencias ) {
        this.Tokens.push( this.ObtenerToken( Coincidencia ) );
      }
    }
    if ( this.Estados.length ) this.Tokens.push( ...this.ObtenerCodigosError() );
    return this.Tokens;
  }

  /**
   * @brief Obtiene la expresión regular general de este @c Escaner
   * @returns { RegExp }
   */
  private ObtenerRegExp(): RegExp {
    let Expresion = "";
    for ( const Categoria of Object.values( CategoriasToken ) ) {
      switch ( Categoria ) {
        case CategoriasToken.PalabrasReservadas:
          Expresion += `(?<palabras_reservadas>${ this.ObtenerRegExpPalabrasReservadas() })`;
          break;
        case CategoriasToken.Delimitadores:
            Expresion += '|'.concat( `(?<delimitadores>${ this.ObtenerRegExpDelimitadores() })` );
            break;
        case CategoriasToken.LiteralNumerico:
            Expresion += '|'.concat( `(?<numeros>[0-9]{0,}[.,]?[0-9]{0,}d|[0-9aA-fF]{0,}[.,]?[0-9aA-fF]{0,}h|[0-1]{0,}[.,]?[0-1]{0,}b)` );
            break;
        case CategoriasToken.Identificadores:
          Expresion += '|'.concat( `(?<identificadores>[_aA-zZ][_aA-zZ0-9]{0,30})` );
          break;
        case CategoriasToken.LiteralCadena:
          Expresion += '|'.concat( `(?<cadenas>[\\"].{0,}[\\"])` );
          Expresion += '|'.concat( `(?<cadenas_s>[\\'].{0,}[\\'])` );
          Expresion += '|'.concat( `(?<cadenas_l>[\\\`].{0,}[\\\`])` );
          break;
        case CategoriasToken.Comentarios:
          Expresion += '|'.concat( `(?<comentarios>${ this.ObtenerRegExpComentarios() })` );
          break;
        case CategoriasToken.Operadores:
          Expresion += '|'.concat( `(?<operadores>${ this.ObtenerRegExpOperadores() })` );
          break;
        case CategoriasToken.SimbolosEspeciales:
          Expresion += '|'.concat( `(?<simbolos_especiales>${ this.ObtenerRegExpSimbolosEspeciales() })` );
          break;
      }
    }
    return new RegExp( Expresion, 'gm');
  }

  private ObtenerRegExpDelimitadores(): string {
    const MapaDelimitadores = Delimitadores.map(( Operador ) => {
      return this.NormalizarExpresion( Operador.Valor );
    });
    return MapaDelimitadores.join( '|' );
  }

  private ObtenerRegExpComentarios(): string {
    const MapaComentarios = Comentarios.map(( Elemento ) => {
      return this.NormalizarExpresion( Elemento.Valor );
    });
    return MapaComentarios.join( '|' );
  }

  private ObtenerRegExpPalabrasReservadas(): string {
    const MapaPalabrasReservadas = PalabrasReservadas.map(( Elemento ) => {
      return Elemento.Valor;
    });
    return MapaPalabrasReservadas.join( '|' );
  }

  private ObtenerRegExpOperadores(): string {
    const MapaOperadores = Operadores.map(( Elemento ) => {
      return this.NormalizarExpresion( Elemento.Valor );
    });
    return MapaOperadores.join( '|' );
  }

  private ObtenerRegExpSimbolosEspeciales(): string {
    const MapaSimbolosEspeciales = SimbolosEspeciales.map(( Elemento ) => {
      return this.NormalizarExpresion( Elemento.Valor );
    });
    return MapaSimbolosEspeciales.join( '|' );
  }

  private NormalizarExpresion( Valor: string ) {
    let OperadorNormalizado: string = "";
    for ( const Caracter of Valor ) {
      OperadorNormalizado += `\\${ Caracter }`;
    }
    return OperadorNormalizado;
  }

  private ObtenerCodigosError(): Array<Token> {
    const Tokens: Array<Token> = [];
    let MensajeError: string = "";
    for ( const Estado of this.Estados ) {
      switch ( Estado ) {
        case EstadosEscaner.GrupoParentesisAbierto:
          MensajeError = "El grupo de paréntesis jamás fue cerrado.";
          break;
        case EstadosEscaner.GrupoCorcheteAbierto:
          MensajeError = "El grupo de corchetes jamás fue cerrado.";
          break;
        case EstadosEscaner.GrupoLlaveAbierta:
          MensajeError = "El grupo de llaves jamás fue cerrado.";
          break;
        case EstadosEscaner.CadenaSimpleAbierta:
          MensajeError = "La cadena simple jamás fue cerrada.";
          break;
        case EstadosEscaner.CadenaAbierta:
          MensajeError = "La cadena jamás fue cerrada.";
          break;
        case EstadosEscaner.LiteralAbierta:
          MensajeError = "La cadena literal jamás fue cerrada.";
          break;
        case EstadosEscaner.ComentarioBloqueAbierto:
          MensajeError = "El comentario de bloque jamás fue cerrado.";
          break;
      }
      Tokens.push( new Token( "ERROR", CategoriasToken.Excepciones, MensajeError ) );
    }
    return Tokens;
  }

  private AtualizarEstado( Coincidencia: string ) {
    let Index: number;
    switch ( Coincidencia ) {
      case '(':
        this.Estados.push( EstadosEscaner.GrupoParentesisAbierto );
        break;
      case '[':
        this.Estados.push( EstadosEscaner.GrupoCorcheteAbierto );
        break;
      case '{':
        this.Estados.push( EstadosEscaner.GrupoLlaveAbierta );
        break;
      case "'":
        Index = this.Estados.indexOf( EstadosEscaner.CadenaSimpleAbierta );
        if ( Index === -1 ) this.Estados.push( EstadosEscaner.CadenaSimpleAbierta );
        delete this.Estados[ Index ];
        this.Estados = this.Estados.filter(( el ) => el !== undefined);
        break;
      case "\"":
        Index = this.Estados.indexOf( EstadosEscaner.CadenaAbierta );
        if ( Index === -1 ) this.Estados.push( EstadosEscaner.CadenaAbierta );
        delete this.Estados[ Index ];
        this.Estados = this.Estados.filter(( el ) => el !== undefined);
        break;
      case "`":
        Index = this.Estados.indexOf( EstadosEscaner.LiteralAbierta );
        if ( Index === -1 ) this.Estados.push( EstadosEscaner.LiteralAbierta );
        delete this.Estados[ Index ];
        this.Estados = this.Estados.filter(( el ) => el !== undefined);
        break;
      case "/*":
        this.Estados.push( EstadosEscaner.ComentarioBloqueAbierto );
        break;
      case ')':
        Index = this.Estados.indexOf( EstadosEscaner.GrupoParentesisAbierto );
        if ( Index === -1 ) return;
        delete this.Estados[ Index ];
        this.Estados = this.Estados.filter(( el ) => el !== undefined);
        break;
      case ']':
        Index = this.Estados.indexOf( EstadosEscaner.GrupoCorcheteAbierto );
        if ( Index === -1 ) return;
        delete this.Estados[ Index ];
        this.Estados = this.Estados.filter(( el ) => el !== undefined);
        break;
      case '}':
        Index = this.Estados.indexOf( EstadosEscaner.GrupoLlaveAbierta );
        if ( Index === -1 ) return;
        delete this.Estados[ Index ];
        this.Estados = this.Estados.filter(( el ) => el !== undefined);
        break;
      case '*/':
        Index = this.Estados.indexOf( EstadosEscaner.ComentarioBloqueAbierto );
        if ( Index === -1 ) return;
        delete this.Estados[ Index ];
        this.Estados = this.Estados.filter(( el ) => el !== undefined);
        break;
    }
  }

  private ObtenerToken( Coincidencia: string ) {
    this.AtualizarEstado( Coincidencia );
    const DatosTokens: Array<TokenBase> = [ ...PalabrasReservadas, ...Delimitadores, ...Comentarios, ...Operadores, ...SimbolosEspeciales ];
    let Expresion: RegExp = new RegExp( `^${ this.NormalizarExpresion( Coincidencia ) }$` );
    let DatosToken = DatosTokens.find(( el ) => el.Valor.match( Expresion ));
    if ( !DatosToken ) {
      try {
        Expresion = new RegExp( `^${ Coincidencia }$` );
        DatosToken = DatosTokens.find(( el ) => el.Valor.match( Expresion ));
      } catch ( err ) {
        return err;
      }
    }
    if ( !DatosToken ) {
      if ( Coincidencia.match( /^[0-9]{0,}[.,]?[0-9]{0,}d$/ ) ) return new Token( "NUMERO_DECIMAL", CategoriasToken.LiteralNumerico, Coincidencia );
      if ( Coincidencia.match( /^[0-9aA-fF]{0,}[.,]?[0-9aA-fF]{0,}h$/ ) ) return new Token( "NUMERO_HEXADECIMAL", CategoriasToken.LiteralNumerico, Coincidencia );
      if ( Coincidencia.match( /^[0-1]{0,}[.,]?[0-1]{0,}b$/ ) ) return new Token( "NUMERO_BINARIO", CategoriasToken.LiteralNumerico, Coincidencia );
      if ( Coincidencia.match( /^[_aA-zZ][_aA-zZ0-9]{0,30}$/g ) ) return new Token( "IDENTIFICADOR", CategoriasToken.Identificadores, Coincidencia.replace( /\\/g, '' ) );
      if ( Coincidencia.match( /^\".{0,}\"$/ ) ) return new Token( "CADENA", CategoriasToken.LiteralCadena, Coincidencia );
      if ( Coincidencia.match( /^\'.{0,}\'$/ ) ) return new Token( "CADENA_SIMPLE", CategoriasToken.LiteralCadena, Coincidencia );
      if ( Coincidencia.match( /^\`.{0,}\`$/ ) ) return new Token( "CADENA_LITERAL", CategoriasToken.LiteralCadena, Coincidencia );
      else return new Token( "ERROR", CategoriasToken.Excepciones, Coincidencia );
    }
    return new Token( DatosToken.Tipo, DatosToken.Categoria, Coincidencia.replace( /\\/g, '' ) );
  }
}