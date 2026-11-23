function CommentList({ comments }) {
  
  return (
    <>
      <div>
        <ul>
          {comments.length > 0 ? comments.map((comment) => (
            <li className="p-5 border-b border-gray-200 whitespace-pre-wrap" key={comment.id}>
              <p className="text-xl font-semibold">{comment.username}</p> 
              <p className="text-lg p-5">{comment.description}</p>
            </li>
          )) : 
        <p className="text-black font-semibold p-3 text-xs md:text-xl lg:text-xl">
          No comments yet
        </p> 
        }
        </ul>
      </div>
    </>
  );
}

export default CommentList;