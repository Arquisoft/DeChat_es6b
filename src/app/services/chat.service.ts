import { Injectable } from '@angular/core';
import { RdfService } from '../services/rdf.service';
import { AuthService } from '../services/solid.auth.service';
import { SolidProfile } from '../models/solid-profile.model';

import * as fileClient from "solid-file-client";
import { getBodyNode } from '@angular/animations/browser/src/render/shared';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private rdf: RdfService, private auth: AuthService, ) { }


  /**
   * Crea un fichero vacío
   * 
   * @param newFile 
   */
  async writeMessage(newFile) {
    fileClient.createFile(newFile).then( fileCreated => {
      console.log(`Created file ${fileCreated}.`);
    }, err => console.log(err) );
  }

  /**
   * 
   * @param file 
   */
  async readMessage(file) {
    return fileClient.readFile(file).then(body => { return(body) }, err => console.log(err) );
  }

  /**
   * 
   * @param url 
   * @param newContent 
   * @param contentType 
   */
  async updateFile(url, newContent, contentType?: string) {
    fileClient.updateFile( url, newContent, contentType ).then( success => { console.log( `Updated ${url}.`) }, err => console.log(err) );
  }

  /**
   * 
   * @param url 
   */
  async deleteFile(url) {
    fileClient.deleteFile(url).then(success => {
      console.log(`Deleted ${url}.`);
    }, err => console.log(err) );
  }

  /**
   * URL FICHERO ORIGEN ---> URL FICHERO DESTINO
   * 
   * @param oldFile 
   * @param newFile 
   */
  async copyFile(oldFile,newFile) {
    fileClient.readFile(oldFile).then( content => {
      fileClient.createFile(newFile,content).then( res => {
            return(res);
        }, err => {throw new Error("copy upload error  "+err)});
    }, err => {throw new Error("copy download error  "+err)});
  }

  /**
   * {
          type : "folder",
          name : // folder name (without path),
           url : // full URL of the resource,
      modified : // dcterms:modified date
         mtime : // stat:mtime
          size : // stat:size
        parent : // parentFolder or undef if none,
       content : // raw content of the folder's turtle representation,
         files : // an array of files in the folder
       folders : // an array of sub-folders in the folder,
      }
   * 
   * @param url 
   */
  async readFolder(url) {
    return fileClient.readFolder(url).then(folder => { return(folder) }, err => console.log(err) );
  }

}
