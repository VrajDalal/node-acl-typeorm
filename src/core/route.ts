const apiEndPoint = {
    user: '/users', // get
    userById: '/users/:id', // get , // put // delete
    login: '/auth/local',// post
    register: '/auth/local/register',//post
    forget: '/forget'//post
}
export { apiEndPoint }