import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 123,
  name: 'Name Test',
  email: 'emailTest@email.com',
  phone: '999999999',
  cpf: '12345678900',
  password: '$2b$10$Ct70zd/zf3HqZ5f0Pod1NO4/4FKmEQz92WoBY7Bk59H7Z.qKaXkUG',
  typeUser: UserType.USER,
  createdAt: new Date(),
  updatedAt: new Date(),
};
