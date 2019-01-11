export default class User {
    Id;

    Role;

    Password;

    Email;

    Username;

    constructor(email, username, password = null, role = null) {
      this.Email = email;
      this.Username = username;
      this.Password = password;
      this.Role = role;
    }
}
