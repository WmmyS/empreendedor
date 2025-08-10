import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1754781056872 implements MigrationInterface {
    name = 'InitialSchema1754781056872'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`routes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`method\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`stores\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`createdById\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`accesses\` (\`roleId\` int NOT NULL, \`storeId\` int NOT NULL, PRIMARY KEY (\`roleId\`, \`storeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`create_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_token\` (\`userId\` int NOT NULL, \`token\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`expires_at\` datetime NOT NULL, PRIMARY KEY (\`userId\`, \`token\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_routes_routes\` (\`rolesId\` int NOT NULL, \`routesId\` int NOT NULL, INDEX \`IDX_e1a10d31db823c1710f6de1311\` (\`rolesId\`), INDEX \`IDX_5a534bbb0e2fad0f1787c31c42\` (\`routesId\`), PRIMARY KEY (\`rolesId\`, \`routesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`stores\` ADD CONSTRAINT \`FK_28003323188763c7719b1155265\` FOREIGN KEY (\`createdById\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accesses\` ADD CONSTRAINT \`FK_65c10324c4f5b1056a953e3a52c\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`accesses\` ADD CONSTRAINT \`FK_e2380b793fe8c041ebb174a91c7\` FOREIGN KEY (\`storeId\`) REFERENCES \`stores\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_368e146b785b574f42ae9e53d5e\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_token\` ADD CONSTRAINT \`FK_d37db50eecdf9b8ce4eedd2f918\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_routes_routes\` ADD CONSTRAINT \`FK_e1a10d31db823c1710f6de13111\` FOREIGN KEY (\`rolesId\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_routes_routes\` ADD CONSTRAINT \`FK_5a534bbb0e2fad0f1787c31c427\` FOREIGN KEY (\`routesId\`) REFERENCES \`routes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_routes_routes\` DROP FOREIGN KEY \`FK_5a534bbb0e2fad0f1787c31c427\``);
        await queryRunner.query(`ALTER TABLE \`roles_routes_routes\` DROP FOREIGN KEY \`FK_e1a10d31db823c1710f6de13111\``);
        await queryRunner.query(`ALTER TABLE \`user_token\` DROP FOREIGN KEY \`FK_d37db50eecdf9b8ce4eedd2f918\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_368e146b785b574f42ae9e53d5e\``);
        await queryRunner.query(`ALTER TABLE \`accesses\` DROP FOREIGN KEY \`FK_e2380b793fe8c041ebb174a91c7\``);
        await queryRunner.query(`ALTER TABLE \`accesses\` DROP FOREIGN KEY \`FK_65c10324c4f5b1056a953e3a52c\``);
        await queryRunner.query(`ALTER TABLE \`stores\` DROP FOREIGN KEY \`FK_28003323188763c7719b1155265\``);
        await queryRunner.query(`DROP INDEX \`IDX_5a534bbb0e2fad0f1787c31c42\` ON \`roles_routes_routes\``);
        await queryRunner.query(`DROP INDEX \`IDX_e1a10d31db823c1710f6de1311\` ON \`roles_routes_routes\``);
        await queryRunner.query(`DROP TABLE \`roles_routes_routes\``);
        await queryRunner.query(`DROP TABLE \`user_token\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`accesses\``);
        await queryRunner.query(`DROP TABLE \`stores\``);
        await queryRunner.query(`DROP TABLE \`routes\``);
    }

}
