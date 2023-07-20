interface PostModelType {
  _id: string;
  imageUrl: string;
  userId: string;
  username: string;
  likes: [string];
  comments: [CommentModel];
  createdAt: string;
}

interface CommentModel {
  _id: string;
  comment: string;
  username: string;
  userEmail: string;
  created_at: string;
}
