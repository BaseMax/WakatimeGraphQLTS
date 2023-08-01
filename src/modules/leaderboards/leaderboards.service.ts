import { Injectable } from '@nestjs/common';
import { UpdateLeaderBoardInput } from './dto/update-leaderboard.dto';

@Injectable()
export class LeaderboardsService {
  async getLeaderBoard(leaderBoardID: number) {}

  async udpateLeaderBoard(input: UpdateLeaderBoardInput) {}

  async joinLeaderBoard(user: any , leaderBoardID : number){ 
    
  }
}
