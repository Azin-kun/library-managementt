import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'test', password: 'test' })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('access_token');
      });
  });

  it('/auth/register (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ username: 'test', password: 'test' })
      .expect(201)
      .expect((response) => {
        expect(response.body).toHaveProperty('_id');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
