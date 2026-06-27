/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ServiceStep } from './types';

// Hero image (elegant home living room with floor-to-ceiling windows)
export const IMAGE_HERO = '/images/hero.jpg';

// Founders portrait (Majo & Fiore with the color fan)
export const IMAGE_ABOUT = '/images/about.jpg';

// Contact section main image (stylish chair and side table with shadow play)
export const IMAGE_CONTACT = '/images/contact.jpg';

export const PROJECTS: Project[] = [
  {
    id: 'casa-llar',
    name: 'Casa Llar',
    category: 'residential',
    location: 'Barcelona, España',
    image: '/images/portfolio/portfolio1.jpg',
    description: 'Cocina minimalista de lujo que fusiona madera de roble claro, mármol de Carrara con vetas grises suaves y detalles en verde oliva. Una oda al orden, los materiales naturales y la luz matinal difusa.',
    year: '2025',
    size: '120 m²'
  },
  {
    id: 'estudio-zen',
    name: 'Estudio Zen',
    category: 'commercial',
    location: 'Madrid, España',
    image: '/images/portfolio/portfolio2.jpg',
    description: 'Espacio de descanso y oficina boutique en Madrid. Paredes terminadas en revoque de cal texturado (limewash), cama suspendida de lino color arena y lámparas artesanales que crean un ambiente sereno y sumamente profesional.',
    year: '2024',
    size: '85 m²'
  },
  {
    id: 'apartamento-marina',
    name: 'Apartamento Marina',
    category: 'residential',
    location: 'Valencia, España',
    image: '/images/portfolio/portfolio3.jpg',
    description: 'Vestíbulo residencial con carácter editorial. Cuenta con un sillón de terciopelo verde oliva con curvas orgánicas y acabados de concreto pulido que reflejan la luz de la costa mediterránea.',
    year: '2025',
    size: '140 m²'
  },
  {
    id: 'casa-lg',
    name: 'Casa LG.',
    category: 'residential',
    location: 'Gral Pico, La Pampa',
    image: '/images/portfolio/portfolio4.jpg',
    description: 'Impresionante comedor residencial de concepto abierto. El corazón de la casa gira en torno a una mesa de madera maciza recuperada, combinando calidez rústica con sillas tapizadas minimalistas y luminarias cálidas.',
    year: '2024',
    size: '230 m²'
  },
  {
    id: 'instituto-cultura-inglesa',
    name: 'Instituto Cultura Inglesa',
    category: 'commercial',
    location: 'Gral Pico, La Pampa',
    image: '/images/portfolio/portfolio5.jpg',
    description: 'Diseño comercial educativo y moderno. Paredes con mensajes gráficos motivacionales ("have a great study!"), colores vivos controlados, pasillos optimizados y mobiliario modular que incentiva el aprendizaje y el intercambio.',
    year: '2023',
    size: '310 m²'
  },
  {
    id: 'proyecto-jp',
    name: 'Proyecto JP.',
    category: 'residential',
    location: 'Santa Rosa, La Pampa',
    image: '/images/portfolio/portfolio6.jpg',
    description: 'Estudio de tocador y vestidor residencial. Un ambiente romántico y sofisticado caracterizado por arcos rosas pasteles, estantes iluminados, detalles en bronce cepillado y acabados de laca de alto brillo.',
    year: '2025',
    size: '45 m²'
  },
  {
    id: 'proyecto-jo',
    name: 'Proyecto JO.',
    category: 'residential',
    location: 'Trenel, La Pampa',
    image: '/images/portfolio/portfolio7.jpg',
    description: 'Amplio salón de estar con mobiliario suspendido y un sofá esquinero modular de tejido boucle color crema. Grandes ventanales difuminan la línea entre el interior y la naturaleza del jardín exterior.',
    year: '2024',
    size: '180 m²'
  },
  {
    id: 'proyecto-db',
    name: 'Proyecto DB.',
    category: 'residential',
    location: 'Trenel, La Pampa',
    image: '/images/portfolio/portfolio8.jpg',
    description: 'Cocina residencial de líneas puras. Equipamiento en madera oscura termo-tratada combinada con electrodomésticos empotrados de última generación y una isla central con banquetas tapizadas elegantes.',
    year: '2025',
    size: '60 m²'
  },
  {
    id: 'proyecto-cm',
    name: 'Proyecto CM.',
    category: 'residential',
    location: 'Neuquén',
    image: '/images/portfolio/portfolio9.jpg',
    description: 'Sala de estar y comedor de concepto abierto en Neuquén. Con un sillón de pana neutro, lámparas colgantes de mimbre de formato orgánico y un vajillero de roble que aporta calidez y orden al espacio.',
    year: '2024',
    size: '115 m²'
  }
];

