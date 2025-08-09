import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/modules/app.module';
import configuration from "./infra/configurations/configuration";
import { AllExceptionsFilter } from './exceptions/filters/allExceptionsFilter';
import 'reflect-metadata';
import { LoadStart } from './infra/jobs/load.start';
import { SwaggerDocumentBuilder } from './infra/swagger/swaggerDocumentBuilder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // documentação swagger
  const swagger = new SwaggerDocumentBuilder()
  swagger.setup(app);

  // adicionar erro global
  app.useGlobalFilters(new AllExceptionsFilter());

  // abrir rotas para aplicações externas
  app.enableCors();

  // iniciar aplicação
  await app.listen(configuration().port);

  // iniciar processos de carga
  const loadStart = app.get<LoadStart>(LoadStart);
  loadStart.app = app;
  await loadStart.loadStart();
}

bootstrap();
