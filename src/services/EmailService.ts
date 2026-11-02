import emailjs from '@emailjs/browser';

export class EmailService {
  private static readonly SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  private static readonly TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  private static readonly PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  private static readonly RECIPIENT_EMAIL = import.meta.env.VITE_RECIPIENT_EMAIL || 'info@elsoltravel.com';
  private static readonly IS_DEVELOPMENT = import.meta.env.MODE === 'development' || 
                                          import.meta.env.VITE_EMAILJS_SERVICE_ID === 'development';

  static validateConfig() {
    // Skip validation in development mode
    if (this.IS_DEVELOPMENT) {
      return true;
    }
    
    const missingVars = [];
    
    if (!this.SERVICE_ID) missingVars.push('VITE_EMAILJS_SERVICE_ID');
    if (!this.TEMPLATE_ID) missingVars.push('VITE_EMAILJS_TEMPLATE_ID');
    if (!this.PUBLIC_KEY) missingVars.push('VITE_EMAILJS_PUBLIC_KEY');
    
    if (missingVars.length > 0) {
      console.error(`Missing EmailJS configuration: ${missingVars.join(', ')}`);
      return false;
    }
    
    return true;
  }

  static async sendEmail(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    // In development mode, just log the email data and return success
    if (this.IS_DEVELOPMENT) {
      console.log('Development mode: Would send email:', {
        to: this.RECIPIENT_EMAIL,
        from: data.email,
        subject: data.subject,
        message: data.message
      });
      return { status: 200, text: 'OK (Development Mode)' };
    }
    
    // Validate configuration before attempting to send
    if (!this.validateConfig()) {
      throw new Error('EmailJS is not properly configured. Please check your environment variables.');
    }
    
    try {
      const templateParams = {
        to_email: this.RECIPIENT_EMAIL,
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'Not provided',
        subject: data.subject,
        message: data.message,
        // Add timestamp for tracking
        sent_at: new Date().toISOString(),
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      );

      // Log success for monitoring
      console.log('Email sent successfully:', response.status, response.text);
      
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Provide more helpful error message
      if (error instanceof Error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }
      
      throw new Error('Failed to send email due to an unknown error');
    }
  }
}
