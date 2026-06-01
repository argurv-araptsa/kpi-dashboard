// Mock Εταιρικά Δεδομένα (Data Layer)
const departmentData = [
    { name: "Engineering", revenue: 85000, projects: 5 },
    { name: "Marketing", revenue: 42000, projects: 3 },
    { name: "Sales", revenue: 95000, projects: 4 },
    { name: "Legal", revenue: 15000, projects: 1 },
    { name: "HR", revenue: 20000, projects: 2 }
];

let currentChart = null;
let chartType = 'bar'; // Προεπιλεγμένο στυλ γραφήματος
let activeData = [...departmentData]; // Κρατάει τα τρέχοντα φιλτραρισμένα δεδομένα

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    updateDashboard(activeData);
    setupEventListeners();
});

// Συνάρτηση που υπολογίζει τα KPIs και κάνει render το γράφημα
function updateDashboard(data) {
    activeData = data;

    // 1. Υπολογισμός Total Revenue με Reduce
    const total = data.reduce((sum, dept) => sum + dept.revenue, 0);
    document.getElementById("total-revenue").textContent = `$${total.toLocaleString()}`;

    // 2. Εύρεση Top Department
    if (data.length > 0) {
        const topDept = data.reduce((max, dept) => dept.revenue > max.revenue ? dept : max, data[0]);
        document.getElementById("top-dept").textContent = topDept.name;
    } else {
        document.getElementById("top-dept").textContent = "-";
    }

    // 🚨 3. ΥΠΟΛΟΓΙΣΜΟΣ ACTIVE PROJECTS ΜΕ REDUCE (Αυτό έλειπε!)
    const totalProjects = data.reduce((sum, dept) => sum + dept.projects, 0);
    document.getElementById("active-projects").textContent = totalProjects;

    // 4. Render / Update του Chart.js
    renderChart(activeData);
}
function renderChart(data) {
    const ctx = document.getElementById('analyticsChart').getContext('2d');

    if (currentChart) {
        currentChart.destroy();
    }

    // Αν επιλέξουμε 'line', αλλάζουμε λίγο τα χρώματα για να φαίνεται όμορφο
    const bgColors = chartType === 'pie'
        ? ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
        : '#4f46e5';

    currentChart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: data.map(dept => dept.name),
            datasets: [{
                label: chartType === 'bar' || chartType === 'line' ? 'Revenue ($)' : 'Department Share',
                data: data.map(dept => dept.revenue),
                backgroundColor: bgColors,
                borderColor: chartType === 'line' ? '#4f46e5' : 'transparent',
                tension: 0.3,
                borderWidth: chartType === 'line' ? 3 : 0,
                borderRadius: chartType === 'bar' ? 4 : 0
            }]
        },
        options: {
            responsive: true,
            scales: chartType === 'pie' ? {} : { y: { beginAtZero: true } }
        }
    });
}

// Event Listeners για όλα τα κουμπιά
function setupEventListeners() {
    const btnAll = document.getElementById("btn-all");
    const btnHigh = document.getElementById("btn-high");

    // Επιλογή των κουμπιών από το Sidebar με βάση το κείμενό τους
    const sidebarLinks = document.querySelectorAll(".sidebar nav a");

    // Live Φιλτράρισμα Δεδομένων
    btnAll.addEventListener("click", () => {
        btnAll.classList.add("active");
        btnHigh.classList.remove("active");
        updateDashboard(departmentData);
    });

    btnHigh.addEventListener("click", () => {
        btnHigh.classList.add("active");
        btnAll.classList.remove("active");
        const filtered = departmentData.filter(dept => dept.revenue > 50000);
        updateDashboard(filtered);
    });

    // Live Αλλαγή View από το Sidebar (Bar / Pie / Line)
    sidebarLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // Αλλαγή active κλάσης στο μενού
            sidebarLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");

            // Έλεγχος ποιο κουμπί πατήθηκε
            const type = link.textContent.trim();
            if (type === "Overview") {
                chartType = 'bar';
            } else if (type === "Revenue") {
                chartType = 'pie';
            } else if (type === "Performance") {
                chartType = 'line';
            }

            // Ξανασχεδιάζουμε το γράφημα με το νέο στυλ
            renderChart(activeData);
        });
    });
}