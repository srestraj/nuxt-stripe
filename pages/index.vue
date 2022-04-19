<template>
  <div>
    <div class="container" v-for="product in products" :key="product.id">
      <div class="product">
        <div class="product-photo">
          <img :alt="product.name" :src="product.images[0]">
        </div>
        <div class="product-detail">
          <h1 class="product__title">{{ product.name }}</h1>
          <div class="product__price">${{ (product.price / 100).toFixed(2) }}</div>
          <div class="product__subtitle">{{ product.description }}</div>
          
          <a class="product__button" href="#">
            <span>Purchase</span>
            <span>Success</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  computed: {
    products() {
      return this.$store.state.stripe.products
    },
  },
  mounted() {
    this.$store.dispatch('stripe/getPrices')
  }
}
</script>
