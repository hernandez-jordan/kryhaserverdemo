import { Factory, IFactory } from 'rosie';
import { name } from 'faker';

export interface IUserDocument {
  firstname: string;
  lastname: string;
  alias: string;
}

export interface IUserDocumentFactory extends IFactory {
  documents: IUserDocument[];
}
const UserDocumentFactory: IFactory<IUserDocumentFactory> = Factory.define(
  'userDocuments'
)
  .option('numUserDocuments', 2)
  .attr('documents', ['numUserDocuments'], (numUserDocuments) => {
    const userDocumentsArray = [];
    for (let i = 0; i < numUserDocuments; i++) {
      userDocumentsArray.push({
        firstname: name.firstName(),
        lastname: name.lastName(),
        alias: name.jobDescriptor(),
      });
    }
    return userDocumentsArray;
  });

export default UserDocumentFactory;
