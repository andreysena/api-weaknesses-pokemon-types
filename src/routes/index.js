import express, { Router } from 'express';
import typesWeaknesses from '../controller/typesWeaknessesController.js';

let router = express();

router.use(Router());
router.use('/types-weaknesses', typesWeaknesses());

export default router;