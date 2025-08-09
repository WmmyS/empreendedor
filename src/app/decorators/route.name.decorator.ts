import { SetMetadata } from '@nestjs/common';

export const ROUTE_NAME = 'route_name';
export const RouteName = (name: string) => SetMetadata(ROUTE_NAME, name);
