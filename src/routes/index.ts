import { apiEndPoint } from '../core/route';
import { registerUserData, loginUserData, forgetPasswordData, } from '../handler/auth';
import { getUsersList, getUserById, createUserData, updateUserData, deleteUserData, } from '../handler/user';
import { NextFunction, Request, Response, Router } from 'express';
import { Auth } from '../utils/auth';
import { ForgetPasswordSchema, LoginSchema, RegisterSchema } from '../validation-schemas/auth.schema';
import { CreaterUserSchema, DeleteUserSchema, GetUserById, UpdateUserSchema, } from '../validation-schemas/user.schema';
import { createRoleData, deleteRoleById, getRoleData, getRoleIdData, updateRoleById, } from '../handler/role';
import { createPermissionData, deletePermissionData, getPermissionByIdData, getPermissionsData, updatePermissionData, } from '../handler/permission';
import { ROLE } from '../utils/enum';
import { CreateRoleSchema, DeleteRoleSchema, GetRolesByIdSchema, UpdateRoleSchema } from '../validation-schemas/role.schema';
import { CreatePermissionSchema, DeletePermissionSchema, GetPermissionByIdSchema, UpdatePermissionSchema } from '../validation-schemas/permission.schema';
import { DeleteUploadSchema, GetUploadByIdSchema, UpdateUploadSchema } from '../validation-schemas/upload.schema';
import { createUploadFile, deleteUploadData, getUploadData, getUploadDataById, updateUploadData } from '../handler/upload';
import { categoryData, deleteCategoryData, getCategorysData, getCategorysDataById, updateCategoryData } from '../handler/category';
import { CreateCategorySchema, DeleteCategorySchema, GetCategoryByIdSchema, UpdateCategorySchema } from '../validation-schemas/category.schema';

const router: Router = Router();

//user  routes
router.route(apiEndPoint.user)
  .get([Auth.is(ROLE.VIEW_USERS)], async (req: Request, res: Response, next: NextFunction) => {
    await getUsersList(req, res, next);
  })
  .post([Auth.is(ROLE.CREATE_USER), Auth.validateSchema(CreaterUserSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await createUserData(req, res, next);
  })

router.route(apiEndPoint.userById)
  .get([Auth.is(ROLE.VIEW_USER_BY_ID), Auth.validateSchema(GetUserById)], async (req: Request, res: Response, next: NextFunction) => {
    await getUserById(req, res, next);
  }).put([Auth.is(ROLE.UPDATE_USER), Auth.validateSchema(UpdateUserSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await updateUserData(req, res, next);
  }).delete([Auth.is(ROLE.DELETE_USER), Auth.validateSchema(DeleteUserSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await deleteUserData(req, res, next);
  })

//Auth route
router.post(apiEndPoint.register, Auth.validateSchema(RegisterSchema), async (req, res, next) => {
  await registerUserData(req, res, next);
});

router.post(apiEndPoint.login, Auth.validateSchema(LoginSchema), async (req, res, next) => {
  await loginUserData(req, res, next);
});

router.post(apiEndPoint.forget, Auth.validateSchema(ForgetPasswordSchema), async (req, res, next) => {
  await forgetPasswordData(req, res, next);
});

//role routes
router.route(apiEndPoint.role)
  .get([Auth.is(ROLE.VIEW_ROLES)], async (req: Request, res: Response, next: NextFunction) => {
    await getRoleData(req, res, next);
  }).post([Auth.is(ROLE.CREATE_ROLE), Auth.validateSchema(CreateRoleSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await createRoleData(req, res, next);
  })

router.route(apiEndPoint.roleById)
  .get([Auth.is(ROLE.VIEW_ROLE_BY_ID), Auth.validateSchema(GetRolesByIdSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await getRoleIdData(req, res, next);
  }).put([Auth.is(ROLE.UPDATE_ROLE), Auth.validateSchema(UpdateRoleSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await updateRoleById(req, res, next);
  }).delete([Auth.is(ROLE.DELETE_ROLE), Auth.validateSchema(DeleteRoleSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await deleteRoleById(req, res, next);
  })

//permission routes
router.route(apiEndPoint.permissions)
  .get([Auth.is(ROLE.VIEW_PERMISSIONS)], async (req: Request, res: Response, next: NextFunction) => {
    await getPermissionsData(req, res, next);
  }).post([Auth.is(ROLE.CREATE_PERMISSION), Auth.validateSchema(CreatePermissionSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await createPermissionData(req, res, next);
  })

router.route(apiEndPoint.permissionById)
  .get([Auth.is(ROLE.VIEW_PERMISSION_BY_ID), Auth.validateSchema(GetPermissionByIdSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await getPermissionByIdData(req, res, next);
  }).put([Auth.is(ROLE.UPDATE_PERMISSION), Auth.validateSchema(UpdatePermissionSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await updatePermissionData(req, res, next);
  }).delete([Auth.is(ROLE.DELETE_PERMISSION), Auth.validateSchema(DeletePermissionSchema)], async (req: Request, res: Response, next: NextFunction) => {
    await deletePermissionData(req, res, next);
  })

//upload routs

router.route(apiEndPoint.upload)
  .post(async (req: Request, res: Response, next: NextFunction) => {
    await createUploadFile(req, res, next);
  }).get(async (req: Request, res: Response, next: NextFunction) => {
    await getUploadData(req, res, next)
  })

router.route(apiEndPoint.uploadById)
  .get((Auth.validateSchema(GetUploadByIdSchema)), async (req: Request, res: Response, next: NextFunction) => {
    await getUploadDataById(req, res, next)
  }).put((Auth.validateSchema(UpdateUploadSchema)), async (req: Request, res: Response, next: NextFunction) => {
    await updateUploadData(req, res, next)
  }).delete((Auth.validateSchema(DeleteUploadSchema)), async (req: Request, res: Response, next: NextFunction) => {
    await deleteUploadData(req, res, next)
  })
//Category routs'

router.route(apiEndPoint.category)
  .post((Auth.validateSchema(CreateCategorySchema)), async (req: Request, res: Response, next: NextFunction) => {
    await categoryData(req, res, next)
  }).get(async (req: Request, res: Response, next: NextFunction) => {
    await getCategorysData(req, res, next)
  })

router.route(apiEndPoint.categoryById)
  .get((Auth.validateSchema(GetCategoryByIdSchema)), async (req: Request, res: Response, next: NextFunction) => {
    await getCategorysDataById(req, res, next)
  }).put( async (req: Request, res: Response, next: NextFunction) => {
    await updateCategoryData(req, res, next)
  }).delete((Auth.validateSchema(DeleteCategorySchema)), async (req: Request, res: Response, next: NextFunction) => {
    await deleteCategoryData(req, res, next)
  })

export default router;
