import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../src/modules/prisma/prisma.service';
import { UserService } from '../src/modules/user/user.service';
const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaClient;
  let userService: UserService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);
    userService = app.get(UserService);
    await app.init();
  });

  beforeEach(async () => {
    //running before each
  });

  describe('auth module', () => {
    it('should successfuly sign up a new user with appropriate username and password', async () => {
      const userRegisterInput = {
        username: 'asghar',
        password: '123321pp',
        email: 'asghar@gmail.com',
        bio: 'this is a bio from pooya life is much cooler than it seems',
      };
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${userRegisterInput.username}", password: "${userRegisterInput.password}", bio: "${userRegisterInput.bio}", email: "${userRegisterInput.email}"}) {
                id
                username    
                userAtId
                bio
                token
                avatar
                notificationStatus
            }
          }
        `,
        });
      expect(response.status).toBe(200);
      expect(response.body.data.signUp.username).toBeDefined();
      expect(response.body.data.signUp.id).toBeDefined();
      expect(response.body.data.signUp.username).toBe(
        userRegisterInput.username,
      );
    });
  });

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
    await prisma.$disconnect();
  });
});
