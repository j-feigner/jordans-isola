window.onload = main;

function main() {
    var canvas = document.querySelector(".viewport");
    var app = new Piano(canvas.getContext("2d"), new AudioContext());

    app.start();
}

class Piano {
    constructor(canvas_context, audio_context) {
        this.ctx = canvas_context;
        this.audio_ctx = audio_context;
        this.rect = null;
        this.keys = [];
    }

    draw() {

    }

    start() {

    }
}

class PianoKey {
    constructor() {
        this.rect = null;
        this.sound = null;
    }

    play() {
        
    }
}