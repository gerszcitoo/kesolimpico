import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../domain/user.entity';
import { transformPassword } from '../security';
import { Authority } from '../domain/authority.entity';

export class SeedUsersRoles1570200490072 implements MigrationInterface {
    role1: Authority = { name: 'ROLE_ADMIN' };

    role2: Authority = { name: 'ROLE_USER' };

    role3: Authority = { name: 'ROLE_RECEPCION' };

    role4: Authority = { name: 'ROLE_LABORATORIO' };

    role5: Authority = { name: 'ROLE_PRODUCCION' };

    role6: Authority = { name: 'ROLE_CURADO' };

    role7: Authority = { name: 'ROLE_SALADERO' };

    user1: User = {
        login: 'system',
        password: 'system',
        firstName: 'System',
        lastName: 'System',
        email: 'system@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user2: User = {
        login: 'anonymoususer',
        password: 'anonymoususer',
        firstName: 'Anonymous',
        lastName: 'User',
        email: 'anonymoususer@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user3: User = {
        login: 'admin',
        password: 'admin',
        firstName: 'Administrator',
        lastName: 'Administrator',
        email: 'admin@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user4: User = {
        login: 'user',
        password: 'user',
        firstName: 'User',
        lastName: 'User',
        email: 'user@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'en',
        createdBy: 'system',
        lastModifiedBy: 'system',
    };

    user5: User = {
        login: 'rece',
        password: 'rece',
        firstName: 'Rece',
        lastName: 'REce',
        email: 'rece@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'es',
        createdBy: 'daylan',
        lastModifiedBy: 'system',
    };

    user6: User = {
        login: 'labo',
        password: 'labo',
        firstName: 'labo',
        lastName: 'labo',
        email: 'labo@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'es',
        createdBy: 'daylan',
        lastModifiedBy: 'system',
    };

    user7: User = {
        login: 'prod',
        password: 'prod',
        firstName: 'Prdo',
        lastName: 'Prod',
        email: 'prod@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'es',
        createdBy: 'daylan',
        lastModifiedBy: 'system',
    };
    user8: User = {
        login: 'curado',
        password: 'curado',
        firstName: 'crada',
        lastName: 'crad',
        email: 'cura@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'es',
        createdBy: 'daylan',
        lastModifiedBy: 'system',
    };
    user9: User = {
        login: 'sala',
        password: 'sala',
        firstName: 'srada',
        lastName: 'srad',
        email: 'saladero@localhost.it',
        imageUrl: '',
        activated: true,
        langKey: 'es',
        createdBy: 'daylan',
        lastModifiedBy: 'system',
    };

    // eslint-disable-next-line
  public async up(queryRunner: QueryRunner): Promise<any> {
        const authorityRepository = getRepository('nhi_authority');

        const adminRole = await authorityRepository.save(this.role1);
        const userRole = await authorityRepository.save(this.role2);
        const receRole = await authorityRepository.save(this.role3);
        const laboratorioRole = await authorityRepository.save(this.role4);
        const produccionRole = await authorityRepository.save(this.role5);
        const curadoRole = await authorityRepository.save(this.role6);
        const saladeroRole = await authorityRepository.save(this.role7);

        const userRepository = getRepository('nhi_user');

        this.user1.authorities = [adminRole, userRole];
        this.user3.authorities = [adminRole, userRole];
        this.user4.authorities = [userRole];
        this.user5.authorities = [receRole, userRole];
        this.user6.authorities = [laboratorioRole];
        this.user7.authorities = [produccionRole];
        this.user8.authorities = [curadoRole];
        this.user9.authorities = [saladeroRole];

        await Promise.all(
            [
                this.user1,
                this.user2,
                this.user3,
                this.user4,
                this.user5,
                this.user6,
                this.user7,
                this.user8,
                this.user9,
            ].map(u => transformPassword(u)),
        );

        await userRepository.save([
            this.user1,
            this.user2,
            this.user3,
            this.user4,
            this.user5,
            this.user6,
            this.user7,
            this.user8,
            this.user9,
        ]);
    }

    // eslint-disable-next-line
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
