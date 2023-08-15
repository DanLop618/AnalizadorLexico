## Analizador Léxico + Árbol de Expresiones
Este proyecto fue desarrollado para la materia de [Compiladores](https://archivos.ujat.mx/2018/DAIS/PE%20DAIS/ISC%202016/AREA%20SUSTANTIVA%20PROFESIONAL/C0108080%20%20%20Compiladores.pdf) impartida en la [Universidad Juárez Autónoma de Tabasco](https://www.ujat.mx/), por la Dra. Cristina López Ramírez en la [División Académica de Ciencias y Tecnologías de la Información](https://www.ujat.mx/dacyti) ( DACYTI ) durante el periodo de Ciclo Corto - 2023.

## Descripción
Un **Analizador Léxico** es un programa que permite la identificación de las diferentes propiedades de un lenguaje de programación, siendo estas:

- Palabras Reservadas
- Operadores
- Literales Numéricos
- Literales de Cadena
- Identificadores
- Símbolos Especiales

Cuando el proceso de análisis finaliza, una colección de **Token** es devuelta por el escáner. Esta colección es indispensable para el siguiente paso de un compilador: *el análisis semántico*.

## Pre-requisitos
` Node.js@16.16.0 ` o bien ` Bun@0.7.0 `

## Demostración
El siguiente código genera un escáner que detectará todos los **Token** encontrados dentro de la expresión ` x + y `.
```ts
import { Escaner } from "./source/class/Escaner";
const Analizador = new Escaner();
const Tokens = Analizador.Escanear( "x + y" );
```

## Utilidades
Además de las utilidades principales del **Analizador Léxico**, esta librería incluye una clase estática ` UtilidadesArbol `, la cual cuenta con diferentes utilidades referentes a **Árboles de Expresiones**. Estos árboles se pueden generar a partir de una colección de **Token** devuelta por un **Escaner**.
```ts
// Adición al ejemplo anterior
import { UtilidadesArbol } from "./source/util/UtilidadesArbol";
```
```ts
import { Escaner } from "./source/class/Escaner";
import { UtilidadesArbol } from "./source/util/UtilidadesArbol";
const Analizador = new Escaner();
/**
 * El analizador acepta 3 tipos diferentes de bases numéricas
 * - Decimales: 1234
 * - Binarios: 10101
 * - Hexadecimales: 4A1F
 * 
 * Cada número deberá especificar su base al final de su valor. Ejemplo:
 * 1234 -> 1234d
 * 10101 -> 10101b
 * 4A1F -> 4A1Fh
 **/
const Tokens = Analizador.Escanear( "1d + 2d" );
const Arbol = UtilidadesArbol.DesdeTokens( Tokens );
console.log( UtilidadesArbol.Validar( Arbol ) ); // Salida: 3
```

## Referencias y herramientas
- [Regex101](https://regex101.com/): Herramienta de prueba de expresiones regulares
- [W3School](https://www.w3schools.com/): Repositorio de información referente a diferentes lenguajes de programación
