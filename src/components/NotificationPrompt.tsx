import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Bell, X } from 'lucide-react';
import { requestNotificationPermission, checkNotificationPermission } from '@/lib/notifications';

export function NotificationPrompt() {
  const [show, setShow] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    // Check notification permission status
    const currentPermission = checkNotificationPermission();
    setPermission(currentPermission);

    // Show prompt after 5 seconds if permission not granted
    if (currentPermission === 'default') {
      const timer = setTimeout(() => {
        setShow(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleEnable = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      setPermission('granted');
      setShow(false);
      // Store preference in localStorage
      localStorage.setItem('notificationPromptShown', 'true');
    }
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem('notificationPromptShown', 'true');
  };

  if (permission !== 'default' || !show) {
    return null;
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 z-50 max-w-md"
        >
          <Card className="shadow-lg border-2 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm mb-1">Stay Updated!</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Enable notifications to get instant updates on your bookings, verifications, and hostel approvals.
                  </p>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleEnable} className="flex-1">
                      Enable Notifications
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleDismiss}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
