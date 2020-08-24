import { Component, OnInit, Input } from '@angular/core';
import feather from 'feather-icons';
import { Video } from 'src/app/models/video';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-video-thumbnail',
  templateUrl: './video-thumbnail.component.html',
  styleUrls: ['./video-thumbnail.component.scss']
})
export class VideoThumbnailComponent implements OnInit {

  @Input() video: Video;
  @Input() videoId: string;

  constructor() { }

  ngOnInit(): void {
    feather.replace();
  }

}
