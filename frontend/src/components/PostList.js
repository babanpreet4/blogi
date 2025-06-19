import React from "react";

export default function PostList({ posts, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      {posts.length === 0 && <p>No posts available.</p>}
      {posts.map((post) => (
        <div
          key={post.id}
          className="border p-4 rounded shadow hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold">{post.title}</h3>
          <p className="text-sm text-gray-500">
            By {post.author} | Created:{" "}
            {new Date(post.created_at).toLocaleString()} | Updated:{" "}
            {new Date(post.updated_at).toLocaleString()}
          </p>
          <p className="mt-2">{post.content}</p>
          {onEdit && (
            <div className="mt-3 space-x-2">
              <button
                onClick={() => onEdit(post)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(post.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
