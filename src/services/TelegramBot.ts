import axios from 'axios';

interface TravelDetails {
  title: string;
  airline: string;
  departureDate: string;
  returnDate: string;
  departureTime: string;
  returnTime: string;
  baggage: string;
  phones: string[];
  emails: string[];
  price?: string;
  additionalInfo?: string;
}

export class TelegramBot {
  private readonly webhookUrl: string;
  private readonly token: string;
  private readonly channelId: string;
  private readonly isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.DEV || import.meta.env.MODE === 'development';
    // Webhook endpoint (recommended for production: Cloud Function or serverless proxy that keeps bot tokens secret)
    this.webhookUrl = import.meta.env.VITE_TELEGRAM_WEBHOOK_URL || "";
    // Direct bot token (dev only - client-side production tokens should never be exposed)
    this.token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "";
    this.channelId = import.meta.env.VITE_TELEGRAM_CHANNEL_ID || "";
  }

  async shareNewBlogPost(post: {
    title: string;
    excerpt: string;
    imageUrl: string;
    slug: string;
    author: string;
    travelDetails?: TravelDetails;
  }) {
    const baseUrl = window.location.origin;
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    
    let message: string;
    
    if (post.travelDetails) {
      const td = post.travelDetails;
      message = `ELSOL TRAVEL AGENCY\n` +
        `Your Gateway to Seamless Journeys\n\n` +
        `SPECIAL FLIGHT OFFER: ${td.airline}\n\n` +
        `TRAVEL DATES:\n` +
        `• Departure: ${td.departureDate} | ${td.departureTime}\n` +
        `• Return: ${td.returnDate} | ${td.returnTime}\n\n` +
        `PACKAGE INCLUDES:\n` +
        `• ${td.baggage} Baggage Allowance\n` +
        `• Expert Travel & Ticketing Assistance\n` +
        `• Flexible Booking Options\n\n` +
        `${td.price ? `Special Price: ${td.price}\n\n` : ''}` +
        `CONTACT US:\n` +
        `${td.phones.map(phone => `Phone: ${phone}`).join('\n')}\n` +
        `${td.emails.map(email => `Email: ${email}`).join('\n')}\n\n` +
        `WHY CHOOSE ELSOL TRAVEL?\n` +
        `• IATA Certified Travel Partner\n` +
        `• Best Available Airfare Guarantee\n` +
        `• 24/7 Dedicated Customer Support\n\n` +
        `${td.additionalInfo ? `Additional Information:\n${td.additionalInfo}\n\n` : ''}` +
        `Book / View Details:\n` +
        `${postUrl}`;
    } else {
      message = `ELSOL Travel Article: ${post.title}\n\n${post.excerpt}\n\nBy: ${post.author}\n\nRead more: ${postUrl}`;
    }

    // 1. If backend webhook is configured, dispatch securely via webhook
    if (this.webhookUrl) {
      try {
        await axios.post(this.webhookUrl, {
          channelId: this.channelId,
          message,
          imageUrl: post.imageUrl,
          postUrl,
        });
        return true;
      } catch (err) {
        console.error('Failed to post via Telegram webhook:', err);
        throw new Error('Telegram webhook delivery failed');
      }
    }

    // 2. If in dev mode with direct bot token provided, send via Telegram Bot API
    if (this.isDevelopment && this.token && this.channelId) {
      const apiUrl = `https://api.telegram.org/bot${this.token}`;
      try {
        if (post.imageUrl && !post.imageUrl.startsWith('data:image')) {
          await axios.post(`${apiUrl}/sendPhoto`, {
            chat_id: this.channelId,
            photo: post.imageUrl,
            caption: message.substring(0, 1024),
            parse_mode: 'HTML',
          });
        } else {
          await axios.post(`${apiUrl}/sendMessage`, {
            chat_id: this.channelId,
            text: message,
            parse_mode: 'HTML',
          });
        }
        return true;
      } catch (err) {
        console.warn('Dev direct bot delivery failed, falling back to share link:', err);
      }
    }

    // 3. Client-safe native Telegram share intent
    const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(message)}`;
    if (typeof window !== 'undefined') {
      window.open(telegramShareUrl, '_blank', 'noopener,noreferrer');
    }
    return true;
  }
}
