import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intercambio, EstadoIntercambio } from './intercambio.entity';
import { CrearIntercambioDto } from './dto/crear-intercambio.dto';
import { Libro } from '../libro/libro.entity';

@Injectable()
export class IntercambioService {
  constructor(
    @InjectRepository(Intercambio)
    private readonly intercambioRepository: Repository<Intercambio>,
    @InjectRepository(Libro)
    private readonly libroRepository: Repository<Libro>,
  ) {}

  async crear(dto: CrearIntercambioDto): Promise<Intercambio> {
    const libroSolicitado = await this.libroRepository.findOne({ where: { id: dto.libroSolicitadoId } });
    const libroOfrecido = await this.libroRepository.findOne({ where: { id: dto.libroOfrecidoId } });

    if (!libroSolicitado || !libroOfrecido) {
      throw new NotFoundException('Libro solicitado u ofrecido no encontrado');
    }

    const intercambio = this.intercambioRepository.create({
      libroSolicitado,
      libroOfrecido,
      estado: EstadoIntercambio.PENDIENTE,
    });

    return this.intercambioRepository.save(intercambio);
  }

  async encontrarTodos(): Promise<Intercambio[]> {
    return this.intercambioRepository.find({ relations: ['libroSolicitado', 'libroOfrecido'] });
  }

  async aceptar(id: number): Promise<Intercambio> {
    const intercambio = await this.intercambioRepository.findOne({ where: { id }, relations: ['libroSolicitado', 'libroOfrecido'] });
    if (!intercambio) throw new NotFoundException('Intercambio no encontrado');
    intercambio.estado = EstadoIntercambio.ACEPTADO;
    return this.intercambioRepository.save(intercambio);
  }

  async rechazar(id: number): Promise<Intercambio> {
    const intercambio = await this.intercambioRepository.findOne({ where: { id }, relations: ['libroSolicitado', 'libroOfrecido'] });
    if (!intercambio) throw new NotFoundException('Intercambio no encontrado');
    intercambio.estado = EstadoIntercambio.RECHAZADO;
    return this.intercambioRepository.save(intercambio);
  }
}