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

    it('error throw if username already exists in database for a user', async () => {
      const user_one = {
        username: 'asghar',
        password: '123321pp',
        email: 'asghar@gmail.com',
        bio: 'this is a bio from pooya life is much cooler than it seems',
      };
      const user_two = {
        username: 'asghar',
        password: 'asghar_AGHA',
        email: 'myaccount@gmail.com',
        bio: 'i am a farmer in a far far land',
      };
      const before_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${user_one.username}", password: "${user_one.password}", bio: "${user_one.bio}", email: "${user_one.email}"}) {
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
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${user_two.username}", password: "${user_two.password}", bio: "${user_two.bio}", email: "${user_two.email}"}) {
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
      expect(response.body.errors).toBeDefined();
    });

    it('error throw if email already exists in database for a user', async () => {
      const user_one = {
        username: 'jafar',
        password: '123321pp',
        email: 'asghar@gmail.com',
        bio: 'this is a bio from pooya life is much cooler than it seems',
      };
      const user_two = {
        username: 'reza',
        password: 'asghar_AGHA',
        email: 'asghar@gmail.com',
        bio: 'i am a farmer in a far far land',
      };
      const before_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${user_one.username}", password: "${user_one.password}", bio: "${user_one.bio}", email: "${user_one.email}"}) {
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
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${user_two.username}", password: "${user_two.password}", bio: "${user_two.bio}", email: "${user_two.email}"}) {
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
      expect(response.body.errors).toBeDefined();
    });

    it('should successfuly login a user with correct username and password', async () => {
      const userLoginInput = {
        username: 'asghar',
        password: '123321pp',
        email: 'asghar@gmail.com',
      };
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "${userLoginInput.email}"}) {
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

      const login_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            userLogin(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "${userLoginInput.email}"}) {
                id
                username
                userAtId
                bio
                notificationStatus
                token
                avatar
            }
          }
        `,
        });
      expect(login_response.status).toBe(200);
      expect(login_response.body.data.userLogin.username).toBeDefined();
      expect(login_response.body.data.userLogin.id).toBeDefined();
      // expect(response.body.data.userLogin.username).toBe(
      //   login_response.username,
      // );
    });

    it('error throw if a user with incorrect username', async () => {
      const userLoginInput = {
        username: 'asghar',
        password: '123321pp',
        email: 'asghar@gmail.com',
      };
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "${userLoginInput.email}"}) {
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

      const login_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            userLogin(input:{username: "something_else", password: "${userLoginInput.password}", email: "${userLoginInput.email}"}) {
                id
                username
                userAtId
                bio
                notificationStatus
                token
                avatar
            }
          }
        `,
        });
      expect(login_response.status).toBe(200);
      expect(login_response.body.errors).toBeDefined();
    });

    it('error throw if a user with incorrect email', async () => {
      const userLoginInput = {
        username: 'asghar',
        password: '123321pp',
        email: 'asghar@gmail.com',
      };
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "${userLoginInput.email}"}) {
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

      const login_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            userLogin(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "ali@gmail.com"}) {
                id
                username
                userAtId
                bio
                notificationStatus
                token
                avatar
            }
          }
        `,
        });
      expect(login_response.status).toBe(200);
      expect(login_response.body.errors).toBeDefined();
    });

    it('error throw if a user with incorrect password', async () => {
      const userLoginInput = {
        username: 'asghar',
        password: '123321pp',
        email: 'asghar@gmail.com',
      };
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "${userLoginInput.email}"}) {
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

      const login_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            userLogin(input:{username: "${userLoginInput.username}", password: "some_other_shit", email: "${userLoginInput.email}"}) {
                id
                username
                userAtId
                bio
                notificationStatus
                token
                avatar
            }
          }
        `,
        });
      expect(login_response.status).toBe(200);
      expect(login_response.body.errors).toBeDefined();
    });

    it('it should successfuly logout with correct id', async () => {
      const userLoginInput = {
        username: 'jafar',
        password: '123321jafar',
        email: 'jafar@gmail.com',
        bio: 'its my breif bio',
      };
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "${userLoginInput.email}", bio: "${userLoginInput.bio}"}) {
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
      const logout_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            userLogOut(id : ${response.body.data.signUp.id}) {
                id
                username
                userAtId
                bio
                notificationStatus
                token
                avatar
            }
          }
        `,
        });
      expect(logout_response.status).toBe(200);
      expect(logout_response.body.data.userLogOut.username).toBeDefined();
    });

    it('it should successfuly reset password with correct credentials', async () => {
      const userLoginInput = {
        username: 'farzad',
        password: '123321farzad',
        email: 'farzad@gmail.com',
        bio: 'its my breif bio farzad here',
      };
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "${userLoginInput.email}", bio: "${userLoginInput.bio}"}) {
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

      const reset_password = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            ResetPassword(input :{username: "${userLoginInput.username}", oldPassword: "${userLoginInput.password}", newPassword: "9p9p9p", passwordConfirm: "9p9p9p"}) {
                id
                username
                userAtId
                bio
                notificationStatus
                token
                avatar
            }
          }
        `,
        });
      expect(reset_password.status).toBe(200);
      expect(reset_password.body.data.ResetPassword.username).toBeDefined();
      expect(reset_password.body.data.ResetPassword.id).toBeDefined();
      expect(reset_password.body.data.ResetPassword.username).toBe(
        userLoginInput.username,
      );
    });

    it('error throws if in reset password new password and confirm password are not the same ', async () => {
      const userLoginInput = {
        username: 'farzad',
        password: '123321farzad',
        email: 'farzad@gmail.com',
        bio: 'its my breif bio farzad here',
      };
      const response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            signUp(input:{username: "${userLoginInput.username}", password: "${userLoginInput.password}", email: "${userLoginInput.email}", bio: "${userLoginInput.bio}"}) {
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

      const reset_password = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            ResetPassword(input :{username: "${userLoginInput.username}", oldPassword: "${userLoginInput.password}", newPassword: "9p9p9p", passwordConfirm: "o0o0o0o"}) {
                id
                username
                userAtId
                bio
                notificationStatus
                token
                avatar
            }
          }
        `,
        });
      expect(reset_password.status).toBe(200);
      expect(reset_password.body.errors).toBeDefined();
    });
  });

  describe('user module', () => {});

  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
    await prisma.$disconnect();
  });
});
