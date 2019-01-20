import { PostInterface } from '../interfaces/post.interface';

export class PostModel implements PostInterface {
  public userID: string;
  public id: string;
  public title: string;
  public body: string;

  constructor(params: PostInterface = {} as PostInterface) {
    this.userID = params.userID;
    this.id = params.id;
    this.title = params.title;
    this.body = params.body;
  }
}
