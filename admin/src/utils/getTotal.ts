export default (sold_products: any) => {
  return sold_products.reduce(
    (acc: any, el: any) => {
      const summa = el.count * el.price;
      const ball = Math.floor(summa / 100000) * el.ball;
      acc.total_summa += summa;
      acc.total_ball += ball;
      return acc;
    },
    {
      total_summa: 0,
      total_ball: 0,
    }
  );
};
