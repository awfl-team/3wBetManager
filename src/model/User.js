export default class User {
    Id;

    Role;

    Password;

    Email;

    Username;

    IsPrivate;

    constructor(email, username, password = null, role = null, isPrivate = true) {
      this.Email = email;
      this.Username = username;
      this.Password = password;
      this.Role = role;
      this.IsPrivate = isPrivate;
    }
}
