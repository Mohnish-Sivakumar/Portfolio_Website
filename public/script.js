const route = location.pathname.replace(/\/$/, "") || "/";
const projectIds = ["renovate", "ftc", "kibo", "neural", "axol"];
const outreachIds = ["robotics-outreach", "rewired", "ai-curriculum"];

function mediaFigure(src, alt, caption) {
  const figure = document.createElement("figure");
  figure.className = "project-media";
  figure.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy"><figcaption>${caption}</figcaption>`;
  return figure;
}

function mediaVideo(src, caption) {
  const figure = document.createElement("figure");
  figure.className = "project-media project-video";
  figure.innerHTML = `<video controls playsinline preload="metadata"><source src="${src}" type="video/x-m4v">Your browser does not support embedded video.</video><figcaption>${caption}</figcaption>`;
  return figure;
}

function hydrateRenovate(entry) {
  const sections = [...entry.querySelectorAll(".case-study section")];
  const findSection = (name) => sections.find((section) => section.querySelector("h3")?.textContent.includes(name));

  const status = findSection("Status Light PCB");
  const statusGallery = status?.querySelector(".media-grid");
  if (statusGallery) {
    statusGallery.classList.add("pcb-gallery");
    statusGallery.replaceChildren(
      mediaFigure(
        "/assets/renovate/status-light-pcb-layout.jpg",
        "KiCad board layout showing routed power, flyback, relay, color output, and Arduino connections",
        "KiCad PCB layout with four relay channels, 24V input, flyback protection, and Arduino control."
      ),
      mediaFigure(
        "/assets/renovate/status-light-pcb-render.jpg",
        "KiCad 3D render of the four-color status controller board",
        "3D board render used to review relay, terminal-block, and mounting-hole placement."
      )
    );
    const prototype = mediaFigure(
      "/assets/renovate/status-light-relay-prototype.jpg",
      "Early four-relay status-light prototype wired inside a white enclosure",
      "Physical four-relay prototype used to validate the control concept."
    );
    prototype.classList.add("pcb-prototype");
    status.querySelector("p")?.after(prototype);
  }

  const power = findSection("Power System Rebuild");
  power?.querySelector(".media-slot")?.replaceWith(mediaFigure(
    "/assets/renovate/centralized-power-system.jpg",
    "Centralized robot power installation with battery system, Jetson, controls, and wiring",
    "Centralized power-system installation inside Terry, including the Jetson and robot electronics."
  ));

  const gps = findSection("GPS / Localization System");
  const gpsSlot = gps?.querySelector(".media-slot");
  if (gpsSlot) {
    const gpsGallery = document.createElement("div");
    gpsGallery.className = "media-grid gps-gallery";
    gpsGallery.append(
      mediaFigure(
        "/assets/renovate/sparkfun-gps-hardware.jpg",
        "SparkFun LG290P quad-band GNSS receiver used in Terry’s localization stack",
        "SparkFun LG290P quad-band GNSS receiver integrated with RTK corrections for precise positioning."
      ),
      mediaFigure(
        "/assets/renovate/gps-mission-map.jpg",
        "Terry Mission Map showing the robot position, selected destination, GPS coordinates, and simulation controls",
        "Leaflet.js GPS mission-map interface for visualizing Terry’s live position and selected destination."
      )
    );
    gpsSlot.replaceWith(gpsGallery);
  }

  const ros = findSection("ROS2 Autonomy Stack");
  if (ros) {
    const rosFigure = mediaFigure(
      "/assets/renovate/ros2-logo.png",
      "ROS2 logo",
      "ROS2 formed the software backbone for motor control, robot-state management, and hardware integration."
    );
    rosFigure.classList.add("ros-media");
    ros.append(rosFigure);
    const odrive = document.createElement("section");
    odrive.innerHTML = "<h3>ODrive Hall-Effect Sensor Hub</h3><p>The ODrive was an idea we had as a replacement for the ESP32 setup—we wanted a centralized way to connect to the Hall-effect sensors that controlled the motors and act as a central interface for all the sensor signals. However, once we started integrating it, we realized we would need to PID-tune the wheels properly, and it would not make much of a difference compared to the ESP32 configuration, so it was scrapped. Still, I learned how to connect to Hall-effect sensors, what they were, and how to use USB-TTL to communicate with the ODrive system.</p>";
    odrive.append(mediaFigure(
      "/assets/renovate/odrive-hall-sensor-hub.jpg",
      "Wired ODrive controller used as the central Hall-effect sensor connection point",
      "ODrive wiring used as the centralized connection point for Hall-effect sensor inputs."
    ));
    status?.after(odrive);
  }

  const mechanical = findSection("Mechanical Design");
  mechanical?.querySelector(".media-grid")?.remove();
  if (mechanical) {
    const mechanicalGallery = document.createElement("div");
    mechanicalGallery.className = "media-grid mechanical-gallery";
    const cadFigure = mediaFigure(
      "/assets/renovate/terry-onshape-cad.jpg",
      "Onshape CAD model of Terry showing its chassis, wheels, exterior panels, and roof-loading mechanism",
      "Onshape assembly of Terry’s chassis, exterior panel system, and roof-loading structure."
    );
    cadFigure.classList.add("mechanical-cad");
    const componentFigure = mediaFigure(
      "/assets/renovate/mechanical-component-cad.jpg",
      "Detailed Onshape CAD view of a custom mechanical enclosure component",
      "Detailed CAD view of a custom mechanical component designed for Terry."
    );
    componentFigure.classList.add("mechanical-cad");
    mechanicalGallery.append(cadFigure, componentFigure);
    mechanical.append(mechanicalGallery);
  }

  findSection("Terry in action")?.remove();
}

