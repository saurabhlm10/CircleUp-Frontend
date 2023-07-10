interface UserModelResponse {
    _id: string;
    username: string;
    email: string;
    followers: [string];
    following: [string];
  }