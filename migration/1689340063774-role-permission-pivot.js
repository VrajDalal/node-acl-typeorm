"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionPivot1689340063774 = void 0;
const typeorm_1 = require("typeorm");
class RolePermissionPivot1689340063774 {
    constructor() {
        this.table = new typeorm_1.Table({
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
        });
    }
    async up(queryRunner) {
        await queryRunner.createTable(this.table);
    }
    async down(queryRunner) {
        await queryRunner.dropTable(this.table);
    }
}
exports.RolePermissionPivot1689340063774 = RolePermissionPivot1689340063774;
