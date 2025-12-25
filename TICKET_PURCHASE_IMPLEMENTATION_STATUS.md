# Ticket Purchase & Payment Implementation Status

## Project Overview

**Feature**: Ticket Purchase with Pay1 Payment Gateway Integration
**Started**: 2025-12-25
**Current Phase**: Planning Complete - Ready for Implementation
**Target**: Simple ticket package purchase flow (10, 20, 30, 50, 100 tickets @ 100,000 VND each)

---

## Implementation Progress

### ✅ Phase 0: Planning & Analysis (COMPLETED - 2025-12-25)
- [x] Analyzed PAY1_INTEGRATION_GUIDE.md (Backend API specification)
- [x] Analyzed TICKET_ORDER_PAYMENT_IMPLEMENTATION_GUIDE.md (Reference implementation)
- [x] Reviewed current codebase structure
- [x] Created comprehensive implementation plan 
- [x] Identified differences from reference (no events, racekits, vouchers, registration)
- [x] Created this tracking document

---

### ✅ Phase 1: Backend Verification & Setup (COMPLETED - 2025-12-25)

**Status**: COMPLETED
**Priority**: HIGH (Must complete before frontend work)
**Time Spent**: 1 hour

#### Tasks
- [x] Verify backend server is running
- [x] Confirm API base URL (production/staging)
- [x] Test endpoint: `GET /api/v1/tickets` (list packages)
- [x] Test endpoint: `POST /api/v1/ticket-orders` (create order)
- [x] Test endpoint: `GET /api/v1/ticket-orders/:id` (get order status)
- [x] Test endpoint: `POST /api/v1/ticket-orders/repay` (retry payment)
- [x] Confirm X-Ticket authentication header works
- [x] Document actual API base URL and update apiClient
- [x] Create TypeScript types (ticket.types.ts)
- [x] Create API service layer (ticket-api.ts)

#### Results
✅ **Backend Server**: Running on `http://localhost:3001`
✅ **Authentication**: X-Ticket header working (`X-Ticket: 828AABDF9B063C96A37BEA070F9B75FC`)
✅ **API Client**: Created `apiClientTicket` in api-client.ts
✅ **Types**: Created comprehensive TypeScript types in `src/types/ticket.types.ts`
✅ **API Service**: Created ticket-api.ts with all CRUD operations

⚠️ **Backend Configuration Issue**:
All endpoints return error: `"Ticket provider URL is not configured" (ErrorCode00005)`
This indicates the backend needs environment variable configuration for the ticket provider URL.

#### Files Created/Modified
- ✅ `src/lib/api/api-client.ts` - Added apiClientTicket and X-Ticket header support
- ✅ `src/types/ticket.types.ts` - Complete TypeScript type definitions
- ✅ `src/lib/api/ticket-api.ts` - API service with all endpoints

#### Known Issues
1. **Backend Config**: Ticket provider URL environment variable not set
   - Error: "Ticket provider URL is not configured"
   - Impact: Cannot test endpoints until backend is configured
   - Action: Backend team needs to set environment variables

#### Notes
```
Backend Status:
- Server running on localhost:3001 ✅
- Authentication working (X-Ticket header) ✅
- Endpoints accessible but need configuration ⚠️
- Need backend team to configure ticket provider URL
```

---

### ⏳ Phase 2: Frontend State Management

**Status**: NOT STARTED
**Priority**: HIGH
**Estimated Time**: 3-4 hours
**Dependencies**: Phase 1 (API verification)

#### 2.1 Ticket Purchase Context
**File**: `src/contexts/ticket-purchase-context.tsx`

- [ ] Create TicketPurchaseContext interface
- [ ] Implement context provider with state
- [ ] Add `loadTicketPackages()` method
- [ ] Add `createOrder()` method with session persistence
- [ ] Add `clearSelection()` method
- [ ] Add error handling state
- [ ] Add loading state management
- [ ] Export useTicketPurchase hook
- [ ] Add TypeScript types
- [ ] Add JSDoc documentation

