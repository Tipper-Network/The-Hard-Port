import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common'
import { UserRole } from '../../generated/prisma/client'

import type { AuthenticatedUser } from '../auth.types'

@Injectable()
export class ReviewerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: AuthenticatedUser }>()
    const role = request.user?.role

    if (role === UserRole.reviewer || role === UserRole.admin) {
      return true
    }

    throw new ForbiddenException('Reviewer access required')
  }
}
