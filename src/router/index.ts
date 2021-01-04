import express from 'express';
import { UserDocument } from '../models/userDocument.model';
import Factory from '../factories/UserDocumentFactory';
import FillDatabaseService from '../services/FillDatabaseService';

let router = express.Router();

router.post('/', async (req, res, next) => {
  const { page } = req.body || 1;
  const paginationOptions = {
    page,
    limit: 25,
  };

  const userDocs = await UserDocument.paginate({}, paginationOptions, function (err, result) {
    return {
      data: result.docs,
      total: result.totalDocs,
      page: result.page,
      totalPages: result.totalPages
    };
  });

  res.status(200).json({ userDocs });
});

router.post('/add-user-documents', async (req, res, next) => {
  const fillDatabaseService = new FillDatabaseService(Factory);
  await fillDatabaseService.run();
  res.status(200).json({ message: 'Succesfully filled database with 100 000 documents' });
});

router.post('/delete-user-documents', async (req, res, next) => {
  await UserDocument.deleteMany();
  res.status(200).json({ message: 'Succesfully deleted all database documents' });
});

export default router;
