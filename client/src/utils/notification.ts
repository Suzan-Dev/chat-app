/*
title - New message from Open Chat
icon - image URL from Flaticon
body - main content of the notification
*/
function sendNotification(user: string, message: string) {
  document.onvisibilitychange = () => {
    if (document.hidden) {
      const notification = new Notification('New message from Open Chat', {
        icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
        body: `@${user}: ${message}`,
      });

      notification.onclick = () =>
        function () {
          window.open('http://localhost:5173/chat');
        };
    }
  };
}

const checkPageStatus = (user: string, message: string) => {
  if (user !== localStorage.getItem('userName')) {
    if (!('Notification' in window)) {
      alert('This browser does not support system notifications!');
    } else if (Notification.permission === 'granted') {
      sendNotification(user, message);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          sendNotification(user, message);
        }
      });
    }
  }
};

export default checkPageStatus;
