export default class User {
    Id;

    Role;

    Password;

    Email;

    Username;

    constructor(email, username, password) {
      this.Email = email;
      this.Username = username;
      this.Password = password;
    }
}