function hydrateFtc(entry) {
  const sections = [...entry.querySelectorAll(".case-study section")];
  const breakBeam = sections.find((section) => section.querySelector("h3")?.textContent.includes("Break-Beam Sensor"));
  const breakBeamFigure = mediaFigure(
    "/assets/ftc-break-beam-mount.jpg",
    "CAD model of opposing infrared break-beam sensor mounts integrated into the robot claw",
    "Custom Onshape mounts positioning the emitter and receiver across the claw opening for automatic game-piece detection."
  );
  breakBeamFigure.classList.add("break-beam-media");
  breakBeam?.querySelector(".media-slot")?.replaceWith(breakBeamFigure);

  const autonomous = sections.find((section) => section.querySelector("h3")?.textContent.includes("Autonomous Software"));
  const autonomousVideo = mediaVideo(
    "/assets/ftc/autonomous-software-demo.m4v",
    "On-robot autonomous software test demonstrating the FTC control and navigation stack."
  );
  autonomousVideo.classList.add("autonomous-video");
  autonomous?.append(autonomousVideo);

  const liveAuto = sections.find((section) => section.querySelector("h3")?.textContent.includes("LiveAuto"));
  liveAuto?.querySelector(".media-slot")?.replaceWith(mediaVideo(
    "/assets/liveauto/liveauto-demo.m4v",
    "LiveAuto’s real-time autonomous trajectory-generation, simulation, and visualization workflow."
  ));
}

function hydrateKibo(entry) {
  entry.querySelector(".media-slot")?.replaceWith(mediaFigure(
    "/assets/kibo/astrobee-mission-visualization.jpg",
    "Astrobee mission visualization showing the free-flying robot, planned trajectory, target zones, and obstacle regions aboard the International Space Station",
    "Mission visualization of Astrobee executing an autonomous, obstacle-aware route toward a visual target aboard the ISS."
  ));
}

