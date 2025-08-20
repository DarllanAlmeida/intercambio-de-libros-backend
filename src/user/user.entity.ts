import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Libro } from '../libro/libro.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // senha já criptografada

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Libro, libro => libro.usuario)
  libros: Libro[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export enum EstadoLibro {
  DISPONIBLE = 'disponible',
  INTERCAMBIADO = 'intercambiado',
  RESERVADO = 'reservado',
}