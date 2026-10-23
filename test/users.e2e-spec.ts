import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { configureApp } from '../src/app.setup';

interface UserBody {
  id: string;
  username: string;
  email: string;
}

describe('Users API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    configureApp(app);
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  const api = () => request(app.getHttpServer());

  it('runs the full CRUD flow', async () => {
    const created = await api()
      .post('/api/v1/users')
      .send({ username: '  ann ', email: 'Ann@Example.com' })
      .expect(201);
    const user = created.body as UserBody;
    expect(user).toMatchObject({ username: 'ann', email: 'ann@example.com' });

    await api()
      .get('/api/v1/users')
      .expect(200)
      .expect((res) => expect(res.body).toEqual([user]));

    await api()
      .patch(`/api/v1/users/${user.id}`)
      .send({ username: 'annie' })
      .expect(200)
      .expect((res) =>
        expect(res.body).toMatchObject({
          username: 'annie',
          email: user.email,
        }),
      );

    await api().delete(`/api/v1/users/${user.id}`).expect(204);
    await api().get(`/api/v1/users/${user.id}`).expect(404);
  });

  it('validates the request body', async () => {
    const res = await api()
      .post('/api/v1/users')
      .send({ username: '', email: 'not-an-email', role: 'admin' })
      .expect(400);

    const { message } = res.body as { message: string[] };
    expect(message).toEqual(
      expect.arrayContaining([
        'property role should not exist',
        'username should not be empty',
        'email must be an email',
      ]),
    );
  });

  it('returns 409 for a duplicate email', async () => {
    const body = { username: 'ann', email: 'ann@example.com' };
    await api().post('/api/v1/users').send(body).expect(201);
    await api().post('/api/v1/users').send(body).expect(409);
  });

  it('returns 400 for a malformed id', async () => {
    await api().get('/api/v1/users/123').expect(400);
  });
});
