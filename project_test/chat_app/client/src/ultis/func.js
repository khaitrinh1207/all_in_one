export default function checkPageStatus(mess, user) {
    if (user !== localStorage.getItem('userName')) {
        if (!('Notification' in window)) {
            alert('this brower doesn\'t support system notifications!')
        } else if (Notification.permission === 'granted') {
            // sendNotification(mess, user)
            const notification = new Notification('New message from open chat', {
                icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
                body: `@${user}: ${mess}`
            });
            // notification.onclick = () => {
            //     window.open('10.1.40.47:3000/chat');
            // };
        } else if (Notification.permission
            !== 'denied') {
            Notification.requestPermission((permission => {
                if (permission === 'granted') {
                    sendNotification(mess, user)
                }
            }))
        }
    }
};

function sendNotification(mess, user) {
    document.onvisibilitychange = () => {
        if (document.hidden) {
            console.log(1);
            const notification = new Notification('New message from open chat', {
                icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
                body: `@${user}: ${mess}`
            });
            notification.onclick = () => {
                window.open('localhost:3000/chat');
            };
        }
    };
}