import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }


  getFileFromURL() {
    // fetch('https://dcarballob01.inrupt.net/profile/campo.jpg')
    fetch("https://davidcarballo.solid.community/private/files/file_smiley_faces-1440x900.jpg")
    .then(res => res.blob()) // Gets the response and returns it as a blob
    .then(blob => {
      // Here's where you get access to the blob
      // And you can use it for whatever you want
      // Like calling ref().put(blob)

      // Here, I use it to make an image appear on the page
      let objectURL = URL.createObjectURL(blob);
      let myImage = new Image();
      myImage.src = objectURL;
      document.getElementById('aaaaaaa').appendChild(myImage)
      console.log(myImage);
    });
  }

  previewFile(file) {

    var reader  = new FileReader();
  
    reader.onloadend = function () {
      console.log(reader.result); //this is an ArrayBuffer
    }
    reader.readAsArrayBuffer(file);
  }

  ConvertFileUrlToHtml(fileURL: string): string {


    return "";
  }
}
