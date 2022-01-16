import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageData: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this.storageData = storage;
  }

  public set(key: string, value: any) {
    this.storageData?.set(key, value);
  }

  public async getItem(name: string): Promise<any> {
    return await this.storage?.get(name);
  }
}

