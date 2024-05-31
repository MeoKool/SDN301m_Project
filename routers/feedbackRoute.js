const express = require('express');
const feedbackController = require('../controllers/feedbackController');
const router = express.Router();

router.get('/getAll', feedbackController.getAllFeedback);
router.get('/getById/:id', feedbackController.getFeedbackById);
router.post('/submitFeedback', feedbackController.submitFeedback);
router.put('/updateById/:id', feedbackController.updateFeedback);
router.delete('/deleteById/:id', feedbackController.deleteFeedback);

module.exports = router;
