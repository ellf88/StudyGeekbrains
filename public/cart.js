let goodsRequest = (url) => {
   return fetch(url).then((response) => response.json());
};

const API = "http://localhost:3000";

class CartItem {
    constructor(product, img = 'https://www.resursltd.ru/images/cms/thumbs/f010964dc04aea08ebcc6ded3d85364e36d15396/nofoto_120_100_5_100.jpg') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
        this.quantity = product.quantity;
    }

    render() {
        return `<div class="good" data-price="${this.price}" data-id="${this.id}" data-title="${this.title}" data-img="${this.img}">
                <div class="good-img">
                <img class="img" src="${this.img}" alt="img">
                </div>
                <h3 class="description">${this.title}</h3>
                <h3 class="price">$${this.price} x ${this.quantity} = ${this.price * this.quantity}</h3>
                <button class="addToCart" data-id="${this.id}">Удалить из корины</button>
            </div>`
    }
}

class ItemsList {
    constructor(container = ".container") {
        this.container = container;
        this.products = [];
    }

    fetchGoods() {
        let goods = [];
        goodsRequest(`${API}/cartGoods`)
            .then(data => {
                goods = data;
                this._render(goods)
            })
    }

    removeItem() {
        let $container = document.querySelector(this.container);
        $container.addEventListener("click", (event) =>{
            if(event.target.classList.contains("addToCart")) {
                if(confirm("Точна?")) {
                    const id = +event.target.dataset.id;
                    fetch(`${API}/cartGoods/${id}`, {method: "DELETE"})
                        .then(() => {
                            $container.removeChild(event.target.parentElement);
                        })
                }
            }
        })
    }

    _render(goods) {
        const block = document.querySelector(this.container);
            for (let item of goods) {
                const itemHtml = new CartItem(item);
                this.products.push(itemHtml);
                block.insertAdjacentHTML("beforeend", itemHtml.render());
            }
    }
}

let itemsCart = new ItemsList();
itemsCart.fetchGoods();
itemsCart.removeItem();








