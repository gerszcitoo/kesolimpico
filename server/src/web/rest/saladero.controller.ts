import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post as PostMethod,
    Put,
    UseGuards,
    Req,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { SaladeroDTO } from '../../service/dto/saladero.dto';
import { SaladeroService } from '../../service/saladero.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/saladeros')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('saladeros')
export class SaladeroController {
    logger = new Logger('SaladeroController');

    constructor(private readonly saladeroService: SaladeroService) {}

    @Get('/')
    @Roles(RoleType.USER, RoleType.SALADERO)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: SaladeroDTO,
    })
    async getAll(@Req() req: Request): Promise<SaladeroDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.saladeroService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER, RoleType.SALADERO)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: SaladeroDTO,
    })
    async getOne(@Param('id') id: number): Promise<SaladeroDTO> {
        return await this.saladeroService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN, RoleType.SALADERO)
    @ApiOperation({ title: 'Create saladero' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: SaladeroDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() saladeroDTO: SaladeroDTO): Promise<SaladeroDTO> {
        const created = await this.saladeroService.save(saladeroDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Saladero', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN, RoleType.SALADERO)
    @ApiOperation({ title: 'Update saladero' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: SaladeroDTO,
    })
    async put(@Req() req: Request, @Body() saladeroDTO: SaladeroDTO): Promise<SaladeroDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Saladero', saladeroDTO.id);
        return await this.saladeroService.update(saladeroDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN, RoleType.SALADERO)
    @ApiOperation({ title: 'Update saladero with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: SaladeroDTO,
    })
    async putId(@Req() req: Request, @Body() saladeroDTO: SaladeroDTO): Promise<SaladeroDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Saladero', saladeroDTO.id);
        return await this.saladeroService.update(saladeroDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN, RoleType.SALADERO)
    @ApiOperation({ title: 'Delete saladero' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Saladero', id);
        return await this.saladeroService.deleteById(id);
    }
}
