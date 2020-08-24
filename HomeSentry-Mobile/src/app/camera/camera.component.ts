import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import Peer from 'peerjs';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit, OnDestroy {

    @ViewChild('localvideo') localVideo: ElementRef;

    private peer: any;
    public cameraName: string;
    private socket: SocketIOClient.Socket;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthenticationService) { }

    ngOnDestroy(): void {
        this.peer.destroy();
        this.socket.close();
    }

    ngOnInit(): void {
        this.cameraName = decodeURIComponent(this.route.snapshot.paramMap.get('name'));
        console.log(this.cameraName);
        if (this.cameraName === "") {
            this.router.navigateByUrl('/');
        }

        this.peer = new Peer();

        this.peer.on('open', () => {
            this.initializeSocketIo();
        });

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
                if (this.localVideo) {
                    this.localVideo.nativeElement.srcObject = stream;
                }
            });
        }
    }

    private initializeSocketIo(): void {
        if (!this.socket) {
            this.socket = io('homesentry.azurewebsites.net');

            this.socket.on('stream-target', (receiverId: string) => {
                console.log(`Streaming to ${receiverId}`, new Date());
                this.call(receiverId);
            });

            const jwt = this.authService.getJwt();
            if (jwt) {
                this.socket.emit('mobile-connect', jwt, this.cameraName);
            } else {
                Swal.fire('An error occured', 'Sorry, an error occured while contacting server. Please try again', 'error');
            }
        }
    }

    public call(id: string): void {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
                if (this.localVideo) {
                    this.localVideo.nativeElement.srcObject = stream;
                }
                console.log(`Calling ${id}`);

                const conn = this.peer.connect(id);
                conn.on('open', () => {
                  conn.send({stream: stream.id, cam: this.cameraName});

                  setTimeout(() => {
                    this.peer.call(id, stream);
                  }, 500);
                });
            });
        }
    }
}
