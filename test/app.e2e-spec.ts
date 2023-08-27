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

  describe('user module', () => {
    it('should successfuly get api key ', async () => {
      const userRegisterInput = {
        username: 'mamad',
        password: '123321pp',
        email: 'mamad@gmail.com',
        bio: 'this is a bio from mamad life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const api_key_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          query {
            getAPIKey{
               id
                username
                userAtId
                password
                bio
                notificationStatus
                email
                APIKEY
                notificationsType
                notificationDisturbHour
            }
          }
        `,
        });
      expect(api_key_response.status).toBe(200);
      expect(api_key_response.body.data.getAPIKey.username).toBeDefined();
      expect(api_key_response.body.data.getAPIKey.id).toBeDefined();
    });

    it('should successfuly get user profile ', async () => {
      const userRegisterInput = {
        username: 'naser',
        password: '123321pp',
        email: 'naser@gmail.com',
        bio: 'this is a bio from naser life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const get_user_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          query {
            getUserProfile{
               id
                username
                userAtId
                password
                bio
                notificationStatus
                email
                APIKEY
                notificationsType
                notificationDisturbHour
            }
          }
        `,
        });
      expect(get_user_response.status).toBe(200);
      expect(get_user_response.body.data.getUserProfile.username).toBeDefined();
      expect(get_user_response.body.data.getUserProfile.id).toBeDefined();
    });

    it('should successfuly get users activties', async () => {
      const userRegisterInput = {
        username: 'pol',
        password: '123321pp',
        email: 'pol@gmail.com',
        bio: 'this is a bio from pol life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const get_user_activities_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          query {
            getUserCodingActivity(startDate : "${'2023-08-25T12:00:00Z'}" , endDate: "${'2023-08-25T13:00:00Z'}"){
              id
              language
              startDate
              endDate
              file
            }
          }
        `,
        });
      expect(get_user_activities_response.status).toBe(200);
      expect(
        Array.isArray(
          get_user_activities_response.body.data.getUserCodingActivity,
        ),
      ).toBe(true);
    });

    it('should successfuly update user profile', async () => {
      const userRegisterInput = {
        username: 'sina',
        password: '123321pp',
        email: 'sina@gmail.com',
        bio: 'this is a bio from sina life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const id = +response.body.data.signUp.id;
      const mutationQuery = `
        mutation UpdateProfile($id: ID!, $username: String!, $bio: String!) {
          updateProfile(input: { id: $id, username: $username, bio: $bio }) {
            id
            username
            userAtId
            password
            bio
            notificationStatus
            email
            APIKEY
            notificationsType
            notificationDisturbHour
          }
        }
      `;
      const update_profile_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: mutationQuery,
          variables: {
            id: id,
            username: 'mol',
            bio: 'this is mol',
          },
        });
      expect(update_profile_response.status).toBe(400);
      expect(
        update_profile_response.body.data.updateProfile.username,
      ).toBeDefined();
    });

    it('should successfuly get users activties', async () => {
      const userRegisterInput = {
        username: 'zee',
        password: '123321pp',
        email: 'zee@gmail.com',
        bio: 'this is a bio from zee life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const get_user_activities_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          query {
            getUserCodingActivity(startDate : "${'2023-08-25T12:00:00Z'}" , endDate: "${'2023-08-25T13:00:00Z'}"){
              id
              language
              startDate
              endDate
              file
            }
          }
        `,
        });
      expect(get_user_activities_response.status).toBe(200);
      expect(
        Array.isArray(
          get_user_activities_response.body.data.getUserCodingActivity,
        ),
      ).toBe(true);
    });

    it('should successfuly create api key', async () => {
      const userRegisterInput = {
        username: 'mamooriat',
        password: '123321pp',
        email: 'mamooriat@gmail.com',
        bio: 'this is a bio from mamooriat life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const create_api_key_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          mutation {
            createAPIKey{
              id
              username
              userAtId
              password
              bio
              notificationStatus
              email
              APIKEY
              notificationsType
              notificationDisturbHour
            }
          }
        `,
        });
      expect(create_api_key_response.status).toBe(200);
      expect(create_api_key_response.body.data.createAPIKey).toBeDefined();
    });

    it('should successfuly DELETE api key', async () => {
      const userRegisterInput = {
        username: 'OOP',
        password: '123321pp',
        email: 'OOP@gmail.com',
        bio: 'this is a bio from OOP life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const delete_api_key_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          mutation {
            createAPIKey{
              id
              username
              userAtId
              password
              bio
              notificationStatus
              email
              APIKEY
              notificationsType
              notificationDisturbHour
            }
          }
        `,
        });
      expect(delete_api_key_response.status).toBe(200);
      expect(delete_api_key_response.body.data.createAPIKey).toBeDefined();
    });

    it('throw error if project id doesnt exist when track-coding-activity', async () => {
      const userRegisterInput = {
        username: 'qwqq',
        password: '123321pp',
        email: 'qwqq@gmail.com',
        bio: 'this is a bio from qwqq life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const track_coding_activity_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          mutation {
            trackCodingActivity{
              id
              username
              userAtId
              password
              bio
              notificationStatus
              email
              APIKEY
              notificationsType
              notificationDisturbHour
            }
          }
        `,
        });
      console.log(
        'track_coding_activity: ',
        track_coding_activity_response.body,
      );
      expect(track_coding_activity_response.status).toBe(400);
    });
  });

  describe('Team Module', () => {
    it('should successfuly get all teams', async () => {
      const get_teams_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query {
            getTeams{
              id
              name
            }
          }
        `,
        });
      expect(get_teams_response.status).toBe(200);
      expect(Array.isArray(get_teams_response.body.data.getTeams)).toBe(true);
    });

    it('should succesffuly create team', async () => {
      const userRegisterInput = {
        username: 'lkkm',
        password: '123321pp',
        email: 'lkkm@gmail.com',
        bio: 'this is a bio from lkkm life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const create_team_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          mutation {
            createTeam(input :{name : "some team"}){
              id
              name
            }
          }
        `,
        });
      expect(create_team_response.status).toBe(200);
      expect(create_team_response.body.data.createTeam.name).toBeDefined();
    });

    it('throw error if team id doesnt exists', async () => {
      const get_team_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query {
            getTeam(teamID : ${parseInt('1000000')}){
              id
              name
            }
          }
        `,
        });
      expect(get_team_response.status).toBe(200);
      expect(get_team_response.body.errors).toBeDefined();
    });

    it('should succesffuly get users teams', async () => {
      const userRegisterInput = {
        username: 'powo',
        password: '123321pp',
        email: 'powo@gmail.com',
        bio: 'this is a bio from powo life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const get_users_teams_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          query {
            getUsersTeams{
              id
              name
            }
          }
        `,
        });
      expect(get_users_teams_response.status).toBe(200);
      expect(
        Array.isArray(get_users_teams_response.body.data.getUsersTeams),
      ).toBe(true);
    });

    it('should succesffuly create team', async () => {
      const userRegisterInput = {
        username: 'lwkkm',
        password: '123321pp',
        email: 'lkkwm@gmail.com',
        bio: 'this is a bio from lkkmw life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const create_team_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          mutation {
            createTeam(input :{name : "some team"}){
              id
              name
            }
          }
        `,
        });
      expect(create_team_response.status).toBe(200);
      expect(create_team_response.body.data.createTeam.name).toBeDefined();
    });

    it('should succesffuly update team', async () => {
      const userRegisterInput = {
        username: 'opeooo',
        password: '123321pp',
        email: 'opeooo@gmail.com',
        bio: 'this is a bio from opeooo life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const create_team_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          mutation {
            createTeam(input :{name : "some team"}){
              id
              name
            }
          }
        `,
        });
      const teamId = parseInt(create_team_response.body.data.createTeam.id);
      const update_team_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          mutation {
            updateTeam(input: {id: ${teamId}, name: "gorila_team", user: 1}){
              id
              name
            }
          }
        `,
        });
      expect(update_team_response.status).toBe(200);
      expect(update_team_response.body.data.updateTeam.name).toBeDefined();
    });

    it('throw error if team ID was incorrect', async () => {
      const teamID = '999999';
      const memberID = '1';
      const add_to_group_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            addMemberToTeam(teamID: ${parseInt(teamID)} ,memberID : ${parseInt(
            memberID,
          )}){
              id
              name
            }
          }
        `,
        });
      expect(add_to_group_response.status).toBe(200);
      expect(add_to_group_response.body.errors[0].extensions).toBeDefined();
    });

    it('throw error if member ID was incorrect', async () => {
      const teamID = '1';
      const memberID = '999999';
      const add_to_group_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            addMemberToTeam(teamID: ${parseInt(teamID)} ,memberID : ${parseInt(
            memberID,
          )}){
              id
              name
            }
          }
        `,
        });
      expect(add_to_group_response.status).toBe(200);
      expect(add_to_group_response.body.errors[0].extensions).toBeDefined();
    });

    it('should successfuly add the member to team with correct ids', async () => {
      const userRegisterInput = {
        username: 'newmember',
        password: '123321pp',
        email: 'newmember@gmail.com',
        bio: 'this is a bio from newmember life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const memberID = response.body.data.signUp.id;
      const create_team_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          mutation {
            createTeam(input :{name : "some team"}){
              id
              name
            }
          }
        `,
        });
      const teamID = create_team_response.body.data.createTeam.id;
      const add_to_group_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            addMemberToTeam(teamID: ${parseInt(teamID)} ,memberID : ${parseInt(
            memberID,
          )}){
              id
              name
            }
          }
        `,
        });
      expect(add_to_group_response.status).toBe(200);
      expect(
        add_to_group_response.body.data.addMemberToTeam.name,
      ).toBeDefined();
    });

    it('throw error if group ID was incorrect', async () => {
      const teamID = '999999';
      const memberID = '1';
      const add_to_group_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            addToGroup(groupID: ${parseInt(teamID)}, memberID: ${parseInt(
            memberID,
          )}, groupStatus: "inviteOnly"){
              id
              name
            }
          }
        `,
        });
      expect(add_to_group_response.status).toBe(200);
      expect(add_to_group_response.body.errors[0].extensions).toBeDefined();
    });

    it('throw error if member ID was incorrect', async () => {
      const teamID = '1';
      const memberID = '999999';
      const add_to_group_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          mutation {
            addToGroup(groupID: ${parseInt(teamID)}, memberID: ${parseInt(
            memberID,
          )}, groupStatus: "inviteOnly"){
              id
              name
            }
          }
        `,
        });
      expect(add_to_group_response.status).toBe(200);
      expect(add_to_group_response.body.errors[0].extensions).toBeDefined();
    });

    it('should successfuly add the member to group with correct both ids', async () => {
      // const userRegisterInput = {
      //   username: 'newmember',
      //   password: '123321pp',
      //   email: 'newmember@gmail.com',
      //   bio: 'this is a bio from newmember life is much cooler than it seems',
      // };
      // const response = await request(app.getHttpServer())
      //   .post(gql)
      //   .send({
      //     query: `
      //     mutation {
      //       signUp(input:{username: "${userRegisterInput.username}", password: "${userRegisterInput.password}", bio: "${userRegisterInput.bio}", email: "${userRegisterInput.email}"}) {
      //           id
      //           username
      //           userAtId
      //           bio
      //           token
      //           avatar
      //           notificationStatus
      //       }
      //     }
      //   `,
      //   });
      // const authToken = response.body.data.signUp.token;
      // const memberID = response.body.data.signUp.id;
      // const create_team_response = await request(app.getHttpServer())
      //   .post(gql)
      //   .set('Authorization', `Bearer ${authToken}`)
      //   .send({
      //     query: `
      //     mutation {
      //       createTeam(input :{name : "some team"}){
      //         id
      //         name
      //       }
      //     }
      //   `,
      //   });
      // const teamID = create_team_response.body.data.createTeam.id;
      // const add_to_group_response = await request(app.getHttpServer())
      //   .post(gql)
      //   .send({
      //     query: `
      //     mutation {
      //       addMemberToTeam(teamID: ${parseInt(teamID)} ,memberID : ${parseInt(
      //       memberID,
      //     )}){
      //         id
      //         name
      //       }
      //     }
      //   `,
      //   });
      // expect(add_to_group_response.status).toBe(200);
      // expect(
      //   add_to_group_response.body.data.addMemberToTeam.name,
      // ).toBeDefined();
    });
  });

  describe('Project Module', () => {
    it('should successfuly get projects', async () => {
      const userRegisterInput = {
        username: 'paul',
        password: '123321pp',
        email: 'paul@gmail.com',
        bio: 'this is a bio from paul life is much cooler than it seems',
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
      const authToken = response.body.data.signUp.token;
      const get_projects_response = await request(app.getHttpServer())
        .post(gql)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          query: `
          query {
            getProjects{
              id
              name
              totalTime
            }
          }
        `,
        });
      expect(get_projects_response.status).toBe(200);
      expect(Array.isArray(get_projects_response.body.data.getProjects)).toBe(
        true,
      );
    });

    it('throw error if project ID was incorrect for getting details', async () => {
      const projectID = '1';
      const get_project_details_response = await request(app.getHttpServer())
        .post(gql)
        .send({
          query: `
          query {
            getProjectDetails(projectId: ${parseInt(projectID)}){
              id
              name
              totalTime
            }
          }
        `,
        });
      expect(get_project_details_response.status).toBe(200);
      expect(
        get_project_details_response.body.errors[0].extensions,
      ).toBeDefined();
    });
  });
  afterAll(async () => {
    await prisma.user.deleteMany();
    await app.close();
    await prisma.$disconnect();
  });
});
