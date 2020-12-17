export class MeetingEntity {

  id: number;
  date: String;
  initiator: String;
  estimatedTime: number;

  constructor(id: number, date: String, initiator: String, estimatedTime: number) {
    this.id = id;
    this.date = date;
    this.initiator = initiator;
    this.estimatedTime = estimatedTime;
  }


}
