import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from './../src/user/entities';
import { MockUserRepository } from './mocks/userRepository.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token = '';
  const username = 'john';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(new MockUserRepository())
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('test the jwt authentication', async () => {
    const registerResponse = await request(app.getHttpServer())
      .post('/auth/register')
      .send({ username, password: 'testing12345' })
      .expect(201);

    token = registerResponse.body.access_token;

    const getMeResponse = await request(app.getHttpServer())
      .get('/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(getMeResponse.body.username).toBe(username);
  });

  afterAll(async () => {
    await app.close();
  });
});
