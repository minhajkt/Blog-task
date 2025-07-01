export const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const MESSAGES = {
  POST_CREATED: "Post created",
  POST_FETCHED: "Post fetched",
  POSTS_FETCHED: "Posts fetched",
  POST_NOT_FOUND: "Post not found",
  POST_DELETED: "Post deleted",

  COMMENT_ADDED: "Comment added",
  COMMENTS_FETCHED: "Comments fetched",

  REQUIRED_FIELDS: "All fields are required",
  COMMENT_FIELDS_REQUIRED: "Content and commenter are required",
  INVALID_POST_ID: "Invalid postId format",
  INTERNAL_ERROR: "Internal server error",
};
