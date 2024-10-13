export interface Property {
  id: number;
  address: string;
  price: number;
  rent: number;
  livingArea: number;
  brokerCommission: number;
  targetYield: number;
  bankRate: number;
  marketAveragePrice: number;
  marketAverageRent: number;
  sellerId: number;
  documents: Document[];
}

export interface Seller {
  id: number;
  name: string;
  email: string;
  phone?: string;
  agencyId?: number;
}

export interface Agency {
  id: number;
  name: string;
  address: string;
}

export interface Document {
  id: number;
  name: string;
  fileUrl: string;
  propertyId: number;
}

export interface OfferPackage {
  property: Property;
  seller: Seller;
  agency?: Agency;
  documents: Document[];
  investorScenarios: InvestorScenario[];
}

export interface InvestorScenario {
  name: string;
  initialInvestment: number;
  annualReturn: number;
  roi: number;
}