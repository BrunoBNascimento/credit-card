import UserStatus from '../enum/user-status.enum';

class UserDTO {
  name: string;

  password: string;

  email: string;

  status: UserStatus;
}

export default UserDTO;
