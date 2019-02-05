export class User {
  id: string;
  name: string;
  password: string;
  roles: [string];
  token?: string;
}
