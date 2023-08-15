/**
 * @brief Detiene la ejecución del proceso durante @c X milisegundos
 * @param { Number } Milisegundos El número de milisegundos a detener la ejecución
 * @returns { Promise<void> }
 */
export default async function Sleep( Milisegundos: number ): Promise<void> {
  return new Promise(( res ) => {
    setTimeout(() => {
      res();
    }, Milisegundos);
  });
}