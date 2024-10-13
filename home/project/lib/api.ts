import { Property, Seller, Agency, Document, OfferPackage, InvestorScenario, Contact } from './types';

// Mock data
const properties: Property[] = [
  {
    id: 1,
    address: "Musterstraße 1, 12345 Berlin",
    price: 500000,
    rent: 1500,
    livingArea: 100,
    brokerCommission: 15000,
    targetYield: 4,
    bankRate: 2.5,
    marketAveragePrice: 550000,
    marketAverageRent: 1600,
    sellerId: 1,
    documents: [],
  },
  // Add more mock properties as needed
];

const sellers: Seller[] = [
  {
    id: 1,
    name: "Max Mustermann",
    email: "max@example.com",
    phone: "+49 123 4567890",
    agencyId: 1,
  },
  // Add more mock sellers as needed
];

const agencies: Agency[] = [
  {
    id: 1,
    name: "Immobilien GmbH",
    address: "Hauptstraße 1, 10115 Berlin",
  },
  // Add more mock agencies as needed
];

const documents: Document[] = [
  {
    id: 1,
    name: "Grundriss",
    fileUrl: "https://example.com/grundriss.pdf",
    propertyId: 1,
  },
  // Add more mock documents as needed
];

const contacts: Contact[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+49 987 6543210",
  },
  // Add more mock contacts as needed
];

// API functions
export async function fetchProperties(): Promise<Property[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return properties;
}

export async function createProperty(data: Omit<Property, 'id' | 'documents'>): Promise<Property> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newProperty: Property = {
    ...data,
    id: properties.length + 1,
    documents: [],
    marketAveragePrice: 0,
    marketAverageRent: 0,
    sellerId: 1, // Assign a default seller ID
  };
  properties.push(newProperty);
  return newProperty;
}

export async function fetchSellers(): Promise<Seller[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return sellers;
}

export async function fetchContacts(): Promise<Contact[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return contacts;
}

export async function createContact(data: Omit<Contact, 'id'>): Promise<Contact> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newContact: Contact = {
    ...data,
    id: contacts.length + 1,
  };
  contacts.push(newContact);
  return newContact;
}

export async function fetchDocuments(): Promise<Document[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return documents;
}

export async function createDocument(data: Omit<Document, 'id'>): Promise<Document> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const newDocument: Document = {
    ...data,
    id: documents.length + 1,
  };
  documents.push(newDocument);
  return newDocument;
}

export async function generateOfferPackage(propertyId: number): Promise<OfferPackage | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const property = properties.find(p => p.id === propertyId);
  if (!property) return null;

  const seller = sellers.find(s => s.id === property.sellerId);
  if (!seller) return null;

  const agency = seller.agencyId ? agencies.find(a => a.id === seller.agencyId) : undefined;
  const propertyDocuments = documents.filter(d => d.propertyId === propertyId);

  const investorScenarios: InvestorScenario[] = [
    {
      name: "Konservativ",
      initialInvestment: property.price,
      annualReturn: property.rent * 12,
      roi: (property.rent * 12 / property.price) * 100,
    },
    {
      name: "Optimistisch",
      initialInvestment: property.price,
      annualReturn: property.rent * 13,
      roi: (property.rent * 13 / property.price) * 100,
    },
  ];

  return {
    property,
    seller,
    agency,
    documents: propertyDocuments,
    investorScenarios,
  };
}