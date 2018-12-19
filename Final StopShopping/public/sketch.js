let mobilenet;
let classifier;
let video;
let label = 'loading model';
let normalButton;
let cardButton;
let phoneButton;
let trainButton;


var serial;          // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem145301'; // fill in your serial port name here
var inData;                            // for incoming serial data
var outByte = 0;                       // for outgoing data
// let chop = 0;

let videoIsReady = false;
let modelIsReady = false


serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.open(portName);           // open a serial port


function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.readLine();

 if(inByte.length >0){
   // console.log("change email " + inByte);
 }

 // store it in a global variable:
 inData = inByte;
}

function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}


function modelReady() {
    console.log('Model is ready!!!');
    classifier = mobilenet.classification(video, videoReady);
    classifier.load('model.json', customModelReady);
    
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  label = 'model ready';
  modelIsReady = true;
  if(videoIsReady && modelIsReady) classifier.classify(gotResults)
  
}

function videoReady() {
console.log('Video is ready!!!');
   videoIsReady = true
   if(videoIsReady && modelIsReady) classifier.classify(gotResults)
   Notification.requestPermission(e=> console.log(e));

}

function setup() {
    createCanvas(320, 270);
    video = createCapture(VIDEO);
    video.hide();
    background(0);
    mobilenet = ml5.featureExtractor('MobileNet', modelReady);
    serial = new p5.SerialPort();    // make a new instance of the serialport library
    serial.on('data', serialEvent);  // callback for when new data arrives
    serial.on('error', serialError); // callback for errors
    serial.open(portName);           // open a serial port
}

function draw() {
    background(0);
    image(video, 0, 0, 320, 240);
    fill(255);
    textSize(16);
    text(label, 10, height - 10);
}


// function whileTraining(loss) {
//     if (loss == null) {
//         console.log('Training Complete');
//         classifier.classify(gotResults);
//     } else {
//         console.log(loss);
//     }
// }

let prevResult = "kitties"

function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        label = result;
        if(label === 'card' && prevResult !== 'card') {
            console.log("stop shopping for the love of god");
            new Notification("For GOD'S SAKE! PUT DOWN THE CARD!!!!!");
            let outByte = 1;
            // send it out the serial port:
            serial.write(outByte);

        }
        if(!modelIsReady || !videoIsReady) return;
        classifier.classify(gotResults);
        prevResult = label;
    }
}