import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intercambio } from './intercambio.entity';
import { Libro } from '../libro/libro.entity';
import { IntercambioService } from './intercambio.service';
import { IntercambioController } from './intercambio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Intercambio, Libro])],
  providers: [IntercambioService],
  controllers: [IntercambioController],
})
export class IntercambioModule {}