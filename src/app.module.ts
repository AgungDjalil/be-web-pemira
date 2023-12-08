import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { VotersModule } from './voters/voters.module';
import { AuthModule } from './auth/auth.module';
import { CandidatesModule } from './candidates/candidates.module';
import { PollingModule } from './polling/polling.module';

@Module({
  imports: [
    DatabaseModule,
    AdminModule,
    VotersModule,
    AuthModule,
    CandidatesModule,
    PollingModule,
  ],
  providers: [
    {
      provide: 'APP_PIPE',
      useClass: ValidationPipe
    }
  ]
})
export class AppModule {}