**State Shape**:
```typescript
{
  ticketPackages: TicketPackage[]
  selectedPackage: TicketPackage | null
  isLoading: boolean
  isCreatingOrder: boolean
  error: Error | null
  selectPackage: (packageId: string) => void
  createOrder: (packageId: string) => Promise<CreateOrderResponse>
  clearSelection: () => void
}
```

#### 2.2 Payment Verification Context
**File**: `src/contexts/payment-verification-context.tsx`

- [ ] Create PaymentVerificationContext interface
- [ ] Implement context provider with state
- [ ] Add `handlePaymentCallback()` method
- [ ] Add `pollTransactionStatus()` with retry logic
- [ ] Add `retryPayment()` method
- [ ] Add modal state management (success/failed/pending/error)
- [ ] Add 30-second polling with 5-second intervals
- [ ] Export usePaymentVerification hook
- [ ] Add TypeScript types
- [ ] Add JSDoc documentation

**State Shape**:
```typescript
{
  paymentStatus: 'success' | 'failed' | 'pending' | null
  orderId: string | null
  shortOrderId: string | null
  isVerifying: boolean
  verificationError: Error | null
  modalState: ModalState
  handlePaymentCallback: (params: PaymentCallbackParams) => Promise<void>
  retryPayment: (orderId: string) => Promise<void>
  closeModal: () => void
}
```

#### 2.3 Context Integration
- [ ] Register contexts in main App provider tree
- [ ] Ensure proper provider order
- [ ] Test context accessibility in components
- [ ] Add context provider tests (optional)

---

### ⏳ Phase 3: API Integration Layer

**Status**: NOT STARTED
**Priority**: HIGH
**Estimated Time**: 2-3 hours
**Dependencies**: Phase 1 (API verification)

#### Files to Create

**File**: `src/lib/api/ticket-api.ts`
- [ ] Create API service file
- [ ] Implement `getTicketPackages()` - GET /api/v1/tickets
- [ ] Implement `createTicketOrder()` - POST /api/v1/ticket-orders
- [ ] Implement `getOrderStatus()` - GET /api/v1/ticket-orders/:id
- [ ] Implement `retryPayment()` - POST /api/v1/ticket-orders/repay
- [ ] Add error handling with ApiError
- [ ] Add request/response logging (development)
- [ ] Add TypeScript types for all methods

**File**: `src/types/ticket.types.ts`
- [ ] Define `TicketPackage` interface
- [ ] Define `CreateOrderRequest` interface
- [ ] Define `CreateOrderResponse` interface
- [ ] Define `OrderStatus` interface
- [ ] Define `PaymentCallbackParams` interface
- [ ] Define `OrderTransaction` interface
- [ ] Define enums: `TicketOrderStatus`, `PaymentStatus`
- [ ] Export all types

#### API Client Configuration
- [ ] Update `src/lib/api/api-client.ts` with ticket service URL
- [ ] Create dedicated apiClient instance for ticket service
- [ ] Add X-Ticket header to authenticated requests
- [ ] Test API client with real endpoints

#### Type Definitions
```typescript
// Core interfaces needed
interface TicketPackage {
  id: string
  name: string
  quantity: number
  price: number
  currency: 'VND'
  status: 'ACTIVE' | 'INACTIVE'
}

interface CreateOrderResponse {
  orderId: string
  paymentOrderId: string
  redirectURL: string
  resultUrl: string
  cancelUrl: string
  errorUrl: string
}

interface OrderStatus {
  id: string
  shortOrderId: string
  status: 'WAITING_FOR_PAYMENT' | 'COMPLETED' | 'CANCELLED'
  totalPayment: number
  quantity: number
  paidAt: string | null
  transaction: {
    paymentStatus: 'INITIAL' | 'PENDING' | 'SUCCESS' | 'FAILURE' | 'CANCELLED'
  }
}
```

---

