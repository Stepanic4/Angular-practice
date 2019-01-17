import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
import { PostService } from '../../common/services/post.service';
import { PaginationParamsInterface } from '../../common/interfaces/pagination-params.interface';
import { PostModel } from '../../common/models/post.model';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: [ './main-page.component.scss' ]
})

export class MainPageComponent {
  public postSegment: PostModel[];

  public paginationParams: PaginationParamsInterface;

  private posts: PostModel[];

  private perPage: number = 5;

  private subscription: Subscription;

  constructor(private postService: PostService) {
    this.postService.getPosts().subscribe((posts: PostModel[]): void => {
      this.posts = posts;
      this.paginationParams = {
        total: posts.length,
        perPage: this.perPage,
        current: 1,
        controlsCount: 7
      };
      this.postSegment = posts.slice(0, 5);
    });
  }

  public getPosts(offset: number): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = of<number>(offset)
      .pipe<number>(delay<number>(2000))
      .subscribe(
        (o: number): void => {
          const startIndex: number = (o - 1) * this.paginationParams.perPage;
          this.paginationParams = { ... this.paginationParams, current: o };
          this.postSegment = this.posts.slice(startIndex, startIndex + this.paginationParams.perPage);
          this.subscription.unsubscribe();
        }
      );
  }
}
