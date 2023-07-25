import { apiEndPoint } from '../core/route';
import {
  registerUserData,
  loginUserData,
  forgetPasswordData,
} from '../handler/auth';
import {
  getUsersList,
  getUserById,
  createUserData,
  updateUserData,
  deleteUserData,
} from '../handler/user';
import { NextFunction, Request, Response, Router } from 'express';
import { Auth } from '../utils/auth';
import {
  ForgetPasswordSchema,
  LoginSchema,
  RegisterSchema,
} from '../validation-schemas/auth.schema';
import {
  CreaterUserSchema,
  GetUserById,
  UpdateUserSchema,
} from '../validation-schemas/user.schema';
import {
  createRoleData,
  deleteRoleById,
  getRoleData,
  getRoleIdData,
  updateRoleById,
} from '../handler/role';
import {
  createPermissionData,
  deletePermissionData,
  getPermissionByIdData,
  getPermissionsData,
  updatePermissionData,
} from '../handler/permission';
import { ROLE } from '../utils/enum';

const router: Router = Router();

//user  routes
router.get(
  apiEndPoint.user,
  [Auth.is(ROLE.VIEW_USERS)],
  async (req: Request, res: Response, next: NextFunction) => {
    await getUsersList(req, res, next);
  }
);

router.get(
  apiEndPoint.userById,
  //FIXME:: Add validation here
  Auth.validateSchema(GetUserById),
  async (req, res, next) => {
    await getUserById(req, res, next);
  }
);

router.post(
  apiEndPoint.register,
  Auth.validateSchema(RegisterSchema),
  async (req, res, next) => {
    await registerUserData(req, res, next);
  }
);

router.post(
  apiEndPoint.login,
  Auth.validateSchema(LoginSchema),
  async (req, res, next) => {
    await loginUserData(req, res, next);
  }
);

router.post(
  apiEndPoint.forget,
  Auth.validateSchema(ForgetPasswordSchema),
  async (req, res, next) => {
    await forgetPasswordData(req, res, next);
  }
);

router.post(
  apiEndPoint.user,
  //FIXME:: Add validation here
  Auth.validateSchema(CreaterUserSchema),
  async (req, res, next) => {
    await createUserData(req, res, next);
  }
);

router.put(
  apiEndPoint.userById,
  //FIXME:: Add validation here
  Auth.validateSchema(UpdateUserSchema),
  async (req, res, next) => {
    await updateUserData(req, res, next);
  }
);

//FIXME:: Add validation here
router.delete(apiEndPoint.userById, async (req, res, next) => {
  await deleteUserData(req, res, next);
});

//role routes
router.get(
  apiEndPoint.role,
  [Auth.is(ROLE.VIEW_ROLES)],
  async (req: Request, res: Response, next: NextFunction) => {
    await getRoleData(req, res, next);
  }
);

router.get(apiEndPoint.roleById, async (req, res, next) => {
  await getRoleIdData(req, res, next);
});

router.post(apiEndPoint.role, async (req, res, next) => {
  await createRoleData(req, res, next);
});

router.put(apiEndPoint.roleById, async (req, res, next) => {
  await updateRoleById(req, res, next);
});

router.delete(apiEndPoint.roleById, async (req, res, next) => {
  await deleteRoleById(req, res, next);
});

//permission routes
router.get(apiEndPoint.permissions, async (req, res, next) => {
  await getPermissionsData(req, res, next);
});

router.get(apiEndPoint.permissionById, async (req, res, next) => {
  await getPermissionByIdData(req, res, next);
});

router.post(apiEndPoint.permissions, async (req, res, next) => {
  await createPermissionData(req, res, next);
});

router.put(apiEndPoint.permissionById, async (req, res, next) => {
  await updatePermissionData(req, res, next);
});

router.delete(apiEndPoint.permissionById, async (req, res, next) => {
  await deletePermissionData(req, res, next);
});

export default router;
