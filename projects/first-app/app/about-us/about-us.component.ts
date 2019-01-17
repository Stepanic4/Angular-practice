import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { PageLeaveCheckInterface } from '../../common/interfaces/page-leave-check.interface';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Observer } from 'rxjs/internal/types';
import { Subscription } from 'rxjs/internal/Subscription';
import { delay } from 'rxjs/operators';
import { concat } from 'rxjs/index';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [ './about-us.component.scss' ]
})

export class AboutUsComponent implements PageLeaveCheckInterface, AfterViewInit {
  public url: string;

  public files: File[] = [];

  public multiple: boolean;

  private fileInput: HTMLInputElement;

  private canLeave: boolean;

  private subscription: Subscription;

  constructor(private elementRef: ElementRef) {}

  public ngAfterViewInit(): void {
    const maybeInput: HTMLInputElement | null = this.elementRef.nativeElement.querySelector('input[type=file]');

    if (!!maybeInput) {
      this.fileInput = maybeInput;
    }
    /*const h1: HTMLElement = this.elementRef.nativeElement.querySelector('h1');
    const p: HTMLElement = this.elementRef.nativeElement.querySelector('p');

    const clickH1: Observable<MouseEvent> = fromEvent<MouseEvent>(h1, 'click');
    const clickP: Observable<MouseEvent> = fromEvent<MouseEvent>(p, 'click');

    clickH1.pipe<MouseEvent, MouseEvent>(
      delay<MouseEvent>(3000),
      switchMap<MouseEvent, MouseEvent>(
        (e: MouseEvent): ObservableInput<MouseEvent> => of<MouseEvent>(e)
      )
    ).subscribe((e: MouseEvent): void => console.log('CLICK', (e.target as Element).nodeName));*/
  }

  public emitInputClick(): void {
    this.fileInput.click();
  }

  public onChangeHandler(files: FileList | null = this.fileInput.files): void {
    delete this.url;

    if (!!files) {
      if (this.multiple) {
        for (let i: number = 0; i < files.length; i ++) {
          this.files.push(files[i]);
        }
      } else {
        this.files = [ files[0] ];
      }
    }
  }

  public startUploading(): void {
    concat<string>(
      ... this.files.map<Observable<string>>((f: File): Observable<string> => this.uploadFile(f))
    ).subscribe(
      (url: string): void => {
        console.log(url);
        this.files = [];
        this.resetFileInput();
      }
    );
  }

  public uploadFile(file: File): Observable<string> {
    console.log('Fake request', file);
    return of<string>('/assets/img/angular.svg').pipe(delay<string>(3000));
  }

  public deleteFile(file: File): void {
    if (this.files.includes(file)) {
      this.files.splice(this.files.indexOf(file), 1);
      this.resetFileInput();
    }
  }

  public cancelDragEvent(event: DragEvent): void {
    if (!!event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }
    event.stopPropagation();
    event.preventDefault();
    return;
  }

  public resetFileInput(): void {
    if (!!this.fileInput && !!this.fileInput.parentElement) {
      const newInput: HTMLInputElement = document.createElement('input');

      if (this.multiple) {
        newInput.setAttribute('multiple', 'true');
      }
      newInput.type = 'file';
      newInput.className = 'd-none';
      newInput.onchange = (): void => this.onChangeHandler();

      this.fileInput.parentElement.insertBefore(newInput, this.fileInput);
      this.fileInput.parentElement.removeChild(this.fileInput);
      this.fileInput = newInput;
    }
  }

  public pageLeaveCheck(): Observable<boolean> {
    return of<boolean>(this.canLeave);
  }

  public changeCanLeave(state: boolean = !this.canLeave): void {
    this.canLeave = state;
  }

  public checkClick(event: MouseEvent): void {
    if (!!this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.asyncRequest(event, 5).subscribe(
      (e: MouseEvent): void => console.log(
        'OLD FASHION',
        (e.target as Element).nodeName,
        e
      )
    );
  }

  public asyncRequest(event: MouseEvent, d: number): Observable<MouseEvent> {
    return Observable.create((observer: Observer<MouseEvent>): void => {
      setTimeout(
        (): void => {
          observer.next(event);
          observer.complete();
        },
        d * 1000
      );
    });
  }
}
