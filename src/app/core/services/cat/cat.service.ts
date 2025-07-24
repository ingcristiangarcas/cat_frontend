import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CatBreed {
  id: string;
  name: string;
  temperament: string;
  origin: string;
  description: string;
}

export interface CatImage {
  id: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getBreeds(): Observable<CatBreed[]> {
    return this.http.get<CatBreed[]>(`${this.apiUrl}/breeds`);
  }

  getBreedById(breedId: string): Observable<CatBreed> {
    return this.http.get<CatBreed>(`${this.apiUrl}/breeds/${breedId}`);
  }

  getImagesByBreedId(breedId: string): Observable<CatImage[]> {
    return this.http.get<CatImage[]>(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&limit=10`);
  }
}
