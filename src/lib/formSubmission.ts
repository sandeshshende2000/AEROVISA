export const submitToFormspree = async (formData: FormData) => {
  const endpoint = "https://formspree.io/f/xkoqnwbq";
  
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return { success: false, error: data.error || "Something went wrong. Please try again or contact us via WhatsApp." };
    }
  } catch (error) {
    return { success: false, error: "Something went wrong. Please try again or contact us via WhatsApp." };
  }
};
