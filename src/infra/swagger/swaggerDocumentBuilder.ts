import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";
import configuration from "../configurations/configuration";

export class SwaggerDocumentBuilder {
  private configuration: DocumentBuilder
  constructor () {
    this.configuration = new DocumentBuilder()
      .setTitle(configuration().docs.title)
      .setDescription(configuration().docs.description)
      .setVersion(configuration().docs.version)
      .addBearerAuth()
  }

  private build (): any {
    return this.configuration.build();
  }

  private getConfigurations (): SwaggerDocumentOptions  {
    return {
      operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
      autoTagControllers: true,
    }
  }

  public setup (app: any): void {

    const documentFactory = () => SwaggerModule.createDocument(app, this.build(), this.getConfigurations());
    SwaggerModule.setup(configuration().docs.url, app, documentFactory);
  }
}