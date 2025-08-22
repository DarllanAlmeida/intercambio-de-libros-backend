import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../user/user.entity';
import { IsNotEmpty } from 'class-validator';
import { EstadoLibro } from './estado_libro.enum';
import { Intercambio } from '../intercambio/intercambio.entity';

@Entity('libros')
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

  // Relaciones con Intercambio
  @OneToMany(() => Intercambio, intercambio => intercambio.libroSolicitado, { cascade: true })
  intercambiosSolicitados: Intercambio[];

  @OneToMany(() => Intercambio, intercambio => intercambio.libroOfrecido, { cascade: true })
  intercambiosOfrecidos: Intercambio[];
}