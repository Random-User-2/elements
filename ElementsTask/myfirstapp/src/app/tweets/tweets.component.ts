import { Component, OnInit } from '@angular/core';
import { TweetsService } from '../tweets.service';



@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css'],
  providers: [TweetsService]
})
export class TweetsComponent implements OnInit {

	twit;

  constructor(private tweetsService: TweetsService) { }

  ngOnInit() {

  	this.tweetsService.getTweets().subscribe(tweet => this.twit = tweet);

  }

}
