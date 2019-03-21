import moment from 'moment';

export default class Competition {
    Id!: number;
    Name!: string;
    Code!: string;
    EmblemUrl!: string;
    NbBets!: number;
    NbMatches!: number;
    LastUpdated!: Date;

    constructor(data: any) {
        if (data.Id) this.Id = data.Id;
        if (data.Name) this.Name = data.Name;
        if (data.Code) this.Code = data.Code;
        if (data.EmblemUrl) this.EmblemUrl = data.EmblemUrl;
        if (data.NbBets) this.NbBets = data.NbBets;
        if (data.NbMatches) this.NbMatches = data.NbMatches;
        if (data.LastUpdated) this.LastUpdated = moment(data.LastUpdated).toDate();
    }
}
