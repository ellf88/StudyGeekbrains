class CartItem {
    constructor(product, img = 'https://www.resursltd.ru/images/cms/thumbs/f010964dc04aea08ebcc6ded3d85364e36d15396/nofoto_120_100_5_100.jpg') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.img = img;
    }

    render() {
        return `<div class="good" data-price="${this.price}" data-id="${this.id}" data-title="${this.title}" data-img="${this.img}">
                <div class="good-img">
                <img class="img" src="${this.img}" alt="img">
                </div>
                <h3 class="description">${this.title}</h3>
                <h3 class="price">$${this.price}</h3>
                <button class="addToCart">Удалить из корины</button>
            </div>`
    }
}