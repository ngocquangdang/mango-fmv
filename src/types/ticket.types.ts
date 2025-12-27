// Ticket Package Types
export interface TicketPackage {
  id: string;
  name: string;
  quantity: number;
  price: number;
  currency: 'VND';
  status: 'ACTIVE' | 'INACTIVE';
  createdAt?: string;
  updatedAt?: string;
}

// Order Status Enums
export enum TicketOrderStatus {
  WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  INITIAL = 'INITIAL',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  CANCELLED = 'CANCELLED',
  PARTIALSUCCESS = 'PARTIALSUCCESS',
}

// Create Order Request
export interface CreateOrderRequest {
  ticketId: string;
  quantity: number;
}

// Create Order Response
export interface CreateOrderResponse {
  orderId: string;
  paymentOrderId: string;
  redirectURL: string;
  resultUrl: string;
  cancelUrl: string;
  errorUrl: string;
}

// Order Transaction
export interface OrderTransaction {
  id: string;
  orderId: string;
  paymentOrderId: string;
  paymentStatus: PaymentStatus;
  pgwResponseCode?: string;
  pgwResponseMessage?: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

// Order Status Response
export interface OrderStatus {
  id: string;
  shortOrderId: string;
  userId: string;
  ticketId: string;
  quantity: number;
  totalPayment: number;
  status: TicketOrderStatus;
  paidAt: string | null;
  createdAt: string;
  updatedAt: string;
  transaction?: OrderTransaction; // Optional - may not be included in response
  ticket?: TicketPackage;
  // Additional fields from API
  ticketName?: string;
  ticketPrice?: number;
  ticketQuantity?: number;
}

// Payment Callback Parameters (from Pay1 redirect)
export interface PaymentCallbackParams {
  status: 'success' | 'failed';
  orderId: string;
  shortOrderId: string;
  transactionStatus?: string;
  pgwResponseCode?: string;
  pgwResponseMessage?: string;
}

// Retry Payment Request
export interface RetryPaymentRequest {
  orderId: string;
}

// Retry Payment Response
export interface RetryPaymentResponse {
  redirectURL: string;
  resultUrl: string;
  cancelUrl: string;
  errorUrl: string;
}

// API Response Wrapper
export interface TicketApiResponse<T> {
  statusCode: number;
  data?: T;
  error?: {
    message: string;
    code: string;
  };
  status: 'success' | 'error';
}

// User Ticket Orders List
export interface UserTicketOrdersResponse {
  orders: OrderStatus[];
  total: number;
}
