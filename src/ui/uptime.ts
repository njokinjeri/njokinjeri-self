const uptimeEl =  document.getElementById("uptime-info") as HTMLParagraphElement;

const launchDate = new Date("2026-02-28");

function updateUptime():void { 
    const now = new Date();
    const diff = now.getTime() - launchDate.getTime();

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (uptimeEl) uptimeEl.textContent = `Uptime: ${days}d ${hours}h ${minutes}m`
}

setInterval(updateUptime, 60000);
updateUptime();