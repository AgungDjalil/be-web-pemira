import { Module, ValidationPipe } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';
import { VotersModule } from './voters/voters.module';
import { AuthModule } from './auth/auth.module';
import { CandidatesModule } from './candidates/candidates.module';
import { PollingModule } from './polling/polling.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthGuard } from './auth/guard/auth.guard';
import { RoleGuard } from './guard/role.guard';

@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    }
  ],
  imports: [
    DatabaseModule,
    AdminModule,
    VotersModule,
    AuthModule,
    CandidatesModule,
    PollingModule,
  ],
})
export class AppModule {}
