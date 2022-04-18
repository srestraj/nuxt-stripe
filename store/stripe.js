export const state = () => ({
    products: [],
    loading: true,
  })
  
  export const mutations = {
    storeProducts(state, payload) {
      state.products = payload
    },
    storeStatus(state, payload) {
        state.loading = payload
    },
    storePrices(state, payload) {
        if(products.length > 0) {
            for (let i = 0; i < payload.length; i++) {
                state.products[i].price = payload[i].unit_amount
            }
        }
    }
  }
  export const actions = {
    getProducts({ commit, dispatch }) {
        commit('storeStatus', true)
      this.$axios
        .get('/products', {
            headers: {
                'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            }
        })
        .then((response) => {
          commit('storeProducts', response.data.data)
          dispatch('getPrices')
        })
        .catch((err) => {
          commit('storeStatus', false)
        })
    },

    async getPrices({ commit }) {
      await this.$axios
        .get('/prices', {
            headers: {
                'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
            }
        })
        .then((response) => {
          commit('storeStatus', false)
          commit('storePrices', response.data.data)
        })
        .catch((err) => {
          commit('storeStatus', false)
        })
    },
  }
  