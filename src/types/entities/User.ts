interface User {
    _id?:string
    name: { 
        first: string;
        last: string;
    };
    location: {
        country: string;
        state: string;
    };
    description: string;
}