function hydrateAxol(entry) {
  const sections = [...entry.querySelectorAll(".case-study section")];
  const singleArm = sections.find((section) => section.querySelector("h3")?.textContent.includes("Single-arm policy"));
  const singleGallery = document.createElement("div");
  singleGallery.className = "media-grid axol-gallery";
  singleGallery.append(
    mediaFigure(
      "/assets/axol/v2-single-arm-policy.png",
      "Axol V2 single robotic arm positioning a red cube over a green placement target",
      "V2 single-arm policy executing the learned pick-and-place behavior."
    ),
    mediaFigure(
      "/assets/axol/v2-held-out-placement.png",
      "Axol V2 single robotic arm placing a red cube at a held-out target position",
      "V2 policy generalizing to a held-out cube and placement configuration."
    )
  );
  singleArm?.append(singleGallery);

  const bimanual = sections.find((section) => section.querySelector("h3")?.textContent.includes("Bimanual research"));
  const bimanualGallery = bimanual?.querySelector(".media-grid");
  bimanualGallery?.classList.add("axol-gallery");
  bimanualGallery?.replaceChildren(
    mediaFigure(
      "/assets/axol/bimanual-table-scene.png",
      "Bimanual Axol robot above a table with two cubes and two placement bins",
      "Bimanual table scene with coordinated arms, objects, and placement targets."
    ),
    mediaFigure(
      "/assets/axol/bimanual-placement-scene.png",
      "Bimanual Axol robot placing a yellow cube into the red target bin",
      "Bimanual placement scene during coordinated policy execution."
    )
  );

  const quadruped = sections.find((section) => section.querySelector("h3")?.textContent.includes("Quadruped learning"));
  quadruped?.querySelector(".media-slot")?.replaceWith(mediaFigure(
    "/assets/petoi/quadruped-training.gif",
    "Animated reinforcement-learning simulation of a Petoi quadruped learning to move",
    "Petoi quadruped locomotion experiment connecting policy learning to a physical robot platform."
  ));
}

function hydrateAiCurriculum(entry) {
  const gallery = entry.querySelector(".media-grid");
  gallery?.classList.add("ai-curriculum-gallery");
  gallery?.replaceChildren(
    mediaFigure(
      "/assets/outreach/ai-curriculum/vex-chatgpt-robot.jpg",
      "VEX educational robot paired with a ChatGPT interface",
      "VEX-based platform connecting conversational AI with a physical classroom robot."
    ),
    mediaFigure(
      "/assets/petoi/quadruped-training.gif",
      "Animated Petoi quadruped reinforcement-learning simulation used in an AI curriculum",
      "A tangible reinforcement-learning example developed for hands-on AI education."
    )
  );
}

function hydrateRoboticsOutreach(entry) {
  const slot = entry.querySelector(".media-slot");
  if (!slot) return;
  const gallery = document.createElement("div");
  gallery.className = "media-grid outreach-gallery robotics-gallery";
  gallery.append(
    mediaFigure("/assets/outreach/robotics/camp-robot.jpg", "Student-built educational robot at a robotics camp", "A student-built robot ready for programming and testing."),
    mediaFigure("/assets/outreach/robotics/student-build-session.jpg", "Students collaborating on a hands-on robotics build", "Small-group mentorship during a hands-on robot build."),
    mediaFigure("/assets/outreach/robotics/group-workshop.jpg", "Large student robotics workshop led around a demonstration table", "A community workshop bringing students together to build and learn robotics.")
  );
  slot.replaceWith(gallery);
}

function hydrateRewired(entry) {
  const slot = entry.querySelector(".media-slot");
  if (!slot) return;
  const gallery = document.createElement("div");
  gallery.className = "media-grid outreach-gallery rewired-gallery";
  gallery.append(
    mediaFigure("/assets/outreach/rewired/chromebook-repair.jpg", "Opened Chromebook undergoing hardware repair", "Inspecting and repairing Chromebook hardware before redistribution."),
    mediaFigure("/assets/outreach/rewired/refurbished-chromebooks.jpg", "Stacks of refurbished HP Chromebooks", "Refurbished Chromebooks prepared for their next users."),
    mediaFigure("/assets/outreach/rewired/student-computing.jpg", "Students learning on distributed Chromebooks", "Students using Chromebooks during a community learning session."),
    mediaFigure("/assets/outreach/rewired/computing-access.jpg", "Students smiling while working on Chromebooks", "Putting reliable personal computing into students’ hands.")
  );
  slot.replaceWith(gallery);
}

function hydrateNeural(entry) {
  entry.querySelector(".case-study section")?.append(mediaFigure(
    "/assets/neural/tron-robot.jpg",
    "LimX Dynamics TRON wheeled quadruped navigating a LiDAR-mapped industrial environment",
    "LimX Dynamics TRON—the robot platform I trained with PPO-based joint-control policies in NVIDIA Isaac Gym."
  ));
}

