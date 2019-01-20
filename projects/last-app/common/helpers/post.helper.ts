import { KeyValueInterface } from '../interfaces/key-value.interface';
import { PostModel } from '../models/post.model';

export class PostHelper {
  public static createPostModelFromServerData(data: KeyValueInterface<any>): PostModel {
    return new PostModel({
      id: data.id.toString(),
      userID: data.userId.toString(),
      title: data.title,
      body: data.body
    });
  }
}
