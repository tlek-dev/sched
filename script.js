// Initialize Material Design Components
document.addEventListener('DOMContentLoaded', function() {
    // Initialize ripple effect
    const ripples = [].map.call(document.querySelectorAll('.mdc-ripple-surface'), function(el) {
        return new mdc.ripple.MDCRipple(el);
    });

    // Initialize switches
    const switches = [].map.call(document.querySelectorAll('.mdc-switch'), function(el) {
        return new mdc.switchControl.MDCSwitch(el);
    });

    // Initialize theme switch
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-theme');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-theme'));
        });

        // Check for saved theme preference
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'true') {
            document.body.classList.add('dark-theme');
            themeToggle.checked = true;
        }
    }

    // Show active widget
    function showWidget(widgetId) {
        const widgets = document.querySelectorAll('.widget');
        widgets.forEach(widget => widget.classList.remove('active'));
        
        const activeWidget = document.getElementById(widgetId + '-widget');
        if (activeWidget) {
            activeWidget.classList.add('active');
        }

        // Update active state in sidebar
        const links = document.querySelectorAll('.sidebar-link');
        links.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`[onclick="showWidget('${widgetId}')"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Make showWidget available globally
    window.showWidget = showWidget;

    // Show default widget
    showWidget('home');
});

// Progress bar animation
function animateProgress(container, percentage) {
    const circle = new ProgressBar.Circle(container, {
        color: '#1abc9c',
        strokeWidth: 6,
        trailWidth: 2,
        duration: 1400,
        easing: 'easeInOut',
        text: {
            value: '0%',
            style: {
                color: '#2c3e50',
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: 0,
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                },
                'font-size': '14px',
                'font-weight': '500'
            }
        },
        step: function(state, circle) {
            circle.setText(Math.round(circle.value() * 100) + '%');
        }
    });

    circle.animate(percentage);
    return circle;
}
