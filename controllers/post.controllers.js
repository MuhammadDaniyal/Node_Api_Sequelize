const models = require("../models");

const createPost = async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId,
      userId: 1, // will cover when user auth and aggregation part
    };
    const result = await models.Post.create(post);
    res
      .status(201)
      .json({ message: "Post Created Successfully", post: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await models.Post.findByPk(id);
    if (result) {
      res.status(200).json({ post: result });
    } else {
      res.status(404).json({ message: "Post Not Found", post: result });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const result = await models.Post.findAll();
    res.status(200).json({ posts: result });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id; // postId
    const updatedPost = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId,
      // userId will not update, user who create the post remain same in the updated post
    };
    const userId = 1; // which user create the post
    const result = await models.Post.update(updatedPost, {
      where: { id: postId, userId: userId },
    });
    res.status(200).json({
      message: "Post Updated Successfully",
      result: result,
      updatedPost: updatedPost,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id; // postId
    const userId = 1; // which user create the post
    const result = await models.Post.destroy({
      where: { id: postId, userId: userId },
    });
    res.status(200).json({
      message: "Post Deleted Successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

module.exports = { createPost, getPost, getAllPosts, updatePost, deletePost };
