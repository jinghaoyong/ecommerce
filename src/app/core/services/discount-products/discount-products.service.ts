import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, query, Timestamp, where } from 'firebase/firestore';
import { environment } from '../../../../environments/environment';


// Initialize Firebase
const app = initializeApp(environment.firebaseProject_);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class DiscountProductsService {

  constructor() { }
  async getDealOfTheWeekProducts(): Promise<any[]> {
    const productQuery = query(
      collection(db, "products"),
      where("dealOfTheWeek", "==", true) // Filter where dealOfTheWeek is true
    );

    const productsSnapshot = await getDocs(productQuery);
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  }

  async getSeasonalProducts(): Promise<any[]> {
    const currentMonth = new Date().getMonth(); // Get current month (0 = January, 11 = December)
    const season = this.getSeasonFromMonth(currentMonth); // Determine the current season

    // Define date range for the current season (last 3 months)
    const startOfSeason = new Date();
    startOfSeason.setMonth(currentMonth - 2);
    startOfSeason.setDate(1);
    startOfSeason.setHours(0, 0, 0, 0);

    const startTimestamp = Timestamp.fromDate(startOfSeason); // Convert to Firestore timestamp

    // Firestore query to get products created within the current season
    const productQuery = query(
      collection(db, "products"),
      where("createdAt", ">=", startTimestamp) // Filter by creation date
    );

    const productsSnapshot = await getDocs(productQuery);
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  }

  // Function to determine the season based on the month
  getSeasonFromMonth(month: number): string {
    if (month >= 2 && month <= 4) return "Spring"; // March - May
    if (month >= 5 && month <= 7) return "Summer"; // June - August
    if (month >= 8 && month <= 10) return "Autumn"; // September - November
    return "Winter"; // December - February
  }
}
