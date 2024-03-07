import { UserDto } from './user.dto';

export interface CommentaryDto {
  id?: number;
  content: string;
  postId: number;
  user?: UserDto;
}
