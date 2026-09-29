# BMW M3 E46 GTR — 3D Mechanical Deconstruction Showcase

An interactive, scroll-driven WebGL / Three.js 3D mechanical deconstruction showcase of the iconic **BMW M3 E46 GTR** (Need for Speed: Most Wanted legend).

Designed by **Hiten** · Done using **Gemini 3.8 Flash**.

Live Demo: [https://showcase.athergrid.dev](https://showcase.athergrid.dev)

---

## Highlights & Features

- **Kinematic Spatial Explosion**: Full mechanical deconstruction separating the outer body shell, carbon doors, vented hood, dual-element GT wing, cockpit roll cage, and 4 multi-layer wheel assemblies.
- **Multi-Layer Running Gear Decoupling**:
  - Red Brembo 6-piston monobloc racing calipers mounted to suspension uprights.
  - Cross-drilled carbon-ceramic ventilated brake discs.
  - 18-inch BBS forged magnesium center-lock wheels.
  - Michelin Pilot Sport vulcanized rubber tires.
- **Conditional Wheel Kinematics**: Wheels dynamically spin with ground travel speed while attached, and smoothly freeze rotation upon detachment for stationary inspection.
- **Cinematic Unbroken Camera Track**: Continuous Catmull-Rom steadycam glide through 6 curated editorial chapters with dynamic HUD positioning.
- **Responsive Studio Framing**: Auto-adapts to ultrawide desktops, laptops, tablets, Samsung Galaxy Fold (outer & inner screens), and mobile portrait/landscape orientations.
- **Dark / Light Studio Environments**: Real-time lighting toggle with Image-Based Lighting (IBL), tubelight accents, and soft contact shadows.
- **Zero-Waste Render Loop**: Smart settle loop halts GPU draws at idle (0% CPU/GPU usage when static).

---

## Tech Stack

- **Three.js** (WebGL 3D engine)
- **Vite** (Build system and dev server)
- **Vanilla JavaScript (ES Modules)**
- **Tailored GLTF Automotive Materials**: Custom physical materials featuring clearcoat, micro-roughness, metallic flakes, normal map tire treads, and anisotropic reflections.

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/Hiten-dev-ai/m3gtr-3d.git
cd m3gtr-3d

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 3D Asset Attribution

- 3D Model: [2005 BMW M3 E46 GTR - NFS Most Wanted](https://sketchfab.com/3d-models/2005-bmw-m3-e46-gtr-nfs-most-wanted-2999936a393340c0a389c6bd31961a63) by [Ddiaz Design](https://sketchfab.com/ddiaz-design), licensed under [CC BY-NC-SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/).
