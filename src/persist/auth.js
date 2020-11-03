export const loginLe = token => {
    localStorage.setItem('token', token);
};

export const logoutLe = () => {
    localStorage.removeItem('token')

};