### ⏳ Phase 4: UI Components Update

**Status**: NOT STARTED
**Priority**: MEDIUM
**Estimated Time**: 4-5 hours
**Dependencies**: Phase 2 (Contexts), Phase 3 (API)

#### 4.1 Update Ticket Purchase Overlay
**File**: `src/feature-v2/pages/card-collection/components/ticket-purchase-overlay.tsx`

- [ ] Connect to TicketPurchaseContext
- [ ] Replace mock data with real API data
- [ ] Add loading state skeleton
- [ ] Implement package selection handler
- [ ] Add order creation flow
- [ ] Add session storage before redirect
- [ ] Implement redirect to Pay1
- [ ] Add error toast/modal
- [ ] Add loading spinner during order creation
- [ ] Add "Processing..." overlay
- [ ] Test package click flow
- [ ] Handle edge cases (network errors, etc.)

**Changes Required**:
```typescript
// Before: onClick={() => { /* handle purchase */ }}
// After:
onClick={async () => {
  try {
    await handlePackageClick(pkg)
  } catch (error) {
    showErrorToast(error.message)
  }
}}
```

#### 4.2 Payment Result Modals
**File**: `src/feature-v2/pages/card-collection/components/payment-result-modal.tsx`

- [ ] Create modal component file
- [ ] Implement Success modal variant
- [ ] Implement Failed modal variant (with retry)
- [ ] Implement Pending modal variant
- [ ] Implement Error modal variant
- [ ] Add modal animations
- [ ] Add proper icon states (check, alert, info)
- [ ] Add order ID display
- [ ] Add error code display (for failed)
- [ ] Add action buttons (Continue, Retry, Close)
- [ ] Connect to PaymentVerificationContext
- [ ] Style modals to match design system

**Modal Variants**:
- ✅ Success: "Thanh toán thành công" + ticket count
- ❌ Failed: "Thanh toán thất bại" + error code + Retry button
- ⏳ Pending: "Đơn hàng đang được xử lý"
- ⚠️ Error: Generic error with retry option

#### 4.3 Payment Loading Overlay
**File**: `src/feature-v2/pages/card-collection/components/payment-loading-overlay.tsx`

- [ ] Create loading overlay component
- [ ] Add spinner/loading animation
- [ ] Add "Đang xác thực thanh toán..." text
- [ ] Add progress indicator (optional)
- [ ] Show during payment verification
- [ ] Prevent user interaction while loading

#### 4.4 Component Integration
- [ ] Update card-collection main page to handle payment callbacks
- [ ] Add useEffect for URL query parameter detection
- [ ] Trigger payment verification on return from Pay1
- [ ] Update ticket balance display after success
- [ ] Clear session storage after completion
- [ ] Test full UI flow end-to-end

---

### ⏳ Phase 5: Payment Callback Handler

**Status**: NOT STARTED
**Priority**: HIGH
**Estimated Time**: 3-4 hours
**Dependencies**: Phase 2 (Contexts), Phase 3 (API)

#### 5.1 URL Query Parameter Handling
**File**: `src/feature-v2/pages/card-collection/index.tsx` (or main component)

- [ ] Add useEffect to detect URL parameters on mount
- [ ] Parse query parameters (status, orderId, shortOrderId, etc.)
- [ ] Validate required parameters exist
- [ ] Call payment verification context method
- [ ] Handle URL cleanup after processing
- [ ] Add error boundary for callback failures

**Query Parameters Expected**:
```
Success: ?status=success&orderId=xxx&shortOrderId=xxx&transactionStatus=SUCCESS&...
Failed: ?status=failed&orderId=xxx&shortOrderId=xxx&pgwResponseCode=xxx&...
```

