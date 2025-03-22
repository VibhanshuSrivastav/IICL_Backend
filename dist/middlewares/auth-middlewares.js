export const authenticate = (req, res, next) => {
    console.log('Authentication middleware executed');
    next();
};
