import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Doatecando')
    .setDescription(
      `Esta é uma aplicação desenvolvida como trabalho de pós-graduação na FIAP, **Doatecando**. O objetivo é criar uma aplicação fullstack completa que ajudará escolas públicas a conseguir doações de aparelhos eletrônicos, permitindo assim aumentar a inclusão digital nessas instituições. O sistema conta com uma gamificação para os doadores, onde eles recebem badges de acordo com o que doaram. O nome do repositório não é o nome do projeto final, e sim o nome de uma dessas badges.
        Você pode saber mais dobre o projeto em: https://www.notion.so/Doatecando-1c5c70b6763a802ebf41fa3cad22a4ce
        A aplicação utiliza **NestJS** com **Prisma** como ORM, conectando-se a um banco de dados **PostgreSQL**. Todos os endpoints são testados com **Jest**, e há ambientes configurados no **Postman** para testes locais e de produção.`,
    )
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(3000);
}
bootstrap();