function renderArchive(kind) {
  const ids = kind === "projects" ? projectIds : outreachIds;
  const title = kind === "projects" ? "Projects" : "Outreach";
  const subtitle = kind === "projects"
    ? "Robotics, hardware, and reinforcement-learning work in detail."
    : "Initiatives that make robotics, AI, and computing more accessible.";
  const main = document.getElementById("main");
  const page = document.createElement("section");
  page.className = "archive-page";
  page.innerHTML = `<header class="archive-intro reveal"><p class="section-label">${kind === "projects" ? "Selected work" : "Community work"}</p><h1>${title}</h1><p>${subtitle}</p></header><div class="archive-list"></div>`;
  const list = page.querySelector(".archive-list");

  ids.forEach((id, index) => {
    const template = document.getElementById(`project-${id}`);
    if (!template) return;
    const entry = document.createElement("section");
    entry.className = "archive-entry reveal";
    entry.id = id;
    entry.dataset.index = String(index + 1).padStart(2, "0");
    entry.append(template.content.cloneNode(true));
    if (id === "renovate") hydrateRenovate(entry);
    if (id === "ftc") hydrateFtc(entry);
    if (id === "kibo") hydrateKibo(entry);
    if (id === "axol") hydrateAxol(entry);
    if (id === "neural") hydrateNeural(entry);
    if (id === "robotics-outreach") hydrateRoboticsOutreach(entry);
    if (id === "rewired") hydrateRewired(entry);
    if (id === "ai-curriculum") hydrateAiCurriculum(entry);
    list.append(entry);
  });

  main.replaceChildren(page);
  document.querySelector(".wordmark").href = "/";
  const navLinks = [...document.querySelectorAll(".site-header nav a")];
  navLinks.forEach((link) => {
    if (link.textContent === "Projects") link.href = "/projects";
    if (link.textContent === "Outreach") link.href = "/outreach";
    if (link.textContent === "Honors") link.href = "/#honors";
    if (link.textContent === "Contact") link.href = "/#contact";
  });

  requestAnimationFrame(() => {
    const target = location.hash && document.querySelector(location.hash);
    target?.scrollIntoView({ block: "start" });
  });
}

if (route === "/projects") renderArchive("projects");
if (route === "/outreach") renderArchive("outreach");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.06, rootMargin: "0px 0px -6%" });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 65}ms`;
  observer.observe(element);
});

if (route === "/") {
  const sectionNumbers = [
    ["#projects .section-label", "01 / Selected work"],
    ["#outreach .section-label", "02 / Outreach"],
    ["#honors .section-label", "03 / Recognition"],
    ["#contact .section-label", "04 / Contact"]
  ];
  sectionNumbers.forEach(([selector, label]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = label;
  });

  document.querySelectorAll("[data-project]").forEach((card) => {
    const id = card.dataset.project;
    const destination = outreachIds.includes(id) ? "outreach" : "projects";
    card.removeAttribute("aria-expanded");
    const label = card.querySelector(".open-label");
    const itemType = destination === "outreach" ? "initiative" : "project";
    if (label) label.innerHTML = `Click to explore ${itemType} <b>↗</b>`;
    const title = card.querySelector("h3")?.textContent.trim();
    if (title) card.setAttribute("aria-label", `Explore details for ${title}`);
    card.addEventListener("click", () => { location.href = `/${destination}#${id}`; });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

const particleField = document.getElementById("particles");
if (particleField) {
  for (let index = 0; index < 46; index += 1) {
    const particle = document.createElement("i");
    particle.className = "particle";
    particle.style.left = `${(index * 37) % 98}%`;
    particle.style.top = `${(index * 61) % 96}%`;
    particle.style.setProperty("--duration", `${5 + (index % 7)}s`);
    particle.style.animationDelay = `${-(index % 9)}s`;
    particleField.append(particle);
  }
}

const cursorGlow = document.querySelector(".cursor-glow");
const portrait = document.querySelector(".portrait");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("pointermove", (event) => {
    cursorGlow?.style.setProperty("--cursor-x", `${event.clientX}px`);
    cursorGlow?.style.setProperty("--cursor-y", `${event.clientY}px`);
    if (portrait && event.target.closest(".hero")) {
      const x = (event.clientX / innerWidth - 0.5) * 12;
      const y = (event.clientY / innerHeight - 0.5) * 12;
      portrait.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
  }, { passive: true });
  document.querySelector(".hero")?.addEventListener("pointerleave", () => { if (portrait) portrait.style.transform = ""; });
}
