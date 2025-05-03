import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc, where } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';

// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }

  async getShoppingCartByUserId(userId: string): Promise<any[]> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);
    return cartSnap.exists() ? cartSnap.data().items || [] : [];
  }

  async addItemToShoppingCart(userId: string, product: any): Promise<void> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);
    let items = cartSnap.exists() ? cartSnap.data().items || [] : [];

    const index = items.findIndex((item: any) => item.id === product.id);

    if (index !== -1) {
      items[index].quantity = (items[index].quantity || 1) + 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    await setDoc(cartRef, { items });
  }

  async updateCartItemQuantity(userId: string, productId: string, change: number): Promise<void> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);
    if (!cartSnap.exists()) return;

    let items = cartSnap.data().items || [];
    const index = items.findIndex((item: any) => item.id === productId);
    if (index === -1) return;

    items[index].quantity += change;

    if (items[index].quantity <= 0) {
      items.splice(index, 1); // Remove item if 0
    }

    await setDoc(cartRef, { items });
  }

  async removeItemFromCart(userId: string, productId: string): Promise<void> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);
    if (!cartSnap.exists()) return;

    const items = cartSnap.data().items || [];
    const updatedItems = items.filter((item: any) => item.id !== productId);
    await setDoc(cartRef, { items: updatedItems });
  }

  async getCartItemCountByUserId(userId: string): Promise<number> {
    const cartRef = doc(db, 'shoppingCart', userId);
    const cartSnap: any = await getDoc(cartRef);
    if (cartSnap.exists()) {
      const items = cartSnap.data().items || [];
      return items.reduce((total: number, item: any) => total + (item.quantity || 0), 0);
    }
    return 0;
  }
  


}
