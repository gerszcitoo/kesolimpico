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
import { SectorCuradoDTO } from '../../service/dto/sector-curado.dto';
import { SectorCuradoService } from '../../service/sector-curado.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/sector-curados')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiUseTags('sector-curados')
export class SectorCuradoController {
    logger = new Logger('SectorCuradoController');

    constructor(private readonly sectorCuradoService: SectorCuradoService) {}

    @Get('/')
    @Roles(RoleType.USER, RoleType.CURADO)
    @ApiResponse({
        status: 200,
        description: 'List all records',
        type: SectorCuradoDTO,
    })
    async getAll(@Req() req: Request): Promise<SectorCuradoDTO[]> {
        const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
        const [results, count] = await this.sectorCuradoService.findAndCount({
            skip: +pageRequest.page * pageRequest.size,
            take: +pageRequest.size,
            order: pageRequest.sort.asOrder(),
        });
        HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
        return results;
    }

    @Get('/:id')
    @Roles(RoleType.USER, RoleType.CURADO)
    @ApiResponse({
        status: 200,
        description: 'The found record',
        type: SectorCuradoDTO,
    })
    async getOne(@Param('id') id: number): Promise<SectorCuradoDTO> {
        return await this.sectorCuradoService.findById(id);
    }

    @PostMethod('/')
    @Roles(RoleType.ADMIN, RoleType.CURADO)
    @ApiOperation({ title: 'Create sectorCurado' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: SectorCuradoDTO,
    })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async post(@Req() req: Request, @Body() sectorCuradoDTO: SectorCuradoDTO): Promise<SectorCuradoDTO> {
        const created = await this.sectorCuradoService.save(sectorCuradoDTO, req.user?.login);
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SectorCurado', created.id);
        return created;
    }

    @Put('/')
    @Roles(RoleType.ADMIN, RoleType.CURADO)
    @ApiOperation({ title: 'Update sectorCurado' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: SectorCuradoDTO,
    })
    async put(@Req() req: Request, @Body() sectorCuradoDTO: SectorCuradoDTO): Promise<SectorCuradoDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SectorCurado', sectorCuradoDTO.id);
        return await this.sectorCuradoService.update(sectorCuradoDTO, req.user?.login);
    }

    @Put('/:id')
    @Roles(RoleType.ADMIN, RoleType.CURADO)
    @ApiOperation({ title: 'Update sectorCurado with id' })
    @ApiResponse({
        status: 200,
        description: 'The record has been successfully updated.',
        type: SectorCuradoDTO,
    })
    async putId(@Req() req: Request, @Body() sectorCuradoDTO: SectorCuradoDTO): Promise<SectorCuradoDTO> {
        HeaderUtil.addEntityCreatedHeaders(req.res, 'SectorCurado', sectorCuradoDTO.id);
        return await this.sectorCuradoService.update(sectorCuradoDTO, req.user?.login);
    }

    @Delete('/:id')
    @Roles(RoleType.ADMIN, RoleType.CURADO)
    @ApiOperation({ title: 'Delete sectorCurado' })
    @ApiResponse({
        status: 204,
        description: 'The record has been successfully deleted.',
    })
    async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
        HeaderUtil.addEntityDeletedHeaders(req.res, 'SectorCurado', id);
        return await this.sectorCuradoService.deleteById(id);
    }
}
