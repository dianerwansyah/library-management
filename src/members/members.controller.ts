// src/members/members.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { MembersService } from './members.service';
import { Member } from './member.entity';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll(): Promise<Member[]> {
    return this.membersService.findAll();
  }

  @Post()
  create(@Body() member: Member): Promise<Member> {
    return this.membersService.create(member);
  }
}
