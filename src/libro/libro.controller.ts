import { Controller, Get, Query } from '@nestjs/common';
import { LibroService } from './libro.service';
import { Libro } from './libro.entity';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get('buscar')
  async buscarLibros(
    @Query('titulo') titulo: string,
    @Query('autor') autor: string,
    @Query('genero') genero: string,
  ): Promise<Libro[]> {
    const filtro = { titulo, autor, genero };
    return this.libroService.encontrarLibrosPorFiltro(filtro);
  }

  // Otros métodos...
}