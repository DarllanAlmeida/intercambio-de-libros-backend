// src/libro/libro.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Patch, ParseIntPipe } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';

@Controller('libro')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Get()
  async findAll() {
    return this.libroService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.libroService.findOne(id);
  }

  @Post()
  async create(@Body() createLibroDto: CreateLibroDto) {
    return this.libroService.create(createLibroDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLibroDto: UpdateLibroDto,
  ) {
    return this.libroService.update(id, updateLibroDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    // 🔹 Aquí se eliminarán también los intercambios relacionados antes de eliminar el libro
    return this.libroService.remove(id);
  }
}