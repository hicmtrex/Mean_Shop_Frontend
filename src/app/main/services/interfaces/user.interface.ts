export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegister extends UserLogin {
  username: string;
}

export interface UserData extends UserLogin {
  _id: string;
  username: string;
  image: string;
  createdAt: Date;
  isAdmin: boolean;
}
