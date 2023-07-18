import { apiEndPoint } from "../core/route"
import { registerUserData, loginUserData, forgetPasswordData } from "../handler/auth"
import { getUsersList, getUserById, createUserData, updateUserData, deleteUserData } from "../handler/user"
import { Router } from "express"
import { Auth } from "../utils/auth"
import { ForgetPasswordSchema, LoginSchema, RegisterSchema } from "../validation-schemas/auth.schema"
import { CreaterUserSchema } from "../validation-schemas/auth.schema"

const router: Router = Router()

router.get(apiEndPoint.user, async (req, res, next) => {
    await getUsersList(req, res, next)
})

router.get(apiEndPoint.userById, async (req, res, next) => {
    await getUserById(req, res, next)
})

router.post(apiEndPoint.register, Auth.validateSchema(RegisterSchema), async (req, res) => {
    await registerUserData(req, res)
})

router.post(apiEndPoint.login, Auth.validateSchema(LoginSchema), async (req, res) => {
    await loginUserData(req, res)
})

router.post(apiEndPoint.forget, Auth.validateSchema(ForgetPasswordSchema), async (req, res) => {
    await forgetPasswordData(req, res)
})

router.post(apiEndPoint.user, Auth.validateSchema(CreaterUserSchema), async (req, res, next) => {
    await createUserData(req, res, next)
})

router.put(apiEndPoint.userById, async (req, res, next) => {
    await updateUserData(req, res, next)
})

router.delete(apiEndPoint.userById, async (req, res, next) => {
    await deleteUserData(req, res, next)
})

export default router