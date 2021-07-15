import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { ProjectModule } from './project/project.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [EmployeeModule, ProjectModule,GraphQLModule.forRoot(
    {
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql')
    }
  ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.1.6',
      port: 5432,
      username: 'nairobi',
      password: '1qazxsw2#',
      database: 'employee',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
