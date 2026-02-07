export class OrderProduct {

    constructor(
        public id: number | null,
        public productId: number,
        public price: number,
        public quantity: number
    ) { }
}
