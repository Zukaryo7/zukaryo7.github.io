import { YOUTUBE } from './../../environments/youtubeData';
import { KANAS } from './../../environments/kanaData';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { toRomaji, toKatakana, toHiragana } from 'wanakana';

// HUGE CODE HELP FROM https://betterprogramming.pub/integrate-youtubes-iframe-player-api-in-angular-4e87f0ec98f4

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, OnDestroy {

  
  /* 1. Some required variables which will be used by YT API*/
  public YT: any;
  public video: any = '4Uy2BSAIkLA';
  public player: any;
  public reframed: Boolean = false;

  kanas = KANAS.baseKanas;
  videoLoaded = false;

  constructor() {

  }

  ngOnInit() {
    this.init();
  }

  ngOnDestroy() {
    this.videoLoaded = false;
  }

  /* 2. Initialize method for YT IFrame API */
  init() {
    var tag = document.createElement('script');
    tag.src = 'http://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    if(firstScriptTag.parentNode !== null) firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    /* 3. startVideo() will create an <iframe> (and YouTube player) after the API code downloads. */
    (window as any)['onYouTubeIframeAPIReady'] = () => this.startVideo();
  }

  toHiragana(string: string) {
    return toHiragana(string);
  }

  toKatakana(string: string) {
    return toKatakana(string);
  }

  seekHiraganaYT(index: number) {
    if(!this.videoLoaded) {
      this.startVideo();
    } else if(this.player !== undefined) {
      this.player.seekTo(YOUTUBE.hiraganaTimer[index]);
    }
  }

  seekKatakanaYT(index: number) {
    if(!this.videoLoaded) {
      this.startVideo();
    } else if(this.player !== undefined) {
      this.player.seekTo(YOUTUBE.katakanaTimer[index]);
    }
  }

  startVideo() {
    this.reframed = false;
    this.player = new (window as any)['YT'].Player('player', {
      width: '640',
      height: '360',
      videoId: this.video,
      playerVars: {
        autoplay: 0,
        modestbranding: 0,
        controls: 1,
        disablekb: 0,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1,
      },
      events: {
        'onError': this.onPlayerError.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  /* 4. It will be called when the Video Player is ready */
  onPlayerReady(event: any) {
    //event.target.playVideo();
    this.videoLoaded = true;
    this.player.mute();
  }
      
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }

  onPlayerError(event: any) {
    switch (event.data) {
      case 2:
        break;
      case 100:
        break;
      case 101 || 150:
        break;
    }
  }

}
