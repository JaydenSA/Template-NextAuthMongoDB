export interface UserProfileDocument {
    _id?: string;
    user_email: string;
    first_name: string;
    last_name: string;
    image: string;
    phone_number: string;
}

export interface UserShippingDocument {
    _id: string;
    userId: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: string;
}