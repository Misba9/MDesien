/**
 * Live project list, imported by lib/projects.ts.
 * Each project uses media only from its own folder under public/projects.
 */

import type { Project } from '@/lib/projects'

function media(dir: string, file: string) {
  return encodeURI(`${dir}/${file}`)
}

const sereneDir = '/projects/Aparna serene park Interior'
const synergyDir = '/projects/Aparna Synergy Park Interior'
const sumitDir = '/projects/Sumit Residence Interiors'
const tdcaDir = '/projects/TDCA Corporate Interior'
const hillDir = '/projects/hill house pinjore Architecture'
const hospitalityDir = '/projects/HOSPITALITY INTERIORS'
const oasisDir = '/projects/OASIS CORPORATE OFFICE'
const farmDir = '/projects/FARM HOUSE INTERIORS'

const serene = (file: string) => media(sereneDir, file)
const synergy = (file: string) => media(synergyDir, file)
const sumit = (file: string) => media(sumitDir, file)
const tdca = (file: string) => media(tdcaDir, file)
const hill = (file: string) => media(hillDir, file)
const hospitality = (file: string) => media(hospitalityDir, file)
const oasis = (file: string) => media(oasisDir, file)
const farm = (file: string) => media(farmDir, file)

const sereneLivingDay = serene('Day View Living room.jpg')
const sereneLivingNight = serene('Night View Living Room.jpg')
const sereneFamily = serene('Family area.jpg')
const sereneKitchen = serene('Kitchen Complete.jpg')
const serenePooja = serene('Puja.jpg')
const sereneBedroom = serene('Bedroom.png')

const synergyLiving = synergy('1 Living Dining.jpg')
const synergyFamily = synergy('2 Family-Dining.png')
const synergyKitchen = synergy('4 Kitchen.png')
const synergyMaster = synergy('9 MB.jpg')

const sumitLiving = sumit('8 Formal Living.jpg')
const sumitDining = sumit('2 Dining.jpg')
const sumitKitchen = sumit('7 Kitchen Full.jpg')
const sumitPorch = sumit('1Entrance Porch.jpeg')

const tdcaDoor = tdca('1_Main Door.jpg')
const tdcaReception = tdca('3_Reception looking in to workstation.jpg')
const tdcaWorkstation = tdca('7 Workstation.jpeg')
const tdcaCabin = tdca('8 MD Cabin.jpeg')

const hillExterior = hill('outdoor 1.jpeg')
const hillGate = hill('Outdoor.jpeg')
const hillPorch = hill('WhatsApp Image 2024-09-12 at 12.12.36 PM (15).jpeg')

const hospitalityLobby = hospitality('5.jpg')
const hospitalityFacade = hospitality('4.jpg')
const hospitalityTwin = hospitality('3.jpg')

const oasisReception = oasis('6.jpg')
const oasisFacade = oasis('5.jpg')
const oasisConference = oasis('3.jpg')

const farmExterior = farm('2.jpg')
const farmLiving = farm('5.jpg')
const farmKitchen = farm('8.jpg')
const farmBedroom = farm('1.jpg')

