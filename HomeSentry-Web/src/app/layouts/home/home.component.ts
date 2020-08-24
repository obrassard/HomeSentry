import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import Peer from 'peerjs';
import * as io from 'socket.io-client';
import { DataSingletonService } from '../../services/data-singleton.service';
import * as uuid from 'uuid';
import { KeyValue } from '@angular/common';
import { Video } from 'src/app/models/video';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('remotevideo') remoteVideo: ElementRef;
  @ViewChild('videos') videosgrid: ElementRef;

  public username: string;
  public peer: Peer;
  public peerID: string;
  public socket: SocketIOClient.Socket;
  private nameMap: Map<string, string> = new Map();

  constructor(private router: Router, private authService: AuthenticationService, public dataService: DataSingletonService) { }

  ngOnInit(): void {
    this.username = this.authService.getName();
    this.dataService.videos.clear();

    this.socket = io('homesentry.azurewebsites.net');
    this.initializeSocketEvents();

    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.peerID = id;
      const jwt = this.authService.getJwt();
      if (jwt) {
        this.socket.emit('dashboard', jwt, id);
      } else {
        Swal.fire('An error occured', 'Sorry, an error occured while contacting server. Please try again', 'error');
      }
    });

    this.peer.on('call', (call) => {
      console.log(`Call recieved`);
      call.answer();
      call.on('stream', (remoteStream) => {
        const cam = this.nameMap.get(remoteStream.id) || remoteStream.id;
        this.dataService.videos.set(uuid.v4(), { name: cam, stream: remoteStream });
      });
    });

    this.peer.on('connection', (conn) => {
      conn.on('data', (data) => {
        this.nameMap.set(data.stream, data.cam);
      });
    });
  }

  onClick(video: KeyValue<string, Video>): void {
    this.router.navigateByUrl(`/detail/${video.key}`);
  }

  private initializeSocketEvents(): void {
    this.socket.on('cam-registered', (camSocketId: string) => {
      console.log(`Cam added ${camSocketId}`);
      console.log(this.peerID);
      this.socket.emit('cam-sync', camSocketId, this.peerID);
    });
  }

}
