import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LibroModule } from './libro/libro.module';
import { IntercambioModule } from './intercambio/intercambio.module';
import { AuthModule } from './auth/auth.module';  // <--- Importa AuthModule
import { Libro } from './libro/libro.entity';
import { User } from './user/user.entity';
import { Intercambio } from './intercambio/intercambio.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Libro, User, Intercambio],
      synchronize: true,
    }),
    LibroModule,
    IntercambioModule,
    AuthModule,  // <--- Asegúrate de agregarlo aquí
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}