export const exampleProjects: Project[] = [
  {
    slug: 'aparna-serene-park-residence',
    title: 'Aparna Serene Park Residence',
    category: 'Residential Interior',
    categories: ['Residential Interior'],
    subtitle: 'Residence for Mr. Partha',
    location: 'Aparna Serene Park, Hyderabad',
    year: '2026',
    status: 'Completed',
    image: sereneLivingDay,
    summary:
      'An apartment interior for Mr. Partha, planned as a warm timber living space with a slatted screen, a family lounge, a dedicated pooja, a modular kitchen, and a master bedroom.',
    description: [
      'The living room is one timber composition. A full-height wall holds the television, open display, and lit shelves. A slatted screen with a display shelf divides that wall from the seating without closing the room, and the kitchen sits beyond a timber-framed opening.',
      'The apartment includes a dedicated pooja framed by timber slats, with a carved marble arch and brass accents, a modular U-shaped kitchen in wood-grain and gloss white, and a master bedroom with fluted wall panelling, a window seat, and a floating television console.',
      'A second lounge holds a marble television wall with lit shelves beside a glazed opening. On site, the living-room screen, the family television unit, the wardrobe carcass, and the kitchen cabinets are in carpentry. Some laminate faces are still under film.',
    ],
    gallery: [
      {
        src: sereneLivingDay,
        category: 'Living room',
        aspect: 'landscape',
        alt: 'Daylight view of the living room, with the timber wall, slatted screen, and kitchen beyond',
      },
      {
        src: sereneLivingNight,
        category: 'Living room',
        aspect: 'landscape',
        alt: 'The same living room with shelf lighting on and the screen display lit',
      },
      {
        src: sereneFamily,
        category: 'Family lounge',
        aspect: 'landscape',
        alt: 'Family lounge with a marble television wall, floating console, and lit timber shelves',
      },
      {
        src: sereneKitchen,
        category: 'Kitchen',
        aspect: 'landscape',
        alt: 'Modular U-shaped kitchen with wood-grain base cabinets, glossy white overhead units, and open crockery shelves',
      },
      {
        src: serenePooja,
        category: 'Pooja room',
        aspect: 'portrait',
        alt: 'Pooja niche with a carved marble arch, brass bell, and timber slats in a grey frame',
      },
      {
        src: sereneBedroom,
        category: 'Bedroom',
        aspect: 'landscape',
        alt: 'Master bedroom with fluted wall panelling, a gloss wardrobe, window seat, and floating television console',
      },
      {
        src: serene('Living 5.jpeg'),
        category: 'On site',
        aspect: 'landscape',
        alt: 'Living-room screen and shelving carcass during carpentry',
      },
      {
        src: serene('Living 1.jpeg'),
        category: 'On site',
        aspect: 'landscape',
        alt: 'Television wall in plywood, with floating shelves and wiring still open',
      },
      {
        src: serene('TV Unit.jpeg'),
        category: 'On site',
        aspect: 'landscape',
        alt: 'Family-lounge television unit carcass beside the glazed opening',
      },
      {
        src: serene('Puja 2.jpeg'),
        category: 'On site',
        aspect: 'portrait',
        alt: 'Pooja doorway with timber slats being fixed inside a grey frame',
      },
      {
        src: serene('M CB.jpeg'),
        category: 'On site',
        aspect: 'portrait',
        alt: 'Open wardrobe carcass with hanging rails, drawers, and shelves',
      },
      {
        src: serene('Kitchen 1.jpeg'),
        category: 'On site',
        aspect: 'portrait',
        alt: 'Kitchen base and wall cabinets during fitting, faces still under film',
      },
      {
        src: serene('Kitchen 3.jpeg'),
        category: 'On site',
        aspect: 'portrait',
        alt: 'Gloss white kitchen cabinets with the protection film still on',
      },
    ],
    facts: [
      { label: 'Location', value: 'Aparna Serene Park, Hyderabad' },
      { label: 'Client', value: 'Mr. Partha' },
      { label: 'Project Type', value: 'Residential Interior' },
      { label: 'Scope', value: 'Interior design and execution' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'Completed' },
      { label: 'Year', value: '2026' },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'One timber living room, storage built into the walls, and light held in the shelves.',
      body: [
        'The apartment is organised around the living room. Timber runs from the television wall across a slatted screen and into the door frames, so the seating, display, and kitchen read as one sequence rather than separate rooms.',
        'The screen does the work of a wall without shutting the light off. Vertical slats keep a view through to the window, and a box shelf in the middle of the screen is for objects that stay in view from both sides.',
        'Storage is built in: a wardrobe with hanging, drawers, and shelves, and a kitchen of base cabinets, wall cabinets, and open shelves. The family lounge is a separate wall of marble, a floating console, and lit timber shelves beside the glazing.',
      ],
    },
    materials: [
      'Timber veneer',
      'High-gloss laminate',
      'Marble',
      'Brass',
      'Fluted wall panelling',
      'Large-format floor tile',
    ],
    materialsNote:
      'Read from the living room, family lounge, pooja, kitchen, and bedroom, alongside carpentry on site.',
    materialStudies: [
      {
        name: 'Timber',
        description:
          'Walnut-tone timber on the television wall, the slatted screen, and the door frames.',
        src: sereneLivingDay,
        alt: 'Timber television wall and slatted screen in the living room',
        objectPosition: 'left center',
      },
      {
        name: 'Marble arch',
        description:
          'Carved marble arch in the pooja, with a brass bell and timber slats in front.',
        src: serenePooja,
        alt: 'Carved marble niche and brass bell in the pooja',
        objectPosition: 'center',
      },
      {
        name: 'Light',
        description:
          'Shelf lighting and a lit display in the screen, shown in the evening view of the same room.',
        src: sereneLivingNight,
        alt: 'Lit shelves and screen display in the living room',
        objectPosition: 'center 40%',
      },
      {
        name: 'Marble wall',
        description:
          'Book-matched marble behind the family-lounge television, with brass lines and warm shelf light.',
        src: sereneFamily,
        alt: 'Marble television wall in the family lounge',
        objectPosition: 'center',
      },
      {
        name: 'Laminate',
        description:
          'Gloss white overheads and wood-grain bases in the kitchen. On site, some of those faces are still under film.',
        src: sereneKitchen,
        alt: 'Two-tone kitchen with gloss white overhead cabinets',
        objectPosition: 'center',
      },
    ],
    editorial: {
      src: sereneLivingNight,
      alt: 'Living room with the screen shelf and wall niches lit',
      text: 'The screen shelf and the wall niches carry the evening light in the living room.',
    },
    processNote:
      'The sequence follows the work on site, then the rooms as drawn.',
    process: [
      {
        step: '01',
        title: 'Carpentry',
        description:
          'The slatted screen, both television units, the wardrobe, and the kitchen carcasses are built in the apartment.',
      },
      {
        step: '02',
        title: 'Living room',
        description:
          'The timber wall, screen, seating, and kitchen are shown together in daylight, and again with the shelves lit.',
      },
      {
        step: '03',
        title: 'Family lounge',
        description:
          'The television carcass beside the glazing becomes a marble wall with a floating console and lit shelves.',
      },
      {
        step: '04',
        title: 'Faces and light',
        description:
          'Pooja, kitchen, and bedroom are drawn complete. On site, laminate faces are still under film, and the lighting in the visualizations is not yet installed.',
      },
    ],
    outcome: {
      title: 'A timber living room, with the carpentry still open.',
      body: 'The films show the living room and the family television wall as proposed, including a pass from the site photograph to the finished room. On site, the screen, storage, and kitchen carcasses are in place, and some finished faces are not yet on.',
      src: sereneLivingDay,
      alt: 'Daylight view of the Aparna Serene Park living room',
    },
    walkthrough: {
      poster: sereneLivingDay,
      posterAlt: 'Daylight view of the Aparna Serene Park living room',
      video: serene('Herosection Aparna Serene Park.mp4'),
      title: 'Residence walkthrough',
      description:
        'A pass through the living room, family lounge, pooja, kitchen, and bedroom.',
      duration: '1:03',
    },
    walkthroughs: [
      {
        id: 'hero',
        poster: sereneLivingDay,
        posterAlt: 'Daylight view of the Aparna Serene Park living room',
        video: serene('Herosection Aparna Serene Park.mp4'),
        title: 'Residence walkthrough',
        description:
          'A pass through the living room, family lounge, pooja, kitchen, and bedroom.',
        duration: '1:03',
      },
      {
        id: 'living-transform',
        poster: sereneLivingNight,
        posterAlt: 'Evening view of the Aparna Serene Park living room',
        video: serene('Architectural_interior_transform…_living.mp4'),
        title: 'Living room',
        description:
          'The living room from the site photograph to the finished timber wall and slatted screen.',
        duration: '0:08',
      },
      {
        id: 'tv-unit',
        poster: sereneFamily,
        posterAlt: 'Family lounge television wall',
        video: serene('Transforming_construction_into_l…_tv unit.mp4'),
        title: 'Television wall',
        description:
          'The family-lounge television unit from the carcass on site to the marble wall.',
        duration: '0:08',
      },
    ],
  },

  {
    slug: 'aparna-synergy-park-residence',
    title: 'Aparna Synergy Park Residence',
    category: 'Residential Interior',
    categories: ['Residential Interior'],
    subtitle: 'Apartment interior',
    location: 'Aparna Synergy Park, Hyderabad',
    year: '2025',
    status: 'Upcoming',
    image: synergyLiving,
    summary:
      'A warm apartment interior with an open living-dining volume, a family lounge, a modular kitchen, a dedicated pooja, study and kids rooms, guest bedrooms, and a lit master suite.',
    description: [
      'The living and dining rooms share one floor. A marble dining table sits under a crystal ring chandelier, with a timber display cabinet and a lit media wall holding the seating beyond.',
      'The family lounge opens to the glazing with a marble television wall, timber slats, and a floating console. The kitchen is handle-less in champagne laminate with under-cabinet and toe-kick light, and a full-height fridge run.',
      'Private rooms follow the same palette: a pooja, a study, kids bedrooms, guest bedrooms, and a master suite with a channelled headboard, glass wardrobe, and a circular backlit mirror.',
    ],
    gallery: [
      {
        src: synergyLiving,
        category: 'Living dining',
        aspect: 'landscape',
        alt: 'Open living and dining with a marble table, timber media wall, and lit display cabinet',
      },
      {
        src: synergyFamily,
        category: 'Family lounge',
        aspect: 'landscape',
        alt: 'Family lounge with a marble television wall, timber slats, and dining beyond',
      },
      {
        src: synergy('3 Study Room.jpg'),
        category: 'Study',
        aspect: 'landscape',
        alt: 'Study room with built-in timber work surface and shelving',
      },
      {
        src: synergyKitchen,
        category: 'Kitchen',
        aspect: 'portrait',
        alt: 'Handle-less kitchen in champagne laminate with under-cabinet and toe-kick lighting',
      },
      {
        src: synergy('5 Puja.jpg'),
        category: 'Pooja room',
        aspect: 'landscape',
        alt: 'Dedicated pooja niche within the apartment',
      },
      {
        src: synergy('7 Kids.png'),
        category: 'Kids room',
        aspect: 'portrait',
        alt: 'Kids bedroom with soft colour and built-in storage',
      },
      {
        src: synergy('6 Kids 2.jpg'),
        category: 'Kids room',
        aspect: 'landscape',
        alt: 'Second view of the kids bedroom',
      },
      {
        src: synergyMaster,
        category: 'Master bedroom',
        aspect: 'landscape',
        alt: 'Master bedroom with a channelled headboard, glass wardrobe, and circular backlit mirror',
      },
      {
        src: synergy('8 MB 2.png'),
        category: 'Master bedroom',
        aspect: 'landscape',
        alt: 'Second view of the master bedroom suite',
      },
      {
        src: synergy('10 Guest Bed 1.jpg'),
        category: 'Guest bedroom',
        aspect: 'landscape',
        alt: 'Guest bedroom with calm finishes and built-in storage',
      },
      {
        src: synergy('11Guest bed.jpg'),
        category: 'Guest bedroom',
        aspect: 'portrait',
        alt: 'Second guest bedroom',
      },
    ],
    facts: [
      { label: 'Location', value: 'Aparna Synergy Park, Hyderabad' },
      { label: 'Project Type', value: 'Residential Interior' },
      { label: 'Scope', value: 'Interior design and execution' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'Upcoming' },
      { label: 'Year', value: '2025' },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'One open living floor, warm timber and marble, and light held in the shelves and coves.',
      body: [
        'The apartment is organised around the living-dining volume. Timber, marble, and cove lighting run from the dining table through the family lounge so the public rooms read as one sequence.',
        'Private rooms keep the same materials at a quieter scale: channelled headboards, glass wardrobes, and backlit mirrors in the master suite, with dedicated rooms for study, kids, guests, and pooja.',
        'Storage is built in throughout — display cabinets, kitchen runs, and bedroom wardrobes — so furniture can stay light against the polished floor.',
      ],
    },
    materials: [
      'Timber veneer',
      'Marble',
      'Champagne laminate',
      'Glass wardrobe doors',
      'Cove LED lighting',
      'Large-format floor tile',
    ],
    materialsNote:
      'Read from the living-dining, family lounge, kitchen, and master bedroom.',
    materialStudies: [
      {
        name: 'Timber & marble',
        description:
          'Timber media wall and marble dining top in the open living-dining volume.',
        src: synergyLiving,
        alt: 'Living dining with timber media wall and marble table',
        objectPosition: 'center',
      },
      {
        name: 'Family lounge',
        description:
          'Marble television wall with timber slats, floating console, and warm shelf light.',
        src: synergyFamily,
        alt: 'Family lounge television wall',
        objectPosition: 'center',
      },
      {
        name: 'Kitchen light',
        description:
          'Under-cabinet and toe-kick lighting on handle-less champagne cabinets.',
        src: synergyKitchen,
        alt: 'Lit handle-less kitchen cabinets',
        objectPosition: 'center',
      },
      {
        name: 'Master suite',
        description:
          'Channelled headboard, glass wardrobe, and a circular backlit mirror.',
        src: synergyMaster,
        alt: 'Master bedroom with backlit circular mirror',
        objectPosition: 'center',
      },
    ],
    editorial: {
      src: synergyFamily,
      alt: 'Family lounge opening to the dining and glazing',
      text: 'The family lounge and dining share one floor, with warm light in the shelves and coves.',
    },
    processNote:
      'The sequence moves from the open living floor to the private rooms, then to the films.',
    process: [
      {
        step: '01',
        title: 'Living dining',
        description:
          'The marble table, timber media wall, and lit display cabinet set the public rooms.',
      },
      {
        step: '02',
        title: 'Family and kitchen',
        description:
          'The family lounge television wall and the handle-less kitchen complete the day-to-day rooms.',
      },
      {
        step: '03',
        title: 'Private rooms',
        description:
          'Study, kids, guest, pooja, and master suite follow the same warm palette.',
      },
      {
        step: '04',
        title: 'Walkthroughs',
        description:
          'The residence film and the site walkthrough show the rooms in sequence.',
      },
    ],
    outcome: {
      title: 'One warm apartment floor, from dining to master suite.',
      body: 'The visualizations show the living-dining, family lounge, kitchen, and bedrooms as finished. The films walk the same rooms and the site sequence.',
      src: synergyLiving,
      alt: 'Living dining at Aparna Synergy Park',
    },
    walkthrough: {
      poster: synergyLiving,
      posterAlt: 'Living dining at Aparna Synergy Park',
      video: synergy('Herosection-video.mp4'),
      title: 'Residence walkthrough',
      description:
        'A pass through the living-dining, family lounge, kitchen, and bedrooms.',
      duration: '1:36',
    },
    walkthroughs: [
      {
        id: 'hero',
        poster: synergyLiving,
        posterAlt: 'Living dining at Aparna Synergy Park',
        video: synergy('Herosection-video.mp4'),
        title: 'Residence walkthrough',
        description:
          'A pass through the living-dining, family lounge, kitchen, and bedrooms.',
        duration: '1:36',
      },
      {
        id: 'site',
        poster: synergyFamily,
        posterAlt: 'Family lounge at Aparna Synergy Park',
        video: synergy('Site images Walkthrough.mp4'),
        title: 'Site walkthrough',
        description: 'A short pass through the apartment on site.',
        duration: '0:20',
      },
    ],
  },

  {
    slug: 'sumit-residence',
    title: 'Sumit Residence',
    category: 'Residential Interior',
    categories: ['Residential Interior'],
    subtitle: 'Residence for Sumit',
    location: 'Private residence',
    year: '2025',
    status: 'Completed',
    image: sumitLiving,
    summary:
      'A full-home interior for Sumit, from the entrance porch through formal living, dining, kitchen, bedrooms, bathrooms, study, and a double-height volume.',
    description: [
      'The entrance porch sets a timber ceiling over stone cladding and warm lantern light. Inside, the formal living room holds cream seating, gold-toned wallpaper, and picture lights over a calm art wall.',
      'Dining and kitchen follow in a neutral palette: a formal dining table, a picture wall, a handwash niche, and a parallel kitchen with glass display cabinets and a geometric timber screen at the end of the run.',
      'Private rooms include the master bedroom with ensuite, kids bathroom, study and bar-cum-study, a walk-in wardrobe, and a double-height volume that opens the house vertically.',
    ],
    gallery: [
      {
        src: sumitPorch,
        category: 'Entrance',
        aspect: 'portrait',
        alt: 'Entrance porch with timber ceiling, stone cladding, and warm lantern light',
      },
      {
        src: sumitLiving,
        category: 'Formal living',
        aspect: 'landscape',
        alt: 'Formal living room with cream seating, gold wallpaper, and picture lights',
      },
      {
        src: sumitDining,
        category: 'Dining',
        aspect: 'landscape',
        alt: 'Dining room with a formal table and calm finishes',
      },
      {
        src: sumit('3 Picture wall.jpg'),
        category: 'Dining',
        aspect: 'landscape',
        alt: 'Picture wall beside the dining seating',
      },
      {
        src: sumit('4 Handwash.jpg'),
        category: 'Details',
        aspect: 'portrait',
        alt: 'Handwash niche with mirror and lighting',
      },
      {
        src: sumitKitchen,
        category: 'Kitchen',
        aspect: 'landscape',
        alt: 'Parallel kitchen with glass display cabinets and a geometric timber screen',
      },
      {
        src: sumit('5 Kitchen Fridge side.jpg'),
        category: 'Kitchen',
        aspect: 'landscape',
        alt: 'Kitchen fridge run and cabinetry',
      },
      {
        src: sumit('6 kitchen Hob side.jpg'),
        category: 'Kitchen',
        aspect: 'landscape',
        alt: 'Kitchen hob side with chimney and under-cabinet light',
      },
      {
        src: sumit('9 MB1.jpg'),
        category: 'Master bedroom',
        aspect: 'portrait',
        alt: 'Master bedroom suite',
      },
      {
        src: sumit('10 Bathroom MB.jpeg'),
        category: 'Bathroom',
        aspect: 'portrait',
        alt: 'Master bathroom',
      },
      {
        src: sumit('10.1 Bathroom MB.jpeg'),
        category: 'Bathroom',
        aspect: 'landscape',
        alt: 'Second view of the master bathroom',
      },
      {
        src: sumit('13 Bathroom kids.jpeg'),
        category: 'Bathroom',
        aspect: 'portrait',
        alt: 'Kids bathroom',
      },
      {
        src: sumit('13.1 Mirror Details.jpeg'),
        category: 'Details',
        aspect: 'portrait',
        alt: 'Bathroom mirror and lighting detail',
      },
      {
        src: sumit('11 Double height.jpg'),
        category: 'Double height',
        aspect: 'landscape',
        alt: 'Double-height volume inside the residence',
      },
      {
        src: sumit('12 Bar cum study.jpg'),
        category: 'Study',
        aspect: 'landscape',
        alt: 'Bar-cum-study with built-in storage',
      },
      {
        src: sumit('14 Study.jpeg'),
        category: 'Study',
        aspect: 'portrait',
        alt: 'Study desk and shelving',
      },
      {
        src: sumit('16 Walkinwardrobe.jpeg'),
        category: 'Wardrobe',
        aspect: 'portrait',
        alt: 'Walk-in wardrobe',
      },
      {
        src: sumit('16.1 Walkin Wardrobe 2.jpeg'),
        category: 'Wardrobe',
        aspect: 'portrait',
        alt: 'Second view of the walk-in wardrobe',
      },
      {
        src: sumit('Light fixture 1.jpeg'),
        category: 'Details',
        aspect: 'portrait',
        alt: 'Decorative light fixture detail',
      },
      {
        src: sumit('Lighting Fixture 2.jpeg'),
        category: 'Details',
        aspect: 'landscape',
        alt: 'Second lighting fixture detail',
      },
    ],
    facts: [
      { label: 'Location', value: 'Private residence' },
      { label: 'Client', value: 'Sumit' },
      { label: 'Project Type', value: 'Residential Interior' },
      { label: 'Scope', value: 'Interior design and execution' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'Completed' },
      { label: 'Year', value: '2025' },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'A calm formal sequence at the front of the house, with kitchen, bedrooms, and a double-height volume behind.',
      body: [
        'The house opens at the porch and moves into a formal living room of cream seating, gold-toned wallpaper, and picture lights. Dining and the picture wall continue that quiet public register.',
        'The kitchen is a parallel run with glass display cabinets and a geometric timber screen that closes the view without shutting light off. Bathrooms and the walk-in wardrobe keep the same neutral materials at a closer scale.',
        'A double-height volume and the study rooms give the house height and a place for work, so the formal rooms are not asked to do every job.',
      ],
    },
    materials: [
      'Timber',
      'Stone cladding',
      'Marble-look quartz',
      'Glass display cabinets',
      'Gold-toned wallpaper',
      'Large-format floor tile',
    ],
    materialsNote:
      'Read from the porch, formal living, kitchen, and bathroom details.',
    materialStudies: [
      {
        name: 'Porch timber',
        description:
          'Timber ceiling boards and stone cladding at the entrance porch.',
        src: sumitPorch,
        alt: 'Entrance porch with timber ceiling',
        objectPosition: 'center',
      },
      {
        name: 'Formal living',
        description:
          'Gold-toned wallpaper, picture lights, and cream seating in the living room.',
        src: sumitLiving,
        alt: 'Formal living room art wall',
        objectPosition: 'center',
      },
      {
        name: 'Kitchen screen',
        description:
          'Glass display cabinets and a geometric timber screen at the end of the kitchen run.',
        src: sumitKitchen,
        alt: 'Kitchen with geometric timber screen',
        objectPosition: 'center',
      },
      {
        name: 'Dining',
        description: 'Formal dining table and calm wall finishes.',
        src: sumitDining,
        alt: 'Dining room',
        objectPosition: 'center',
      },
    ],
    editorial: {
      src: sumitLiving,
      alt: 'Formal living room with picture lights',
      text: 'Picture lights and a quiet art wall set the tone for the formal living room.',
    },
    processNote:
      'The sequence moves from the porch through the public rooms to the private suite and details.',
    process: [
      {
        step: '01',
        title: 'Entrance',
        description:
          'The porch ceiling, stone cladding, and lantern light mark the arrival.',
      },
      {
        step: '02',
        title: 'Public rooms',
        description:
          'Formal living, dining, and kitchen establish the day-to-day sequence.',
      },
      {
        step: '03',
        title: 'Private suite',
        description:
          'Master bedroom, bathrooms, wardrobe, and study rooms complete the house.',
      },
      {
        step: '04',
        title: 'Walkthrough',
        description:
          'The residence film walks the finished rooms in one continuous pass.',
      },
    ],
    outcome: {
      title: 'A full house interior, from porch to double height.',
      body: 'The photographs cover the entrance, formal rooms, kitchen, bedrooms, bathrooms, and study spaces. The walkthrough ties those rooms into one sequence.',
      src: sumitLiving,
      alt: 'Formal living room at Sumit Residence',
    },
    walkthrough: {
      poster: sumitLiving,
      posterAlt: 'Formal living room at Sumit Residence',
      video: sumit('Sumit House Walkthrough.mp4'),
      title: 'Residence walkthrough',
      description:
        'A continuous pass through the finished rooms of the residence.',
      duration: '1:58',
    },
    walkthroughs: [
      {
        id: 'hero',
        poster: sumitLiving,
        posterAlt: 'Formal living room at Sumit Residence',
        video: sumit('Sumit House Walkthrough.mp4'),
        title: 'Residence walkthrough',
        description:
          'A continuous pass through the finished rooms of the residence.',
        duration: '1:58',
      },
    ],
  },

  {
    slug: 'tdca-corporate-interior',
    title: 'TDCA Corporate Interior',
    category: 'Corporate Interior',
    categories: ['Corporate Interior'],
    subtitle: 'Tanya Dewani & Associates',
    location: 'Hyderabad',
    year: '2025',
    status: 'Completed',
    image: tdcaReception,
    summary:
      'A corporate office interior for Tanya Dewani & Associates and Bizpros Support Services, from the main door through reception, open workstations, cabins, conference, cafe, and service rooms.',
    description: [
      'The office opens on a seamless white main door with a brass name plate for Tanya Dewani & Associates. Inside, the reception wall carries both Bizpros and TDCA signage above a marble-and-gold console, with a chevron metal screen looking through to the work floor.',
      'Open workstations sit on a pale polished floor under even downlights, with dark desk screens and a matching chevron partition. Private MD cabins are glazed rooms with frosted bands for seated privacy.',
      'Meeting and amenity rooms complete the plan: a conference room, a cafe, a pantry washroom, and a map wall that orients visitors at the edge of the floor.',
    ],
    gallery: [
      {
        src: tdcaDoor,
        category: 'Entrance',
        aspect: 'portrait',
        alt: 'Main office door with Tanya Dewani & Associates name plate',
      },
      {
        src: tdca('2_Entrance.jpeg.jpg'),
        category: 'Entrance',
        aspect: 'portrait',
        alt: 'Entrance lobby approaching reception',
      },
      {
        src: tdcaReception,
        category: 'Reception',
        aspect: 'portrait',
        alt: 'Reception wall with Bizpros and TDCA signage looking through to workstations',
      },
      {
        src: tdca('4 Map Wall.png'),
        category: 'Reception',
        aspect: 'landscape',
        alt: 'Map wall near the office entrance',
      },
      {
        src: tdca('5 Motivation wall.jpeg'),
        category: 'Work floor',
        aspect: 'landscape',
        alt: 'Motivation wall facing the open office',
      },
      {
        src: tdca('6 Motivation Wall looking in to workstation.jpeg'),
        category: 'Work floor',
        aspect: 'portrait',
        alt: 'Motivation wall looking into the workstation floor',
      },
      {
        src: tdcaWorkstation,
        category: 'Workstations',
        aspect: 'portrait',
        alt: 'Open workstations with dark desk screens and even downlights',
      },
      {
        src: tdcaCabin,
        category: 'Cabins',
        aspect: 'landscape',
        alt: 'Glazed MD cabin with frosted privacy band',
      },
      {
        src: tdca('9  MD cabin 1.jpeg'),
        category: 'Cabins',
        aspect: 'landscape',
        alt: 'Second view of the MD cabin',
      },
      {
        src: tdca('10 Conference.jpeg'),
        category: 'Conference',
        aspect: 'landscape',
        alt: 'Conference room',
      },
      {
        src: tdca('11 cafe.jpeg'),
        category: 'Cafe',
        aspect: 'landscape',
        alt: 'Office cafe',
      },
      {
        src: tdca('12 Pantry Washroom.jpeg'),
        category: 'Services',
        aspect: 'landscape',
        alt: 'Pantry washroom',
      },
    ],
    facts: [
      { label: 'Location', value: 'Hyderabad' },
      { label: 'Client', value: 'Tanya Dewani & Associates' },
      { label: 'Project Type', value: 'Corporate Interior' },
      { label: 'Scope', value: 'Interior design and execution' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'Completed' },
      { label: 'Year', value: '2025' },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'A clear arrival, an open work floor, and glazed cabins that keep daylight in the plan.',
      body: [
        'The office is organised as a short arrival sequence — door, reception, screen — then an open floor of workstations. Signage for both practices sits on one wall so visitors understand the shared floor immediately.',
        'Chevron metal screens do the work of partitions without closing the rooms. Glazed MD cabins use frosted bands at seated height so privacy and daylight can coexist.',
        'Conference, cafe, and service rooms sit at the edge of the plan so the work floor stays clear.',
      ],
    },
    materials: [
      'Gloss white laminate',
      'Stone-effect wall finish',
      'Marble console',
      'Brass and gold metal',
      'Chevron metal screen',
      'Frosted glass',
      'Large-format floor tile',
    ],
    materialsNote:
      'Read from the entrance, reception, workstations, and MD cabin.',
    materialStudies: [
      {
        name: 'Entrance',
        description:
          'Seamless white door face with a brass name plate and stone wall beside it.',
        src: tdcaDoor,
        alt: 'Main office door',
        objectPosition: 'center',
      },
      {
        name: 'Reception',
        description:
          'Stone-effect wall, dual practice signage, and a marble-and-gold console.',
        src: tdcaReception,
        alt: 'Reception wall and console',
        objectPosition: 'center',
      },
      {
        name: 'Work floor',
        description:
          'White desks, dark screens, and a chevron partition on the polished floor.',
        src: tdcaWorkstation,
        alt: 'Open workstation floor',
        objectPosition: 'center',
      },
      {
        name: 'Cabin glass',
        description:
          'Floor-to-ceiling glazing with a frosted privacy band around the MD desk.',
        src: tdcaCabin,
        alt: 'Glazed MD cabin',
        objectPosition: 'center',
      },
    ],
    editorial: {
      src: tdcaReception,
      alt: 'Reception looking through to the work floor',
      text: 'The reception screen keeps a view into the workstations without closing the arrival.',
    },
    processNote:
      'The sequence follows arrival, the open floor, then the enclosed rooms and films.',
    process: [
      {
        step: '01',
        title: 'Arrival',
        description:
          'Main door, entrance lobby, and reception establish the two practice names.',
      },
      {
        step: '02',
        title: 'Work floor',
        description:
          'Motivation wall and open workstations set the day-to-day floor.',
      },
      {
        step: '03',
        title: 'Rooms',
        description:
          'MD cabins, conference, cafe, and pantry washroom complete the brief.',
      },
      {
        step: '04',
        title: 'Walkthroughs',
        description:
          'The hero film and the site walkthrough show the finished office in sequence.',
      },
    ],
    outcome: {
      title: 'A clear corporate floor for two practices under one roof.',
      body: 'The photographs cover the door, reception, workstations, cabins, and amenity rooms. The films walk the same plan from arrival to the open floor.',
      src: tdcaReception,
      alt: 'TDCA reception looking into the workstation floor',
    },
    walkthrough: {
      poster: tdcaReception,
      posterAlt: 'TDCA reception looking into the workstation floor',
      video: tdca('Herosection-video.mp4'),
      title: 'Office walkthrough',
      description:
        'A pass from the entrance through reception, workstations, and cabins.',
      duration: '1:01',
    },
    walkthroughs: [
      {
        id: 'hero',
        poster: tdcaReception,
        posterAlt: 'TDCA reception looking into the workstation floor',
        video: tdca('Herosection-video.mp4'),
        title: 'Office walkthrough',
        description:
          'A pass from the entrance through reception, workstations, and cabins.',
        duration: '1:01',
      },
      {
        id: 'site',
        poster: tdcaWorkstation,
        posterAlt: 'TDCA open workstation floor',
        video: tdca('TDCA_Office_Site_Walkthrough.mp4'),
        title: 'Site walkthrough',
        description: 'A walkthrough of the office floor on site.',
        duration: '1:16',
      },
    ],
  },

  {
    slug: 'hill-house-pinjore',
    title: 'Hill House Pinjore',
    category: 'Architecture',
    categories: ['Architecture'],
    subtitle: 'Residential architecture',
    location: 'Pinjore',
    year: '2026',
    status: 'In progress',
    image: hillExterior,
    summary:
      'A contemporary hill house in Pinjore, with a timber-lined porch, glass balconies, a gated arrival, and interior work still underway under a coffered false ceiling.',
    description: [
      'The facade reads as stacked volumes at night: a timber-lined ground-floor porch, a glass-railed balcony above, and horizontal grey cladding on the projecting wing.',
      'Arrival is through a dark metal gate set in stone pillars, with warm downlights in the porch ceiling and lantern light on the boundary wall.',
      'Inside, a skylit corridor and a coffered tray ceiling are already set. Wall plaster and lighting fixtures are still open while carpentry and finishes continue.',
    ],
    gallery: [
      {
        src: hillExterior,
        category: 'Exterior',
        aspect: 'landscape',
        alt: 'Night view of the hill house with timber porch ceiling and glass balcony',
      },
      {
        src: hillGate,
        category: 'Exterior',
        aspect: 'portrait',
        alt: 'Front gate and timber-lined entry porch at night',
      },
      {
        src: hill('Backyard.jpeg'),
        category: 'Exterior',
        aspect: 'portrait',
        alt: 'Skylit outdoor corridor with tiled dado and timber door',
      },
      {
        src: hillPorch,
        category: 'Details',
        aspect: 'landscape',
        alt: 'Timber porch ceiling with white fan and black canister lights',
      },
      {
        src: hill('WhatsApp Image 2024-09-12 at 12.12.36 PM (12).jpeg'),
        category: 'Exterior',
        aspect: 'portrait',
        alt: 'Exterior elevation detail',
      },
      {
        src: hill('WhatsApp Image 2024-09-12 at 12.12.36 PM (13).jpeg'),
        category: 'Exterior',
        aspect: 'portrait',
        alt: 'Second exterior elevation detail',
      },
      {
        src: hill('WhatsApp Image 2024-09-12 at 12.12.36 PM (14).jpeg'),
        category: 'Exterior',
        aspect: 'portrait',
        alt: 'Third exterior elevation detail',
      },
      {
        src: hill('WhatsApp Image 2026-10-07 at 12.05.07 PM (2).jpeg'),
        category: 'On site',
        aspect: 'portrait',
        alt: 'Construction progress on site',
      },
      {
        src: hill('WhatsApp Image 2026-10-07 at 12.18.44 PM.jpeg'),
        category: 'On site',
        aspect: 'portrait',
        alt: 'Interior work during construction',
      },
      {
        src: hill('WhatsApp Image 2026-10-07 at 12.18.47 PM (1).jpeg'),
        category: 'On site',
        aspect: 'landscape',
        alt: 'Site photograph of the house under construction',
      },
      {
        src: hill('WhatsApp Image 2026-11-12 at 11.20.18 AM (1).jpeg'),
        category: 'On site',
        aspect: 'landscape',
        alt: 'Coffered tray ceiling with lighting cutouts still open',
      },
      {
        src: hill('WhatsApp Image 2026-11-12 at 11.20.18 AM.jpeg'),
        category: 'On site',
        aspect: 'portrait',
        alt: 'Interior progress photograph',
      },
      {
        src: hill('WhatsApp Image 2026-11-12 at 11.20.19 AM (1).jpeg'),
        category: 'On site',
        aspect: 'landscape',
        alt: 'Second interior progress photograph',
      },
      {
        src: hill('WhatsApp Image 2026-11-12 at 11.20.19 AM.jpeg'),
        category: 'On site',
        aspect: 'portrait',
        alt: 'Third interior progress photograph',
      },
    ],
    facts: [
      { label: 'Location', value: 'Pinjore' },
      { label: 'Project Type', value: 'Architecture' },
      { label: 'Scope', value: 'Architecture and interiors' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'In progress' },
      { label: 'Year', value: '2026' },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'Stacked volumes, warm timber under the overhangs, and glass balconies that hold the night light.',
      body: [
        'The house is organised as recessed and projecting volumes so the porch, balcony, and side wing each keep their own depth. Timber ceilings under the overhangs warm the grey and white facade.',
        'Glass railings keep the upper floor open to the view without a heavy balustrade. The gate and stone pillars set a clear arrival before the timber porch.',
        'Inside, a skylit corridor and a coffered ceiling prepare the rooms for light and proportion while finishes continue.',
      ],
    },
    materials: [
      'Timber porch ceiling',
      'Horizontal cladding',
      'Glass balcony railing',
      'Stone gate pillars',
      'Gypsum false ceiling',
      'Large-format wall tile',
    ],
    materialsNote:
      'Read from the night elevations, porch ceiling, and the coffered ceiling on site.',
    materialStudies: [
      {
        name: 'Facade',
        description:
          'Timber-lined overhangs, glass balcony, and grey horizontal cladding at night.',
        src: hillExterior,
        alt: 'Hill house facade at night',
        objectPosition: 'center',
      },
      {
        name: 'Arrival',
        description:
          'Dark metal gate, stone pillars, and warm porch downlights.',
        src: hillGate,
        alt: 'Front gate and porch',
        objectPosition: 'center',
      },
      {
        name: 'Porch timber',
        description:
          'Polished timber ceiling boards with a white fan and black canister lights.',
        src: hillPorch,
        alt: 'Timber porch ceiling detail',
        objectPosition: 'center',
      },
      {
        name: 'Ceiling',
        description:
          'Coffered tray ceiling with lighting cutouts still open on site.',
        src: hill('WhatsApp Image 2026-11-12 at 11.20.18 AM (1).jpeg'),
        alt: 'Coffered ceiling during construction',
        objectPosition: 'center',
      },
    ],
    editorial: {
      src: hillExterior,
      alt: 'Hill house facade at night',
      text: 'Warm timber under the overhangs holds the night light against the grey cladding.',
    },
    processNote:
      'The sequence moves from the finished exterior to the interior work still open on site.',
    process: [
      {
        step: '01',
        title: 'Facade',
        description:
          'The porch, balcony, and cladding set the house as seen from the street at night.',
      },
      {
        step: '02',
        title: 'Arrival',
        description:
          'Gate, pillars, and timber porch ceiling mark the entrance.',
      },
      {
        step: '03',
        title: 'Interior shell',
        description:
          'Skylit corridor and coffered ceiling are fixed while plaster and fixtures continue.',
      },
      {
        step: '04',
        title: 'Film',
        description:
          'A short on-site film walks the house as work progresses.',
      },
    ],
    outcome: {
      title: 'A finished night facade, with the rooms still open.',
      body: 'The elevations show the timber porch and glass balcony complete. On site, ceilings and corridors are set while finishes continue inside.',
      src: hillExterior,
      alt: 'Hill House Pinjore at night',
    },
    films: [
      {
        id: 'site',
        poster: hillExterior,
        posterAlt: 'Hill House Pinjore at night',
        video: hill('WhatsApp Video 2026-11-12 at 11.20.19 AM.mp4'),
        title: 'Site walkthrough',
        description: 'A short pass through the house on site.',
        duration: '0:14',
      },
    ],
  },

  {
    slug: 'hospitality-interiors',
    title: 'Hospitality Interiors',
    category: 'Hospitality',
    categories: ['Hospitality'],
    subtitle: 'Hotel interiors',
    location: 'Hospitality property',
    year: '2025',
    status: 'Completed',
    image: hospitalityLobby,
    summary:
      'A hospitality interior spanning a glazed lobby, a double-height reception, restaurant and lounge seating, twin and queen guest rooms, and the illuminated hotel facade at dusk.',
    description: [
      'The lobby opens through a full-height glass wall to the courtyard, with topiary planters on the polished floor and a glass-fronted dining room to one side.',
      'Reception sits under a double-height curtain wall with teardrop pendants, facing a lounge and the restaurant beyond a glass partition.',
      'Guest rooms keep a calm palette of grey headboards, dark flooring, and warm accent textiles, with twin and queen layouts and a desk for longer stays.',
    ],
    gallery: [
      {
        src: hospitality('2.jpg'),
        category: 'Lobby',
        aspect: 'landscape',
        alt: 'Glazed hotel lobby looking out to the courtyard',
      },
      {
        src: hospitalityLobby,
        category: 'Reception',
        aspect: 'landscape',
        alt: 'Double-height reception desk with restaurant beyond the glass partition',
      },
      {
        src: hospitalityFacade,
        category: 'Exterior',
        aspect: 'landscape',
        alt: 'Hotel facade illuminated at dusk',
      },
      {
        src: hospitalityTwin,
        category: 'Guest rooms',
        aspect: 'portrait',
        alt: 'Twin guest room with tufted headboards and orange accent textiles',
      },
      {
        src: hospitality('6.jpg'),
        category: 'Guest rooms',
        aspect: 'landscape',
        alt: 'Guest room interior',
      },
      {
        src: hospitality('7.jpg'),
        category: 'Guest rooms',
        aspect: 'landscape',
        alt: 'Second guest room interior',
      },
      {
        src: hospitality('8.jpg'),
        category: 'Guest rooms',
        aspect: 'landscape',
        alt: 'Queen guest room with luggage rack and desk',
      },
      {
        src: hospitality('9.jpg'),
        category: 'Guest rooms',
        aspect: 'landscape',
        alt: 'Third guest room interior',
      },
      {
        src: hospitality('10.jpg'),
        category: 'Guest rooms',
        aspect: 'landscape',
        alt: 'Fourth guest room interior',
      },
    ],
    facts: [
      { label: 'Location', value: 'Hospitality property' },
      { label: 'Project Type', value: 'Hospitality' },
      { label: 'Scope', value: 'Interior design and execution' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'Completed' },
      { label: 'Year', value: '2025' },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'A bright glazed lobby, a tall reception, and guest rooms that stay quiet against warm accents.',
      body: [
        'The public floor is organised around glass — the entrance wall, the restaurant partition, and the overlook above reception — so daylight and views do the work of decoration.',
        'Reception is a double-height pause with dark stone, tall drapes, and pendant light. Lounge seating softens the edge between lobby and dining.',
        'Guest rooms share one language of grey headboards, dark floors, and a single warm textile accent so the rooms feel related without looking identical.',
      ],
    },
    materials: [
      'Polished stone floor',
      'Dark stone reception',
      'Glass partitions',
      'Tufted fabric headboards',
      'Dark timber flooring',
      'Warm pendant lighting',
    ],
    materialsNote:
      'Read from the lobby, reception, facade, and guest rooms.',
    materialStudies: [
      {
        name: 'Lobby glass',
        description:
          'Full-height entrance glass with topiary planters on the polished floor.',
        src: hospitality('2.jpg'),
        alt: 'Hotel lobby glass wall',
        objectPosition: 'center',
      },
      {
        name: 'Reception',
        description:
          'Dark stone desk under a double-height curtain wall and teardrop pendants.',
        src: hospitalityLobby,
        alt: 'Hotel reception desk',
        objectPosition: 'center',
      },
      {
        name: 'Facade',
        description:
          'White hotel volume with warm room light at dusk.',
        src: hospitalityFacade,
        alt: 'Hotel facade at dusk',
        objectPosition: 'center',
      },
      {
        name: 'Guest room',
        description:
          'Twin beds with tufted headboards and orange accent runners.',
        src: hospitalityTwin,
        alt: 'Twin guest room',
        objectPosition: 'center',
      },
    ],
    editorial: {
      src: hospitalityLobby,
      alt: 'Reception looking toward the restaurant',
      text: 'Reception holds the double-height volume while the restaurant stays behind glass.',
    },
    processNote:
      'The sequence moves from the public lobby to the rooms and the night facade.',
    process: [
      {
        step: '01',
        title: 'Lobby',
        description:
          'The glazed entrance and courtyard view set the arrival.',
      },
      {
        step: '02',
        title: 'Reception',
        description:
          'The double-height desk, lounge, and restaurant complete the public floor.',
      },
      {
        step: '03',
        title: 'Guest rooms',
        description:
          'Twin and queen rooms share the grey, dark timber, and warm accent palette.',
      },
      {
        step: '04',
        title: 'Facade',
        description:
          'The illuminated elevation shows the hotel as seen from the street at dusk.',
      },
    ],
    outcome: {
      title: 'A calm hospitality floor, from lobby to guest room.',
      body: 'The photographs cover the glazed lobby, reception, restaurant edge, guest rooms, and the night facade as finished.',
      src: hospitalityLobby,
      alt: 'Hospitality reception and restaurant',
    },
  },

  {
    slug: 'oasis-corporate-office',
    title: 'Oasis Corporate Office',
    category: 'Corporate Interior',
    categories: ['Corporate Interior'],
    subtitle: 'Sadguru Healthcare',
    location: 'Hyderabad',
    year: '2025',
    status: 'Completed',
    image: oasisReception,
    summary:
      'A corporate office for Sadguru Healthcare and Oasis, from the branded facade and marble reception through lounge seating, conference rooms, and the open work floor.',
    description: [
      'The facade carries the Sadguru Healthcare lotus mark and the Oasis wordmark on a grey stone wall beside blue-tinted upper windows.',
      'Inside, a black marble reception desk sits against a backlit white logo wall, with a multi-brand directory plaque on the textured grey side wall.',
      'A glazed lounge faces the street, and a long conference room holds a marble table, navy chairs, and paired art at the far doors. Supporting rooms complete the corporate floor.',
    ],
    gallery: [
      {
        src: oasisFacade,
        category: 'Exterior',
        aspect: 'landscape',
        alt: 'Oasis and Sadguru Healthcare facade with stone feature wall',
      },
      {
        src: oasisReception,
        category: 'Reception',
        aspect: 'landscape',
        alt: 'Black marble reception desk with Sadguru Healthcare logo wall',
      },
      {
        src: oasis('2.jpg'),
        category: 'Reception',
        aspect: 'landscape',
        alt: 'Reception desk looking out to the glazed lounge',
      },
      {
        src: oasis('8.jpg'),
        category: 'Lounge',
        aspect: 'landscape',
        alt: 'Lobby lounge seating beside the glass entrance',
      },
      {
        src: oasisConference,
        category: 'Conference',
        aspect: 'landscape',
        alt: 'Conference room with marble table and navy chairs',
      },
      {
        src: oasis('4.jpg'),
        category: 'Work floor',
        aspect: 'portrait',
        alt: 'Office interior view',
      },
      {
        src: oasis('4 copy.jpeg'),
        category: 'Work floor',
        aspect: 'landscape',
        alt: 'Second office interior view',
      },
      {
        src: oasis('7.jpg'),
        category: 'Work floor',
        aspect: 'landscape',
        alt: 'Third office interior view',
      },
      {
        src: oasis('9.jpg'),
        category: 'Work floor',
        aspect: 'portrait',
        alt: 'Fourth office interior view',
      },
      {
        src: oasis('9 copy.jpeg'),
        category: 'Work floor',
        aspect: 'landscape',
        alt: 'Fifth office interior view',
      },
      {
        src: oasis('10.jpg'),
        category: 'Work floor',
        aspect: 'landscape',
        alt: 'Sixth office interior view',
      },
      {
        src: oasis('11.jpg'),
        category: 'Work floor',
        aspect: 'landscape',
        alt: 'Seventh office interior view',
      },
    ],
    facts: [
      { label: 'Location', value: 'Hyderabad' },
      { label: 'Client', value: 'Sadguru Healthcare / Oasis' },
      { label: 'Project Type', value: 'Corporate Interior' },
      { label: 'Scope', value: 'Interior design and execution' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'Completed' },
      { label: 'Year', value: '2025' },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'A clear branded arrival, a quiet lounge at the glass, and meeting rooms that stay formal.',
      body: [
        'The office announces itself on the street with stone, the lotus mark, and the Oasis wordmark, then settles into a dark marble desk against a bright logo wall.',
        'Lounge seating behind glass keeps waiting close to daylight without interrupting the desk. A directory plaque gathers the related brands in one place.',
        'The conference room is a long formal table under linear light, with art and doors at the far end so meetings feel separate from the work floor.',
      ],
    },
    materials: [
      'Grey stone cladding',
      'Black marble',
      'Backlit acrylic logo wall',
      'Textured grey plaster',
      'Glazed partitions',
      'Linear LED lighting',
    ],
    materialsNote:
      'Read from the facade, reception, lounge, and conference room.',
    materialStudies: [
      {
        name: 'Facade',
        description:
          'Grey stone feature wall with Sadguru and Oasis signage beside blue glass.',
        src: oasisFacade,
        alt: 'Oasis corporate facade',
        objectPosition: 'center',
      },
      {
        name: 'Reception',
        description:
          'Black marble desk against a backlit white logo panel.',
        src: oasisReception,
        alt: 'Sadguru Healthcare reception',
        objectPosition: 'center',
      },
      {
        name: 'Lounge',
        description:
          'Glazed waiting lounge with daylight from the street.',
        src: oasis('8.jpg'),
        alt: 'Office lounge seating',
        objectPosition: 'center',
      },
      {
        name: 'Conference',
        description:
          'Long marble table, navy chairs, and paired art at the far doors.',
        src: oasisConference,
        alt: 'Conference room',
        objectPosition: 'center',
      },
    ],
    editorial: {
      src: oasisReception,
      alt: 'Reception desk and logo wall',
      text: 'The logo wall and marble desk hold the arrival for both Sadguru and Oasis.',
    },
    processNote:
      'The sequence follows the street facade into reception, lounge, and meeting rooms.',
    process: [
      {
        step: '01',
        title: 'Facade',
        description:
          'Stone cladding and brand marks set the office on the street.',
      },
      {
        step: '02',
        title: 'Reception',
        description:
          'The marble desk and logo wall establish the indoor arrival.',
      },
      {
        step: '03',
        title: 'Lounge',
        description:
          'Glazed seating keeps visitors in daylight beside the desk.',
      },
      {
        step: '04',
        title: 'Conference',
        description:
          'The long meeting room completes the formal corporate rooms.',
      },
    ],
    outcome: {
      title: 'A branded healthcare office with a clear arrival.',
      body: 'The photographs cover the Oasis facade, reception, lounge, conference room, and supporting work spaces as finished.',
      src: oasisReception,
      alt: 'Oasis corporate reception',
    },
  },

  {
    slug: 'farm-house-interiors',
    title: 'Farm House Interiors',
    category: 'Residential Interior',
    categories: ['Residential Interior', 'Architecture'],
    subtitle: 'Farm house villa',
    location: 'Farm house estate',
    year: '2025',
    status: 'Completed',
    image: farmExterior,
    summary:
      'A contemporary farm house villa with a pool terrace and outdoor cinema wall, paired with interiors for a master suite, stone living rooms, and an island kitchen looking out to the garden.',
    description: [
      'The villa is a white two-storey mass around an L-shaped pool, with an elevated outdoor cinema screen facing the terrace lounge.',
      'Inside, living rooms use a stone feature wall, a linear fireplace, and cream seating against sheer curtains. The kitchen island extends into a timber dining slab under a red drum pendant, with the pool visible beyond.',
      'The master suite combines a tufted headboard bedroom with a lounge bay at the garden window. A landscaped site plan sets the drive, planting, and water elements around the house.',
    ],
    gallery: [
      {
        src: farmExterior,
        category: 'Exterior',
        aspect: 'landscape',
        alt: 'Farm house villa with pool terrace and outdoor cinema screen at dusk',
      },
      {
        src: farm('3.jpg'),
        category: 'Site plan',
        aspect: 'landscape',
        alt: 'Landscaped site plan with drive, planting, and water features',
      },
      {
        src: farmLiving,
        category: 'Living room',
        aspect: 'landscape',
        alt: 'Living room with stone feature wall, media console, and linear fireplace',
      },
      {
        src: farm('6.jpg'),
        category: 'Living room',
        aspect: 'landscape',
        alt: 'Second living room view with cream seating and sheer curtains',
      },
      {
        src: farm('4.jpg'),
        category: 'Living room',
        aspect: 'landscape',
        alt: 'Third living room interior',
      },
      {
        src: farm('7.jpg'),
        category: 'Living room',
        aspect: 'landscape',
        alt: 'Fourth living room interior',
      },
      {
        src: farmKitchen,
        category: 'Kitchen',
        aspect: 'landscape',
        alt: 'Kitchen island with timber dining extension and red drum pendant',
      },
      {
        src: farmBedroom,
        category: 'Master suite',
        aspect: 'landscape',
        alt: 'Master suite with tufted headboard and lounge seating at the window',
      },
      {
        src: farm('9.jpg'),
        category: 'Interior',
        aspect: 'landscape',
        alt: 'Additional farm house interior view',
      },
    ],
    facts: [
      { label: 'Location', value: 'Farm house estate' },
      { label: 'Project Type', value: 'Residential Interior' },
      { label: 'Scope', value: 'Architecture and interiors' },
      { label: 'Style', value: 'Contemporary' },
      { label: 'Status', value: 'Completed' },
      { label: 'Year', value: '2025' },
    ],
    concept: {
      title: 'Design Concept',
      description:
        'A villa that opens to the pool, with interiors of stone, timber, and quiet seating.',
      body: [
        'Outside, the house turns around the pool and an outdoor cinema wall so evenings can move between water, terrace, and screen.',
        'Living rooms keep a stone wall, a linear fire, and soft seating as the quiet centre. Sheer curtains hold the garden light without glare.',
        'The kitchen island becomes a dining table under a single strong pendant, so cooking and gathering share one run looking out to the pool.',
      ],
    },
    materials: [
      'White facade',
      'Stone feature wall',
      'Timber dining slab',
      'Grey marble floor',
      'Sheer curtains',
      'Linear fireplace',
    ],
    materialsNote:
      'Read from the villa exterior, living rooms, kitchen, and master suite.',
    materialStudies: [
      {
        name: 'Villa',
        description:
          'White volumes, pool terrace, and outdoor cinema screen at dusk.',
        src: farmExterior,
        alt: 'Farm house exterior with pool',
        objectPosition: 'center',
      },
      {
        name: 'Stone living',
        description:
          'Stone feature wall with recessed media panel and linear fireplace.',
        src: farmLiving,
        alt: 'Living room stone wall',
        objectPosition: 'center',
      },
      {
        name: 'Kitchen',
        description:
          'Cream island, timber dining extension, and red drum pendant.',
        src: farmKitchen,
        alt: 'Kitchen and dining island',
        objectPosition: 'center',
      },
      {
        name: 'Master suite',
        description:
          'Tufted headboard bedroom with a lounge bay at the garden window.',
        src: farmBedroom,
        alt: 'Master suite lounge and bed',
        objectPosition: 'center',
      },
    ],
    editorial: {
      src: farmExterior,
      alt: 'Farm house villa and pool at dusk',
      text: 'The outdoor cinema wall and pool terrace turn the villa toward evening gathering.',
    },
    processNote:
      'The sequence moves from the villa and site plan into the living rooms, kitchen, and suite.',
    process: [
      {
        step: '01',
        title: 'Villa',
        description:
          'The white mass, pool, and cinema wall set the outdoor rooms.',
      },
      {
        step: '02',
        title: 'Site',
        description:
          'The landscaped plan places drive, planting, and water around the house.',
      },
      {
        step: '03',
        title: 'Living',
        description:
          'Stone walls, fire, and soft seating establish the indoor public rooms.',
      },
      {
        step: '04',
        title: 'Kitchen and suite',
        description:
          'The island dining run and master suite complete the interiors.',
      },
    ],
    outcome: {
      title: 'A farm house that opens to pool and garden.',
      body: 'The visualizations show the villa exterior, site plan, living rooms, kitchen, and master suite as a finished contemporary retreat.',
      src: farmExterior,
      alt: 'Farm house villa exterior',
    },
  },
]
