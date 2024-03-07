import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  behaviorSubject = new BehaviorSubject(false)

  encryptionKey = 'yourEncryptionKey';
  encryptData(data: any, key: any) {
    return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
  }

  // decryptData(encryptedData, key) {
  //   const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  //   return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  // }
}
