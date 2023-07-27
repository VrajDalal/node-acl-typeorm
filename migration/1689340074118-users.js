"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users1689340074118 = void 0;
const typeorm_1 = require("typeorm");
class Users1689340074118 {
    constructor() {
        this.table = new typeorm_1.Table({
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
        });
    }
    async up(queryRunner) {
        await queryRunner.createTable(this.table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(this.table);
    }
}
exports.Users1689340074118 = Users1689340074118;
