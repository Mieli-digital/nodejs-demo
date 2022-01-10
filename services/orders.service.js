class OrderService {
  /*
    {
      id:,
      timestamp:,
      articleList: [
        {
          name:,
          amount:,
          cost:,
        }
      ]  
    }
  */

  constructor(){
    this.orderList = [];
    this.orderListIndex = 0;
  }

  getAll(){
    return this.orderList;
  }

  getById(id){
    if(typeof id !== "number" || id < 0)
      throw new Error("invalid id");

    return this.orderList.find(x => x.id === id);
  }

  create(order){
    if(!order)
      throw new Error("Invalid data");

    this.orderListIndex++;
    order.id = this.orderListIndex;
    this.orderList.push(order);
  }
}

module.exports = OrderService