#### 5.2 Payment Verification Flow
- [ ] Implement polling logic (5s intervals, max 30s)
- [ ] Call `getOrderStatus()` API repeatedly
- [ ] Handle SUCCESS status → Show success modal
- [ ] Handle PENDING status → Continue polling or show pending modal
- [ ] Handle FAILURE status → Show error modal
- [ ] Handle timeout (30s exceeded) → Show pending modal
- [ ] Stop polling on success/failure
- [ ] Clean up polling interval on unmount

#### 5.3 Success Flow Implementation
- [ ] Verify transaction status is SUCCESS
- [ ] Show success modal with order details
- [ ] Clear session storage
- [ ] Refresh user ticket balance
- [ ] Update UI to reflect new balance
- [ ] Provide "Continue" action
- [ ] Log success event (analytics)

#### 5.4 Failure Flow Implementation
- [ ] Parse error/failure reason
- [ ] Show failed modal with error code
- [ ] Provide "Retry Payment" button
- [ ] Provide "Cancel" button
- [ ] Implement retry handler (call repay API)
- [ ] Preserve order context for retry
- [ ] Log failure event (analytics)

#### 5.5 Edge Case Handling
- [ ] Handle missing query parameters
- [ ] Handle invalid orderId
- [ ] Handle network errors during polling
- [ ] Handle browser back button
- [ ] Handle page refresh during verification
- [ ] Handle duplicate callbacks (idempotency)
- [ ] Handle expired orders

---

### ⏳ Phase 6: Session Management

**Status**: NOT STARTED
**Priority**: MEDIUM
**Estimated Time**: 2 hours
**Dependencies**: Phase 2 (Contexts)

#### 6.1 Session Storage Utilities
**File**: `src/lib/utils/session-storage.ts`

- [ ] Create session storage constants
- [ ] Implement `savePendingOrder()` function
- [ ] Implement `getPendingOrder()` function
- [ ] Implement `clearPendingOrder()` function
- [ ] Add timestamp validation (24-hour expiry)
- [ ] Add JSON serialization error handling
- [ ] Add TypeScript types for stored data

**Session Keys**:
```typescript
const SESSION_KEYS = {
  PENDING_ORDER: 'mango_pending_ticket_order',
  ORDER_TIMESTAMP: 'mango_order_timestamp',
}
```

#### 6.2 Save Before Redirect
- [ ] Save order data before Pay1 redirect
- [ ] Include: packageId, quantity, orderId, timestamp
- [ ] Test data persistence across redirect

#### 6.3 Restore After Return
- [ ] Check for pending order on page load
- [ ] Validate timestamp (not expired)
- [ ] Restore order context if valid
- [ ] Clear expired orders automatically

#### 6.4 Clear on Completion
- [ ] Clear on successful payment
- [ ] Clear on cancelled payment
- [ ] Clear on user manual cancel
- [ ] Clear on timeout/expiry

---

### ⏳ Phase 7: Error Handling & UX Polish

**Status**: NOT STARTED
**Priority**: MEDIUM
**Estimated Time**: 2-3 hours
**Dependencies**: All previous phases

#### 7.1 Error Code Mapping
**File**: `src/lib/constants/error-messages.ts`

- [ ] Define error message constants
- [ ] Map backend error codes to user messages (Vietnamese)
- [ ] Add generic fallback message
- [ ] Add error severity levels

**Error Messages**:
```typescript
const ERROR_MESSAGES = {
  TICKET_OUT_OF_STOCK: 'Gói vé đã hết. Vui lòng chọn gói khác.',
  PRICE_MISMATCH: 'Giá vé đã thay đổi. Vui lòng thử lại.',
  PAYMENT_FAILED: 'Thanh toán thất bại. Vui lòng thử lại.',
  INVALID_SIGNATURE: 'Xác thực thanh toán thất bại.',
  ORDER_CANCELLED: 'Đơn hàng đã bị hủy.',
  NETWORK_ERROR: 'Lỗi kết nối. Vui lòng kiểm tra mạng.',
  DEFAULT: 'Có lỗi xảy ra. Vui lòng thử lại sau.',
}
```

