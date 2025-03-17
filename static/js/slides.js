let rolling = [
    {
        "topic_id": "topic1",
        "desc": "§ SQL Injection is one of the most common vulnerabilities in web applications, where an attacker inserts or manipulates SQL queries to execute arbitrary SQL code on the database. This can lead to unauthorized data access, data manipulation, or even complete compromise of the database.<br><br>§ A DDoS attack occurs when a network or website is overwhelmed with massive traffic, making it slow or completely unavailable. These attacks are often launched using a botnet of compromised devices, and their goal is to exhaust resources like bandwidth, memory, or CPU, effectively shutting down a service.<br><br>§ Bad requests often refer to poorly structured HTTP requests that can lead to system vulnerabilities or downtime. These can be attempts to exploit flaws in input handling, misconfigurations, or poorly implemented APIs. Attackers may send malformed requests to exploit weaknesses.        "
    },
    {
        "topic_id": "topic2",
        "desc": "§ Sharing passwords can be a risky practice, but it can be necessary in certain situations, such as when you need to grant access to a trusted family member, like a sibling, or to someone for a specific purpose. However, it's crucial to be mindful of security when doing so."
    },
    {
        "topic_id": "topic3",
        "desc": "§ Password Leak Detection scans common password leak sites to check if your passwords, or those of your users, have been exposed in known data breaches. This process involves comparing your credentials against public breach databases to identify if they have been compromised.<br><br>§ While password leak detection is a useful tool, it does not guarantee that you are safe. New breaches occur regularly, and your data might be exposed before it appears in breach databases. Additionally, some leaks are not publicly disclosed, meaning they may not show up in a scan. It's crucial to continuously monitor for leaks and implement other security practices, such as strong, unique passwords and two-factor authentication (2FA), to better protect your accounts and users."
    }
];

let items = {};
items.leftArrow = document.getElementById("left-arrow");
items.rightArrow = document.getElementById("right-arrow");
items.desc = document.getElementById("item-desc");
items.onCooldown = false;
items.utilNextChange = 0;

let cIndex = -1;

function update() {
    Array.from(document.getElementsByClassName("topic")).forEach((item) => {
        const lineElement = item.querySelector(".line"); // Selects the child with class "line"
        if (lineElement) {
            lineElement.classList.remove("line");
        }
    });

    const itemInfo = rolling[cIndex];
    const topic = document.getElementById(itemInfo.topic_id);
    if (topic == null) {
        console.error(`Invalid topic id. Recived: ${itemInfo.topic_id}`);
        return;
    }

    const lineElement = topic.querySelector("#line");

    if (lineElement) {
        lineElement.classList.add("line");
    } else {
        console.warn(`No element with class 'line' found within topic: ${itemInfo.topic_id}`);
    }
    items.desc.style.opacity = 0;
    items.onCooldown = true;
    items.utilNextChange = 0;
    setTimeout(() => {
        items.desc.innerHTML = itemInfo.desc;
        items.desc.style.opacity = 1;
        items.onCooldown = false;
    }, 300);
}

function jumpTo(index) {
    if (items.onCooldown) {
        return;
    }

    cIndex = index;
    if (cIndex >= rolling.length) {
        cIndex = 0;
    }

    update();
}

function next() {
    if (items.onCooldown) {
        return;
    }
    cIndex++;
    if (cIndex >= rolling.length) {
        cIndex = 0;
    }

    update();
}

function previus() {
    if (items.onCooldown) {
        return;
    }
    cIndex--;
    if (cIndex < 0) {
        cIndex = rolling.length-1;
    }

    update();
}

next()

function loop() {
    setTimeout(() => {
        items.utilNextChange++;
        if (items.utilNextChange >= 5) {
            next();
        }
        loop();
    }, 1000);
}

loop();