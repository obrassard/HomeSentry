import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Video } from 'src/app/models/video';
import { KeyValue } from '@angular/common';
import { Router } from '@angular/router';
import { DataSingletonService } from 'src/app/services/data-singleton.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements AfterViewInit {

  @ViewChild('video') videoElement: ElementRef;

  @Input() video: Video;
  @Input() videoId: string;

  constructor(private dataSingleton: DataSingletonService, private router: Router) { }

  ngAfterViewInit(): void {
    this.videoElement.nativeElement.autoplay = true;
    this.videoElement.nativeElement.srcObject = this.video.stream;

    const interval = setInterval(() => {
      if (this.videoElement.nativeElement.ended) {
        console.log('ended');
        this.dataSingleton.videos.delete(this.videoId);
        this.router.navigateByUrl('/');
        clearInterval(interval);
      }
    }, 1800);
  }
}
