import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
//import {Tweets} from './tweets';

@Injectable()
export class TweetsService {

  constructor(private http: Http) { }

  getTweets()
  {
  	return this.http.get('http://localhost:3000/theTweets').map(res => res.json());
  }

}
