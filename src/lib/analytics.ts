// Define the shape of the dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const gtmEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    console.log("GTM dataLayer found");
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  } else {
    console.warn("GTM dataLayer not found");
  }
};
