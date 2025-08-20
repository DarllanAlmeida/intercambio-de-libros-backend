import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { IsNotEmpty } from 'class-validator';
import { EstadoLibro } from './estado_libro.enum';


@Entity()
export class Libro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty({ message: 'El título es obligatorio' })
  titulo: string;

  @Column()
  @IsNotEmpty({ message: 'El autor es obligatorio' })
  autor: string;

  @Column()
  genero: string;

  @Column({
    type: 'varchar',
    length: 20,
    default: EstadoLibro.DISPONIBLE,
  })
  estado: EstadoLibro;

  @ManyToOne(() => User, user => user.libros)
  usuario: User;
}