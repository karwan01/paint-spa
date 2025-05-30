export interface CompanyService {
  id: number;
  name: string;
  description: string;
  img: string;
}

export interface CompanyServicesProps {
  services?: CompanyService[];
}

export interface ServiceCardProps {
  service: CompanyService;
}
