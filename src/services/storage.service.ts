export class StorageService {
  private storage: Storage;
  readonly STORAGE_NAME: string = 'library';

  constructor(storage: Storage) {
    this.storage = storage;
  }

  getData(): string | null {
    const result = this.storage.getItem(this.STORAGE_NAME);
    if (result) {
      return JSON.parse(result);
    }
    return null;
  }

  saveData(value: any): void {
    return this.storage.setItem(this.STORAGE_NAME, JSON.stringify(value));
  }
}
