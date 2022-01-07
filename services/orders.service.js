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
    this.salesOrders = [];
    this.salesOrderIndex = 0;
  }

  getAll(){
    return this.salesOrders;
  }

  getById(id){
    if(typeof id !== "number" || id < 0)
      throw new Error("id invalid or out of range");
    return this.salesOrders.find(x => x.id === id);
  }

  create(order){
    if(!order)
      throw new Error("no order or not readable");

    this.salesOrderIndex++;
    order.id = this.salesOrderIndex;
    this.salesOrders.push(order);
  }

  update(id, order){
    if(typeof id !== "number" || id < 0)
      throw new Error("id is invalid or wrong format");
    
    let salesOrderIndex = this.salesOrders.findIndex(x => x.id === id);
    if(salesOrderIndex < 0)
      throw new Error(`order by id {id} not found`);
    
    order.id = id;
    this.salesOrders[salesOrderIndex] = order;
  }

  delete(id){
    if(typeof id !== "number" || id < 0)
      throw new Error("id invalid or out of range");
    
    let salesOrderIndex = this.salesOrders.findIndex(x => x.id === id);
    if(salesOrderIndex <= 0)
      throw new Error(`order by id {id} not found`);
    
    this.salesOrders.splice(salesOrderIndex, 1);
  }
}

module.exports = OrderService