#### 7.2 Loading States
- [ ] Add skeleton loader for ticket packages
- [ ] Add spinner for order creation
- [ ] Add progress indicator for payment verification
- [ ] Add loading state for retry button
- [ ] Ensure all async actions have loading feedback

#### 7.3 User Feedback
- [ ] Implement toast notifications for quick feedback
- [ ] Add success/error animations
- [ ] Add haptic feedback (mobile)
- [ ] Add confirmation dialogs for critical actions
- [ ] Add helpful error messages with next steps

#### 7.4 Accessibility
- [ ] Add ARIA labels to modals
- [ ] Add keyboard navigation support
- [ ] Add screen reader announcements
- [ ] Test with keyboard-only navigation
- [ ] Add focus management for modals

#### 7.5 Performance
- [ ] Optimize re-renders in contexts
- [ ] Add debouncing for API calls
- [ ] Implement request caching where appropriate
- [ ] Lazy load payment modal components
- [ ] Monitor bundle size impact

---

### ⏳ Phase 8: Testing & Integration

**Status**: NOT STARTED
**Priority**: HIGH
**Estimated Time**: 4-5 hours
**Dependencies**: All previous phases

#### 8.1 Unit Tests (Optional but Recommended)
- [ ] Test ticket-api.ts functions
- [ ] Test session storage utilities
- [ ] Test error message mapping
- [ ] Test context state transitions
- [ ] Add test coverage report

#### 8.2 Integration Testing

**Happy Path**:
- [ ] Load ticket packages successfully
- [ ] Select a package
- [ ] Create order successfully
- [ ] Redirect to Pay1
- [ ] Simulate successful payment return
- [ ] Verify polling starts
- [ ] Verify success modal shows
- [ ] Verify ticket balance updates
- [ ] Verify session cleared

**Error Scenarios**:
- [ ] Test network failure during package load
- [ ] Test order creation failure
- [ ] Test payment failure return
- [ ] Test payment timeout (>30s)
- [ ] Test retry payment flow
- [ ] Test invalid query parameters
- [ ] Test expired session

**Edge Cases**:
- [ ] Test browser back button during payment
- [ ] Test page refresh during verification
- [ ] Test multiple browser tabs
- [ ] Test closing browser during payment
- [ ] Test duplicate callback handling
- [ ] Test order expiry

#### 8.3 Manual Testing Checklist
- [ ] Test on Chrome desktop
- [ ] Test on Safari desktop
- [ ] Test on Chrome mobile
- [ ] Test on Safari iOS
- [ ] Test on slow network (3G simulation)
- [ ] Test with network offline → online transition
- [ ] Test with different screen sizes
- [ ] Test with different ticket packages

#### 8.4 Pay1 Integration Testing
- [ ] Test with Pay1 sandbox environment
- [ ] Test all payment methods (ATM, Credit, E-Wallet)
- [ ] Test successful payment flow
- [ ] Test cancelled payment
- [ ] Test failed payment
- [ ] Test timeout scenario
- [ ] Verify IPN callback is received
- [ ] Verify signature verification works

#### 8.5 Security Testing
- [ ] Verify X-Ticket header is sent
- [ ] Verify backend validates signatures
- [ ] Test with tampered query parameters
- [ ] Verify amount validation on backend
- [ ] Test for XSS vulnerabilities
- [ ] Test for CSRF protection
- [ ] Verify encrypted ticket balance

#### 8.6 Performance Testing
- [ ] Measure page load time with packages
- [ ] Measure order creation response time
- [ ] Measure polling overhead
- [ ] Check for memory leaks during polling
- [ ] Monitor network requests count
- [ ] Test with slow API responses

---

## Current Blockers

### High Priority
1. **Backend Access** - Need URL and credentials for ticket API
2. **Pay1 Credentials** - Need sandbox/production credentials for testing
3. **Database Access** - Need to verify ticket packages are seeded

