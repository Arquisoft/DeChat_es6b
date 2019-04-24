import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  regexUrlFiles: RegExp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/gi;
  regexUrlDomain: RegExp = /^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  regexEmotes: RegExp = /(\:\w+\:|\<[\/\\]?3|[\(\)\\\D|\*\$][\-\^]?[\:\;\=]|[\:\;\=B8][\-\^]?[3DOPp\@\$\*\\\)\(\/\|])(?=\s|[\!\.\?]|$)/gi;


  constructor() { }

  /**
   * 
   * @param msg 
   */
  public analyzeMessage(msg: Message): string {
    let newMsg = msg.message.replace(this.regexUrlFiles, this.convertUrlToHtml.bind(this));
    newMsg = newMsg.replace(this.regexEmotes, this.convertEmoteToHtml.bind(this));

    return (newMsg)? newMsg : msg.message;
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
    let imageTypes = ["jpg", "jpeg", "png", "gif", "svg"];
    let videoTypes = ["mp4", "webm"];
    let audioTypes = ["mp3", "wav", "ogg"];

    let fileType = url.split(".").pop();
    let urlInHtml;


    if (imageTypes.includes(fileType.toLocaleLowerCase())) {
      urlInHtml = '<a target="_blank" rel="noopener noreferrer" href="' + url + '">';
      urlInHtml += '<img class="chat_image" height="220px" width="auto" src="' + url + '" />';
      urlInHtml += '</a>';
    } 
    else if (videoTypes.includes(fileType.toLocaleLowerCase())) {
      urlInHtml = '<video class="chat_video" src="' + url + '" controls>';
      urlInHtml += 'Your browser does not support the video tag.';
      urlInHtml += '</video>';
    }
    else if (audioTypes.includes(fileType.toLocaleLowerCase())) {
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
    let emotes = {
      ':-)':['https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/grinning-face_1f600.png'],
      ':)':['https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/grinning-face-with-smiling-eyes_1f601.png'],
      ':D':['https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/face-with-tears-of-joy_1f602.png']
    }

    let gifs = {
      ':angry:':['http://www.animated-gifs.eu/category_emoticons/smilies-3d-3/0012.gif']
    }


    // Devolvemos el código HTML del emote
    if (emotes[emote]) {
      return '<img height="25px" width="25px" src="' + emotes[emote][0] + '" />';
    }
    
    // Devolvemos el código HTML del GIF
    if (gifs[emote]) {
      return '<img height="80px" width="auto" src="' + gifs[emote][0] + '" />';
    }

    return emote;
  }

  /**
   * 
   */
  getRandomDarkColor() {
    let lum = -0.25;
    let hex = String('#' + Math.random().toString(16).slice(2, 8).toUpperCase()).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    let rgb = "#",
        c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }
    return rgb;
  }
  
}