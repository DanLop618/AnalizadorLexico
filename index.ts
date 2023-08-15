import { Escaner } from "./source/class/Escaner";
import { UtilidadesArbol } from "./source/util/UtilidadesArbol";

const AnalizadorLexico = new Escaner();
const Fuente = ` ( 10d - 2d ** 101101b ) / A4Fh `; // <-- Texto fuente a escanear

const Tokens = AnalizadorLexico.Escanear( Fuente ); // <-- Tokens resultantes del escaneo
const ArbolExpresiones = await UtilidadesArbol.DesdeTokens( Tokens ); // <-- Árbol de expresiones
console.log( "\nÁrbol Resultante:\n" );
console.log( ArbolExpresiones.toString() );
console.log( `\nPostOrden: ${ UtilidadesArbol.GenerarPostOrden( ArbolExpresiones ) }` ); // Árbol en forma PostOrden










// console.log( Tokens.join( '\n' ) ); // [ ... ]
// console.log( UtilidadesArbol.Validar( ArbolExpresiones ) );