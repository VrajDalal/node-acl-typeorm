import { setSeederFactory } from "typeorm-extension";
import { User } from "../entity/user.entity";

export const UserFactory = setSeederFactory(User, async () => {
    const user = new User()
    user.name = "Dummy"
    user.email = "dummy@gmail.com"
    user.password = "dummy@123"
    user.mobile_no = 9658965895
    return user
})