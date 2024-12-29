interface ProductDTO {
    description: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    quantity: number;
}

interface ReviewBody {
    author: string;
    authorUsername: string;
    product: string;
    productOwner: string;
    text: string;
    score: number;
}

interface CartInstanceBody {
    user: string;
    product: string;
    price: number;
    quantity: number;
}

interface TransactionBody {
    paymentMethod: string;
}

interface RegistrationBody {
    state: string;
    country: string;
    email: string;
    password: string;
    name: { first: string; last: string };
    location: { state: string; country: string };
}

interface LogInBody {
    email: string;
    password: string;
}

interface WishlistBody {
    product: string;
}