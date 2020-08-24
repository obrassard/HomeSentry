import { Injectable } from '@angular/core';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class DataSingletonService {

  public videos: Map<string, Video> = new Map;

  constructor() { }
}
