import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro.entity';
import { Intercambio } from '../intercambio/intercambio.entity';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Libro, Intercambio]), // Ambos repositorios aquí
  ],
  controllers: [LibroController],
  providers: [LibroService],
})
export class LibroModule {}