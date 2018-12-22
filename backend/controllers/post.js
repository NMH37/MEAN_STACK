const Post = require('./../models/post');

exports.fetchPosts = (req, res) => {
  Post.find()
    .then((documents) => {
      res.status(200).json({
        posts: documents,
        message: 'Post Fetched from DB'
      });
    })
    .catch(() => {
      res.status(500).json({ message: 'Fetching posts failed !' })
    });
}
exports.createPost = (req, res) => {
  post = new Post({
    title: req.body.title,
    content: req.body.content,
    post_writer: req.userData.userId
  });
  post.save().then((post) => {
    res.status(201).json(post);
  })
    .catch(error => {
      res.status(500).json({ message: 'Creating a new post failed' })
    });
}

exports.getOnePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post) {
        res.status(200).json(post);

      } else {
        res.status(401).json({ message: 'Post not found' })
      }
    })
    .catch(() => {
      res.status(500).json({ message: 'Fetching post failed !' })
    });
}

exports.updatePost = (req, res) => {
  Post.updateOne({ _id: req.params.id, post_writer: req.userData.userId }, req.body, { new: true }).then((result) => {

    if (result.nModified > 0) {
      res.status(200).json({ message: ' updated one' });
    } else {
      res.status(401).json({ message: 'Not Authorized to Update' })
    }

  })
    .catch((error) => {
      res.status(500).json({ message: "Post can't be updated" })
    })
}
exports.removePost = (req, res) => {
  Post.deleteOne({ _id: req.params.id, post_writer: req.userData.userId })
    .then((response) => {
      console.log(response, 'checking delete method')
      if (response.n > 0) {
        res.status(200).json({ message: 'Post deleted' });
      } else {
        res.status(401).json({ message: 'Not Authorized' })
      }

    })
    .catch(() => {
      res.status(500).json({ message: 'Deleting post failed !' });
    });

}
