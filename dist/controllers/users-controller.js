export const getUsersDashboard = (req, res) => {
    // Example logic to send data to the view
    const dashboardData = {
        message: 'Welcome to the Users Dashboard',
    };
    res.status(200).json(dashboardData);
};
