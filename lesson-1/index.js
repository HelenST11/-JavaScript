const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url, callback) {
    xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send()
    xhr.onload = () => {
        callback(JSON.parse(xhr.response))
    }
}

class GoodsItem {
    constructor({ product_name, price = 0 }) {
        this.product_name = product_name;
        this.price = price;
    }
    render() {
        return `
        <div class="goods-item">
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        </div>`;
    }
}

class GoodsList {
    list = [];
    fetchGoods(callback) {
        service(GET_GOODS_ITEMS, (data) => {
            this.list = data;
            callback()
        })
    }

    calculatePrice() {
        return this.list.reduce((prev, { price }) => {
            return prev + price
        }, 0)
    }

    render() {
        let goodsList = this.list.map(item => {
            const goodsItem = new GoodsItem(item);
            return goodsItem.render()
        }).join('');
        document.querySelector('.goods-list').innerHTML = goodsList;
    }
}

class BasketGoodsList {
    list = [];
    fetchGoods() {
        service(GET_BASKET_GOODS_ITEMS, (data) => {
            this.list = data.contents;
        })
    }
}


const goodsList = new GoodsList();
goodsList.fetchGoods(() => {
    goodsList.render();
});

const basketGoodsList = new BasketGoodsList()
basketGoodsList.fetchGoods();



