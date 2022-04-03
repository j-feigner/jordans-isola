class Color {
    constructor(red, green, blue, alpha) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }

    // Linearly interpolates between two Color objects and returns an array
    // of discrete Colors between start_color and end_color
    // Expects color parameters to be string in form "rgb(r, g, b)"
    static createColorGradient(start_color, end_color, steps) {
        
    }

    // Returns a Color between start_color and end_color given steps and time
    static fade(start_color, end_color, steps) {

    }

    // Returns string of form "rgb(r, g, b)" for CSS styling
    // If include_alpha is true will return string of form "rgba(r, g, b, a)"
    toString(include_alpha) {
        
    }
}