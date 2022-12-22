<template>
	<div>
		<h1>Cart</h1>
		<hr>
		<div class="product-item" v-for="(item,i) in items" :key="item.id">
           <div class="product-data">
             <router-link :to="{ name: 'product', params: { id: item.id } }">Name: {{ showProductData(item.id).title }}</router-link>
             <p>Price: {{ showProductData(item.id).price }}</p>
           </div>
           <div class="quantity">
             Quantity: {{item.cnt}}
           </div>
      <div class="buttons">
        <button class="btn btn-warning" @click="decreaseCnt(i)">-</button>
        <button class="btn btn-warning" :disabled="+item.cnt >= +showProductData(item.id).rest ? true : false" @click="increaseCnt(i)">+</button>
        <button class="btn btn-danger" @click="remove(item.id)">Remove</button>
      </div>

    </div>
    <hr>
    <p>Total : {{totalAmount}} $</p>
    <hr>
    <button class="btn btn-success" :disabled="items.length ? false : true">
      <router-link class="link"  :to="{ name: 'checkout' }">
        Order now
      </router-link>
    </button>

	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
	export default {
    computed: {
      ...mapGetters('products', { productList: 'all'}),
      ...mapGetters('cart', [ 'inCart', 'items', 'showProductData', 'totalAmount'])
    },
    methods: {
      ...mapActions('cart', [ 'add', 'remove','decreaseCnt','increaseCnt' ]),
    }
	}
</script>
<style>
.product-item {
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
}
.quantity {
  width: 100px;
}
.product-data{
  width: 200px;
}
.buttons{
  margin-right: 30px;
}
.buttons button:not(:last-child){
  margin-right: 10px;
}
.link {
  color: wheat;
  text-decoration: none;
}
</style>