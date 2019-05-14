import moment from 'moment';

export default class Competition {
  public Id!: number;
  public Name!: string;
  public Code!: string;
  public EmblemUrl!: string;
  public NbBets!: number;
  public NbMatches!: number;
  public LastUpdated!: Date;

  constructor(data: any) {
    if (data.Id) { this.Id = data.Id; }
    if (data.Name) { this.Name = data.Name; }
    if (data.Code) { this.Code = data.Code; }
    if (data.EmblemUrl) { this.EmblemUrl = data.EmblemUrl; }
    if (data.NbBets) { this.NbBets = data.NbBets; }
    if (data.NbMatches) { this.NbMatches = data.NbMatches; }
    if (data.LastUpdated) { this.LastUpdated = moment(data.LastUpdated).toDate(); }
  }
}
