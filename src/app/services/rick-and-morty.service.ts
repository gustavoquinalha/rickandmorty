import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/characters';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacters(page: number = 1, name: string = '', specie: string = '', gender: string = '', status: string = ''): Observable<ApiResponse> {
    const nameQuery = name ? `&name=${name}` : '';
    const specieQuery = specie ? `&species=${specie}` : '';
    const genderQuery = gender ? `&gender=${gender}` : '';
    const statusQuery = status ? `&status=${status}` : '';

    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}${nameQuery}${specieQuery}${genderQuery}${statusQuery}`);
  }

  getCharacterById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
