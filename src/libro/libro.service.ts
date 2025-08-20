import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Libro } from './libro.entity';

@Injectable()
export class LibroService {
  constructor(
    @InjectRepository(Libro)
    private libroRepository: Repository<Libro>,
  ) {}

  // Buscar libros por filtros opcionales
  async encontrarLibrosPorFiltro(filtro: { titulo?: string; autor?: string; genero?: string }) {
    const queryBuilder = this.libroRepository.createQueryBuilder('libro');

    if (filtro.titulo) {
      queryBuilder.andWhere('libro.titulo LIKE :titulo', { titulo: `%${filtro.titulo}%` });
    }
    if (filtro.autor) {
      queryBuilder.andWhere('libro.autor LIKE :autor', { autor: `%${filtro.autor}%` });
    }
    if (filtro.genero) {
      queryBuilder.andWhere('libro.genero LIKE :genero', { genero: `%${filtro.genero}%` });
    }

    return queryBuilder.getMany();
  }

  // Otros métodos...
}