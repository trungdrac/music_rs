export default function toast({
  title = "",
  message = "",
  type = "info",
  duration = 3000,
}) {
  const main = document.getElementById("my-toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(() => {
      main.removeChild(toast);
    }, duration + 1000); // 1000: fadeOut time

    // Remove toast when clicked
    toast.onclick = (e) => {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("my-toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                      <div class="toast__content">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <span class="toast__close">&times;</span>
                  `;
    main.appendChild(toast);
  }
}
