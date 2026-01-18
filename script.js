// Chart.js for carbon footprint visualization
const chartCanvas = document.getElementById('carbonChart');

if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    
    // Sample data for the chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const carbonData = [4.8, 4.5, 4.3, 4.2, 4.1, 4.0, 3.9, 3.8, 4.0, 4.1, 4.2, 4.2];
    
    // Simple line chart implementation
    const drawChart = () => {
        const canvas = chartCanvas;
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = canvas.offsetHeight;
        const padding = 40;
        const chartWidth = width - padding * 2;
        const chartHeight = height - padding * 2;
        
        ctx.clearRect(0, 0, width, height);
        
        // Draw grid lines
        ctx.strokeStyle = '#E5E7EB';
        ctx.lineWidth = 1;
        
        // Horizontal grid lines
        const maxValue = Math.max(...carbonData) + 0.5;
        const minValue = Math.min(...carbonData) - 0.5;
        const range = maxValue - minValue;
        const steps = 5;
        
        for (let i = 0; i <= steps; i++) {
            const y = padding + (chartHeight / steps) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(width - padding, y);
            ctx.stroke();
            
            // Y-axis labels
            const value = maxValue - (range / steps) * i;
            ctx.fillStyle = '#6B7280';
            ctx.font = '12px Inter';
            ctx.textAlign = 'right';
            ctx.fillText(value.toFixed(1), padding - 10, y + 4);
        }
        
        // Vertical grid lines
        for (let i = 0; i < months.length; i++) {
            const x = padding + (chartWidth / (months.length - 1)) * i;
            ctx.beginPath();
            ctx.moveTo(x, padding);
            ctx.lineTo(x, height - padding);
            ctx.stroke();
            
            // X-axis labels
            ctx.fillStyle = '#6B7280';
            ctx.font = '12px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(months[i], x, height - padding + 20);
        }
        
        // Draw line
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < carbonData.length; i++) {
            const x = padding + (chartWidth / (carbonData.length - 1)) * i;
            const y = padding + chartHeight - ((carbonData[i] - minValue) / range) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = '#10B981';
        for (let i = 0; i < carbonData.length; i++) {
            const x = padding + (chartWidth / (carbonData.length - 1)) * i;
            const y = padding + chartHeight - ((carbonData[i] - minValue) / range) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
            
            // Draw white border
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    };
    
    // Initial draw
    drawChart();
    
    // Redraw on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(drawChart, 100);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'white';
        navMenu.style.padding = '20px';
        navMenu.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
}

// CTA button functionality
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const trackSection = document.querySelector('#track');
        if (trackSection) {
            trackSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Activity button functionality
document.querySelectorAll('.activity-button').forEach(button => {
    button.addEventListener('click', function() {
        const activityCard = this.closest('.activity-card');
        const activityName = activityCard.querySelector('h3').textContent;
        alert(`Add new entry for ${activityName}`);
        // In a real application, this would open a modal or form
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.stat-card, .activity-card, .insight-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
