// module imports
import express from 'express';
import documentController from '../controllers/documentController';

// router object
const documentRouter = express.Router();

documentRouter.route('/')
  .post(documentController.createDocument)
  .get(documentController.getAllDocuments);

export default documentRouter;
