export default class Transaction {
  constructor(data) {
    this.from = data.x.inputs.map(i => i.prev_out.addr);
    this.to = data.x.out.map(i => i.addr);
    this.sum = data.x.out.reduce((sum, i) => i.value + sum, 0);
  }
}
