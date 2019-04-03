export default class User {
    Id;

    Role;

    Password;

    Email;

    Point;

    Username;

    IsPrivate;

    Life;

    Items;

    constructor(email, username = null, password = null, role = null, isPrivate = null) {
      this.Email = email;
      this.Username = username;
      this.Password = password;
      this.Role = role;
      this.IsPrivate = isPrivate;
    }
}
