import { SingRoutes } from "../../app/usecases/route/SignRoutes";
import { SignAdministratorRole } from "../../app/usecases/role/signAdministratorRole";
import { SignUserRole } from "../../app/usecases/role/signUserRole";
import { INestApplication, Inject } from "@nestjs/common";

export class LoadStart {
  public app: INestApplication;

  constructor(
    @Inject(SignAdministratorRole)
    private readonly signAdministratorRole: SignAdministratorRole,

    @Inject(SignUserRole)
    private readonly signUserRole: SignUserRole,

    @Inject(SingRoutes)
    private readonly singRoutes: SingRoutes,

  ) {}

  public async loadStart(): Promise<void> {
    await this.loadRoles();
    await this.loadRoutes();
  }

  private async loadRoles(): Promise<void> {
    await this.signAdministratorRole.execute();
    await this.signUserRole.execute();
  }

  private async loadRoutes(): Promise<void> {
    await this.singRoutes.setApplication(this.app);
  }

}