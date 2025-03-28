import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore, limit, orderBy, query, Timestamp, where } from 'firebase/firestore';
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

  async getTopPickedProducts(): Promise<any[]> {
    // Query Firestore products collection, ordered by soldCount in descending order
    const productQuery = query(
      collection(db, "products"),
      orderBy("soldCount", "desc"), // Sort by highest sold count
      limit(10) // Limit to top 10 best-selling products
    );

    const productsSnapshot = await getDocs(productQuery);
    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  }


  async getThisYearProducts(): Promise<any[]> {
    const currentYear = new Date().getFullYear();
    const startOfYear = Timestamp.fromDate(new Date(currentYear, 0, 1)); // Jan 1st, 00:00:00
    const endOfYear = Timestamp.fromDate(new Date(currentYear, 11, 31, 23, 59, 59)); // Dec 31st, 23:59:59

    // Query Firestore for products created within the current year
    const productQuery = query(
      collection(db, "products"),
      where("createdAt", ">=", startOfYear),
      where("createdAt", "<=", endOfYear)
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
