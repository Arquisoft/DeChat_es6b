import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';
import { Message } from '../models/message.model';
import * as assert from 'assert';


describe('UtilsService', () => {
  let utilsService: UtilsService;

  const webID = "https://pruebases6b.solid.community/profile/card#me";

  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    utilsService = TestBed.get(UtilsService);
    expect(utilsService).toBeTruthy();
  });

  it ('analyze messages', async function() {
    let msg: Message = new Message(webID, "Test");
    assert.equal(utilsService.analyzeMessage(msg), "Test");
  });

  it ('convert url to html image', async function() {
    let url = "http://testurlimage.com/image.jpg";
    let msg: Message = new Message(webID, url);

    let expected = '<a target="_blank" rel="noopener noreferrer" href="' + url + '">';
    expected += '<img class="chat_image" height="220px" width="auto" src="' + url + '" />';
    expected += '</a>';

    assert.equal(utilsService.analyzeMessage(msg), expected);
  });

  it ('convert url to video html', async function() {
    let url = "http://testurlvideo.com/video.mp4";
    let msg: Message = new Message(webID, url);

    let expected = '<video class="chat_video" src="' + url + '" controls>';
    expected += 'Your browser does not support the video tag.';
    expected += '</video>';

    assert.equal(utilsService.analyzeMessage(msg), expected);
  });

  it ('convert url to audio html', async function() {
    let url = "http://testurlaudio.com/audio.mp3";
    let msg: Message = new Message(webID, url);

    let expected = '<audio class="chat_audio" src="' + url + '" controls>';
    expected += 'Your browser does not support the audio element.';
    expected += '</audio>';

    assert.equal(utilsService.analyzeMessage(msg), expected);
  });

  it ('convert url to html file', async function() {
    let url = "http://testurlfile.com/file.zip";
    let msg: Message = new Message(webID, url);

    let expected = '<a class="chat_file" target="_blank" rel="noopener noreferrer" href="' + url + '">';
    expected += url.split("/").pop();
    expected += '</a>';

    assert.equal(utilsService.analyzeMessage(msg), expected);
  });

  it ('detect emote pattern and pass it to html', async function() {
    let message = "test test :D";
    let msg: Message = new Message(webID, message);

    let expected = 'test test <img height="25px" width="25px" src="https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/face-with-tears-of-joy_1f602.png" />';

    assert.equal(utilsService.analyzeMessage(msg), expected);
  });

  it ('detect gif pattern and pass it to html', async function() {
    let message = "test test :angry:";
    let msg: Message = new Message(webID, message);

    let expected = 'test test <img height="80px" width="auto" src="http://www.animated-gifs.eu/category_emoticons/smilies-3d-3/0012.gif" />';

    assert.equal(utilsService.analyzeMessage(msg), expected);
  });
  
});
