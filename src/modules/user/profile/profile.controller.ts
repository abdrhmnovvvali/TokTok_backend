import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Patch, 
    UploadedFile, 
    UseGuards, 
    UseInterceptors 
  } from "@nestjs/common";
  import { FileInterceptor } from "@nestjs/platform-express";
  import { ProfileService } from "./profile.service";
  import { AuthGuard } from "src/shared/guards/Auth.guard";
  import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
  import { UpdateProfileDto } from "./dto/update-profile.dto";
  
  @Controller("user/:id/profile")
  export class ProfileController {
    constructor(private profileService: ProfileService) {}
  
    @Patch()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('avatar')) // şəkil varsa
    @ApiConsumes('multipart/form-data') // Swagger üçün vacib
    updateProfile(
      @Param("id") id: number,
      @UploadedFile() file: Express.Multer.File, // FormData ilə gələn şəkil
      @Body() body: UpdateProfileDto
    ) {
      return this.profileService.updateProfile(id, body);
    }
  
    @Get('me')
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    myProfile() {
      return this.profileService.getMyProfile();
    }
  
    @Get()
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    getProfile(@Param("id") id: number) {
      return this.profileService.getProfile(id);
    }
  }
  