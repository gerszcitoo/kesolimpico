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
import { CisternaDTO } from '../../service/dto/cisterna.dto';
import { CisternaService } from '../../service/cisterna.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/cisternas')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('cisternas')
export class CisternaController {
    logger = new Logger('CisternaController');

    constructor(private readonly cisternaService: CisternaService) {}

    @Get('/')
    @Roles(RoleType.USER, RoleType.RECEPCION)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: CisternaDTO,
    })
    async getAll(@Req() req: Request): Promise<CisternaDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.cisternaService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER, RoleType.RECEPCION)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: CisternaDTO,
    })
    async getOne(@Param('id') id: number): Promise<CisternaDTO> {
        return await this.cisternaService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN, RoleType.RECEPCION)
    @ApiOperation({ title: 'Create cisterna' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: CisternaDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() cisternaDTO: CisternaDTO): Promise<CisternaDTO> {
        const created = await this.cisternaService.save(cisternaDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Cisterna', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN, RoleType.RECEPCION)
    @ApiOperation({ title: 'Update cisterna' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CisternaDTO,
    })
    async put(@Req() req: Request, @Body() cisternaDTO: CisternaDTO): Promise<CisternaDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Cisterna', cisternaDTO.id);
        return await this.cisternaService.update(cisternaDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN, RoleType.RECEPCION)
    @ApiOperation({ title: 'Update cisterna with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: CisternaDTO,
    })
    async putId(@Req() req: Request, @Body() cisternaDTO: CisternaDTO): Promise<CisternaDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'Cisterna', cisternaDTO.id);
        return await this.cisternaService.update(cisternaDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN, RoleType.RECEPCION)
    @ApiOperation({ title: 'Delete cisterna' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'Cisterna', id);
        return await this.cisternaService.deleteById(id);
    }
}
