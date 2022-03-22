window.onload = main;

function main() {
    var app = new App();
    app.start();
}

class App {
    constructor() {
        // Internal Values
        this.selected_good = null;
        this.good_value = 0;
        this.bid_interval = 0;
        this.bid_minimum = 0;

        // DOM Objects
        this.goods = [];
        this.asset1;
        this.asset2;
        this.bid;
        this.payout1;
        this.payout2;
    }

    start() {
        this.initializeDOMObjects();
        this.initializeEvents();
    }

    initializeDOMObjects() {
        var selection = document.querySelector(".goods-selection").children;
        for(var i = 0; i < selection.length; i++) {
            var good = {
                value: i === 0 ? 10 : 15 + (i * 5),
                display: selection[i],
                overlay: selection[i].querySelector(".overlay")
            };
            this.goods.push(good);
        }

        this.asset1 = {
            value: 1,
            display: document.querySelector("#asset1Value"),
            input_minus: document.querySelector("#asset1Minus"),
            input_plus: document.querySelector("#asset1Plus")
        }
        this.asset2 = {
            value: 1,
            display: document.querySelector("#asset2Value"),
            input_minus: document.querySelector("#asset2Minus"),
            input_plus: document.querySelector("#asset2Plus")
        }

        this.bid = {
            value: 0,
            display: document.querySelector("#bidOutput"),
            input_minus_5: document.querySelector("#bidMinus5"),
            input_minus_1: document.querySelector("#bidMinus1"),
            input_plus_1: document.querySelector("#bidPlus1"),
            input_plus_5: document.querySelector("#bidPlus5")
        };

        this.payout1 = {
            value: 0,
            display: document.querySelector("#payout1Output")
        }
        this.payout2 = {
            value: 0,
            display: document.querySelector("#payout2Output")
        }
    }

    initializeEvents() {
        // Change selected_good on goods object click events
        this.goods.forEach(good => {
            good.display.addEventListener("click", () => {
                if(this.selected_good !== null) {
                    this.selected_good.overlay.style.opacity = null;
                }
    
                this.selected_good = good;
                this.good_value = good.value;
                good.overlay.style.opacity = "0.6";

                this.updateBid();
            })
        })

        // Change value of asset on plus/minus click events
        this.asset1.input_minus.addEventListener("click", () => {
            if(this.asset1.value > 1) {
                this.asset1.value--;
            }
            this.asset1.display.innerHTML = this.asset1.value;

            this.updateBid();
        })
        this.asset1.input_plus.addEventListener("click", () => {
            this.asset1.value++;
            this.asset1.display.innerHTML = this.asset1.value;

            this.updateBid();
        })
        this.asset2.input_minus.addEventListener("click", () => {
            if(this.asset2.value > 1) {
                this.asset2.value--;
            }
            this.asset2.display.innerHTML = this.asset2.value;

            this.updateBid();
        })
        this.asset2.input_plus.addEventListener("click", () => {
            this.asset2.value++;
            this.asset2.display.innerHTML = this.asset2.value;

            this.updateBid();
        })

        // Change value of bid according to interval on plus/minus click events
        this.bid.input_minus_5.addEventListener("click", () => {
            var new_bid = this.bid.value - (this.bid_interval * 5);

            if(new_bid >= this.bid_minimum) {
                this.bid.value = new_bid;
            }

            this.bid.display.innerHTML = this.bid.value;
            this.updatePayout();
        })
        this.bid.input_minus_1.addEventListener("click", () => {
            var new_bid = this.bid.value - this.bid_interval;

            if(new_bid >= this.bid_minimum) {
                this.bid.value = new_bid;
            }

            this.bid.display.innerHTML = this.bid.value;
            this.updatePayout();
        })
        this.bid.input_plus_1.addEventListener("click", () => {
            this.bid.value += this.bid_interval;

            this.bid.display.innerHTML = this.bid.value;
            this.updatePayout();
        })
        this.bid.input_plus_5.addEventListener("click", () => {
            this.bid.value += this.bid_interval * 5;

            this.bid.display.innerHTML = this.bid.value;
            this.updatePayout();
        })
    }

    updateBid() {
        this.bid_interval = this.asset1.value + this.asset2.value;
        this.bid_minimum = this.good_value * this.bid_interval;

        this.bid.value = this.bid_minimum;
        this.bid.display.innerHTML = this.bid_minimum;

        this.payout1.value = (this.bid.value / this.bid_interval) * this.asset1.value;
        this.payout1.display.innerHTML = this.payout1.value;

        this.payout2.value = (this.bid.value / this.bid_interval) * this.asset2.value;
        this.payout2.display.innerHTML = this.payout2.value;
    }

    updatePayout() {
        this.payout1.value = (this.bid.value / this.bid_interval) * this.asset1.value;
        this.payout1.display.innerHTML = this.payout1.value;
        this.payout2.value = (this.bid.value / this.bid_interval) * this.asset2.value;
        this.payout2.display.innerHTML = this.payout2.value;
    }
}