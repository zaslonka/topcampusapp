// Service to handle iframe height communication
export const sendHeightToParent = (height) => {
  // Check if we're in an iframe
  if (window.parent && window.parent !== window) {
    try {
      window.parent.postMessage(
        {
          type: "resize",
          height: height,
        },
        "*"
      ); // Use '*' or specify the parent domain for security
    } catch (error) {
      console.error("Error sending height to parent:", error);
    }
  }
};

export const observeHeightChanges = () => {
  // Function to calculate and send current height
  const sendCurrentHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    // Get the maximum height of the content
    const height = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );

    console.log("Sending height to parent:", height);
    sendHeightToParent(height);
  };

  // Send initial height after a small delay to ensure DOM is ready
  setTimeout(sendCurrentHeight, 100);

  // Create a ResizeObserver to watch for content changes
  if (window.ResizeObserver) {
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(sendCurrentHeight, 50); // Reduced delay for faster response
    });

    resizeObserver.observe(document.body);
    resizeObserver.observe(document.documentElement);

    // Also observe window resize events
    window.addEventListener("resize", () => {
      setTimeout(sendCurrentHeight, 50);
    });

    return resizeObserver;
  } else {
    // Fallback for browsers without ResizeObserver
    const interval = setInterval(sendCurrentHeight, 200); // More frequent checks

    // Also listen for window resize
    window.addEventListener("resize", sendCurrentHeight);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", sendCurrentHeight);
    };
  }
};
