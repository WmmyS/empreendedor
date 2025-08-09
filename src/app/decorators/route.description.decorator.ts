import { SetMetadata } from '@nestjs/common';

export const ROUTE_DESCRIPTION = 'route_description';
export const RouteDescription = (description: string) => SetMetadata(ROUTE_DESCRIPTION, description);
