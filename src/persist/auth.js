export const loginLe = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user))
};

export const logoutLe = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')

};
