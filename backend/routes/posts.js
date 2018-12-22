const express = require('express');
router = express.Router();
const chk_auth = require('../middleware/check-auth');
const postController = require('../controllers/post');

router.post('', chk_auth, postController.createPost);

router.put('/:id', chk_auth, postController.updatePost);

router.get('', postController.fetchPosts);

router.get('/:id', postController.getOnePost);

router.delete('/:id', chk_auth, postController.removePost);

module.exports = router;
