const paths = {
  itemDetailPath(itemId: string) {
    return `/item/${itemId}`;
  },

  cartPath() {
    return "/cart";
  },

  checkoutPath() {
    return "/cart/checkout";
  },

  ordersPath() {
    return "/profile/orders";
  },

  addressesPath() {
    return "/profile/addresses";
  },

  checkoutCompletePath() {
    return "/cart/checkout/complete";
  },
};

export default paths;
