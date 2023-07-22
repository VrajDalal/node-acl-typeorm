const apiEndPoint = {
    user: '/users', // get // post
    userById: '/users/:id', // get , // put // delete
    login: '/auth/local',// post
    register: '/auth/local/register',//post
    forget: '/forget',//post
    role: '/roles',//post //get
    roleById: '/roles/:id', //get // put // delete
    permissions: '/permissions',//post //get
    permissionById: '/permissions/:id' //get //put //delete
}
export { apiEndPoint }