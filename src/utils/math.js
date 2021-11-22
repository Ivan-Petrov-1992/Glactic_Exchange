export const getActualGasset = (gusd_amount, trading_fee, gasset_price) => {
  return (gusd_amount - gusd_amount * trading_fee) / gasset_price;
};

export const getActualgUSD = (gusd_amount, trading_fee, gasset_price) => {
  return gusd_amount * gasset_price - gusd_amount * gasset_price * trading_fee;
};
