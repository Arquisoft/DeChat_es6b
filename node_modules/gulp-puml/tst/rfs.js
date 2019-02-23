/**
 * Created by bondden on 7/30/15.
 **/

"use strict";

//require("mocha");
var

  path = require("path"),
  fs = require("fs-extra"),

  assert = require("chai").assert,
  gulp=require("gulp"),
  exec=require("child_process").exec,

  puml = require("../"),

  dir = {
    inp: path.resolve(__dirname + "/d/inp"),
    out: path.resolve(__dirname + "/d/out")
  }

  ;

function replaceVar(s){
  return s.replace(/( id="[^"]+")|(url\(#[^\)]+\)")/g,'');
}

suite("gulp-puml on real file system suite",function(){
  this.timeout(30000);

  setup(done=>{

    //clean out dir
    fs.emptyDir(dir.out,e=>{
      if(e){
        done(e);
      }else{
        done();
      }
    });

  });

  test("test Dot",done=>{

    exec("java -jar "+path.resolve(__dirname+"/../node_modules/esf-puml/bin/plantuml.jar")+" -testdot",(e,r)=>{
      if(e){
        done(e);
        return e;
      }
      done();
    });

  });

  test("render",done=>{

    gulp.task("render",()=>{
      return gulp.src([
        path.resolve(dir.inp+"/*.puml"),
        dir.inp+'/**/*.puml'
      ])
        .pipe(puml())
        .pipe(gulp.dest(dir.out));
    });

    try{

      gulp.start("render",e=>{

        if(e){
          done(e);
          return e;
        }

        fs.readdir(dir.out,(e,d)=>{

          if(e){
            done(e);
            return e;
          }

          assert.isArray(d,"d should be an array");
          assert.equal(d.length,3,"there should be 3 files (recursive process dirs)");
          assert.deepEqual(d,["sub","test1.svg","test2.svg"],"2 of 3 files should be *.svg");

          fs.readFile(path.resolve(dir.out+"/test1.svg"),{"encoding":"utf8"},(ef,rf)=>{

            if(ef){
              done(e);
              return e;
            }

            let etalon=replaceVar('<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" contentScriptType="application/ecmascript" contentStyleType="text/css" height="406px" preserveAspectRatio="none" style="width:173px;height:406px;" version="1.1" viewBox="0 0 173 406" width="173px" zoomAndPan="magnify"><defs/><g><text fill="#191970" font-family="sans-serif" font-size="18" lengthAdjust="spacingAndGlyphs" textLength="55" x="63.5" y="26.708">Test 1</text><text fill="#191970" font-family="sans-serif" font-size="18" lengthAdjust="spacingAndGlyphs" textLength="0" x="94" y="47.6611"/><ellipse cx="92.5" cy="61.9063" fill="#191970" rx="10" ry="10" style="stroke: none; stroke-width: 1.0;"/><rect fill="#FEFECE" height="33.9688" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="39" x="73" y="91.9063"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="19" x="83" y="113.0449">init</text><rect fill="#FFFFFF" height="175.0703" style="stroke: #000000; stroke-width: 2.0;" width="162" x="10" y="136.6768"/><path d="M47,137.6768 L47,145.9736 L37,155.9736 L10,155.9736 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#191970" font-family="sans-serif" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="27" x="13" y="150.6719">test</text><rect fill="#FEFECE" height="33.9688" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="70" x="57.5" y="233.7783"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="50" x="67.5" y="254.917">run test</text><polygon fill="#FEFECE" points="56,172.9736,129,172.9736,141,184.9736,129,196.9736,56,196.9736,44,184.9736,56,172.9736" style="stroke: #191970; stroke-width: 1.5;"/><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="20" x="96.5" y="207.1841">yes</text><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="73" x="56" y="188.7817">tests remain</text><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="14" x="30" y="182.3794">no</text><rect fill="#FEFECE" height="33.9688" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="59" x="63" y="331.7471"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="39" x="73" y="352.8857">report</text><ellipse cx="92.5" cy="395.7158" fill="none" rx="10" ry="10" style="stroke: #191970; stroke-width: 1.0;"/><ellipse cx="93" cy="396.2158" fill="#191970" rx="6" ry="6" style="stroke: none; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="71.9063" y2="91.9063"/><polygon fill="#191970" points="88.5,81.9063,92.5,91.9063,96.5,81.9063,92.5,85.9063" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="196.9736" y2="233.7783"/><polygon fill="#191970" points="88.5,223.7783,92.5,233.7783,96.5,223.7783,92.5,227.7783" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="267.7471" y2="279.7471"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="153" y1="279.7471" y2="279.7471"/><polygon fill="#191970" points="149,242.3604,153,232.3604,157,242.3604,153,238.3604" style="stroke: #191970; stroke-width: 1.5;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="153" x2="153" y1="184.9736" y2="279.7471"/><line style="stroke: #191970; stroke-width: 1.5;" x1="153" x2="141" y1="184.9736" y2="184.9736"/><polygon fill="#191970" points="151,180.9736,141,184.9736,151,188.9736,147,184.9736" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="44" x2="32" y1="184.9736" y2="184.9736"/><polygon fill="#191970" points="28,228.3604,32,238.3604,36,228.3604,32,232.3604" style="stroke: #191970; stroke-width: 1.5;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="32" x2="32" y1="184.9736" y2="291.7471"/><line style="stroke: #191970; stroke-width: 1.5;" x1="32" x2="92.5" y1="291.7471" y2="291.7471"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="291.7471" y2="331.7471"/><polygon fill="#191970" points="88.5,321.7471,92.5,331.7471,96.5,321.7471,92.5,325.7471" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="125.875" y2="172.9736"/><polygon fill="#191970" points="88.5,162.9736,92.5,172.9736,96.5,162.9736,92.5,166.9736" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="92.5" x2="92.5" y1="365.7158" y2="385.7158"/><polygon fill="#191970" points="88.5,375.7158,92.5,385.7158,96.5,375.7158,92.5,379.7158" style="stroke: #191970; stroke-width: 1.0;"/></g></svg>');
            rf=replaceVar(rf);
            assert.equal(rf,etalon,"checking proper result content");

            done();

          });

        });

      });

    }catch(e){
      done(e);
    }

  });

});
