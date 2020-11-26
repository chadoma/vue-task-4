export const useValidator = () => {
    const isValidEmail = (email: string): boolean => {
        const emailReg = /^[a-zA-Z0-9.!#$%&'*+\n/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailReg.test(email);
    };
    const isValidPassword = (password: string, confirmPassword: string): boolean => {
        return !(password === confirmPassword && password !== '' && password.length > 5);
    };
    return {isValidEmail, isValidPassword}
}
