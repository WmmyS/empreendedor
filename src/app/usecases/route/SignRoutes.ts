// route.service.ts
import { Injectable, INestApplication, Inject } from '@nestjs/common';
import { RouteService } from '../../../app/services/route/route.service';
import { Reflector } from '@nestjs/core';
import { ROUTE_NAME } from '../../../app/decorators/route.name.decorator';
import { ROUTE_DESCRIPTION } from '../../../app/decorators/route.description.decorator';

@Injectable()
export class SingRoutes {
  public app: INestApplication

  constructor(
    @Inject(RouteService)
    private readonly routeService: RouteService,

    private readonly reflector: Reflector,

  ) {}

  public async setApplication(app: INestApplication) {
    await this.registerRoutes(app);
  }

  private async registerRoutes(app: INestApplication) {
    this.app = app;
    console.info('Registering routes...');
    const server = this.app.getHttpServer();
    const router = server._events.request._router;
    const routes = router.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => {
        const { path, methods } = layer.route;
        const method = Object.keys(layer.route.methods)[0].toUpperCase();

        const routeHandler = layer.route.stack[0].handle;
        const name = this.reflector.get<string>(ROUTE_NAME, routeHandler) || 'default name';
        const description = this.reflector.get<string>(ROUTE_DESCRIPTION, routeHandler) || 'default description';

        return { path, method, name, description };
      })

    const exists = await this.routeService.list();
    for (const route of routes) {
      const routeFound = exists.find((r) => r.path === route.path && r.method === route.method);

      // Retirando rotas de documentação dos registros
      if (route.name === 'default name') {
        continue;
      }

      if (routeFound) {
        console.info('Updating route', route.name, route.path, route.method, routeFound.id);
        await this.routeService.update(routeFound.id, {
          name: route.name,
          description: route.description,
          method: route.method,
          path: route.path,
        });
        continue;
      }

      await this.routeService.create({
        name: route.name,
        description: route.description,
        method: route.method,
        path: route.path,
      });
    }

    console.info('Routes registered successfully');
  }
}
