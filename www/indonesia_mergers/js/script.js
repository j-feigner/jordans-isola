window.onload = main;

function main() {
    var app = new App();
    app.start();
}

class App {
    constructor() {
        this.selected_good = null;
        this.good_value = 0;
        this.goods = [];

        this.asset1 = 1;
        this.asset2 = 1;

        this.bid_interval = 0;
        this.bid = 0;

        this.payout1 = 0;
        this.payout2 = 0;
    }

    start() {
        this.createGoods();
        this.createAssets();

        this.setGoodsEvents();
        this.setAssetEvents();

        this.bid = document.querySelector("#bidOutput");


    }

    createGoods() {
        var selection = document.querySelector(".goods-selection").children;
        for(var i = 0; i < selection.length; i++) {
            var good = {
                element: selection[i],
                overlay: selection[i].querySelector(".overlay"),
                value: i === 0 ? 10 : 15 + (i * 5)
            };
            this.goods.push(good);
        }
    }


    createAssets() {
        // Create asset objects representing DOM
        this.asset1 = {
            value: 1,
            display: document.querySelector("#asset1Value"),
            minus: document.querySelector("#asset1Minus"),
            plus: document.querySelector("#asset1Plus")
        }
        this.asset2 = {
            value: 1,
            display: document.querySelector("#asset2Value"),
            minus: document.querySelector("#asset2Minus"),
            plus: document.querySelector("#asset2Plus")
        }
    }

    setGoodsEvents() {
        this.goods.forEach(good => {
            good.element.addEventListener("click", () => {
                if(this.selected_good !== null) {
                    this.selected_good.overlay.style.opacity = "0";
                }
    
                this.selected_good = good;
                this.good_value = good.value;
                good.overlay.style.opacity = "0.6";

                this.updateBid();
            })
        })
    }

    setAssetEvents() {
        this.asset1.minus.addEventListener("click", () => {
            if(this.asset1.value > 1) {
                this.asset1.value--;
            }
            this.asset1.display.innerHTML = this.asset1.value;

            this.updateBid();
        })
        this.asset1.plus.addEventListener("click", () => {
            this.asset1.value++;
            this.asset1.display.innerHTML = this.asset1.value;

            this.updateBid();
        })
        this.asset2.minus.addEventListener("click", () => {
            if(this.asset2.value > 1) {
                this.asset2.value--;
            }
            this.asset2.display.innerHTML = this.asset2.value;

            this.updateBid();
        })
        this.asset2.plus.addEventListener("click", () => {
            this.asset2.value++;
            this.asset2.display.innerHTML = this.asset2.value;

            this.updateBid();
        })
    }

    updateBid() {
        this.bid_interval = this.asset1.value + this.asset2.value;
        this.bid.innerHTML = this.good_value * this.bid_interval;
    }
}