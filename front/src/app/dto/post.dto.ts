import { UserDto } from './user.dto';

export interface PostDto {
  id: number;
  title: string;
  content: string;
  themeId: number;
  createdAt: string;
  user?: UserDto;
}
