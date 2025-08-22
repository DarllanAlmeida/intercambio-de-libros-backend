import { Controller, Get, Post, Body, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { IntercambioService } from './intercambio.service';
import { CrearIntercambioDto } from './dto/crear-intercambio.dto';
import { Intercambio } from './intercambio.entity';

@Controller('intercambio')
export class IntercambioController {
  constructor(private readonly intercambioService: IntercambioService) {}

  @Post()
  crear(@Body() dto: CrearIntercambioDto): Promise<Intercambio> {
    return this.intercambioService.crear(dto);
  }

  @Get()
  encontrarTodos(): Promise<Intercambio[]> {
    return this.intercambioService.encontrarTodos();
  }

  @Patch(':id/aceptar')
  aceptar(@Param('id', ParseIntPipe) id: number): Promise<Intercambio> {
    return this.intercambioService.aceptar(id);
  }

  @Patch(':id/rechazar')
  rechazar(@Param('id', ParseIntPipe) id: number): Promise<Intercambio> {
    return this.intercambioService.rechazar(id);
  }
}