export default class Team {
    Id!: number;
    Name!: string;
    ShortName!: string;
    Tla!: string;
    CrestUrl!: string;
    Address!: string;
    Phone!: string;
    Website!: string;
    Email!: string;
    ClubColors!: string;
    Venue!: string;


    constructor(data: any) {
        if (data.Id) this.Id = data.Id;
        if (data.Name) this.Name = data.Name;
        if (data.ShortName) this.ShortName = data.ShortName;
        if (data.Tla) this.Tla = data.Tla;
        if (data.CrestUrl) this.CrestUrl = data.CrestUrl;
        if (data.Address) this.Address = data.Address;
        if (data.Phone) this.Phone = data.Phone;
        if (data.Website) this.Website = data.Website;
        if (data.Email) this.Email = data.Email;
        if (data.ClubColors) this.ClubColors = data.ClubColors;
        if (data.Venue) this.Venue = data.Venue;
    }
}
