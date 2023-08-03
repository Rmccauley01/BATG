<template>
  <div>
    <!-- Set up a container element for the button -->
    <div id="paypal-button-container"></div>
  </div>
</template>

<script>
import axios from "axios";
//import paypal from 'paypal-checkout';

const { CLIENT_ID, APP_SECRET } = process.env;
const baseURL = {
  sandbox: "https://api-m.sandbox.paypal.com",
  production: "https://api-m.paypal.com",
};

export default {
  name: "PayPal",

  mounted() {
    this.initPaypalButton();
  },

  methods: {
    async initPaypalButton() {
      const { createOrder, onApprove } = this.paypalConfig();
      window.paypal.Buttons({ createOrder, onApprove }).render("#paypal-button-container");
    },

    paypalConfig() {
      return {
        createOrder: () => {
          return fetch("/my-server/create-paypal-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product skus and quantities
            body: JSON.stringify({
              cart: [
                {
                  sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
                  quantity: "YOUR_PRODUCT_QUANTITY",
                },
              ],
            }),
          })
            .then((response) => response.json())
            .then((order) => order.id);
        },
        onApprove: (data) => {
          return fetch("/my-server/capture-paypal-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID,
            }),
          })
            .then((response) => response.json())
            .then((orderData) => {
              // Successful capture! For dev/demo purposes:
              console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
              const transaction = orderData.purchase_units[0].payments.captures[0];
              alert(`Transaction ${transaction.status}: ${transaction.id}\n\nSee console for all available details`);
              // When ready to go live, remove the alert and show a success message within this page. For example:
              // const element = document.getElementById('paypal-button-container');
              // element.innerHTML = '<h3>Thank you for your payment!</h3>';
              // Or go to another URL:  window.location.href = 'thank_you.html';
            });
        },
      };
    },

    async createOrder() {
      const order = await this.createOrderApi();
      console.log(order);
    },

    async captureOrder() {
      const orderID = "YOUR_ORDER_ID"; // Replace with the actual order ID
      const captureData = await this.capturePayment(orderID);
      console.log(captureData);
    },

    async createOrderApi() {
      const accessToken = await this.generateAccessToken();
      const url = `${baseURL.sandbox}/v2/checkout/orders`;
      const response = await axios.post(
        url,
        {
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: "USD",
                value: "100.00",
              },
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },

    async capturePayment(orderId) {
      const accessToken = await this.generateAccessToken();
      const url = `${baseURL.sandbox}/v2/checkout/orders/${orderId}/capture`;
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return response.data;
    },

    async generateAccessToken() {
      const auth = btoa(CLIENT_ID + ":" + APP_SECRET);
      const response = await axios.post(
        `${baseURL.sandbox}/v1/oauth2/token`,
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
          },
        }
      );
      return response.data.access_token;
    },
  },
};
</script>
