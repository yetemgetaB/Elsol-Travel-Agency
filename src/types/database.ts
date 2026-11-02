export type DestinationCategory = 'Domestic' | 'International' | 'Historical' | 'Adventure' | 'Cultural';

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  gallery?: string[];
  price: string;
  duration: string;
  category: DestinationCategory;
  highlights: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TravelDetails {
  title?: string;
  airline: string;
  departureDate: string;
  returnDate: string;
  departureTime: string;
  returnTime: string;
  baggage: string;
  phones?: string[];
  emails?: string[];
  price?: string;
  additionalInfo?: string;
}

export type BlogPostStatus = 'published' | 'draft';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  imageUrl: string;
  status: BlogPostStatus;
  travelDetails?: TravelDetails;
  telegramMessage?: string;
  telegramShared?: boolean;
  createdAt?: string;
  publishedAt?: string;
}

export type InquiryStatus = 'new' | 'in_review' | 'contacted' | 'booked' | 'archived';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  serviceType: string;
  destinationId?: string;
  destinationName?: string;
  status: InquiryStatus;
  createdAt: string;
}

export interface AgencySettings {
  agencyName: string;
  tagline: string;
  accreditation: string;
  establishedYear: number;
  emails: {
    primary: string;
    bookings?: string;
  };
  phones: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  businessHours: {
    monFri: string;
    saturday: string;
    sunday: string;
  };
  socials: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    twitter?: string;
    linkedin?: string;
  };
}
