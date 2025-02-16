export const getAdminDashboard = (req, res) => {
    // Example logic to send data to the view
    const dashboardData = {
        message: 'Welcome to the admin panel',
    };
    res.status(200).json(dashboardData);
};
