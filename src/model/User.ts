import Item from "./Item";

export default class User {
	Id!: string;
	Role!: string;
	Password!: string;
	Email!: string;
	Point!: number;
	Username!: string;
	IsPrivate!: boolean;
	Life!: number;
	Items!: Item[];

	constructor(data: any) {
		if (data.Id) this.Id = data.Id;
		if (data.Role) this.Role = data.Role;
		if (data.Password) this.Password = data.Password;
		if (data.Email) this.Email = data.Email;
		if (data.Point) this.Point = data.Point;
		if (data.Username) this.Username = data.Username;
		if (data.IsPrivate) this.IsPrivate = data.IsPrivate;
		if (data.Life) this.Life = data.Life;
		if (data.Items) this.Items = data.Items.map((item: Item) => new Item(item));
	}
}
