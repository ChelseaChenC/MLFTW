// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];




function setup() {
  background(255);
  video = createCapture(VIDEO);
  // video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function gotPoses(results){
    poses = results;
    // console.log(results);
  });
  video.hide();
  console.log(poses.length);

  timeout();
}



function modelReady(){
  console.log("model ready");
}

function draw() {
    // image(video, 0, 0, width, height);
    console.log(poses.length);
}





function playAudio(aid) {
  var audio = new Audio('assets/' + aid + '.mp3');
  audio.play();
}

function timeout() {
    setTimeout(function () {
       
        let message=['ahyaya', 'cheating', 'whoishim', 'whyareyoudoingthis'];
        let randy = message[Math.floor(Math.random() * message.length)];         
        if (poses.length === 1){
          playAudio('download');
          timeout();
        }  else if(poses.length === 2) {
          playAudio(randy);
          timeout();
        } else if(poses.length >= 3) {
          playAudio('killyou');
          timeout();
        } else if(poses.length === 0) {
          playAudio('wereareyou');
          timeout();
        }
    }, 3000);
}



