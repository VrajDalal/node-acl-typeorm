import { MigrationInterface, PrimaryGeneratedColumn, QueryRunner, Table } from "typeorm"

export class Users1689340074118 implements MigrationInterface {
    private table = new Table({
        name: 'User',
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
                length: '100'
            },
            {
                name: 'email',
                type: 'varchar',
                length: '100',
                isUnique: true
            },
            {
                name: 'password',
                type: 'varchar',
                length: '100',
            },
            {
                name: 'mobile_no',
                type: 'integer',
                length: '10',
                isNullable: true
            },
            {
                name: 'role_id',
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
