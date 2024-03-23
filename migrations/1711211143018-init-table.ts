import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTable1711211143018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE \`user\` (
    \`id\` INT NOT NULL
        PRIMARY KEY COMMENT '用户ID',
    \`username\` VARCHAR(64) NOT NULL COMMENT '用户名',
    \`encrypted_password\` VARCHAR(64) NOT NULL COMMENT '加密后的密码',
    \`locked\` TINYINT(1) DEFAULT 0 NOT NULL COMMENT '是否锁定，1-是，0-否',
    \`enabled\` TINYINT(1) DEFAULT 1 NOT NULL COMMENT '是否可用，1-是，0-否',
    \`create_time\` DATETIME(6) NOT NULL COMMENT '创建时间',
    \`update_time\` DATETIME(6) NOT NULL COMMENT '更新时间',
    CONSTRAINT \`uk_user_username\`
        UNIQUE (\`username\`)
)
    ENGINE = InnoDB
    DEFAULT CHARSET = \`utf8mb4\`
    COLLATE = \`utf8mb4_bin\` COMMENT '用户表';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE `user`');
  }
}
