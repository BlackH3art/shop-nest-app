import {MigrationInterface, QueryRunner} from "typeorm";

export class NewVerOfShopItemEntity1632929621617 implements MigrationInterface {
    name = 'NewVerOfShopItemEntity1632929621617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `description` varchar(149) NULL");
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `shop_item` CHANGE `createdAt` `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()");
        await queryRunner.query("ALTER TABLE `shop_item` DROP COLUMN `description`");
        await queryRunner.query("ALTER TABLE `shop_item` ADD `description` varchar(150) NULL DEFAULT 'NULL'");
    }

}
