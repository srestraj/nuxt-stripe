<template>
  <div>
    <stripe-checkout
              ref="checkoutRef"
              mode="payment"
              :pk="publishableKey"
              :line-items="lineItems"
              :success-url="successURL"
              :cancel-url="cancelURL"
              @loading="v => loading = v"
            />
    <div class="container" v-for="product in products" :key="product.id">
      <div class="product">
        <div class="product-photo">
          <img :alt="product.name" :src="product.images[0]">
        </div>
        <div class="product-detail">
          <h1 class="product__title">{{ product.name }}</h1>
          <div class="product__price">${{ (product.price / 100).toFixed(2) }}</div>
          <div class="product__subtitle">{{ product.description }}</div>
          
          <a href="#" class="product__button" @click="submit(product.priceID)">
            <span v-if="loading"><i class="ion-load-c"></i></span>
            <span v-else>Purchase</span>
            <span></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe'

export default {
  name: 'IndexPage',
  components: {
    StripeCheckout,
  },
  data() {
    this.publishableKey = process.env.STRIPE_PUBLISHABLE_KEY,
    this.successURL = `${process.env.ROOT_URL}?success=true`,
    this.cancelURL = `${process.env.ROOT_URL}?cancel=true`
    return {
      loading: false,
      lineItems: [
        {
          price: '', // The id of the one-time price you created in your Stripe dashboard
          quantity: 1,
        },
      ],
    }
  },
  computed: {
    products() {
      return this.$store.state.stripe.products
    },
  },
  mounted() {
    this.$store.dispatch('stripe/getPrices')
    
    // show toast based on query params
    switch(this.$route.fullPath) {
      case '/?success=true':
        this.$toast.success('Purchase successful!')
        break
      case '/?cancel=true':
        this.$toast.error('Payment canceled')
        break
    }
  },
  methods: {
    submit(id) {
      this.loading = true
      this.lineItems[0].price = id
      // Redirect to Stripe's secure checkout page
      this.$refs.checkoutRef.redirectToCheckout()
    },
  },
}
</script>
