import { ApiProperty } from "@nestjs/swagger";

class StoryMediaDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    url: string;
}

class StoryDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ type: StoryMediaDto })
    media: StoryMediaDto;

    @ApiProperty()
    view: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    isView: boolean;

    @ApiProperty()
    userId: number;
}

class UserProfileImageDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    url: string;
}

class UserProfileDto {
    @ApiProperty()
    id: number;

    @ApiProperty({ type: UserProfileImageDto, nullable: true })
    image: UserProfileImageDto | null;
}

class UserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    username: string;

    @ApiProperty({ type: UserProfileDto })
    profile: UserProfileDto;
}

export class StoryFeedItemDto {
    @ApiProperty({ type: [StoryDto] })
    data: StoryDto[];

    @ApiProperty({ type: UserDto })
    user: UserDto;
}

