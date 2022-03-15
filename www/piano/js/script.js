window.onload = main;

function main() {
    var canvas = document.querySelector(".viewport");
    canvas.width = 700;
    canvas.height = 400;

    var piano = new Piano(canvas, new AudioContext());
    piano.start();

    canvas.addEventListener("click", (event) => {
        piano.checkKeyHit(event.offsetX, event.offsetY);
    })
}

class Piano {
    constructor(canvas, audio_context) {
        this.c = canvas;
        this.ctx = this.c.getContext("2d");
        this.audio_ctx = audio_context;

        // Array of ArrayBuffer data decoded by AudioContext from MP3 data on server
        this.sounds = [];

        // Ordered array of PianoKey objects for rendering (front -> back) 
        // and hit detection (back -> front)
        this.key_buffer = [];

        this.draw = this.draw.bind(this);
    }

    checkKeyHit(x, y) {
        // Traverse through key_buffer[] from back to front, return when a key is hit
        for(var i = this.key_buffer.length - 1; i >= 0; i--) {
            var key = this.key_buffer[i];
            if(key.rect.isPointInBounds(x, y)) {
                key.play(this.audio_ctx);
                return;
            }
        }
    }

    // Wrapper function for nested XMLHttpRequests for loading sound data and initializing app
    // Call sequence: getSoundFiles() -> loadSoundFiles() -> createKeys() -> draw() loop
    start() {
        this.#getSoundFiles();
    }

    // Called by start() to begin sound loading process
    #getSoundFiles() {
        // Get array of sound file names from directory
        var req = new XMLHttpRequest();
        req.responseType = "text";
        req.open("GET", "php/load_sounds.php");
        req.onload = () => {
            this.sounds = JSON.parse(req.responseText);
            this.#loadSoundFiles();
        }
        req.send();
    }

    // Called by getSoundFiles() to convert sounds array from file names to buffer data
    #loadSoundFiles() {
        // Decode sound data into arraybuffers from sounds directory using file names
        var remaining__reqs = this.sounds.length;
        this.sounds.forEach((sound, index) => {
            var path = "sounds/" + sound;
            var req = new XMLHttpRequest();
            req.responseType = "arraybuffer";
            req.open("GET", path);
            req.onload = () => {
                // Decode arraybuffer data into sounds array for later playback
                this.audio_ctx.decodeAudioData(req.response).then((buffer) => {
                    this.sounds[index] = buffer;

                    if(--remaining__reqs === 0) { // All sounds loaded successffully
                        this.#createKeys();
                    }
                });
            }
            req.send();
        })
    }

    // Called by loadSoundFiles() to ceate PianoKey objects using sound buffer data
    #createKeys() {
        var white_keys = [];
        var black_keys = [];
        var black_key_locations = [1, 3, 6, 8, 10]; // Index locations of black keys in a 13 note octave.
                                                    // Checking a key's index against these using the modulus 
                                                    // operator can determine if the key is white or black.

        // Create new key objects and assign to subarrays by type
        for(var i = 0; i < this.sounds.length; i++) {
            var new_key;

            if(black_key_locations.includes(i % 13)) {
                new_key = new PianoKey("black", this.sounds[i]);
                new_key.rect = new Rectangle(100 * white_keys.length - 25, 0, 50, 250);
                black_keys.push(new_key);
            } else {
                new_key = new PianoKey("white", this.sounds[i]);
                new_key.rect = new Rectangle(100 * white_keys.length, 0, 100, 400);
                white_keys.push(new_key);
            }
        }

        // Populate key buffer array according to render order (white -> black)
        this.key_buffer = white_keys.concat(black_keys);

        // Begin animation loop
        window.requestAnimationFrame(this.draw);
    }

    draw() {
        this.key_buffer.forEach((key) => {
            if(key.is_playing) {
                this.ctx.fillStyle = "gray";
            } else {
                this.ctx.fillStyle = key.type;
            }
            this.ctx.strokeStyle = "black";
            this.ctx.lineWidth = 2;

            this.ctx.fillRect(key.rect.x, key.rect.y, key.rect.width, key.rect.height);
            this.ctx.strokeRect(key.rect.x, key.rect.y, key.rect.width, key.rect.height);
        })

        window.requestAnimationFrame(this.draw);
    }
}

class PianoKey {
    constructor(type, sound) {
        this.type = type;
        this.sound = sound;
        this.rect = null;
        this.is_playing = false;
    }

    play(audio_ctx) {
        var buffer_node = new AudioBufferSourceNode(audio_ctx);
        buffer_node.buffer = this.sound;
        buffer_node.connect(audio_ctx.destination);
        buffer_node.start();

        this.is_playing = true;
        setTimeout(() => {
            this.is_playing = false;
        }, 200);
    }
}