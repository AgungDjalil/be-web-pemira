import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    DatabaseModule,
    AdminModule
  ],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
