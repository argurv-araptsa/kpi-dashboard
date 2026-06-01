# Enterprise KPI & Analytics Dashboard 

A lightweight, high-performance web application designed for enterprise data visualization and real-time business metrics tracking. 

This project operates entirely on client-side logic, demonstrating efficient state manipulation, third-party library integration, and native responsive design layout systems.

---

##  Features

* **Interactive Data Visualization:** Integrates Chart.js to render fluid, clean data graphs based on active business logic state.
* **Dynamic Chart Morphing:** Users can switch layout views in real time via the sidebar navigation (Overview -> Bar Chart, Revenue -> Pie Chart, Performance -> Line Chart).
* **Advanced Array Filtering:** Programmatic data filtering mechanism to isolate high-performing departments on the fly.
* **Flawless Responsiveness:** Engineered using CSS Grid (with `auto-fit` and `minmax` configurations) and specialized media queries, ensuring an optimal UI/UX across mobile devices, tablets, and wide desktop screens.
* **Custom Branding & UX:** Fully optimized using component-level CSS variables, featuring custom vector branding and high-resolution layout configurations.
* **Performance Focused:** Built using Vanilla JS, HTML5, and semantic CSS3, maintaining zero external dependencies aside from the visualization canvas layer.

---

##  Technical Concepts Demonstrated

* **Modern JS Array Processing:** Active utilization of functional JavaScript methods including `.map()`, `.filter()`, and `.reduce()` for localized computing and multi-card state orchestration (Revenue, Top Department, Active Projects).
* **State & View Synchronization:** Re-rendering and safe destruction of canvas components during dashboard state transitions to prevent layout memory leaks.
* **Component-Level CSS Isolation:** Fluid control structures managing aspect ratios, max dimensions, and typography hierarchy globally via CSS root variables.

---

##  File Structure

```text
├── index.html          # Application structure & CDN integration
├── style.css           # Responsive layout engine & Media Queries
├── app.js              # Business logic, state management & Chart configurations
├── bfavicon.svg   # Custom brand vector asset
└── README.md           # Documentation
```
##  Author
Argyro Araptsa Junior WordPress & Front-End Developer  
Portfolio: argiro-portfolio.netlify.app