### Medium Priority
1. **Design Confirmation** - Need mockups for payment modals
2. **User Balance Display** - Where should updated ticket count appear in UI?
3. **Analytics** - What events should be tracked?

### Low Priority
1. **Error Messages** - Need final Vietnamese translations approved
2. **Loading Animations** - Need design assets for loaders

---

## API Endpoints Reference

### Ticket Service (Backend)
```
GET    /api/v1/tickets                                    - List available ticket packages
POST   /api/v1/ticket-orders                              - Create order & get Pay1 URL
GET    /api/v1/ticket-orders/:id                          - Get order status
GET    /api/v1/ticket-orders                              - Get user's orders
POST   /api/v1/ticket-orders/repay                        - Retry payment
POST   /api/v1/ipn/pay1/ticket                            - IPN webhook (backend only)
PUT    /api/v1/ticket-orders/transactions/:id/status      - Update transaction status (admin)
```

### Authentication
- Header: `X-Ticket: {token}` or `Authorization: Bearer {token}`
- Token source: Session storage / Cookie

---

## File Structure

```
src/
├── contexts/
│   ├── ticket-purchase-context.tsx          [NEW] ⏳
│   └── payment-verification-context.tsx     [NEW] ⏳
│
├── lib/
│   ├── api/
│   │   ├── api-client.ts                    [UPDATE] ⏳
│   │   └── ticket-api.ts                    [NEW] ⏳
│   ├── utils/
│   │   └── session-storage.ts               [NEW] ⏳
│   └── constants/
│       └── error-messages.ts                [NEW] ⏳
│
├── types/
│   └── ticket.types.ts                      [NEW] ⏳
│
└── feature-v2/
    └── pages/
        └── card-collection/
            ├── components/
            │   ├── ticket-purchase-overlay.tsx         [UPDATE] ⏳
            │   ├── payment-result-modal.tsx            [NEW] ⏳
            │   └── payment-loading-overlay.tsx         [NEW] ⏳
            ├── hooks/
            │   ├── use-ticket-purchase.ts              [NEW] ⏳
            │   └── use-payment-verification.ts         [NEW] ⏳
            └── index.tsx                               [UPDATE] ⏳
```

**Legend**:
- ✅ Completed
- ⏳ Pending
- 🔄 In Progress
- ❌ Blocked

---

## Notes & Decisions

### 2025-12-25
- **Decision**: Implement simple flow without events, racekits, vouchers, or registration
- **Decision**: Use polling (30s max, 5s intervals) instead of webhook-only for immediate feedback
- **Decision**: Store pending order in sessionStorage to survive Pay1 redirect
- **Note**: Backend already implements IPN callback for reliable payment confirmation
- **Note**: Ticket balance is encrypted (AES-256-CBC) in database, decrypted by backend API

---

## Success Criteria

Implementation is complete when:
1. ✅ User can view available ticket packages
2. ✅ User can select and purchase a package
3. ✅ Order is created and Pay1 redirect works
4. ✅ Payment success/failure is detected and verified
5. ✅ User ticket balance updates on successful payment
6. ✅ Failed payments show retry option
7. ✅ Retry payment works without recreating order
8. ✅ Session persists across Pay1 redirect
9. ✅ All error scenarios handled gracefully
10. ✅ UI is responsive and accessible
11. ✅ Security best practices followed
12. ✅ Code is tested and documented

---

## Next Steps

1. **Immediate**: Verify backend is deployed and accessible (Phase 1)
2. **Then**: Implement API integration layer (Phase 3)
3. **Then**: Implement contexts (Phase 2)
4. **Then**: Update UI components (Phase 4)
5. **Then**: Implement payment callbacks (Phase 5)
6. **Then**: Add session management (Phase 6)
7. **Then**: Polish UX and error handling (Phase 7)
8. **Finally**: Comprehensive testing (Phase 8)

---

**Last Updated**: 2025-12-25
**Status**: Planning Complete - Ready to Start Implementation
**Next Phase**: Phase 1 - Backend Verification & Setup
