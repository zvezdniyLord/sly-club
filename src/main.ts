import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";



async function startApp() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('Sly-Club')
        .setDescription('Документация REST API')
        .setVersion('0.1.0')
        .addTag('Sly')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    app.listen(PORT, () => console.log(`port on ${PORT}`));
}

startApp();