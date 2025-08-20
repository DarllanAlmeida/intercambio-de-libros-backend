import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Libro } from './libro.entity';
import { User } from '../user/user.entity'; // Asegúrate de que la ruta sea correcta
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Libro, User]), // Registra ambas entidades
  ],
  providers: [LibroService],
  controllers: [LibroController],
})
export class LibroModule {}