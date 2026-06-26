// ─────────────────────────────────────────────────────────────
//  Contenido bilingüe (ES por defecto / EN). Única fuente de verdad.
// ─────────────────────────────────────────────────────────────

export const CONTACT = {
  name: 'Pablo Pérez García',
  email: 'perez.gcia+job@gmail.com',
  phone: '+34681279891',
  phoneDisplay: '+34 681 279 891',
  location: 'Madrid, España',
  github: 'https://github.com/papgar92',
  linkedin: 'https://linkedin.com/in/ppg92',
  cal: 'https://cal.com/papgar92',
  htb: 'https://profile.hackthebox.com/profile/019ec60b-5005-723b-99c8-80cf5f74d4f0',
  cyberdefenders: 'https://cyberdefenders.org/p/papgar92/',
  // CVs alojados en el portfolio whoami (GitHub Pages)
  cvES: '/CV-PPG-CIBER-ES.pdf',
  cvEN: '/CV-PPG-CIBER-EN.pdf',
  web: 'https://pabloperez-ciber.vercel.app/',
};

// Secuencia de arranque (boot). Los guiños anime viven aquí, con clase.
export const BOOT_LINES = [
  { t: 'KONOHA-SOC-01 · secure boot', cls: 'dim' },
  { t: '[ OK ] Mounting /var/log/auth.log', cls: 'ok' },
  { t: '[ OK ] Sharingan detection engine loaded', cls: 'ok' },
  { t: '[ OK ] Bankai modules unsealed', cls: 'ok' },
  { t: '[ INFO ] Correlating events · MITRE ATT&CK', cls: 'info' },
  { t: '[ WARN ] Titan signature on perimeter — triaging…', cls: 'warn' },
  { t: '[ OK ] Analyst profile decrypted', cls: 'ok' },
];

// Feed de alertas = pruebas reales presentadas como detecciones SOC.
// status: 'mitigated' | 'investigating' | 'logged'
export const ALERTS = [
  {
    id: 'A-1147',
    mitre: 'T1110',
    sev: 'crit',
    es: { title: 'Fuerza bruta SSH detectada', src: 'Detector-Fuerza-bruta-SSH', status: 'Mitigado' },
    en: { title: 'SSH brute force detected', src: 'Detector-Fuerza-bruta-SSH', status: 'Mitigated' },
  },
  {
    id: 'A-1148',
    mitre: 'T1046',
    sev: 'warn',
    es: { title: 'Escaneo de puertos en red', src: 'soc-monitoring-lab · Zeek', status: 'Investigado' },
    en: { title: 'Network port scan', src: 'soc-monitoring-lab · Zeek', status: 'Investigated' },
  },
  {
    id: 'A-1149',
    mitre: 'T1083',
    sev: 'warn',
    es: { title: 'Acceso a ficheros sensibles', src: 'soc-monitoring-lab · Wazuh', status: 'Investigado' },
    en: { title: 'Sensitive file access', src: 'soc-monitoring-lab · Wazuh', status: 'Investigated' },
  },
  {
    id: 'A-1150',
    mitre: 'DEF',
    sev: 'info',
    es: { title: 'Segmentación de red perimetral', src: 'TFG-ASIR · pfSense + Snort', status: 'Registrado' },
    en: { title: 'Perimeter network segmentation', src: 'TFG-ASIR · pfSense + Snort', status: 'Logged' },
  },
];

