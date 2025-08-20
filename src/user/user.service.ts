import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Buscar todos los usuarios
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // Buscar un usuario por ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado.`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
  return this.userRepository.findOne({ where: { email } });
}

  // Crear un nuevo usuario
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  // Actualizar usuario
  async update(id: number, updateData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, updateData);
    return this.findOne(id);
  }

  // Eliminar usuario
  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}