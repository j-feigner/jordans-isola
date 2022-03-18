window.onload = main;

function main() {
    var app = new App();
    app.start();
}

class App {
    constructor() {
        this.selected_good = null;
        this.good_value = 0;
        this.goods = null;
    }

    start() {
        this.goods = this.createGoods();
        this.setGoodsEvents();
    }

    createGoods() {
        var goods = [];
        var selection = document.querySelector(".goods-selection").children;
        for(var i = 0; i < selection.length; i++) {
            var good = {
                element: selection[i],
                overlay: selection[i].querySelector(".overlay"),
                value: i === 0 ? 10 : 20 + (i * 5)
            };
            goods.push(good);
        }
        return goods;
    }

    setGoodsEvents() {
        this.goods.forEach(good => {
            good.element.addEventListener("click", () => {
                if(this.selected_good !== null) { // Deselect previous good
                    this.selected_good.overlay.style.opacity = "0";
                }
    
                this.selected_good = good;
                this.good_value = good.value;
                good.overlay.style.opacity = "0.6";
            })
        })
    }
}