export const PROJECTS = [
  {
    repo: 'soc-monitoring-lab',
    url: 'https://github.com/papgar92/soc-monitoring-lab',
    stack: ['Wazuh', 'Zeek', 'Proxmox', 'LXC'],
    mitre: ['T1110', 'T1046', 'T1083'],
    es: {
      tag: 'Home Lab SOC · Blue Team',
      desc: 'SOC desplegado en contenedores LXC sobre Proxmox. Ingesta y correlación de logs, análisis de tráfico de red (NTA) y detección de amenazas en tiempo real con reglas propias.',
    },
    en: {
      tag: 'Home Lab SOC · Blue Team',
      desc: 'SOC deployed on LXC containers over Proxmox. Log ingestion and correlation, network traffic analysis (NTA) and real-time threat detection with custom rules.',
    },
  },
  {
    repo: 'Detector-Fuerza-bruta-SSH',
    url: 'https://github.com/papgar92/Detector-Fuerza-bruta-SSH',
    stack: ['Python', 'auth.log', 'MITRE T1110'],
    mitre: ['T1110'],
    es: {
      tag: 'Detección · Python',
      desc: 'Herramienta en Python que analiza registros de autenticación SSH para detectar ataques de fuerza bruta, identificar cuentas objetivo y generar informes — sin necesidad de un SIEM.',
    },
    en: {
      tag: 'Detection · Python',
      desc: 'Python tool that parses SSH authentication logs to detect brute-force attacks, identify targeted accounts and generate reports — without needing a SIEM.',
    },
  },
  {
    repo: 'TFG-ASIR',
    url: 'https://github.com/papgar92/TFG-ASIR',
    stack: ['pfSense', 'Snort', 'Nagios', 'AD'],
    mitre: ['DEF'],
    es: {
      tag: 'Infraestructura segura · TFG',
      desc: 'Diseño e implementación de red segura para PYME: firewall perimetral, IDS Snort, monitorización con Nagios y segmentación. Proyecto final del ciclo ASIR.',
    },
    en: {
      tag: 'Secure infrastructure · Final project',
      desc: 'Design and implementation of a secure SME network: perimeter firewall, Snort IDS, Nagios monitoring and segmentation. ASIR final degree project.',
    },
  },
];

export const SKILLS = [
  { es: 'SIEM / Monitorización', en: 'SIEM / Monitoring', items: ['Wazuh', 'Nagios', 'Zabbix'] },
  { es: 'Red / Tráfico', en: 'Network / Traffic', items: ['Zeek', 'Snort', 'Wireshark', 'pfSense'] },
  { es: 'Detección / ATT&CK', en: 'Detection / ATT&CK', items: ['MITRE ATT&CK', 'Log analysis', 'IOC'] },
  { es: 'Scripting', en: 'Scripting', items: ['Python', 'Bash', 'PowerShell'] },
];

export const PRACTICE = [
  {
    platform: 'Hack The Box',
    urlKey: 'htb',
    es: { label: 'Fundamentos ofensivos', note: 'Práctica continua — entender el ataque para defender mejor' },
    en: { label: 'Offensive fundamentals', note: 'Ongoing practice — understand the attack to defend better' },
  },
  {
    platform: 'CyberDefenders',
    urlKey: 'cyberdefenders',
    labs: ['PsExecHunt', 'Web Investigation', 'Oski', 'Yellow RAT'],
    es: { label: 'DFIR · Análisis forense', note: '4 labs completados' },
    en: { label: 'DFIR · Forensic analysis', note: '4 labs completed' },
  },
];

export const CERTS = [
  { name: 'IFCT0050 · Ciberseguridad OT', state: 'done' },
  { name: 'IFCT0410 · Redes', state: 'done' },
  { name: 'IFCT095PO · Python', state: 'done' },
  { name: 'BTL1 · Blue Team Level 1', state: 'q3' },
  { name: 'SC-200 · Security Operations', state: 'q4' },
  { name: 'Máster Ciberseguridad & IA · Evolve', state: 'progress' },
];

