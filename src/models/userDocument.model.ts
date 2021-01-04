import { Document, model, Schema, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const UserDocumentSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    alias: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { collection: 'user-documents' }
);

UserDocumentSchema.plugin(mongoosePaginate);

export interface IUserDocument extends Document {
  firstname: string;
  lastname: string;
  alias: string;
}

interface IPaginatedUserDocument<T extends Document> extends PaginateModel<T> {}

export const UserDocument: IPaginatedUserDocument<IUserDocument> = model<IUserDocument>(
  'UserDocument',
  UserDocumentSchema
) as IPaginatedUserDocument<IUserDocument>;
