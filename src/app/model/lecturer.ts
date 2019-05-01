export interface Lecturer{
    _id?: string,
    name?: {
        firstName: string,
        lastName: string,
        middleName: string
    },
    email?: string,
    mobile?: string,
    telephone?: string,
    sex?: string,
    nationality?: string,
    stateOfOrigin?: string,
    localGov?: string,
    address_current?: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        country: string,
        postalCode: string
    },
    address_permanent?: {
        line1: string,
        line2: string,
        city: string,
        state: string,
        country: string,
        postalCode: string
    },
    dob?: string,
    matricNo?: string,
    registrationNo?: string,
    programme?: any,
    sponsor?: {
        firstName: string,
        lastName: string, 
        email: string,
        phone: string
    },
    nextOfKin?: {
        firstName: string,
        lastName: string, 
        email: string,
        phone: string,
        relationship: string
    },
    education?: {
        primary: {
            name: string
        },
        secondary: {
            name: string
        },
        tertiary: {
            name: string
        }
    },
    professionalProfile?: {
        name: string
    },
    documents?: any[];
}