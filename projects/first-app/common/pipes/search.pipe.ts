import {Pipe, PipeTransform} from '@angular/core';
import {UserModel} from '../models/user.model';

@Pipe({ name: 'search' })

export class SearchPipe implements PipeTransform {
  public transform(users: UserModel[] = [], value) {
    return users.filter(user => {
      return user.username.includes(value);
    });
  }
}
