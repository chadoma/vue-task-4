export const useValidator = () => {
    const isValidEmail = (email: string): boolean => {
        const emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\n/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
        return emailReg.test(email);
    };
    const isValidPassword = (password: string, confirmPassword: string): boolean => {
        return !(password === confirmPassword && password !== '' && password.length > 5);
    };
    const isValidPasswordLength = (password: string): boolean => {
        return password.length <= 5;
    };
    const isValidInteger = (pay: string): boolean => {
        const reg = new RegExp(/^[0-9]*$/);
        return reg.test(pay);
    };
    const isValidOverPay = (amount: string, myWallet: number): number | null => {
        const result = myWallet - parseInt(amount);
        if (result >= 0) {
            return result;
        } else {
            return null;
        }
    };
    return { isValidEmail, isValidPassword, isValidPasswordLength, isValidInteger, isValidOverPay };
};
