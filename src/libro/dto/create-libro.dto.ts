import { IsNotEmpty, IsEnum, Length } from 'class-validator';
import { EstadoLibro } from '../estado_libro.enum';

export class CreateLibroDto {
  @IsNotEmpty({ message: 'El título es obligatorio' })
  @Length(1, 100, { message: 'El título debe tener entre 1 y 100 caracteres' })
  titulo: string;

  @IsNotEmpty({ message: 'El autor es obligatorio' })
  @Length(1, 50, { message: 'El autor debe tener entre 1 y 50 caracteres' })
  autor: string;

  @IsNotEmpty({ message: 'El género es obligatorio' })
  @Length(1, 50, { message: 'El género debe tener entre 1 y 50 caracteres' })
  genero: string;

  @IsEnum(EstadoLibro, { message: 'Estado inválido' })
  estado?: EstadoLibro; // Opcional, por defecto será "disponible"
}