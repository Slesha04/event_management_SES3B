import Cookies from 'js-cookie'

export const getToken = () => {
    return Cookies.get('auth-full-cookie');
};
export const getUserID = () => {
    return Cookies.get('userID');
};
export const getUserPlatformAPIPort = () => {
    return Cookies.get('user-platform-api-port');
};
export const getUserName = () => {
    return Cookies.get('userName');
};

export const getHeaderToken = () => {
    return 'Bearer ' + Cookies.get('auth-cookie');
};