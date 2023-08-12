const apiEndPoint = {
    //USERS
    user: '/users', // get // post
    userById: '/users/:userId', // get , // put // delete
    //AUTH
    login: '/auth/local',// post
    register: '/auth/local/register',//post
    forget: '/forget',//post
    //ROLES
    role: '/roles',//post //get
    roleById: '/roles/:id', //get // put // delete
    //PERMISSION
    permissions: '/permissions',//post //get
    permissionById: '/permissions/:id', //get //put //delete
    //UPLOAD FILES
    upload: '/uploads',//post
    //CATEGORYS
    category: '/categorys',//post //get
    categoryById: '/categorys/:id'//get
}
export { apiEndPoint }