window.onload = main;

function main() {
    var selected_good = null;
    var good_value = 0;

    // Create good objects for each good type
    var goods_objects = [];
    var goods = document.querySelector(".goods-selection").children;
    for(var i = 0; i < goods.length; i++) {
        var good = {
            element: goods[i],
            overlay: goods[i].querySelector(".overlay"),
            value: i === 0 ? 10 : 20 + (i * 5)
        };
        goods_objects.push(good);
    }

    // Add event listeners to each good object for changing
    // user selection and updating value / overlays
    goods_objects.forEach(good => {
        good.element.addEventListener("click", () => {
            if(selected_good !== null) { // Deselect previous good
                selected_good.overlay.style.opacity = "0";
            }

            selected_good = good;
            good.overlay.style.opacity = "0.6";
            good_value = good.value;
        })
    })
}