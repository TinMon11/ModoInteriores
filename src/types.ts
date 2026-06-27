/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  category: 'residential' | 'commercial';
  location: string;
  image: string;
  description: string;
  year?: string;
  size?: string;
}

export interface ServiceStep {
  id: string;
  number: string;
  title: string;
  description: string;
  image?: string;
  details?: {
    title: string;
    description: string;
  }[];
}

export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  projectType: string;
  message?: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: string;
}
