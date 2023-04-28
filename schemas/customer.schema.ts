import mongoose, { type Document, type ObjectId } from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema<ICustomerSchema>(
    {
        customerID: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Customer =
    mongoose.models.Customer ||
    mongoose.model<ICustomerSchema>('Customer', customerSchema);

export default Customer;

export interface ICustomerSchema extends Document {
    customerID: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export type AdminDataType = Document<
    unknown,
    Record<string, unknown>,
    ICustomerSchema
> &
    Omit<
        ICustomerSchema & {
            _id: ObjectId;
        },
        never
    >;
