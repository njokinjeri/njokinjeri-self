const timeEl = document.getElementById("time") as HTMLParagraphElement;
const periodEl = document.getElementById("period") as HTMLParagraphElement;
const secondsEl = document.getElementById("seconds") as HTMLParagraphElement;

function updateTime(): void {
    const now = new Date();

    const parts = new Intl.DateTimeFormat("en-KE", {
        timeZone: "Africa/Nairobi",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    }).formatToParts(now);

    const get = (type: string) => parts.find(p => p.type === type)?.value ?? "00";

    if (timeEl) timeEl.textContent = `${get("hour")}:${get("minute")}`;
    if (periodEl) periodEl.textContent = get("dayPeriod").toUpperCase();
    if (secondsEl) secondsEl.textContent = get("second");
}

setInterval(updateTime, 1000)
updateTime();