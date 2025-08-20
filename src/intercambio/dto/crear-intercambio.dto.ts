import { IsNotEmpty, IsNumber } from 'class-validator';

export class CrearIntercambioDto {
  @IsNumber()
  @IsNotEmpty()
  libroOfrecidoId: number;

  @IsNumber()
  @IsNotEmpty()
  libroSolicitadoId: number;
}