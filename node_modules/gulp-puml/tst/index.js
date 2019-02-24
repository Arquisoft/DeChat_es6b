/**
 * Created by bondden on 7/30/15.
 **/

"use strict";

const

  path  =require("path"),
  fs    =require("fs-extra"),

  es    =require("event-stream"),
  gutil =require("gulp-util"),
  assert=require("chai").assert,
  pssTru=require("stream").PassThrough,

  puml  =require("../")
  ;

function replaceVar(s){
  return s.replace(/( id="[^"]+")|(url\(#[^\)]+\)")/g,'');
}

const

  dir   ={
    inp:path.resolve(__dirname+"/d/inp"),
    out:path.resolve(__dirname+"/d/out")
  },

  fls   =[{
    name:   "test1.puml",
    content:null
  },{
    name:   "test2.puml",
    content:null
  }],

  etalon='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="406px" style="width:173px;height:406px;" version="1.1" viewBox="0 0 173 406" width="173px"><defs/><g><text fill="#191970" font-family="sans-serif" font-size="18" lengthAdjust="spacingAndGlyphs" textLength="55" x="63.5" y="26.708">Test 1</text><text fill="#191970" font-family="sans-serif" font-size="18" lengthAdjust="spacingAndGlyphs" textLength="0" x="94" y="47.6611"/><ellipse cx="92.5" cy="61.9063" fill="#191970" rx="10" ry="10" style="stroke: none; stroke-width: 1.0;"/><rect fill="#FEFECE" height="33.9688" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="39" x="73" y="91.9063"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="19" x="83" y="113.0449">init</text><rect fill="#FFFFFF" height="175.0703" style="stroke: #000000; stroke-width: 2.0;" width="162" x="10" y="136.6768"/><path d="M47,137.6768 L47,145.9736 L37,155.9736 L10,155.9736 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#191970" font-family="sans-serif" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="27" x="13" y="150.6719">test</text><rect fill="#FEFECE" height="33.9688" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="70" x="57.5" y="233.7783"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="50" x="67.5" y="254.917">run test</text><polygon fill="#FEFECE" points="56,172.9736,129,172.9736,141,184.9736,129,196.9736,56,196.9736,44,184.9736,56,172.9736" style="stroke: #191970; stroke-width: 1.5;"/><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="20" x="96.5" y="207.1841">yes</text><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="73" x="56" y="188.7817">tests remain</text><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="14" x="30" y="182.3794">no</text><rect fill="#FEFECE" height="33.9688" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="59" x="63" y="331.7471"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="39" x="73" y="352.8857">report</text><ellipse cx="92.5" cy="395.7158" fill="none" rx="10" ry="10" style="stroke: #191970; stroke-width: 1.0;"/><ellipse cx="93" cy="396.2158" fill="#191970" rx="6" ry="6" style="stroke: none; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="71.9063" y2="91.9063"/><polygon fill="#191970" points="88.5,81.9063,92.5,91.9063,96.5,81.9063,92.5,85.9063" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="196.9736" y2="233.7783"/><polygon fill="#191970" points="88.5,223.7783,92.5,233.7783,96.5,223.7783,92.5,227.7783" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="267.7471" y2="279.7471"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="153" y1="279.7471" y2="279.7471"/><polygon fill="#191970" points="149,242.3604,153,232.3604,157,242.3604,153,238.3604" style="stroke: #191970; stroke-width: 1.5;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="153" x2="153" y1="184.9736" y2="279.7471"/><line style="stroke: #191970; stroke-width: 1.5;" x1="153" x2="141" y1="184.9736" y2="184.9736"/><polygon fill="#191970" points="151,180.9736,141,184.9736,151,188.9736,147,184.9736" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="44" x2="32" y1="184.9736" y2="184.9736"/><polygon fill="#191970" points="28,228.3604,32,238.3604,36,228.3604,32,232.3604" style="stroke: #191970; stroke-width: 1.5;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="32" x2="32" y1="184.9736" y2="291.7471"/><line style="stroke: #191970; stroke-width: 1.5;" x1="32" x2="92.5" y1="291.7471" y2="291.7471"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="291.7471" y2="331.7471"/><polygon fill="#191970" points="88.5,321.7471,92.5,331.7471,96.5,321.7471,92.5,325.7471" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="125.875" y2="172.9736"/><polygon fill="#191970" points="88.5,162.9736,92.5,172.9736,96.5,162.9736,92.5,166.9736" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="365.7158" y2="385.7158"/><polygon fill="#191970" points="88.5,375.7158,92.5,385.7158,96.5,375.7158,92.5,379.7158" style="stroke: #191970; stroke-width: 1.0;"/></g></svg>'

  ;



suite("gulp-puml vinyl-fs tests",()=>{

  suiteSetup(done=>{

    let wtr=[];
    fls.forEach((v,i,a) =>{
      wtr.push(new Promise((rs,rj) =>{

        fs.readFile(
          path.resolve(dir.inp+"/"+v.name),
          {
            encoding:"utf8"
          },
          (e,d) =>{
            if(e){
              rj(e);
            }else{
              a[i].content=d;
              rs();
            }
          }
        );

      }));
    });

    Promise.all(wtr).then(r=>{
      done();
    }).catch(e=>{
      done(e);
    });

  });

  test("buffer mode",done=>{

    var stream=puml();
    var bfrs  =[];

    fls.forEach(v=>{
      var fakeFile=new gutil.File({
        contents:new Buffer(v.content,"utf8")
      });
      if(!fakeFile.path){
        fakeFile.path=path.resolve(fakeFile.base+'/tst/d/inp/'+v.name);
      }
      bfrs.push({
        file:fakeFile
      });
    });

    stream.on("data",newFile=>{
      bfrs.forEach(b=>{
        if(newFile===b.file){
          assert.equal(
            replaceVar(newFile.contents.toString()),
            replaceVar(b.file.contents.toString())
          );
        }
      });
    });

    stream.on("end",()=>{
      done();
    });

    bfrs.forEach(b=>{
      stream.write(b.file,e=>{

        if(e){
          done(e);
          return e;
        }

        if(b.name==='file1.puml'){
          assert.equal(
            replaceVar(b.file.toString()),
            replaceVar(etalon),
            "checking proper result content");
        }

      });
    });

    stream.end();

  });

  test("stream mode",done=>{

    var stream=puml();
    var stms  =[];

    fls.forEach(v=>{

      var fakeStream=new pssTru();
      var fakeFile  =new gutil.File({
        contents:fakeStream
      });
      if(!fakeFile.path){
        fakeFile.path=path.resolve(__dirname+'/tst/d/inp/'+v.name);
      }
      stms.push({
        file:fakeFile,
        data:v.contents
      });
      fakeStream.write(new Buffer(v.content));
      fakeStream.end();

    });

    stream.on("data",newFile=>{

      stms.forEach(stm=>{
        if(newFile===stm.file){
          newFile.pipe(es.wait((e,d)=>{
            assert.equal(
              d?replaceVar(d.toString()):d,
              stm.data?replaceVar(stm.data.toString()):stm.data,
              "Stream mode"
            );
          }));
        }
      });

    });

    stream.on("end",()=>{
      done();
    });

    stms.forEach(stm=>{
      stream.write(stm.file,e=>{

        if(e){
          done(e);
          return e;
        }

        if(stm.name==='file1.puml'){
          assert.equal(
            replaceVar(stm.file.toString()),
            replaceVar(etalon),
            "checking proper result content");
        }

      });
    });

    stream.end();

  });

});
