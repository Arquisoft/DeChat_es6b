import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  regexUrlFiles: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gi;
  regexUrlDomain: RegExp = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im;

  imageTypes = ["jpg", "jpeg", "png", "gif", "svg"];
  videoTypes = ["mp4", "webm"];
  audioTypes = ["mp3", "wav", "ogg"];


  constructor() { }

  /**
   * 
   * @param msg 
   */
  public analyzeMessage(msg: string): string {
    let newMsg = msg.replace(this.regexUrlFiles, this.convertUrlToHtml.bind(this));

    return (newMsg)? newMsg : msg;
  }

  /**
   * Método que comprueba el tipo de fichero de la url y devuelve un string
   * con el formato HTML adecuado.
   * 
   * @param url 
   * @param p1 
   * @param p2 
   * @param offset 
   * @param s 
   */
  private convertUrlToHtml(url: string, p1, p2, offset, s): string
  {
    let fileType = url.split(".").pop();
    let urlInHtml;

    if (this.imageTypes.includes(fileType.toLocaleLowerCase())) {
      urlInHtml = '<a target="_blank" rel="noopener noreferrer" href="' + url + '">';
      urlInHtml += '<img class="chat_image" height="220px" width="auto" src="' + url + '" />';
      urlInHtml += '</a>';
    } 
    else if (this.videoTypes.includes(fileType.toLocaleLowerCase())) {
      urlInHtml = '<video class="chat_video" src="' + url + '" controls>';
      urlInHtml += 'Your browser does not support the video tag.';
      urlInHtml += '</video>';
    }
    else if (this.audioTypes.includes(fileType.toLocaleLowerCase())) {
      urlInHtml = '<audio class="chat_audio" src="' + url + '" controls>';
      urlInHtml += 'Your browser does not support the audio element.';
      urlInHtml += '</audio>';
    }
    else {
      urlInHtml = 'Link: ';
      urlInHtml += '<a class="chat_file" target="_blank" rel="noopener noreferrer" href="' + url + '">';
      urlInHtml += url.split("/").pop();
      urlInHtml += '</a>';
    }

    return urlInHtml;
  }

  /**
   * 
   * @param emote 
   * @param p1 
   * @param p2 
   * @param offset 
   * @param s 
   */
  public convertEmoteToHtml(emote: string, p1, p2, offset, s): string {
    return "";
  }
  
}