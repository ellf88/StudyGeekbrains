let getRequest = (url) => {
    return fetch(url).then((response) => response.json());
};

const API = "http://localhost:3000";

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
            this.cartArr = [];

        }

        fetchItems() {
            this._fetchItemsCart();
           getRequest(`${API}/goodsList`)
                .then(data => {
                    let goods = [];
                    goods = data;
                    this._render(goods);
                });

        }

        _fetchItemsCart() {
            this.cartArr = [];
            let fetchedCart = [];
            getRequest(`${API}/cartGoods`)
                 .then(data => {
                     fetchedCart = data;
                 })
                .then(item => {
                    for(item of fetchedCart) {
                        this.cartArr.push({
                            id: item.id,
                            quantity: item.quantity
                        })
                    }
                })
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
            let $container = document.querySelector(".container");
            $container.addEventListener("click", (event) => {
                    let title = event.target.dataset.title;
                    let price = event.target.dataset.price;
                    let id = +event.target.dataset.id;
                    let img = event.target.dataset.img;
                    if (this.cartArr.length === 0) {                  // условие для проверки, если в корзине ничего нет, то добавляем новый item
                        fetch("/cartGoods", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({id, title, price, img, quantity: 1})
                        });
                        this._fetchItemsCart();
                    } else {                            // далее проверка, есть ли выбранный item уже в корзине
                        for(let item of this.cartArr) {
                            if (item.id === id) {
                                item.quantity++;
                                fetch(`${API}/cartGoods/${item.id}`, {
                                    method: "PATCH",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({quantity: item.quantity})
                                });
                                this._fetchItemsCart();
                            } else if (item.id !== id && item !== this.cartArr[this.cartArr.length - 1]) {     // условие, читобы сначала пробежаться по всему циклу
                                continue
                            } else {
                                fetch("/cartGoods", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({id, title, price, img, quantity: 1})
                                });
                                this._fetchItemsCart();
                            }
                        }
                    }
                });
            };

        calcSumm() {
            return this.products.reduce((sum, current) =>
                sum += current.price, 0)
        };

    }

    let itemsList = new ItemList();
    itemsList.fetchItems() ;
    itemsList.addToCart();
















