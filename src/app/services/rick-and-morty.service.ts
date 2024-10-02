import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/characters';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private baseUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1, name: string = '', specie: string = '', gender: string = ''): Observable<ApiResponse> {
    const nameQuery = name ? `&name=${name}` : '';
    const specieQuery = specie ? `&species=${specie}` : '';
    const genderQuery = gender ? `&gender=${gender}` : '';

    return this.http.get<ApiResponse>(`${this.baseUrl}?page=${page}${nameQuery}${specieQuery}${genderQuery}`);
  }
}
