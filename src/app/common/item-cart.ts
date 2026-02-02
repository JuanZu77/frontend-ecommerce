export class ItemCart {

    constructor(
        public id: number,
        public productName: string,
        public price: number,
        public quantity: number,
        //public imageUrl: string
    ) { }

    getTotalPriceItem(): number {
        return this.price * this.quantity;
    }

}
