import { ConflictException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    service = new UsersService();
  });

  it('creates users with a generated id and timestamp', () => {
    const user = service.create({ username: 'ann', email: 'ann@example.com' });

    expect(user).toEqual({
      id: expect.stringMatching(/^[0-9a-f-]{36}$/) as unknown,
      username: 'ann',
      email: 'ann@example.com',
      createdAt: expect.any(String) as unknown,
    });
    expect(service.findAll()).toEqual([user]);
    expect(service.findOne(user.id)).toBe(user);
  });

  it('rejects a duplicate email', () => {
    service.create({ username: 'ann', email: 'ann@example.com' });

    expect(() =>
      service.create({ username: 'other', email: 'ann@example.com' }),
    ).toThrow(ConflictException);
  });

  it('partially updates a user', () => {
    const user = service.create({ username: 'ann', email: 'ann@example.com' });

    const updated = service.update(user.id, { username: 'annie' });

    expect(updated).toEqual({ ...user, username: 'annie' });
  });

  it('allows keeping the same email but not taking another user’s', () => {
    const ann = service.create({ username: 'ann', email: 'ann@example.com' });
    service.create({ username: 'bob', email: 'bob@example.com' });

    expect(() =>
      service.update(ann.id, { email: 'ann@example.com' }),
    ).not.toThrow();
    expect(() => service.update(ann.id, { email: 'bob@example.com' })).toThrow(
      ConflictException,
    );
  });

  it('removes a user', () => {
    const user = service.create({ username: 'ann', email: 'ann@example.com' });

    service.remove(user.id);

    expect(service.findAll()).toEqual([]);
  });

  it.each([
    ['findOne', (s: UsersService, id: string) => s.findOne(id)],
    [
      'update',
      (s: UsersService, id: string) => s.update(id, { username: 'x' }),
    ],
    ['remove', (s: UsersService, id: string) => s.remove(id)],
  ])('%s throws NotFound for unknown ids', (_name, call) => {
    expect(() => call(service, '00000000-0000-4000-8000-000000000000')).toThrow(
      NotFoundException,
    );
  });
});
