import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class RolePermissionPivot1689340063774 implements MigrationInterface {

    private table = new Table({
        name: 'role_permission_pivot',
        columns: [
            {
                name: 'id',
                type: 'varchar',
                isPrimary: true,
                isGenerated: true
            },
            {
                name: 'roleId',
                type: 'integer',
            },
            {
                name: 'permission_id',
                type: 'integer',
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
