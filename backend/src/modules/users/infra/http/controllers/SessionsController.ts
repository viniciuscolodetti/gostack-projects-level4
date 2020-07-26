import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticadeUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticadeUser = container.resolve(AuthenticadeUserService);

    const { user, token } = await authenticadeUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}
