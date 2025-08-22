import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Libro } from '../libro/libro.entity';

export enum EstadoIntercambio {
  PENDIENTE = 'pendiente',
  ACEPTADO = 'aceptado',
  RECHAZADO = 'rechazado',
}

@Entity('intercambios')
export class Intercambio {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Libro, libro => libro.intercambiosSolicitados, { onDelete: 'CASCADE' })
  libroSolicitado: Libro;

  @ManyToOne(() => Libro, libro => libro.intercambiosOfrecidos, { onDelete: 'CASCADE' })
  libroOfrecido: Libro;

  @Column({ type: 'text', default: EstadoIntercambio.PENDIENTE })
  estado: EstadoIntercambio;
}