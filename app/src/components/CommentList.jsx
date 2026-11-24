function CommentList({ comments }) {
  
  return (
    <>
      <div>
        <ul>
          {comments.length > 0 ? comments.map((comment) => (
            <li className="p-5 border-b border-gray-200 whitespace-pre-wrap w-80 md:w-120 lg:w-150 wrap-break-word" key={comment.id}>
              <p className="text-xl font-semibold">{comment.username}</p> 
              <p className="text-lg p-5 text-wrap">{comment.description}</p>
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