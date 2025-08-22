import { IsInt, IsNotEmpty } from 'class-validator';

export class CrearIntercambioDto {
  @IsInt()
  libroSolicitadoId: number;

  @IsInt()
  libroOfrecidoId: number;
}