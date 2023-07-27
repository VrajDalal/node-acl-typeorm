"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role1689340023286 = void 0;
const typeorm_1 = require("typeorm");
class Role1689340023286 {
    constructor() {
        this.table = new typeorm_1.Table({
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
        });
    }
    async up(queryRunner) {
        await queryRunner.createTable(this.table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(this.table);
    }
}
exports.Role1689340023286 = Role1689340023286;
