import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class LocalstorageService {
  private localstorage: Storage = window.localStorage;

  public get(name: string): string {
    return this.localstorage.getItem(name) || '';
  }

  public set(name: string, value: string): string {
    this.localstorage.setItem(name, value);
    return value;
  }
}
