import FormData from '../models/FormData.js';
export const submitFranchiseForm = async (req, res) => {
    try {
        console.log('Received form data:', req.body);
        // Save data to MongoDB
        const newForm = new FormData(req.body);
        await newForm.save();
        res.status(201).json({ success: true, message: 'Form submitted successfully!' });
    }
    catch (error) {
        console.error('Error saving form:', error);
        res.status(500).json({ success: false, message: 'Failed to submit form' });
    }
};
