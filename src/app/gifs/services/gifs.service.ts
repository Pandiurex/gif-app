import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.i';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private api_key = 'nA9e2KKJMMKDeETdXSYd6IBobqEWa01N';
  private _tagsHistory: string[] = [];
  private giphyURL = 'https://api.giphy.com/v1/gifs';
  public gifsList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.readLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage() {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private readLocalStorage() {
    if (!localStorage.getItem('history')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    if (this._tagsHistory.length === 0) return;
    this.searchTag(this._tagsHistory[0]);
  }

  searchTag(tag: string) {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.giphyURL}/search`, { params })
      .subscribe((resp) => {
        this.gifsList = resp.data;

        console.log({ gifs: this.gifsList });
      });
  }
}
