import { apiClientTicket, ApiError } from './api-client';
import type {
  TicketPackage,
  CreateOrderRequest,
  CreateOrderResponse,
  OrderStatus,
  RetryPaymentRequest,
  RetryPaymentResponse,
  TicketApiResponse,
  UserTicketOrdersResponse,
} from '../../types/ticket.types';

/**
 * Ticket API Service
 * Handles all ticket purchase and order management API calls
 */

/**
 * Get all available ticket packages
 * @returns Promise with list of ticket packages
 */
export const getTicketPackages = async (): Promise<TicketPackage[]> => {
  try {
    const response = await apiClientTicket.get<TicketApiResponse<TicketPackage[]>>('/tickets');

    if (response.status === 'error' || !response.data) {
      throw new ApiError(
        response.error?.message || 'Failed to fetch ticket packages',
        response.statusCode,
        response.error?.code
      );
    }

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch ticket packages');
  }
};

/**
 * Create a new ticket order
 * @param ticketId - ID of the ticket package to purchase
 * @param quantity - Number of tickets (usually 1 for packages)
 * @returns Promise with order details and payment redirect URL
 */
export const createTicketOrder = async (
  ticketId: string,
  quantity: number = 1
): Promise<CreateOrderResponse> => {
  try {
    const payload: CreateOrderRequest = {
      ticketId,
      quantity,
    };

    const response = await apiClientTicket.post<TicketApiResponse<CreateOrderResponse>>(
      '/ticket-orders',
      payload
    );

    if (response.status === 'error' || !response.data) {
      throw new ApiError(
        response.error?.message || 'Failed to create ticket order',
        response.statusCode,
        response.error?.code
      );
    }

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to create ticket order');
  }
};

/**
 * Get order status by order ID
 * Used for polling payment verification
 * @param orderId - The order ID to check
 * @returns Promise with order status and transaction details
 */
export const getOrderStatus = async (orderId: string): Promise<OrderStatus> => {
  try {
    const response = await apiClientTicket.get<TicketApiResponse<OrderStatus>>(
      `/ticket-orders/${orderId}`
    );

    if (response.status === 'error' || !response.data) {
      throw new ApiError(
        response.error?.message || 'Failed to fetch order status',
        response.statusCode,
        response.error?.code
      );
    }

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch order status');
  }
};

/**
 * Retry payment for a failed order
 * @param orderId - The order ID to retry payment for
 * @returns Promise with new payment redirect URL
 */
export const retryPayment = async (orderId: string): Promise<RetryPaymentResponse> => {
  try {
    const payload: RetryPaymentRequest = {
      orderId,
    };

    const response = await apiClientTicket.post<TicketApiResponse<RetryPaymentResponse>>(
      '/ticket-orders/repay',
      payload
    );

    if (response.status === 'error' || !response.data) {
      throw new ApiError(
        response.error?.message || 'Failed to retry payment',
        response.statusCode,
        response.error?.code
      );
    }

    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to retry payment');
  }
};

/**
 * Get user's ticket orders
 * @returns Promise with list of user's orders
 */
export const getUserTicketOrders = async (): Promise<OrderStatus[]> => {
  try {
    const response = await apiClientTicket.get<TicketApiResponse<UserTicketOrdersResponse>>(
      '/ticket-orders'
    );

    if (response.status === 'error' || !response.data) {
      throw new ApiError(
        response.error?.message || 'Failed to fetch user orders',
        response.statusCode,
        response.error?.code
      );
    }

    return response.data.orders;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('Failed to fetch user orders');
  }
};
