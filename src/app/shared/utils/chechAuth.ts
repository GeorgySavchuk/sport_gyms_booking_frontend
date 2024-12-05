export const checkAuth = () => {
    const authInfo = localStorage.getItem('authed');

    if (authInfo) {
        return JSON.parse(authInfo);
    }

    return false;
}