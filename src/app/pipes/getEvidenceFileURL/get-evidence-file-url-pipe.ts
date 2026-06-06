import { inject, Pipe, PipeTransform } from '@angular/core';
import { ref, getDownloadURL, Storage } from '@angular/fire/storage';
import { of } from 'rxjs';

@Pipe({
  name: 'getEvidenceFileURL',
})
export class GetEvidenceFileURLPipe implements PipeTransform {

  private readonly _storage = inject(Storage);

  transform(value: string | null | undefined): Promise<string> | null{
    if (value) {
      const storageRef = ref(this._storage, value);
      return getDownloadURL(storageRef);
    }
    return null;
  }

}
