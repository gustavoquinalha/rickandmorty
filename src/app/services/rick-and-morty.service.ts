import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/characters';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1, name: string = '', specie: string = '', gender: string = '', status: string = '', favorites: number[] = []): Observable<ApiResponse> {
    const nameQuery = name ? `&name=${name}` : '';
    const specieQuery = specie ? `&species=${specie}` : '';
    const genderQuery = gender ? `&gender=${gender}` : '';
    const statusQuery = status ? `&status=${status}` : '';
    const favoriteQuery = favorites.length ? `/${favorites}` : '';
    return this.http.get<ApiResponse>(`${this.apiUrl}/character${favoriteQuery}?page=${page}${nameQuery}${specieQuery}${genderQuery}${statusQuery}`);
  }

  getCharacterById(id: string | number[]): Observable<any> {
    console.log('getCharacterById');

    return this.http.get<any>(`${this.apiUrl}/character/${id}`);
  }

  getLocationById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/location/${id}`);
  }

  getLocation(apiUrl: any): Observable<any> {
    return this.http.get<any>(`${apiUrl}`);
  }

  getLocations(ids: number[]): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/location/${ids}`);
  }

  getEpisodeById(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/episode/${id}`);
  }

  getEpisodes(ids: number[]): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/episode/${ids}`);
  }
}
