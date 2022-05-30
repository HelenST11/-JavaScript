

const BASE_URL = 'http://localhost:8000/';
const GET_GOODS_ITEMS = `${BASE_URL}goods`
// const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
    return fetch(url)
        .then((res) => res.json())
}


function init() {
    const app = new Vue({
        el: '#root',
        data: {
            items: [],
            filteredItems: [],
            search: '',
            isVisibleCart: false,
        },
        methods: {
            fetchGoods() {
                service(GET_GOODS_ITEMS).then((data) => {
                    this.items = data;
                    this.filteredItems = data;
                });
            },

            filterItems() {
                this.filteredItems = this.items.filter(({ product_name }) => {
                    return product_name.match(new RegExp(this.search, 'gui'))
                })
            },

            setVisionCard() {
                this.isVisibleCart = !this.isVisibleCart;
            }

        },
        computed: {
            calculatePrice() {
                return this.filteredItems.reduce((prev, { price }) => {
                    return prev + price
                }, 0)
            }
        },

        mounted() {
            this.fetchGoods();
        }
    })
}
window.onload = init
