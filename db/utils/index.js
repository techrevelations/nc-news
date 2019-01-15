exports.arrangeArticles = articleData => articleData.map((article) => {
  const articleObject = {
    ...article,
    username: article.created_by,
    created_at: new Date(article.created_at),
  };
  delete articleObject.created_by;
  return articleObject;
});

exports.arrangeComments = (commentData, articles) => commentData.map((comment) => {
  const art = articles.find(article => article.title === comment.belongs_to);
  const commentObject = {
    ...comment,
    username: comment.created_by,
    article_id: art.article_id,
    created_at: new Date(comment.created_at),
  };
  delete commentObject.created_by;
  delete commentObject.belongs_to;
  return commentObject;
});
