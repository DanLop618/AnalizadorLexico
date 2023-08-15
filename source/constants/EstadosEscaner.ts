/**
 * @brief Estados de actividad de un @c Escaner
 */
export enum EstadosEscaner {
  Idle = 0,
  GrupoParentesisAbierto = 1,
  GrupoCorcheteAbierto = 2,
  GrupoLlaveAbierta = 3,
  CadenaSimpleAbierta = 4,
  CadenaAbierta = 5,
  LiteralAbierta = 6,
  ComentarioBloqueAbierto = 7
}