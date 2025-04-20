import { Request, Response } from 'express';
import { Contact } from '../models/contactUs.js';

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export const contactUs = async (req: Request, res: Response) => {
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

export const getContactUs = async (req: Request, res: Response) => {
    try {
        // Retrieve all contact documents from the database
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving contact forms' });
    }
}

export const deleteContact = async (req: Request, res: Response):Promise<void>  => {
    const { id } = req.params;
  
    try {
      const deleted = await Contact.findByIdAndDelete(id);
      if (!deleted) {
          res.status(404).json({ message: "Contact not found." });
          return 
      }
  
      res.status(200).json({ message: "Contact enquiry deleted successfully." });
    } catch (error) {
      console.error("Error deleting contact:", error);
      res.status(500).json({ message: "An error occurred while deleting the contact enquiry." });
    }
  };

