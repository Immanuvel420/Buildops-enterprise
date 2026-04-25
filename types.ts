
export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  WORKER = 'WORKER',
  ADMIN = 'ADMIN'
}

export type ViewState = 'LOGIN' | 'FLOOR_SELECTOR' | 'BLOCK_SELECTOR' | 'ISSUE_REPORT' | 'ISSUE_TRACKING' | 'DASHBOARD';

export interface Issue {
  id: string;
  floor: string;
  block: string;
  category: 'Electrical' | 'Water' | 'Plumbing' | 'Cleaning' | 'Structural';
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  imageUrl?: string;
  resolvedImageUrl?: string;
  logs?: string;
  timestamp: string;
}

export interface BuildingState {
  selectedFloor?: string;
  selectedBlock?: string;
}
