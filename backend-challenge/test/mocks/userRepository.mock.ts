export class MockUserRepository {
  users = [];

  findOneByOrThrow({ id }: { id: string }) {
    console.log(this.users, id);
    return this.users.find((user) => user.id === id);
  }

  existsBy({ username }: { username: string }) {
    return !!this.users.find((user) => user.username === username);
  }

  create({ username, password }: { username: string; password: string }) {
    return { id: this.users.length + 1, username, password };
  }

  save({
    username,
    password,
    id,
  }: {
    username: string;
    password: string;
    id: string;
  }) {
    this.users.push({ id, username });
    console.log(this.users);
  }
}
