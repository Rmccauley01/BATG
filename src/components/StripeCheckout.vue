<template>
  <stripe-checkout
    ref="checkoutRef"
    mode="payment"
    :pk="publishableKey"
  />
</template>

<script>
import { StripeCheckout } from '@vue-stripe/vue-stripe';

export default {
  name: "StripeCheckout",

  components: {
    StripeCheckout,
  },

  data() {
    this.publishableKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY;
    return {
    }
  }
};
</script>