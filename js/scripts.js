'use strict';

// tab functionality
(function () {
    const tabs = document.querySelectorAll(".navigation li");
    const sections = ["js", "dom", "projects"].map(id => document.querySelector(`main > #${id}`));

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const targetId = tab.id;

            sections.forEach(section => {
                section.style.display = section.id === targetId ? "block" : "none";
            });
        });
    });

    sections.forEach((section, index) => {
        section.style.display = index === 0 ? "block" : "none";
    });
})();

// canvas animation
(function () {
    const canvas = document.getElementById("space");
    const ctx = canvas.getContext("2d");
    let w, h;
    let stars = [];
    const starCount = 300;

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    for (let i = 0; i < starCount; i++) {
        stars.push({
            radius: Math.random() * (w / 2 - 120) + 120,
            angle: Math.random() * 2 * Math.PI,
            speed: (Math.random() * 0.0005) + 0.0002,
            size: Math.random() * 1.2 + 0.6,
            brightness: Math.random() * 0.6 + 0.4
        });
    }

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
        ctx.fillRect(0, 0, w, h);

        const centerX = w / 2;
        const centerY = h / 2;

        ctx.fillStyle = "#0ff";
        ctx.shadowColor = "cyan";

        for (let i = 0; i < starCount; i++) {
            const star = stars[i];
            star.angle += star.speed;

            const x = centerX + Math.cos(star.angle) * star.radius;
            const y = centerY + Math.sin(star.angle) * star.radius;

            ctx.beginPath();
            ctx.shadowBlur = 6 * star.brightness;
            ctx.globalAlpha = star.brightness;
            ctx.arc(x, y, star.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        }

        requestAnimationFrame(draw);
    }

    draw();
})();

// popup feature
(function () {
    const headings = document.querySelectorAll('.topic-heading');
    const modal = document.getElementById('descriptionModal');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = modal.querySelector('.close-btn');

    headings.forEach(heading => {
        heading.addEventListener('click', () => {
            const description = heading.nextElementSibling;
            if (description) {
                modalBody.innerHTML = description.innerHTML;
                modal.style.display = 'flex';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.style.display = 'none';
    });
})();