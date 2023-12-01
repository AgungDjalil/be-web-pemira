import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { VotersModule } from './voters/voters.module';
import { AuthModule } from './auth/auth.module';
import { BemModule } from './bem/bem.module';

@Module({
  imports: [
    DatabaseModule,
    AdminModule,
    VotersModule,
    AuthModule,
    BemModule
  ],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
