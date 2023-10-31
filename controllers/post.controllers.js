const validator = require("fastest-validator");
const models = require("../models");

const createPost = async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
      categoryId: req.body.categoryId,
      userId: req.userData.userId, // will cover when user auth and aggregation part
    };

    // VALIDATION
    const schema = {
      title: { type: "string", optional: false, max: "100" },
      content: { type: "string", optional: false, max: "500" },
      categoryId: { type: "number", optional: false },
    };

    const v = new validator(); // create instance of validation class
    const validateRes = v.validate(post, schema);
    if (validateRes !== true) {
      return res
        .status(400)
        .json({ message: "Validation Failed", errors: validateRes });
    }

    const categoryRes = await models.Category.findByPk(req.body.categoryId);

    if (categoryRes) {
      const result = await models.Post.create(post);
      res
        .status(201)
        .json({ message: "Post Created Successfully", post: result });
    } else {
      res.status(400).json({ message: "Invalid Category ID" });
    }
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
    return res.status(200).json({ posts: result });
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
    const userId = req.userData.userId; // which user create the post

    // VALIDATION
    const schema = {
      title: {
        type: "string",
        optional: updatedPost.title ? false : true,
        max: "100",
      },
      content: {
        type: "string",
        optional: updatedPost.content ? false : true,
        max: "500",
      },
      categoryId: {
        type: "number",
        optional: updatedPost.categoryId ? false : true,
      },
    };

    const v = new validator(); // create instance of validation class
    const validateRes = v.validate(updatedPost, schema);
    console.log(validateRes);
    if (validateRes !== true) {
      return res
        .status(400)
        .json({ message: "Validation Failed", errors: validateRes });
    }

    const categoryRes = await models.Category.findByPk(req.body.categoryId);

    if (categoryRes) {
      const result = await models.Post.update(updatedPost, {
        where: { id: postId, userId: userId },
      });
      res.status(200).json({
        message: "Post Updated Successfully",
        result: result,
        updatedPost: updatedPost,
      });
    } else {
      res.status(400).json({ message: "Invalid Category ID" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error: error });
  }
};

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id; // postId
    const userId = req.userData.userId; // which user create the post
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
