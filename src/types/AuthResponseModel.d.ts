interface LoginResponseModel {
  success: boolean;
  message: string;
  user: UserModelResponse | {};
}

interface RegisterResponseModel {
  success: boolean;
  message: string;
  id: string | undefined;
}
