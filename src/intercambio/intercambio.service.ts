import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intercambio } from './intercambio.entity';
import { CrearIntercambioDto } from './dto/crear-intercambio.dto';
import { Libro } from '../libro/libro.entity';
import { EstadoIntercambio } from './estado-intercambio.enum';
import { EstadoLibro } from '../libro/estado_libro.enum';

@Injectable()
export class IntercambioService {
  constructor(
    @InjectRepository(Intercambio)
    private intercambioRepo: Repository<Intercambio>,

    @InjectRepository(Libro)
    private libroRepo: Repository<Libro>,
  ) {}

  async crear(dto: CrearIntercambioDto): Promise<Intercambio> {
    const libroOfrecido = await this.libroRepo.findOne({ where: { id: dto.libroOfrecidoId } });
    if (!libroOfrecido) {
      throw new NotFoundException(`Libro con ID ${dto.libroOfrecidoId} no encontrado`);
    }

    const libroSolicitado = await this.libroRepo.findOne({ where: { id: dto.libroSolicitadoId }, relations: ['usuario'] });
    if (!libroSolicitado) {
      throw new NotFoundException(`Libro con ID ${dto.libroSolicitadoId} no encontrado`);
    }

    if (libroOfrecido.estado !== EstadoLibro.DISPONIBLE) {
      throw new BadRequestException('El libro ofrecido no está disponible');
    }

    if (libroSolicitado.estado !== EstadoLibro.DISPONIBLE) {
      throw new BadRequestException('El libro solicitado no está disponible');
    }

    const intercambio = this.intercambioRepo.create({
      libroOfrecido,
      libroSolicitado,
      estado: EstadoIntercambio.PENDIENTE,
    });

    return this.intercambioRepo.save(intercambio);
  }

  async encontrarTodos(): Promise<Intercambio[]> {
    return this.intercambioRepo.find({
      relations: ['libroOfrecido', 'libroSolicitado'],
    });
  }

  async aceptar(id: number): Promise<Intercambio> {
    const intercambio = await this.intercambioRepo.findOne({
      where: { id },
      relations: ['libroOfrecido', 'libroSolicitado'],
    });
    if (!intercambio) throw new NotFoundException('Intercambio no encontrado');

    if (intercambio.estado !== EstadoIntercambio.PENDIENTE) {
      throw new BadRequestException('Este intercambio ya fue procesado');
    }

    intercambio.estado = EstadoIntercambio.ACEPTADO;
    intercambio.libroOfrecido.estado = EstadoLibro.INTERCAMBIADO;
    intercambio.libroSolicitado.estado = EstadoLibro.INTERCAMBIADO;

    await this.libroRepo.save(intercambio.libroOfrecido);
    await this.libroRepo.save(intercambio.libroSolicitado);

    return this.intercambioRepo.save(intercambio);
  }

  async rechazar(id: number): Promise<Intercambio> {
    const intercambio = await this.intercambioRepo.findOne({ where: { id } });
    if (!intercambio) throw new NotFoundException('Intercambio no encontrado');

    if (intercambio.estado !== EstadoIntercambio.PENDIENTE) {
      throw new BadRequestException('Este intercambio ya fue procesado');
    }

    intercambio.estado = EstadoIntercambio.RECHAZADO;
    return this.intercambioRepo.save(intercambio);
  }
}