export const SERVICE_STEPS: ServiceStep[] = [
  {
    id: 'step-1',
    number: '01',
    title: 'El Primer Encuentro, Videollamada',
    description: 'Comenzamos con una reunión virtual para conocernos a fondo. Analizamos el espacio, conversamos sobre tus gustos, tus rutinas y las necesidades específicas de tu hogar o proyecto comercial. Tu visión es nuestro punto de partida.',
    image: '/images/service-step-1.jpg'
  },
  {
    id: 'step-2',
    number: '02',
    title: '¿Qué incluye nuestro servicio?',
    description: 'Una vez definida la dirección estética, desarrollamos una propuesta técnica y visual completa que te servirá como la guía definitiva para tu espacio, incluyendo:',
    details: [
      {
        title: 'Plano de distribución',
        description: 'Diseño y planificación inteligente de la distribución del espacio, ubicando estratégicamente el mobiliario y la decoración para maximizar la funcionalidad y la circulación natural.'
      },
      {
        title: 'Lista de materiales',
        description: 'Una lista detallada con sugerencias de texturas, paleta de colores, lámparas, textiles y muebles específicos adecuados para el ambiente y su uso diario.'
      },
      {
        title: 'Renders 3D realistas',
        description: 'Imágenes tridimensionales fotorrealistas de alta calidad para que puedas visualizar con total precisión cómo quedará el espacio terminado antes de realizar cualquier compra.'
      }
    ]
  },
  {
    id: 'step-3',
    number: '03',
    title: 'Acompañamiento Post-Diseño',
    description: 'Soporte continuo por WhatsApp: Seguimos en contacto directo para resolver dudas en tiempo real cuando estés comprando los materiales, encargando el mobiliario o coordinando con tus proveedores. Te acompañamos en el proceso de compra para asegurarnos de que el resultado final sea tal como lo soñaste.',
    image: '/images/service-step-3.jpg'
  }
];

export const SERVICE_ILLUSTRATIONS = {
  distribution: '/images/service-distribution.jpg',
  materials: '/images/service-materials.jpg',
  renders: '/images/service-renders.jpg'
};

export const FOUNDERS = {
  names: 'Majo & Fiore',
  title: 'Detrás de Fima Studio',
  headline: 'Pasión por el detalle y el enfoque humano',
  bio: 'Somos apasionadas por el Diseño de interiores, la funcionalidad y el detalle. Nuestra trayectoria combina años de experiencia transformando tanto hogares particulares como espacios comerciales, logrando que cada proyecto cuente una historia propia.',
  extendedBio: 'Trabajamos de manera freelance para clientes de todo el mundo. Estamos convencidas de que cada espacio es diferente, especial, único. Nuestro objetivo es encontrar y proponer soluciones que se adapten a tu espacio para cumplir con tus expectativas y que logres tener tu casa soñada.',
  quote: 'Diseñar un hogar es meterse en la vida de las personas. Por eso nos gusta conocerte antes de pensar tu espacio.'
};

export const COMPANY_CONTACT = {
  email: 'fimastudio.interiores@gmail.com',
  instagram: '@fimastudio.interiores',
  whatsappUrl: 'https://wa.link/lu8p84',
  address: 'Gral Pico, La Pampa / Santa Rosa, La Pampa, Argentina'
};
