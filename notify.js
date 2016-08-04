function notifyMe() {
    // 確認是否有通知功能
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    } 
    // 是否有通知權限
    // 有的話就創造一個notification
    else if (Notification.permission === "granted") {
        var notification = new Notification("這不是病毒！你中獎了！");
    }

    // 沒權限的話
    else if (Notification.permission !== 'denied') {
        // 去要求權限
        Notification.requestPermission(function (permission) {
            // 然後做一樣的事
            if (permission === "granted") {
                var notification = new Notification("這不是病毒！你中獎了！");
            }
        });
    }
    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}