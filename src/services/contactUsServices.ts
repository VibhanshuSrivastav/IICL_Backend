import { Request, Response } from 'express';
import { Contact } from '../models/contactUs.js';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export const contactUs =  async (req: Request, res: Response) => {
    const { name, email, phone, message }: ContactFormData = req.body;

    try {
        // Create a new contact document
        const newContact = new Contact({
            name,
            email,
            phone,
            message,
        });
        

        // Save the contact document to the database
        await newContact.save();
        res.status(200).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while submitting the contact form' });
    }
}

