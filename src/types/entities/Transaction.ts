interface Transaction {
    _id?: string;
    buyer: string;
    products: string[];
    paymentMethod: string;
    totalPrice: number;
    createdAt: Date;
}
