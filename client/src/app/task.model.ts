export class Task {
  _id: number;
  title: string;
  description: string;
  status:string;
  __v:number;

  constructor(_id: number, title: string, description: string,status:string,num:number) {
    this._id = _id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.__v=num;
  }
}