<template>
	<div v-if="hasProduct">
		<h1>Title {{ product.title}}</h1>
    <router-link class="btn btn-success" :to="{ name: 'catalog' }">
      Back to products
    </router-link>
		<hr>
      <div>PRICE: {{ product.price}} $</div>
      <div>REST: {{ product.rest}}</div>
    <button v-if="inCart(product.id)" @click="remove(product.id)" type="button" class="btn btn-danger">
      Remove
    </button >
    <button v-else @click="add(product.id, productList)" type="button" class="btn btn-success">
      Add to cart
    </button>
    <span v-if="inCart(product.id)" >
       <button class="btn btn-warning mx-3"  @click="decreaseCnt(findIndexOfProductInCard(product.id))">-</button>
      <span class="quantity" >
      Quantity: {{productInCard(product.id)}}
    </span>
      <button class="btn btn-warning mx-3" :disabled="+productInCard(product.id) >= +product.rest ? true : false" @click="increaseCnt(findIndexOfProductInCard(product.id))">+</button>
    </span>
	</div>
   <E404 v-else></E404>
</template>
<script>
import {mapActions, mapGetters} from "vuex";
import E404 from "@/components/E404";
  export default {
    components: {E404},
    data(){
      return {
        product:null,
      }
    },
    computed: {
      ...mapGetters('products', { productList: 'all'}),
      ...mapGetters('product', { productInCard: 'findProductInCard', findIndexOfProductInCard:'findIndexOfProductInCard'}),
      ...mapGetters('cart', [ 'inCart', 'items','showProductData']),
      // пихаем айдишник в компьютед свойство
      id() {
        return parseInt(this.$route.params.id)
      },
      // проверяем айдишник
      validId() {
          return /^[1-9]+\d*$/.test(this.id)
      },
      hasProduct(){
        return this.showProductData(this.id) && this.validId
      }
    },
    methods: {
      ...mapActions('cart', [ 'add', 'remove','decreaseCnt','increaseCnt' ]),
      ...mapActions('product', [ 'setQuantity' ]),
      checkId (){
        const product = this.showProductData(this.id);
        if(product && this.validId) {
          this.product = product;
        }
      }
    },
     created() {
        this.checkId()
     },

  }
</script>