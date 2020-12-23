export class MeetingEntity {

  id: number;
  date: number;
  initiator: string;
  estimatedTime: number;

  constructor(id: number, date: number, initiator: string, estimatedTime: number) {
    this.id = id;
    this.date = date;
    this.initiator = initiator;
    this.estimatedTime = estimatedTime;
  }

  getDay(): number{
    return new Date(this.date).getDate();
  }


}