export const T = {
  es: {
    skip: 'saltar',
    role: 'Aspirante a Analista SOC / Blue Team',
    available: 'Disponible · Madrid',
    feedTitle: 'Cola de alertas',
    feedSub: 'Triaje en vivo',
    hookLabel: '// el músculo',
    hook:
      '8 años haciendo triaje de incidencias técnicas en servicio 24/7 bajo SLA. La herramienta cambia —de un panel de alarmas a un SIEM— pero el método es el mismo: priorizar señales, descartar falsos positivos y escalar lo crítico.',
    sectionProjects: 'Pruebas',
    sectionProjectsSub: 'Código real, no diapositivas',
    sectionExp: 'Trayectoria',
    sectionGoal: 'Hacia dónde voy',
    goalText:
      'Mi meta es el análisis forense digital (DFIR). Quiero entender cómo un sistema fue atacado, reconstruir el incidente y encontrar lo que el atacante explotó — para proteger mejor a las personas detrás de los sistemas.',
    sectionSkills: 'Stack Blue Team',
    sectionPractice: 'Práctica activa',
    sectionCerts: 'Formación y ruta',
    expItems: [
         {
        role: 'Técnico de Soporte IT',
        org: 'Cartronic Group',
        period: '2025 – act.',
        desc: 'Administración de infraestructura corporativa: Active Directory (50+ usuarios), GPOs, firewall WatchGuard, virtualización (Proxmox, VMware) y monitorización (Nagios, Zabbix). Soporte N1-N2 y entorno SAP HANA on-premise.',
      },
	  {
        role: 'Atención técnica 24/7 · Servicio de seguridad electrónica',
        org: 'Movistar Prosegur Alarmas',
        period: '2017 – 2025',
        desc: 'Gestión de incidencias de sistemas de alarma y videovigilancia bajo SLA. Verificación de saltos de alarma, coordinación con inspección y notificación de eventos en plataformas de monitorización.',
      },
       {
        role: 'Técnico de Soporte IT (Prácticas)',
        org: 'Prosegur Activa',
        period: '2025',
        desc: 'Administración de identidades y dispositivos (Active Directory, Entra ID, Intune). Migración On-Premise a Azure AD, despliegue vía PXE y gestión de tickets bajo SLA en Helix ITSM.',
      },
    ],
    save: 'Guardar contacto',
    schedule: 'Agendar',
    cv: 'CV',
    consoleHint: 'Abrir consola',
    consoleClose: 'Cerrar consola',
    event: 'Evolve Talent Day · 25 jun 2026',
    statusReady: 'sistema operativo · listo para triaje',
  },
  en: {
    skip: 'skip',
    role: 'Aspiring SOC / Blue Team Analyst',
    available: 'Available · Madrid',
    feedTitle: 'Alert queue',
    feedSub: 'Live triage',
    hookLabel: '// the muscle',
    hook:
      '8 years triaging technical incidents in a 24/7 SLA-bound service. The tool changes —from an alarm panel to a SIEM— but the method is the same: prioritise signals, rule out false positives and escalate what matters.',
    sectionProjects: 'Proof',
    sectionProjectsSub: 'Real code, not slides',
    sectionExp: 'Track record',
    sectionGoal: 'Where I am heading',
    goalText:
      'My goal is digital forensics (DFIR). I want to understand how a system was attacked, reconstruct the incident and find what the attacker exploited — to better protect the people behind the systems.',
    sectionSkills: 'Blue Team stack',
    sectionPractice: 'Active practice',
    sectionCerts: 'Training & path',
    expItems: [
      {
        role: 'IT Support Technician',
        org: 'Cartronic Group',
        period: '2025 – now',
        desc: 'Corporate infrastructure administration: Active Directory (50+ users), GPOs, WatchGuard firewall, virtualization (Proxmox, VMware) and monitoring (Nagios, Zabbix). N1-N2 support and on-premise SAP HANA environment.',
      },
	  {
        role: '24/7 technical support · Electronic security service',
        org: 'Movistar Prosegur Alarmas',
        period: '2017 – 2025',
        desc: 'Incident management for alarm and video-surveillance systems under SLA. Alarm verification, coordination with inspection and event notification on monitoring platforms.',
      },
      {
        role: 'IT Support Technician (Internship)',
        org: 'Prosegur Activa',
        period: '2025',
        desc: 'Identity and device administration (Active Directory, Entra ID, Intune). On-Premise to Azure AD migration, PXE deployment and SLA-based ticket management in Helix ITSM.',
      },
    ],
    save: 'Save contact',
    schedule: 'Schedule',
    cv: 'CV',
    consoleHint: 'Open console',
    consoleClose: 'Close console',
    event: 'Evolve Talent Day · Jun 25 2026',
    statusReady: 'system operational · ready to triage',
  },
};

export const SEV_LABEL = {
  crit: { es: 'CRÍTICO', en: 'CRITICAL' },
  warn: { es: 'MEDIO', en: 'MEDIUM' },
  info: { es: 'INFO', en: 'INFO' },
};
