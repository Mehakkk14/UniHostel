// Browser Notification System

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const showNotification = (title: string, options?: NotificationOptions) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.ico',
      badge: '/favicon.ico',
      ...options
    });
  }
};

export const sendBookingNotification = (status: 'approved' | 'rejected', hostelName: string) => {
  if (status === 'approved') {
    showNotification('Booking Approved! 🎉', {
      body: `Your booking for ${hostelName} has been approved. You can now proceed with the check-in process.`,
      tag: 'booking-approved',
      requireInteraction: true
    });
  } else {
    showNotification('Booking Update', {
      body: `Your booking for ${hostelName} was not approved. Please contact support for more details.`,
      tag: 'booking-rejected',
      requireInteraction: true
    });
  }
};

export const sendVerificationNotification = (status: 'approved' | 'rejected') => {
  if (status === 'approved') {
    showNotification('Verification Complete! ✅', {
      body: 'Your student verification has been approved. You can now book hostels.',
      tag: 'verification-approved',
      requireInteraction: true
    });
  } else {
    showNotification('Verification Update', {
      body: 'Your verification was not approved. Please upload valid documents and try again.',
      tag: 'verification-rejected',
      requireInteraction: true
    });
  }
};

export const sendHostelApprovalNotification = (hostelName: string, approved: boolean) => {
  if (approved) {
    showNotification('Hostel Listed! 🏠', {
      body: `Your hostel "${hostelName}" has been approved and is now live on UniHostel.`,
      tag: 'hostel-approved',
      requireInteraction: true
    });
  } else {
    showNotification('Hostel Update', {
      body: `Your hostel "${hostelName}" listing was not approved. Please check your email for details.`,
      tag: 'hostel-rejected',
      requireInteraction: true
    });
  }
};

export const checkNotificationPermission = (): NotificationPermission => {
  if (!('Notification' in window)) {
    return 'denied';
  }
  return Notification.permission;
};
