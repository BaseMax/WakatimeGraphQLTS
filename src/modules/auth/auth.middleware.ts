// auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming "Bearer token" format
    if (token) {
      try {
        const decodedToken = jwt.verify(
          token,
          'my project will be a clone for wakatime ! endless possiblityes',
        ); // Replace with your actual secret key
        req.user = decodedToken; // Attach user information to the request object
      } catch (error) {
        // Token is invalid or expired
      }
    }
    next();
  }
}
