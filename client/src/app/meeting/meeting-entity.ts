export class MeetingEntity {

  id: number;
  meetingDate: Date;
  initiator: String;
  estimatedTime: number;

  constructor(id: number, meetingDate: Date, initiator: String, estimatedTime: number) {
    this.id = id;
    this.meetingDate = meetingDate;
    this.initiator = initiator;
    this.estimatedTime = estimatedTime;
  }


}
