import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import feather from 'feather-icons';
import { Video } from 'src/app/models/video';
import { DataSingletonService } from 'src/app/services/data-singleton.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {

  public video: Video;
  public videoId: string;

  constructor(private route: ActivatedRoute, private AuthService: AuthenticationService, private dataService: DataSingletonService) { }

  ngOnInit(): void {
    if (this.dataService.videos == null || this.dataService.videos.size == 0)
      this.AuthService.goToHome();
    feather.replace();
    this.videoId = this.route.snapshot.paramMap.get('id');
    this.video = this.dataService.videos.get(this.videoId);
  }
}
