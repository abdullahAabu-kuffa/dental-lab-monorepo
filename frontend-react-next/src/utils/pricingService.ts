"use client";

import { NEW_ORDER_FORM_FIELDS } from '@/config/UserData/formFieldsData';
// Extract service prices from form fields data
const extractServicePrices = () => {
  const prices: Record<string, number> = {};
  NEW_ORDER_FORM_FIELDS.forEach(field => {
    if (field.type === 'checkbox' && 'price' in field) {
      prices[field.id] = (field as { price?: number }).price || 0;
    }
  });

  return prices;
};
// Centralized service pricing configuration (extracted from form fields)
export const SERVICE_PRICES: Record<string, number> = extractServicePrices();

// Calculate selected services from form data
export const calculateSelectedServices = (formData: Record<string, unknown>) => {
  const selectedServices: Array<{ label: string; price: number }> = [];
  let totalAmount = 0;

  // Filter selected services and build items array
  Object.entries(formData).forEach(([key, value]) => {
    if (value === true && SERVICE_PRICES[key]) {
      selectedServices.push({
        label: key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
        price: SERVICE_PRICES[key]
      });
      totalAmount += SERVICE_PRICES[key];
    }
  });

  return { selectedServices, totalAmount };
};

// Get service price by ID
export const getServicePrice = (serviceId: string): number => {
  return SERVICE_PRICES[serviceId] || 0;
};

// Check if service exists
export const hasService = (serviceId: string): boolean => {
  return serviceId in SERVICE_PRICES;
};

// Get all service IDs
export const getAllServiceIds = (): string[] => {
  return Object.keys(SERVICE_PRICES);
};

// Get services with their labels from form fields
export const getServicesWithLabels = () => {
  return NEW_ORDER_FORM_FIELDS
    .filter(field => field.type === 'checkbox' && SERVICE_PRICES[field.id])
    .map(field => ({
      id: field.id,
      label: field.label,
      price: SERVICE_PRICES[field.id]
    }));
};