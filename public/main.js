let getRequest = (url) => {
    return fetch(url).then((response) => response.json());
};

//let sendRequest = (url) =>

const API = "http://localhost:3000/server.json";

    class Item {
        constructor(product, img = 'https://www.resursltd.ru/images/cms/thumbs/f010964dc04aea08ebcc6ded3d85364e36d15396/nofoto_120_100_5_100.jpg') {
            this.id = product.id;
            this.title = product.title;
            this.price = product.price;
            this.img = img;
        }

        render() {
            return `<div class="good">
                <div class="good-img">
                <img class="img" src="${this.img}" alt="img">
                </div>
                <h3 class="description">${this.title}</h3>
                <h3 class="price">$${this.price}</h3>
                <button class="addToCart" data-price="${this.price}" data-id="${this.id}" data-title="${this.title}" data-img="${this.img}">Добавить в корзину</button>
            </div>`
        }
    }

    class ItemList {
        constructor(container = ".container") {
            this.container = container;
            this.products = [];

        }

        fetchItems() {
           getRequest(`${API}`)
                .then(data => {
                    let goods = [];
                    goods = data;
                    this._render(goods);
                });

        }

        _render(goods) {
            const block = document.querySelector(this.container);
            for (let item of goods) {
                const itemHtml = new Item(item);
                this.products.push(itemHtml);
                block.insertAdjacentHTML("beforeend", itemHtml.render());
            }
        }

        addToCart() {
            let btnsToCart = [...document.querySelectorAll(".addToCart")];
            btnsToCart.forEach(item => {
                item.addEventListener("click", (event) => {
                    let title = event.target.dataset.title;
                    let price = event.target.dataset.price;
                    let id = event.target.dataset.id;
                    let img = event.target.dataset.img;
                    fetch("/cartGoods", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({id: id, title: title, price: price, img: img})
                    });
                });
            });
        };

        calcSumm() {
            return this.products.reduce((sum, current) =>
                sum += current.price, 0)
        }

    }

    let itemsList = new ItemList();
    itemsList.fetchItems() ;
















