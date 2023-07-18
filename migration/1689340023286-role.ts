import { Int } from "@google-cloud/spanner/build/src/codec"
import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Role1689340023286 implements MigrationInterface {
    private table = new Table({
        name: 'roles',
        columns: [
            {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                isGenerated: true
            },
            {
                name: 'name',
                type: 'varchar',
                length: '30'
            },
            {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
                isNullable: false
            },
            {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
                isNullable: false
            }
        ]
    })

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(this.table)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.table)
    }

}
