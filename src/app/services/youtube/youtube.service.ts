import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private http : HttpClient) { }

  getVideos(urlMatch : string) : Observable<any>{
    let direction = 'https://apivideofetcher.azurewebsites.net/api/Youtube/getcontainer/videoUrl=' + urlMatch;
    return this.http.get<any[]>(direction)
      .pipe(
        catchError(this.handleError)
      );
  }

  getVideosM4a(urlMatch : string) : Observable<any>{
    let direction = 'https://apivideofetcher.azurewebsites.net/api/Youtube/getcontainerm4a/videoUrl=' + urlMatch;
    return this.http.get<any[]>(direction)
      .pipe(
        catchError(this.handleError)
      );
  }

  getVideo(urlMatch : string) : Observable<any>{
    let direction = 'https://apivideofetcher.azurewebsites.net/api/Youtube/getvideo/videoUrl=' + urlMatch;
    return this.http.get<any[]>(direction)
      .pipe(
        catchError(this.handleError)
      );
  }

  stream(urlMatch : string, quality : string) : Observable<any>{
    let direction = 'https://apivideofetcher.azurewebsites.net/api/Youtube/stream/videoUrl=' + urlMatch + "/quality=" + quality;
    return this.http.get<any[]>(direction)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse){
    if (error.error instanceof ErrorEvent){
      console.error('An error occurred: ', error.error.message);
    }
    else{
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
