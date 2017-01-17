/**
 * Created by Trym Todalshaug on 13/01/2017.
 */
import {Injectable} from '@angular/core';

import {Ansatt} from './ansatt';
import {ANSATTE} from './mock-ansatte';

@Injectable()
export class AnsattService {

  getAnsatte(): Promise<Ansatt[]> {
    return Promise.resolve(ANSATTE);
  }

  getAnsatt(id: number): Promise<Ansatt> {
    return this.getAnsatte()
      .then(ansatte => ansatte.find(ansatt => ansatt.id === id));
  }
}
