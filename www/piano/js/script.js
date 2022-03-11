window.onload = main;

function main() {
    var canvas = document.querySelector(".viewport");
    canvas.width = 800;
    canvas.height = 300;

    var audio_ctx = new AudioContext();

    var piano = new Piano(canvas, audio_ctx);
    piano.start();

    canvas.addEventListener("click", (event) => {
        piano.keys.forEach((key) => {
            if(key.rect.isPointInBounds(event.offsetX, event.offsetY)) {
                key.play(audio_ctx);
            }
        })
    })
}

class Piano {
    constructor(canvas, audio_context) {
        this.c = canvas;
        this.ctx = this.c.getContext("2d");
        this.audio_ctx = audio_context;
        this.rect = null;
        this.keys = [];
    }

    draw() {
        this.keys.forEach((key) => {
            this.ctx.fillStyle = key.type;
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 2;
            this.ctx.rect(key.rect.x, key.rect.y, key.rect.width, key.rect.height);
            this.ctx.fill();
            this.ctx.stroke();
        })
    }

    start() {
        var test_key = new PianoKey();
        test_key.type = "white";
        test_key.rect = new Rectangle(0, 0, 100, this.c.height);

        var req = new XMLHttpRequest();
        req.responseType = "arraybuffer";
        req.open("GET", "sounds/043_C_4.mp3");
        req.onload = () => {
            var data = req.response;
            this.audio_ctx.decodeAudioData(data).then((buffer) => {
                test_key.sound = buffer;
            });
        
        }
        req.send();

        this.keys[0] = test_key;

        this.draw();

    }
}

class PianoKey {
    constructor() {
        this.type = null;
        this.rect = null;
        this.sound = null;
    }

    play(audio_ctx) {
        var buffer_node = new AudioBufferSourceNode(audio_ctx);
        buffer_node.buffer = this.sound;
        buffer_node.connect(audio_ctx.destination);
        buffer_node.start();
    }
}