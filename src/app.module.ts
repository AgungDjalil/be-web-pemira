import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { VotersModule } from './voters/voters.module';

@Module({
  imports: [
    DatabaseModule,
    AdminModule,
    VotersModule
  ],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
