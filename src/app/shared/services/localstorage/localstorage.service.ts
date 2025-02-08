import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { LOCAL_STORAGE_ITEM_NAME, LOGIN_MODAL_STATUS } from '../../../core/constants/enum';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  private readonly SECRET_KEY = environment.firebaseProject_.apiKey; // Store this securely, perhaps in environment

  constructor() { }

  private encrypt(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.SECRET_KEY).toString();
  }

  private decrypt(encryptedData: string): any {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedData, this.SECRET_KEY);
      return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return null;
    }
  }

  // Generic set/get methods
  private setItem(key: string, value: any): void {
    const encryptedValue = this.encrypt(value);
    window.localStorage.setItem(key, encryptedValue);
  }

  private getItem(key: string): any {
    const encryptedValue = window.localStorage.getItem(key);
    if (!encryptedValue) return null;
    return this.decrypt(encryptedValue);
  }

  // Specific methods using the generic encrypted storage
  setCurrentUser(user: any): void {
    this.setItem(LOCAL_STORAGE_ITEM_NAME.CURRENT_USER, user);
  }

  getCurrentUser(): any {
    return this.getItem(LOCAL_STORAGE_ITEM_NAME.CURRENT_USER);
  }

  setLastActivity(time: number): void {
    this.setItem(LOCAL_STORAGE_ITEM_NAME.LAST_ACTIVITY, time);
  }

  getLastActivity(): number | null {
    return this.getItem(LOCAL_STORAGE_ITEM_NAME.LAST_ACTIVITY);
  }

  setShowLoginModal(value: LOGIN_MODAL_STATUS): void {
    this.setItem(LOCAL_STORAGE_ITEM_NAME.SHOW_LOGIN_MODAL, value);
  }

  getShowLoginModal(): LOGIN_MODAL_STATUS | null {
    return this.getItem(LOCAL_STORAGE_ITEM_NAME.SHOW_LOGIN_MODAL);
  }

  setAppUsr(value: string): void {
    this.setItem(LOCAL_STORAGE_ITEM_NAME.APP_USR, value);
  }

  getAppUsr(): string | null {
    return this.getItem(LOCAL_STORAGE_ITEM_NAME.APP_USR);
  }

  clear(item: string | LOCAL_STORAGE_ITEM_NAME[]): void {
    if (Array.isArray(item)) {
      item.forEach(key => {
        window.localStorage.removeItem(key);
      });
    } else {
      window.localStorage.removeItem(item);
    }
  }

  clearCurrentUser(): void {
    console.log("clearCurrentUser()")
    this.clear([
      LOCAL_STORAGE_ITEM_NAME.CURRENT_USER,
      LOCAL_STORAGE_ITEM_NAME.APP_USR,
      LOCAL_STORAGE_ITEM_NAME.LAST_ACTIVITY,
      LOCAL_STORAGE_ITEM_NAME.INITIAL_ROUTE_KEY
    ]);
  }
}