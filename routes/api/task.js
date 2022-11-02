import { Router } from 'express';

import { ctrlWrapper } from '../../helpers/index.js';
import * as ctrl from '../../controllers/task/index.js';

const router = Router();

router.get('/all-tasks', ctrlWrapper(ctrl.getAllTasks));
router.get('/:id', ctrlWrapper(ctrl.getTask));
router.post('/create', ctrlWrapper(ctrl.createTask));
router.patch('/edit/:id', ctrlWrapper(ctrl.editTask));
router.delete('/delete/:id', ctrlWrapper(ctrl.removeTask));

export default router;
