import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LibroModule } from './libro/libro.module';
import { IntercambioModule } from './intercambio/intercambio.module';
import { AuthModule } from './auth/auth.module';

import { Libro } from './libro/libro.entity';
import { Intercambio } from './intercambio/intercambio.entity';
import { User } from './user/user.entity';  // Importa la entidad User

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Libro, Intercambio, User],  // Aquí añades User también
      synchronize: true,
    }),
    LibroModule,
    IntercambioModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}