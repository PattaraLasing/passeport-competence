import { inject, Pipe, PipeTransform } from '@angular/core';
import { ref, getDownloadURL, Storage } from '@angular/fire/storage';

@Pipe({
  name: 'getEvidenceFileURL',
})
export class GetEvidenceFileURLPipe implements PipeTransform {

  private readonly _storage = inject(Storage);

  transform(value: any): Promise<string> {
    const storageRef = ref(this._storage, value);
    return getDownloadURL(storageRef);
  }

}
