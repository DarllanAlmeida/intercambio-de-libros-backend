import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import { Libro } from '../libro/libro.entity';
import { EstadoIntercambio } from './estado-intercambio.enum';

@Entity()
export class Intercambio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Libro, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'libroOfrecidoId' })
  libroOfrecido: Libro;

  @ManyToOne(() => Libro, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'libroSolicitadoId' })
  libroSolicitado: Libro;

  @Column({
    type: 'varchar',
    length: 20,
    default: EstadoIntercambio.PENDIENTE,
  })
  estado: EstadoIntercambio;
}