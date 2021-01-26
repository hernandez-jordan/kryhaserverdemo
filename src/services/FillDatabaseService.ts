import { IFactory } from 'rosie';
import { UserDocument } from '../models/userDocument.model';
import {
  IUserDocumentFactory,
  IUserDocument,
} from '../factories/UserDocumentFactory';

export default class FillDatabaseService {

  constructor(private _factory: IFactory<IUserDocumentFactory>) {
    this._factory = _factory;
  }

  public run = async () => {
    //create document badges
    for (let i = 0; i < 100; i++) {
      const userDocuments = this._factory.build({}, { numUserDocuments: 1000 }).documents;
      await this.insertUserDocuments(userDocuments);
      console.log(i)
    }
  };

  private insertUserDocuments = (userDocuments: IUserDocument[]) =>
    new Promise<void>((resolve, reject) => {
      UserDocument.collection.insertMany(userDocuments, (err, userDocs) => {
        if (err) {
          reject(Error('Promise failed'));
        } else {
          resolve(console.log(
            'userDocs insertedIds',
            Object.keys(userDocs.insertedIds).length
          ));
        }
      });
    });
}
