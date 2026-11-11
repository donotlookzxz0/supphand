function CommentList({ comments }) {
  
  return (
    <>
      <div className="flex justify-center items-center text-white text-lg font-mono">
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.username} {comment.description}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CommentList;