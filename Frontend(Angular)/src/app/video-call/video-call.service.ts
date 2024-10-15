// src/app/video-call.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;
  private peerConnection: RTCPeerConnection | null = null;

  // Observable streams to communicate between components
  public localStream$ = new Subject<MediaStream>();
  public remoteStream$ = new Subject<MediaStream>();

  constructor() {
    // Initialize peer connection configuration
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302'
        }
      ]
    });

    // Handle incoming remote stream
    this.peerConnection.ontrack = (event) => {
      this.remoteStream = event.streams[0];
      this.remoteStream$.next(this.remoteStream);
    };
  }

  // Start video call
  public async startVideoCall(): Promise<void> {
    // Get user media (local stream)
    this.localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    // Add local stream tracks to peer connection
    this.localStream.getTracks().forEach((track) => {
      this.peerConnection?.addTrack(track, this.localStream);
    });

    // Emit local stream to subscribers if it is not null
    if (this.localStream) {
      this.localStream$.next(this.localStream);
    }
  }

  // Create offer
  public async createOffer(): Promise<void> {
    if (!this.peerConnection) return;

    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);

    // Here you would send the offer to the remote peer
    // For example, through WebSocket
    console.log('Offer created:', offer);
  }

  // Set remote description
  public async setRemoteDescription(offer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) return;

    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  }

  // Add answer from remote peer
  public async addAnswer(answer: RTCSessionDescriptionInit): Promise<void> {
    if (!this.peerConnection) return;

    await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
  }

  // Close the connection
  public closeConnection(): void {
    this.localStream?.getTracks().forEach((track) => track.stop());
    this.peerConnection?.close();
  }
}
