import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { YoutubeService } from 'src/app/services/youtube/youtube.service';
import { saveAs } from 'file-saver';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent {

  showThumbnail : boolean = false;
  videoData: any;
  videoUrl : string = "";
  urlMatch : string = "";
  videos : { label : string, mb : number}[] = [];
  videosm4a : { bytes : number, megaBytes : number}[] = [];

  constructor(private http: HttpClient, private youtubeService: YoutubeService, private toastr:ToastrService)
  {
    this.toastr.toastrConfig.timeOut = 1000;
  }

  idYoutube(url : string){
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)?([a-zA-Z0-9_-]{11})/;
    const match = regex.exec(url);

    if (match) {

      this.urlMatch = match[1];

      if (this.urlMatch === '') {
        setTimeout(() => {
          this.toastr.info(`La URL no contiene un ID de video válido.`, 'Information');
        }, 1400);
        this.videos = [];
        this.videosm4a = [];
      }
      setTimeout(() => {
        this.toastr.success(`Video encontrado`, 'Success');
      }, 1900);

    } else {
      setTimeout(() => {
        this.toastr.info(`La URL no coincide con una de Youtube`, 'Information');
      }, 1400);
      this.videos = [];
      this.videosm4a = [];
    }
  }

  showVideos(){

    this.videos = [];
    this.videosm4a = [];
    this.idYoutube(this.videoUrl);
    this.youtubeService.getVideo(this.urlMatch).subscribe(data =>{
      this.videoData = data.result;
    });
    this.youtubeService.getVideos(this.urlMatch).subscribe(data =>{
      this.videos = data.result.map((item : any) =>{
        return {
          label: item.videoQuality.label,
          mb : item.size.bytes / (1024 * 1024)
        }
      });
    })

    this.youtubeService.getVideosM4a(this.urlMatch).subscribe(data =>{
      this.videosm4a = data.result.map((item : any) =>{
        return {
          bytes: item.size.bytes,
          megaBytes : item.size.megaBytes
        }
      });
    })

    setTimeout(() => {
      this.showThumbnail = true;
    }, 1000);
  }

  downloadVideo(quality : string) {
    this.toastr.toastrConfig.timeOut = 999999999;
    this.toastr.success(`Descargando video...`, 'Success');
    const url = 'https://apivideofetcher.azurewebsites.net/api/Youtube/stream/videoUrl=' + this.urlMatch + "/quality=" + quality;

    this.http.get(url, { responseType: 'blob' }).subscribe(response =>{
      const blob = new Blob([response], { type: 'video/mp4'});
      saveAs(blob, this.videoData.title);
      this.toastr.clear();
    })
  }

  downloadM4a(bytes : number) {

    this.toastr.toastrConfig.timeOut = 999999999;
    this.toastr.success(`Descargando audio...`, 'Success');
    const url = 'https://apivideofetcher.azurewebsites.net/api/Youtube/streamm4a/videoUrl=' + this.urlMatch + "/bytes=" + bytes;

    this.http.get(url, { responseType: 'blob' }).subscribe(response =>{
      const blob = new Blob([response], { type: 'audio/mp4a-latm'});
      saveAs(blob, this.videoData.title);
      this.toastr.clear();
    })
  }
}
