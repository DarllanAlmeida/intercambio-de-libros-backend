// src/libro/libro.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';
import { Intercambio } from '../intercambio/intercambio.entity';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,

    @InjectRepository(Intercambio)
    private readonly intercambioRepository: Repository<Intercambio>,
  ) {}

  async findAll(): Promise<Libro[]> {
    return this.libroRepository.find();
  }

  async findOne(id: number): Promise<Libro> {
    const libro = await this.libroRepository.findOne({ where: { id } });
    if (!libro) throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    return libro;
  }

  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const libro = this.libroRepository.create(createLibroDto);
    return this.libroRepository.save(libro);
  }

  async update(id: number, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.findOne(id);
    Object.assign(libro, updateLibroDto);
    return this.libroRepository.save(libro);
  }

  async remove(id: number): Promise<{ message: string }> {
    // 🔹 Eliminar intercambios relacionados primero
    await this.intercambioRepository
      .createQueryBuilder()
      .delete()
      .from(Intercambio)
      .where('libroSolicitadoId = :id OR libroOfrecidoId = :id', { id })
      .execute();

    // 🔹 Eliminar el libro
    const result = await this.libroRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Libro con ID ${id} no encontrado`);
    return { message: 'Libro eliminado correctamente' };
  }
}