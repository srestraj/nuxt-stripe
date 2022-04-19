export const state = () => ({
    products: [],
    loading: true,
    prices: [],
  })
  
  export const mutations = {
    storeProducts(state, payload) {
      if(payload.length > 0) {
          for (let i = 0; i < payload.length; i++) {
              payload[i].price = state.prices[i].unit_amount
              payload[i].priceID = state.prices[i].id
          }
      }
      state.products = payload
      // console.log(state.products)
    },
    storeStatus(state, payload) {
        state.loading = payload
    },
    storePrices(state, payload) {
      state.prices = payload
    }
  }
  export const actions = {
    // on production, this should be called from your backend server
    async getProducts({ commit }) {
        await this.$axios
          .get('/products', {
              headers: {
                  'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`, // never reveal your secret key - this is for demo purposes only
              }
          })
          .then((response) => {
            commit('storeProducts', response.data.data)
            commit('storeStatus', false)
          })
          .catch((err) => {
            commit('storeStatus', false)
          })
    },

    async getPrices({ commit, dispatch }) {
      commit('storeStatus', true)
      // on production, this should be called from your backend server
      await this.$axios
        .get('/prices', {
            headers: {
                'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`, // never reveal your secret key - this is for demo purposes only
            }
        })
        .then((response) => {
          commit('storePrices', response.data.data)
          dispatch('getProducts')
        })
        .catch((err) => {
          commit('storeStatus', false)
        })
    },
  }
  