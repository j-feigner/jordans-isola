class Color {
    constructor(red, green, blue, alpha = 1) {
        this.r = red;
        this.g = green;
        this.b = blue;

        this.a = alpha;

        this.fade_interval;
    }

    // Linearly interpolates between two Color objects and returns an array
    // of discrete Colors between start_color and end_color
    static createColorGradient(start_color, end_color, steps) {
        
    }

    // Returns a Color between start_color and end_color at given ratio between the two
    static getFadeAtStep(start_color, end_color, step) {
        var dr = (start_color.r - end_color.r) * step;
        var dg = (start_color.g - end_color.g) * step;
        var db = (start_color.b - end_color.b) * step;
        var da = (start_color.a - end_color.a) * step;

        return new Color(dr, dg, db, da);
    }

    // Fades from current color to end_color over time milliseconds
    fade(end_color, time) {
        var step = time / 50;

        var dr = (this.r - end_color.r) / 50;
        var dg = (this.g - end_color.g) / 50;
        var db = (this.b - end_color.b) / 50;
        var da = (this.a - end_color.a) / 50;

        var timer = 0;

        this.fade_interval = setInterval(() => {
            this.r -= dr;
            this.g -= dg;
            this.b -= db;
            this.a -= da;

            timer += step;
            if(timer >= time) {
                clearInterval(this.fade_interval);
            }
        }, step);
    }

    // Returns string of form "rgb(r, g, b)" for CSS styling / HTMLCanvas manipulation
    // If include_alpha is true will return string of form "rgba(r, g, b, a)"
    toString(include_alpha) {
        if(include_alpha) {
            return "rgba(" + 
                    String(this.r) + ", " +
                    String(this.g) + ", " +
                    String(this.b) + ", " + 
                    String(this.a) + ")";
        } else {
            return "rgb(" + 
                    String(this.r) + ", " +
                    String(this.g) + ", " +
                    String(this.b) + ")";
        }
    }
}