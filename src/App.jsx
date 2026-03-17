import React, { useMemo, useState } from "react";
import {
  Car,
  Bike,
  Briefcase,
  Users,
  Wrench,
  Home,
  Calendar,
  MapPin,
  Coins,
  BedDouble,
  Globe2,
  IdCard,
  XCircle,
  Clock3,
  TriangleAlert,
  Hammer,
  CheckCircle2,
  ArrowLeft,
  ChevronRight,
  Package,
  Monitor,
  House,
  UserRound,
  LogIn,
} from "lucide-react";

const DEMO_USERS = [
  { id: "21458731904", apartment: "Bygg A · Leil. 101", license: "DL-48291573", verified: true },
  { id: "90834127566", apartment: "Bygg A · Leil. 101", license: "", verified: false },
  { id: "13579024681", apartment: "Bygg A · Leil. 204", license: "DL-70428196", verified: true },
  { id: "66241890537", apartment: "Bygg B · Leil. 305", license: "", verified: false },
  { id: "48120573916", apartment: "Bygg C · Leil. 112", license: "DL-19386425", verified: true },
  { id: "72064183955", apartment: "Bygg C · Leil. 112", license: "", verified: false },
  { id: "34918502764", apartment: "Bygg D · Leil. 418", license: "DL-56027184", verified: true },
  { id: "50627419388", apartment: "Bygg D · Leil. 418", license: "", verified: false },
  { id: "81730546219", apartment: "Bygg E · Leil. 203", license: "DL-91823564", verified: true },
  { id: "29486173540", apartment: "Bygg E · Leil. 203", license: "", verified: false },
  { id: "64197028513", apartment: "Bygg F · Leil. 509", license: "DL-24715089", verified: true },
  { id: "75813469027", apartment: "Bygg F · Leil. 509", license: "", verified: false },
  { id: "32058476195", apartment: "Bygg G · Leil. 307", license: "DL-63190847", verified: true },
  { id: "98614235708", apartment: "Bygg G · Leil. 307", license: "", verified: false },
  { id: "57320641894", apartment: "Bygg B · Leil. 305", license: "DL-87542160", verified: true },
  { id: "16092837465", apartment: "Ikke registrert", license: "", verified: false },
];

const LICENSE_OPTIONS = [
  "Ingen registrert",
  "DL-48291573",
  "DL-70428196",
  "DL-19386425",
  "DL-56027184",
  "DL-91823564",
  "DL-24715089",
  "DL-63190847",
  "DL-87542160",
];

const HELP_SERVICES_NB = [
  "Hundelufting",
  "Vanning av planter",
  "Snømåking",
  "Bære varer",
  "Enkel teknisk hjelp",
  "Passe kjæledyr",
  "Gressklipping",
  "Hjelp med flytting",
  "Handlehjelp",
  "Låne ut lite utstyr",
  "Annet",
];

const HELP_SERVICES_EN = [
  "Dog walking",
  "Watering plants",
  "Snow shoveling",
  "Carrying groceries",
  "Basic tech help",
  "Pet sitting",
  "Lawn mowing",
  "Help with moving",
  "Shopping help",
  "Lend small equipment",
  "Other",
];

const initialBookingsByUser = {
  "21458731904": [
    {
      id: "b1",
      type: "Mobilitet",
      name: "Nissan Leaf",
      time: "Onsdag 14:00–18:00",
      remaining: "2 t 10 min",
      status: "Aktiv",
      location: "Odden mobilitetspunkt",
    },
    {
      id: "b2",
      type: "Rom",
      name: "Møterom M2",
      time: "Torsdag 09:00–11:00",
      remaining: "1 dag",
      status: "Aktiv",
      location: "Nabolagshus, 1. etasje",
    },
  ],
};

const copy = {
  nb: {
    demoForOdden: "Demo for Odden",
    appTitle: "Odden Share",
    appDesc:
      "En enkel demonstrasjon av hvordan en digital plattform for delingsøkonomi i Odden kan fungere.",
    chooseIdentity: "Velg demoidentitet",
    enterDemo: "Gå inn i demoen",
    identityText:
      "Velg en fiktiv demoidentitet for å åpne løsningen. Dette simulerer innlogging for beboere i området.",
    home: "Forside",
    mobility: "Mobilitet",
    spaces: "Rom og lokaler",
    guest: "Gjesteløsninger",
    tools: "Verktøy",
    help: "Nabohjelp",
    bookings: "Mine bookinger",
    open: "Åpne",
    reserve: "Reserver",
    bookRoom: "Book rom",
    back: "Tilbake",
    pointsBalance: "Poengsaldo",
    pointsDesc:
      "Poeng brukes til nabohjelp og kan også gi små prisfordeler på enkelte tjenester i demoen.",
    pointsMore:
      "I denne demoen er 1 poeng satt til ca. 5 kr i rabatt på utvalgte nabotjenester eller fellesaktiviteter.",
    heroTitle: "En plattform for deling i hverdagen",
    heroText:
      "Plattformen samler mobilitet, fellesrom, gjesteløsninger, verktøy og nabohjelp på ett sted. Beboere kan booke, betale, bruke poeng og få oversikt over egne reservasjoner.",
    seeMobility: "Se mobilitet",
    seeSpaces: "Se fellesrom",
    profileTitle: "Demoidentitet",
    profileText:
      "Valgt bruker brukes for å vise hvordan reservasjon, verifisering og nabohjelp kan fungere.",
    residentId: "Demo-ID",
    apartment: "Boenhet",
    license: "Førerkort-ID",
    verifyLicense: "Bekreft førerkort for billeie",
    verified: "Verifisert for billeie",
    invalidApartment:
      "Denne demo-brukeren er ikke registrert i en godkjent boenhet i området.",
    invalidLicense:
      "Denne demo-brukeren har ikke registrert førerkort for billeie.",
    mobilityTitle: "Mobilitet",
    mobilityText:
      "Velg en kategori for å se tilgjengelige transportløsninger i området.",
    spacesTitle: "Rom og lokaler",
    spacesText:
      "Velg en kategori for å se tilgjengelige rom, kapasitet og utstyr.",
    guestTitle: "Gjesteløsninger",
    guestText:
      "Velg en kategori for å se detaljene for gjesteleiligheter eller deling ved fravær.",
    toolsTitle: "Verktøybibliotek",
    toolsText:
      "Velg kategori for å se verktøy, pakker, pris per time eller per dag og lagerplass.",
    helpTitle: "Nabohjelp og poeng",
    helpText:
      "Her kan beboere be om hjelp, tilby hjelp og bygge opp en profil med hva de kan bidra med.",
    bookingsTitle: "Mine bookinger",
    bookingsText:
      "Her får brukeren oversikt over egne aktive reservasjoner.",
    confirmationTitle: "Bekreftelse",
    confirmationText:
      "Eksempel på hvordan systemet kan vise en booking eller en forespørsel etter at brukeren har fullført et valg.",
    actionRegistered: "Handling registrert",
    selectedItem: "Valgt element",
    requestExample: "Be om hjelp",
    offerExample: "Tilby hjelp",
    sendRequest: "Send forespørsel",
    sendOffer: "Lagre tilbud",
    active: "Aktiv",
    cancel: "Avbestill",
    remaining: "Gjenstående tid",
    alerts:
      "Her kan systemet vise at brukeren har fullført en booking eller sendt en forespørsel.",
    onlyVerifiedCars: "Billeie krever verifisert førerkort i demoen.",
    confirmDone:
      "Førerkort er bekreftet for demo-bruker. Elbil kan nå reserveres.",
    bookingAdded: "er lagt til i Mine bookinger.",
    bookingCanceled: "Bookingen er fjernet for valgt demo-bruker.",
    offerSaved: "Tilbud om hjelp er lagret på demo-brukeren.",
    requestSaved: "Forespørsel om hjelp er sendt fra valgt demo-bruker.",
    location: "Lokasjon",
    chooseServices: "Velg tjenester",
    specifyOther: "Beskriv annet behov",
    noBookings: "Ingen aktive bookinger for valgt demo-bruker.",
    battery: "Batteri",
    status: "Status",
    chargingTime: "Forventet ladetid",
    available: "Ledig",
    inCharging: "Lader",
    range: "Rekkevidde",
    seats: "Seter",
    cargo: "Lastekapasitet",
    storage: "Lagerplass",
    category: "Kategori",
    perHour: "time",
    perDay: "dag",
    floor: "Etasje",
    area: "Areal",
    beds: "Sengeplasser",
    screens: "Skjermer",
    skillsProfile: "På profilen vises hva brukeren kan hjelpe med:",
    selectedSkills: "Valgte ferdigheter",
    discountInfo:
      "Eksempel i demoen: 2 poeng kan gi 10 kr rabatt på enkelte bookbare aktiviteter.",
  },
  en: {
    demoForOdden: "Demo for Odden",
    appTitle: "Odden Share",
    appDesc:
      "A simple demonstration of how a digital sharing platform for Odden could work.",
    chooseIdentity: "Choose demo identity",
    enterDemo: "Enter demo",
    identityText:
      "Choose a fictional demo identity to open the solution. This simulates login for residents in the area.",
    home: "Home",
    mobility: "Mobility",
    spaces: "Rooms and spaces",
    guest: "Guest solutions",
    tools: "Tools",
    help: "Neighbor help",
    bookings: "My bookings",
    open: "Open",
    reserve: "Reserve",
    bookRoom: "Book room",
    back: "Back",
    pointsBalance: "Points balance",
    pointsDesc:
      "Points are used for neighbor help and can also give small price reductions on selected services in the demo.",
    pointsMore:
      "In this demo, 1 point is set to about 5 NOK discount on selected neighbor-help or shared activities.",
    heroTitle: "A platform for everyday sharing",
    heroText:
      "The platform brings mobility, shared rooms, guest solutions, tools and neighbor help together in one place. Residents can book, pay, use points and keep track of their reservations.",
    seeMobility: "View mobility",
    seeSpaces: "View shared rooms",
    profileTitle: "Demo identity",
    profileText:
      "The selected user is used to show how reservation, verification and neighbor help can work.",
    residentId: "Demo ID",
    apartment: "Apartment",
    license: "Driver license ID",
    verifyLicense: "Verify driver license for car rental",
    verified: "Verified for car rental",
    invalidApartment:
      "This demo user is not registered in an approved apartment in the area.",
    invalidLicense:
      "This demo user does not have a registered driver license for car rental.",
    mobilityTitle: "Mobility",
    mobilityText:
      "Choose a category to see available transport solutions in the area.",
    spacesTitle: "Rooms and spaces",
    spacesText:
      "Choose a category to see available rooms, capacity and equipment.",
    guestTitle: "Guest solutions",
    guestText:
      "Choose a category to see details for guest apartments or sharing while away.",
    toolsTitle: "Tool library",
    toolsText:
      "Choose a category to see tools, packages, price per hour or per day, and storage location.",
    helpTitle: "Neighbor help and points",
    helpText:
      "Here residents can request help, offer help and build a profile showing what they can contribute with.",
    bookingsTitle: "My bookings",
    bookingsText: "Here the user gets an overview of active reservations.",
    confirmationTitle: "Confirmation",
    confirmationText:
      "Example of how the system can show a booking or request after the user completes an action.",
    actionRegistered: "Action registered",
    selectedItem: "Selected item",
    requestExample: "Request help",
    offerExample: "Offer help",
    sendRequest: "Send request",
    sendOffer: "Save offer",
    active: "Active",
    cancel: "Cancel",
    remaining: "Time remaining",
    alerts:
      "The system can show that the user has completed a booking or submitted a request here.",
    onlyVerifiedCars:
      "Car rental requires a verified driver license in this demo.",
    confirmDone:
      "Driver license verified for the demo user. Electric car can now be reserved.",
    bookingAdded: "has been added to My bookings.",
    bookingCanceled: "The booking has been removed for the selected demo user.",
    offerSaved: "Offer to help has been saved to the demo user.",
    requestSaved: "Help request has been sent from the selected demo user.",
    location: "Location",
    chooseServices: "Choose services",
    specifyOther: "Describe another need",
    noBookings: "No active bookings for the selected demo user.",
    battery: "Battery",
    status: "Status",
    chargingTime: "Expected charging time",
    available: "Available",
    inCharging: "Charging",
    range: "Range",
    seats: "Seats",
    cargo: "Cargo capacity",
    storage: "Storage",
    category: "Category",
    perHour: "hour",
    perDay: "day",
    floor: "Floor",
    area: "Area",
    beds: "Beds",
    screens: "Screens",
    skillsProfile: "The profile shows what the user can help with:",
    selectedSkills: "Selected skills",
    discountInfo:
      "Demo example: 2 points can reduce the price by 10 NOK on selected activities.",
  },
};

const COLORS = {
  bg: "#f7f8fc",
  ink: "#22304a",
  navy: "#244f7c",
  blue: "#4c85b8",
  lightBlue: "#a9bdd5",
  pink: "#d4a8b7",
  white: "#ffffff",
  line: "#dce4ee",
  soft: "#eef3f8",
  okBg: "#e7f4eb",
  okBorder: "#b9dec5",
  warnBg: "#fff1dc",
  warnBorder: "#f4cf8f",
  buttonText: "#ffffff",
};

const getMobilityCategories = (lang) => [
  {
    id: "cars",
    icon: Car,
    title: lang === "nb" ? "Elbiler" : "Electric cars",
    text:
      lang === "nb"
        ? "Se tilgjengelige biler, seter, rekkevidde og batteri."
        : "See available cars, seats, range and battery.",
  },
  {
    id: "ebikes",
    icon: Bike,
    title: lang === "nb" ? "Elsykler" : "E-bikes",
    text:
      lang === "nb"
        ? "Se tilgjengelige elsykler og ladestatus."
        : "See available e-bikes and charging status.",
  },
  {
    id: "bikes",
    icon: Bike,
    title: lang === "nb" ? "Vanlige sykler" : "Regular bikes",
    text:
      lang === "nb"
        ? "Se bysykler og status."
        : "See city bikes and status.",
  },
  {
    id: "cargo",
    icon: Bike,
    title: lang === "nb" ? "Lastesykler" : "Cargo bikes",
    text:
      lang === "nb"
        ? "Se lastesykler og kapasitet."
        : "See cargo bikes and capacity.",
  },
  {
    id: "trailers",
    icon: Wrench,
    title: lang === "nb" ? "Tilhengere" : "Trailers",
    text:
      lang === "nb"
        ? "Se tilhengere og lastekapasitet."
        : "See trailers and cargo capacity.",
  },
];

const getSpaceCategories = (lang) => [
  {
    id: "meeting",
    icon: Users,
    title: lang === "nb" ? "Møterom" : "Meeting rooms",
    text:
      lang === "nb"
        ? "Rom for møter og gruppearbeid."
        : "Rooms for meetings and group work.",
  },
  {
    id: "office",
    icon: Briefcase,
    title: lang === "nb" ? "Hjemmekontor" : "Home office rooms",
    text:
      lang === "nb"
        ? "Rolige arbeidsrom med skjerm."
        : "Quiet work rooms with screens.",
  },
  {
    id: "study",
    icon: Monitor,
    title: lang === "nb" ? "Studierom" : "Study rooms",
    text:
      lang === "nb"
        ? "Små rom for lesing og prosjektarbeid."
        : "Small rooms for reading and project work.",
  },
  {
    id: "activity",
    icon: Home,
    title: lang === "nb" ? "Aktivitetsrom" : "Activity rooms",
    text:
      lang === "nb"
        ? "Rom for kurs, hobby og fellesbruk."
        : "Rooms for courses, hobby and shared use.",
  },
  {
    id: "event",
    icon: Users,
    title: lang === "nb" ? "Selskapsrom" : "Event rooms",
    text:
      lang === "nb"
        ? "Rom for samlinger og arrangementer."
        : "Rooms for gatherings and events.",
  },
];

const getGuestCategories = (lang) => [
  {
    id: "apartments",
    icon: BedDouble,
    title: lang === "nb" ? "Gjesteleiligheter" : "Guest apartments",
    text:
      lang === "nb"
        ? "Se størrelse, etasje og sengeplasser."
        : "See size, floor and beds.",
  },
  {
    id: "share",
    icon: House,
    title: lang === "nb" ? "Del bolig ved fravær" : "Share home while away",
    text:
      lang === "nb"
        ? "Registrer egen bolig når du er bortreist."
        : "Register your own home when away.",
  },
];

const getToolCategories = (lang) => [
  {
    id: "power",
    icon: Hammer,
    title: lang === "nb" ? "El-verktøy" : "Power tools",
    text:
      lang === "nb"
        ? "Boremaskin, sager og annet el-verktøy."
        : "Drills, saws and other power tools.",
  },
  {
    id: "bike",
    icon: Wrench,
    title: lang === "nb" ? "Sykkelverktøy" : "Bike tools",
    text:
      lang === "nb"
        ? "Utstyr for enkel sykkelservice."
        : "Equipment for basic bike maintenance.",
  },
  {
    id: "paint",
    icon: Package,
    title: lang === "nb" ? "Malepakker" : "Painting packages",
    text:
      lang === "nb"
        ? "Pakker med flere verktøy til samme jobb."
        : "Packages with multiple related tools.",
  },
  {
    id: "garden",
    icon: Hammer,
    title: lang === "nb" ? "Hageverktøy" : "Garden tools",
    text:
      lang === "nb"
        ? "Utstyr for hage og uteareal."
        : "Tools for garden and outdoor work.",
  },
];

const getMobilityItems = (lang, t) => ({
  cars: [
    {
      title: "Nissan Leaf",
      subtitle:
        lang === "nb" ? "Elbil klar for reservasjon" : "Electric car ready for reservation",
      meta: `69 kr / ${t.perHour}`,
      location: `${t.location}: Odden mobilitetspunkt`,
      extra: [
        `${t.status}: ${t.available}`,
        `${t.battery}: 82%`,
        `${t.range}: 280 km`,
        `${t.seats}: 5`,
      ],
      icon: Car,
    },
    {
      title: "VW ID.3",
      subtitle:
        lang === "nb" ? "Nær fulladet" : "Nearly fully charged",
      meta: `79 kr / ${t.perHour}`,
      location: `${t.location}: Mobilitetshus`,
      extra: [
        `${t.status}: ${t.available}`,
        `${t.battery}: 91%`,
        `${t.range}: 330 km`,
        `${t.seats}: 5`,
      ],
      icon: Car,
    },
  ],
  ebikes: [
    {
      title: lang === "nb" ? "Elsykkel E1" : "E-bike E1",
      subtitle: lang === "nb" ? "Ledig nå" : "Available now",
      meta: `25 kr / ${t.perHour}`,
      location: `${t.location}: Stasjon Parkgata`,
      extra: [
        `${t.status}: ${t.available}`,
        `${t.battery}: 64%`,
        `${t.chargingTime}: 20 min`,
        `${t.range}: 42 km`,
      ],
      icon: Bike,
    },
    {
      title: lang === "nb" ? "Elsykkel E2" : "E-bike E2",
      subtitle: lang === "nb" ? "Lader" : "Charging",
      meta: `25 kr / ${t.perHour}`,
      location: `${t.location}: Elvepromenaden`,
      extra: [
        `${t.status}: ${t.inCharging}`,
        `${t.battery}: 35%`,
        `${t.chargingTime}: 45 min`,
        `${t.range}: 25 km`,
      ],
      icon: Bike,
    },
  ],
  bikes: [
    {
      title: lang === "nb" ? "Bysykkel B1" : "City bike B1",
      subtitle: lang === "nb" ? "Vanlig sykkel" : "Regular bike",
      meta: `15 kr / ${t.perHour}`,
      location: `${t.location}: Elvepromenaden`,
      extra: [`${t.status}: ${t.available}`],
      icon: Bike,
    },
    {
      title: lang === "nb" ? "Bysykkel B2" : "City bike B2",
      subtitle: lang === "nb" ? "Klar til bruk" : "Ready for use",
      meta: `15 kr / ${t.perHour}`,
      location: `${t.location}: Stasjon Parkgata`,
      extra: [`${t.status}: ${t.available}`],
      icon: Bike,
    },
  ],
  cargo: [
    {
      title: lang === "nb" ? "Lastesykkel C1" : "Cargo bike C1",
      subtitle:
        lang === "nb" ? "For handling og barn" : "For shopping and kids",
      meta: `35 kr / ${t.perHour}`,
      location: `${t.location}: Mobilitetshus`,
      extra: [
        `${t.status}: ${t.available}`,
        `${t.battery}: 48%`,
        `${t.cargo}: 100 kg`,
      ],
      icon: Bike,
    },
  ],
  trailers: [
    {
      title: lang === "nb" ? "Tilhenger T1" : "Trailer T1",
      subtitle: lang === "nb" ? "Liten tilhenger" : "Small trailer",
      meta: `49 kr / ${t.perHour}`,
      location: `${t.location}: Mobilitetshus`,
      extra: [
        `${t.status}: ${t.available}`,
        `${t.cargo}: 750 kg`,
      ],
      icon: Wrench,
    },
  ],
});

const getSpaceItems = (lang, t) => ({
  meeting: [
    {
      title: lang === "nb" ? "Møterom M1" : "Meeting room M1",
      subtitle:
        lang === "nb" ? "Skjerm og videomøte" : "Screen and video",
      meta: `70 kr / ${t.perHour}`,
      location: `${t.location}: Bygg A, 1. ${t.floor.toLowerCase()}`,
      extra: [`${t.seats}: 6`, `${t.screens}: 1`],
      icon: Users,
    },
    {
      title: lang === "nb" ? "Møterom M2" : "Meeting room M2",
      subtitle:
        lang === "nb" ? "Større møterom" : "Larger meeting room",
      meta: `90 kr / ${t.perHour}`,
      location: `${t.location}: Bygg C, 2. ${t.floor.toLowerCase()}`,
      extra: [`${t.seats}: 10`, `${t.screens}: 2`],
      icon: Users,
    },
  ],
  office: [
    {
      title: lang === "nb" ? "Arbeidsrom O1" : "Office room O1",
      subtitle:
        lang === "nb" ? "Stille hjemmekontor" : "Quiet office room",
      meta: `45 kr / ${t.perHour}`,
      location: `${t.location}: Bygg B, 2. ${t.floor.toLowerCase()}`,
      extra: [`${t.screens}: 1`, `${t.seats}: 1`],
      icon: Briefcase,
    },
    {
      title: lang === "nb" ? "Arbeidsrom O2" : "Office room O2",
      subtitle:
        lang === "nb" ? "Dobbelt arbeidsrom" : "Double office room",
      meta: `60 kr / ${t.perHour}`,
      location: `${t.location}: Bygg D, 3. ${t.floor.toLowerCase()}`,
      extra: [`${t.screens}: 2`, `${t.seats}: 2`],
      icon: Briefcase,
    },
  ],
  study: [
    {
      title: lang === "nb" ? "Studierom S1" : "Study room S1",
      subtitle: lang === "nb" ? "For lesing" : "For reading",
      meta: `30 kr / ${t.perHour}`,
      location: `${t.location}: Bygg A, 2. ${t.floor.toLowerCase()}`,
      extra: [`${t.seats}: 2`],
      icon: Monitor,
    },
  ],
  activity: [
    {
      title: lang === "nb" ? "Aktivitetsrom A1" : "Activity room A1",
      subtitle:
        lang === "nb" ? "Kurs og hobby" : "Courses and hobby",
      meta: `90 kr / ${t.perHour}`,
      location: `${t.location}: Bygg E, 1. ${t.floor.toLowerCase()}`,
      extra: [`${t.area}: 42 m²`],
      icon: Home,
    },
  ],
  event: [
    {
      title: lang === "nb" ? "Selskapsrom F1" : "Event room F1",
      subtitle:
        lang === "nb" ? "Til arrangementer" : "For events",
      meta: `250 kr / ${t.perHour}`,
      location: `${t.location}: Bygg G, 1. ${t.floor.toLowerCase()}`,
      extra: [`${t.seats}: 20`, `${t.screens}: 1`],
      icon: Users,
    },
  ],
});

const getGuestItems = (lang, t, apartment) => ({
  apartments: [
    {
      title: lang === "nb" ? "Gjesteleilighet A" : "Guest apartment A",
      subtitle:
        lang === "nb" ? "For korttidsbesøk" : "For short stays",
      meta: `450 kr / ${t.perDay}`,
      location: `${t.location}: Bygg B, 2. ${t.floor.toLowerCase()}`,
      extra: [`${t.area}: 32 m²`, `${t.beds}: 2`],
      icon: BedDouble,
    },
    {
      title: lang === "nb" ? "Gjesteleilighet B" : "Guest apartment B",
      subtitle:
        lang === "nb" ? "Større enhet for familie" : "Larger unit for family",
      meta: `700 kr / ${t.perDay}`,
      location: `${t.location}: Bygg E, 1. ${t.floor.toLowerCase()}`,
      extra: [`${t.area}: 48 m²`, `${t.beds}: 4`],
      icon: BedDouble,
    },
  ],
  share: [
    {
      title: lang === "nb" ? "Del egen bolig" : "Share own home",
      subtitle:
        lang === "nb" ? "Registrer ved fravær" : "Register while away",
      meta: lang === "nb" ? "Godkjenning kreves" : "Approval required",
      location: `${t.location}: ${apartment}`,
      extra: [`${t.area}: ${lang === "nb" ? "Egen boenhet" : "Own unit"}`],
      icon: House,
    },
  ],
});

const getToolItems = (lang, t) => ({
  power: [
    {
      title: lang === "nb" ? "Boremaskin" : "Drill",
      subtitle:
        lang === "nb" ? "For montering og småprosjekter" : "For assembly and small projects",
      meta: `20 kr / ${t.perHour}`,
      location: `${t.location}: Verktøylager A`,
      extra: [`${t.category}: ${lang === "nb" ? "El-verktøy" : "Power tools"}`, `${t.storage}: Hylle 2`],
      icon: Hammer,
    },
    {
      title: lang === "nb" ? "Stikksag" : "Jigsaw",
      subtitle:
        lang === "nb" ? "Til treplater og fine kutt" : "For wood panels and fine cuts",
      meta: `25 kr / ${t.perHour}`,
      location: `${t.location}: Verktøylager A`,
      extra: [`${t.category}: ${lang === "nb" ? "El-verktøy" : "Power tools"}`, `${t.storage}: Hylle 3`],
      icon: Wrench,
    },
  ],
  bike: [
    {
      title: lang === "nb" ? "Sykkelsett" : "Bike kit",
      subtitle:
        lang === "nb" ? "For enkel sykkelservice" : "For basic bike maintenance",
      meta: `15 kr / ${t.perHour}`,
      location: `${t.location}: Verkstedstasjon`,
      extra: [`${t.category}: ${lang === "nb" ? "Sykkelverktøy" : "Bike tools"}`, `${t.storage}: Skap 4`],
      icon: Wrench,
    },
  ],
  paint: [
    {
      title: lang === "nb" ? "Malepakke liten" : "Painting package small",
      subtitle:
        lang === "nb" ? "Ruller, brett og dekkplast" : "Rollers, tray and sheets",
      meta: `80 kr / ${t.perDay}`,
      location: `${t.location}: Verktøylager B`,
      extra: [`${t.category}: ${lang === "nb" ? "Pakke" : "Package"}`, `${t.storage}: Hylle 6`],
      icon: Package,
    },
  ],
  garden: [
    {
      title: lang === "nb" ? "Hagesett" : "Garden kit",
      subtitle:
        lang === "nb" ? "Spade, rive og hekksaks" : "Spade, rake and hedge shears",
      meta: `90 kr / ${t.perDay}`,
      location: `${t.location}: Utebod`,
      extra: [`${t.category}: ${lang === "nb" ? "Hageverktøy" : "Garden tools"}`, `${t.storage}: Vegg 2`],
      icon: Hammer,
    },
  ],
});

function TopNav({ active, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? COLORS.blue : COLORS.white,
        color: active ? COLORS.white : COLORS.ink,
        border: `1px solid ${active ? COLORS.blue : COLORS.line}`,
        borderRadius: 999,
        padding: "10px 14px",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function SectionCard({ icon: Icon, title, text, onClick, button }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 24,
        padding: 20,
        textAlign: "left",
        cursor: "pointer",
        boxShadow: "0 8px 24px rgba(36,79,124,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 16,
          alignItems: "flex-start",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          <div
            style={{
              background: COLORS.navy,
              borderRadius: 18,
              padding: 12,
              display: "flex",
            }}
          >
            <Icon size={22} color={COLORS.white} />
          </div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.ink }}>
              {title}
            </div>
            <div style={{ marginTop: 6, color: "#5d6f88", lineHeight: 1.5 }}>
              {text}
            </div>
          </div>
        </div>
        <ChevronRight size={18} color="#7b8ca3" />
      </div>

      <div
        style={{
          marginTop: 18,
          display: "inline-flex",
          alignItems: "center",
          background: COLORS.pink,
          color: COLORS.ink,
          borderRadius: 999,
          padding: "8px 14px",
          fontWeight: 700,
        }}
      >
        {button}
      </div>
    </button>
  );
}

function ItemCard({ icon: Icon, title, subtitle, meta, location, extra = [], action, onClick }) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid ${COLORS.line}`,
        borderRadius: 24,
        padding: 20,
        boxShadow: "0 8px 24px rgba(36,79,124,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 18,
          alignItems: "flex-start",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", gap: 16, flex: 1, minWidth: 260 }}>
          <div
            style={{
              background: COLORS.navy,
              borderRadius: 18,
              padding: 12,
              display: "flex",
            }}
          >
            <Icon size={20} color={COLORS.white} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.ink }}>
              {title}
            </div>
            <div style={{ marginTop: 6, color: "#5d6f88" }}>{subtitle}</div>
            <div style={{ marginTop: 10, color: "#5d6f88" }}>{meta}</div>
            <div style={{ marginTop: 6, color: "#5d6f88", display: "flex", gap: 8, alignItems: "center" }}>
              <MapPin size={14} color={COLORS.blue} />
              {location}
            </div>

            {extra.length > 0 && (
              <div
                style={{
                  marginTop: 12,
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {extra.map((x, i) => (
                  <span
                    key={`${title}-${i}`}
                    style={{
                      background: COLORS.soft,
                      color: COLORS.ink,
                      borderRadius: 999,
                      padding: "6px 10px",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {x}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          onClick={onClick}
          style={{
            background: COLORS.blue,
            color: COLORS.buttonText,
            border: "none",
            borderRadius: 999,
            padding: "11px 16px",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          {action}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("nb");
  const t = copy[lang];

  const [entered, setEntered] = useState(false);
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null);
  const [notice, setNotice] = useState("");

  const [residentId, setResidentId] = useState(DEMO_USERS[0].id);
  const [apartment, setApartment] = useState(DEMO_USERS[0].apartment);
  const [licenseId, setLicenseId] = useState(DEMO_USERS[0].license || "Ingen registrert");
  const [carVerified, setCarVerified] = useState(DEMO_USERS[0].verified);

  const [points, setPoints] = useState(28);
  const [bookingsByUser, setBookingsByUser] = useState(initialBookingsByUser);
  const [helpRequestSelection, setHelpRequestSelection] = useState([]);
  const [helpOfferSelection, setHelpOfferSelection] = useState([]);
  const [helpRequestOther, setHelpRequestOther] = useState("");
  const [helpOfferOther, setHelpOfferOther] = useState("");
  const [profileSkillsByUser, setProfileSkillsByUser] = useState({});

  const [selectedMobilityCategory, setSelectedMobilityCategory] = useState(null);
  const [selectedSpaceCategory, setSelectedSpaceCategory] = useState(null);
  const [selectedGuestCategory, setSelectedGuestCategory] = useState(null);
  const [selectedToolCategory, setSelectedToolCategory] = useState(null);

  const services = lang === "nb" ? HELP_SERVICES_NB : HELP_SERVICES_EN;
  const currentUser = DEMO_USERS.find((u) => u.id === residentId) || DEMO_USERS[0];
  const currentBookings = bookingsByUser[residentId] || [];
  const registeredApartment = currentUser.apartment !== "Ikke registrert";
  const hasRegisteredLicense = !!currentUser.license;
  const profileSkills = profileSkillsByUser[residentId] || [];

  const mobilityCategories = useMemo(() => getMobilityCategories(lang), [lang]);
  const spaceCategories = useMemo(() => getSpaceCategories(lang), [lang]);
  const guestCategories = useMemo(() => getGuestCategories(lang), [lang]);
  const toolCategories = useMemo(() => getToolCategories(lang), [lang]);

  const mobilityItems = useMemo(() => getMobilityItems(lang, t), [lang, t]);
  const spaceItems = useMemo(() => getSpaceItems(lang, t), [lang, t]);
  const guestItems = useMemo(() => getGuestItems(lang, t, apartment), [lang, t, apartment]);
  const toolItems = useMemo(() => getToolItems(lang, t), [lang, t]);

  const goTo = (next) => {
    setHistory((prev) => [...prev, page]);
    setPage(next);
  };

  const goBack = () => {
    if (history.length === 0) {
      setPage("home");
      return;
    }
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setPage(prev);
  };

  const syncByUser = (id) => {
    const user = DEMO_USERS.find((u) => u.id === id);
    if (!user) return;
    setResidentId(user.id);
    setApartment(user.apartment);
    setLicenseId(user.license || "Ingen registrert");
    setCarVerified(user.verified);
  };

  const syncByLicense = (license) => {
    if (license === "Ingen registrert") return;
    const user = DEMO_USERS.find((u) => u.license === license);
    if (!user) return;
    setResidentId(user.id);
    setApartment(user.apartment);
    setLicenseId(user.license || "Ingen registrert");
    setCarVerified(user.verified);
  };

  const handleEnter = () => {
    setEntered(true);
  };

  const bookItem = (category, item) => {
    const isCar =
      category === "mobility" &&
      (item.title.toLowerCase().includes("leaf") ||
        item.title.toLowerCase().includes("id.3") ||
        item.title.toLowerCase().includes("car") ||
        item.title.toLowerCase().includes("bil"));

    if (isCar && !registeredApartment) {
      setNotice(t.invalidApartment);
      setSelected(item);
      goTo("confirmation");
      return;
    }

    if (isCar && !carVerified) {
      setNotice(t.onlyVerifiedCars);
      setSelected(item);
      goTo("confirmation");
      return;
    }

    const labels = {
      mobility: lang === "nb" ? "Mobilitet" : "Mobility",
      spaces: lang === "nb" ? "Rom" : "Room",
      guest: lang === "nb" ? "Gjesteløsning" : "Guest solution",
      tools: lang === "nb" ? "Verktøy" : "Tool",
    };

    const newBooking = {
      id: `${Date.now()}-${Math.random()}`,
      type: labels[category],
      name: item.title,
      time: lang === "nb" ? "Valgt eksempelbooking" : "Selected sample booking",
      remaining: lang === "nb" ? "Ny booking" : "New booking",
      status: t.active,
      location: item.location.replace(`${t.location}: `, ""),
    };

    setBookingsByUser((prev) => ({
      ...prev,
      [residentId]: [newBooking, ...(prev[residentId] || [])],
    }));

    setSelected(item);
    setNotice(`${item.title} ${t.bookingAdded} ${item.location}.`);
    goTo("confirmation");
  };

  const cancelBooking = (bookingId) => {
    setBookingsByUser((prev) => ({
      ...prev,
      [residentId]: (prev[residentId] || []).filter((b) => b.id !== bookingId),
    }));
    setSelected(null);
    setNotice(t.bookingCanceled);
    goTo("confirmation");
  };

  const toggleSelection = (value, current, setter) => {
    setter(current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  const sendHelpRequest = () => {
    setPoints((p) => Math.max(0, p - 4));
    setNotice(t.requestSaved);
    goTo("confirmation");
  };

  const saveHelpOffer = () => {
    const otherLabel = lang === "nb" ? "Annet" : "Other";
    const selectedSkills = helpOfferSelection.includes(otherLabel)
      ? [...helpOfferSelection.filter((x) => x !== otherLabel), helpOfferOther || t.specifyOther]
      : helpOfferSelection;

    setProfileSkillsByUser((prev) => ({
      ...prev,
      [residentId]: selectedSkills,
    }));
    setNotice(t.offerSaved);
    goTo("confirmation");
  };

  const verifyLicenseForCar = () => {
    if (!registeredApartment) {
      setNotice(t.invalidApartment);
      goTo("confirmation");
      return;
    }
    if (!hasRegisteredLicense) {
      setNotice(t.invalidLicense);
      goTo("confirmation");
      return;
    }
    setCarVerified(true);
    setNotice(t.confirmDone);
    goTo("confirmation");
  };

  const Header = ({ title, subtitle }) => (
    <div style={{ marginBottom: 20 }}>
      <button
        onClick={goBack}
        style={{
          background: COLORS.white,
          color: COLORS.ink,
          border: `1px solid ${COLORS.line}`,
          borderRadius: 999,
          padding: "10px 14px",
          cursor: "pointer",
          marginBottom: 16,
          fontWeight: 600,
          display: "inline-flex",
          gap: 8,
          alignItems: "center",
        }}
      >
        <ArrowLeft size={16} />
        {t.back}
      </button>

      <div style={{ fontSize: 34, fontWeight: 800, color: COLORS.ink }}>{title}</div>
      <div style={{ marginTop: 8, color: "#5d6f88", lineHeight: 1.6 }}>{subtitle}</div>
    </div>
  );

  const renderCategoryPage = (title, subtitle, categories, onOpen) => (
    <div>
      <Header title={title} subtitle={subtitle} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 18,
        }}
      >
        {categories.map((cat) => (
          <SectionCard
            key={cat.id}
            icon={cat.icon}
            title={cat.title}
            text={cat.text}
            onClick={() => onOpen(cat.id)}
            button={t.open}
          />
        ))}
      </div>
    </div>
  );

  const renderItemList = (title, subtitle, items, category) => (
    <div>
      <Header title={title} subtitle={subtitle} />
      <div style={{ display: "grid", gap: 18 }}>
        {items.map((item) => (
          <ItemCard
            key={item.title}
            {...item}
            action={category === "spaces" ? t.bookRoom : t.reserve}
            onClick={() => bookItem(category, item)}
          />
        ))}
      </div>
    </div>
  );

  if (!entered) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.soft} 100%)`,
          padding: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 760,
            background: COLORS.white,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 32,
            padding: 32,
            boxShadow: "0 20px 50px rgba(36,79,124,0.12)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              margin: "0 auto 18px",
              width: 82,
              height: 82,
              borderRadius: "50%",
              background: COLORS.navy,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LogIn size={36} color={COLORS.white} />
          </div>

          <div style={{ color: COLORS.navy, fontWeight: 700, marginBottom: 8 }}>
            {t.demoForOdden}
          </div>
          <div style={{ fontSize: 48, fontWeight: 800, color: COLORS.ink }}>
            {t.appTitle}
          </div>
          <div
            style={{
              marginTop: 14,
              color: "#5d6f88",
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.7,
            }}
          >
            {t.identityText}
          </div>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              textAlign: "left",
            }}
          >
            <div
              style={{
                background: COLORS.soft,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 22,
                padding: 18,
              }}
            >
              <label style={{ display: "block", color: COLORS.ink, fontWeight: 700, marginBottom: 8 }}>
                {t.residentId}
              </label>
              <select
                value={residentId}
                onChange={(e) => syncByUser(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 14,
                  border: `1px solid ${COLORS.line}`,
                  padding: "12px 14px",
                  background: COLORS.white,
                }}
              >
                {DEMO_USERS.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.id}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                background: COLORS.soft,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 22,
                padding: 18,
              }}
            >
              <div style={{ color: COLORS.ink, fontWeight: 700, marginBottom: 8 }}>
                {t.apartment}
              </div>
              <div style={{ color: "#5d6f88" }}>{apartment}</div>

              <div style={{ color: COLORS.ink, fontWeight: 700, marginTop: 14, marginBottom: 8 }}>
                {t.license}
              </div>
              <div style={{ color: "#5d6f88" }}>{licenseId || "Ingen registrert"}</div>
            </div>
          </div>

          <div
            style={{
              marginTop: 18,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
              textAlign: "left",
            }}
          >
            <div
              style={{
                background: registeredApartment ? COLORS.okBg : COLORS.warnBg,
                border: `1px solid ${registeredApartment ? COLORS.okBorder : COLORS.warnBorder}`,
                borderRadius: 18,
                padding: 16,
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 700, color: COLORS.ink }}>
                {registeredApartment ? (
                  <CheckCircle2 size={18} color={COLORS.navy} />
                ) : (
                  <TriangleAlert size={18} color={COLORS.navy} />
                )}
                {t.apartment}
              </div>
              <div style={{ marginTop: 8, color: "#5d6f88" }}>
                {registeredApartment ? apartment : t.invalidApartment}
              </div>
            </div>

            <div
              style={{
                background: hasRegisteredLicense ? COLORS.okBg : COLORS.warnBg,
                border: `1px solid ${hasRegisteredLicense ? COLORS.okBorder : COLORS.warnBorder}`,
                borderRadius: 18,
                padding: 16,
              }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 700, color: COLORS.ink }}>
                {hasRegisteredLicense ? (
                  <CheckCircle2 size={18} color={COLORS.navy} />
                ) : (
                  <TriangleAlert size={18} color={COLORS.navy} />
                )}
                {t.license}
              </div>
              <div style={{ marginTop: 8, color: "#5d6f88" }}>
                {hasRegisteredLicense ? (licenseId || currentUser.license) : t.invalidLicense}
              </div>
            </div>
          </div>

          <div style={{ marginTop: 26, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => setLang("nb")}
              style={{
                background: lang === "nb" ? COLORS.lightBlue : COLORS.white,
                color: COLORS.ink,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 999,
                padding: "10px 14px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              Bokmål
            </button>
            <button
              onClick={() => setLang("en")}
              style={{
                background: lang === "en" ? COLORS.lightBlue : COLORS.white,
                color: COLORS.ink,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 999,
                padding: "10px 14px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              English
            </button>
          </div>

          <button
            onClick={handleEnter}
            style={{
              marginTop: 22,
              background: COLORS.pink,
              color: COLORS.ink,
              border: "none",
              borderRadius: 999,
              padding: "14px 24px",
              fontWeight: 800,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {t.enterDemo}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(180deg, ${COLORS.bg} 0%, ${COLORS.soft} 100%)`,
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          style={{
            background: COLORS.white,
            border: `1px solid ${COLORS.line}`,
            borderRadius: 32,
            padding: 24,
            boxShadow: "0 18px 50px rgba(36,79,124,0.10)",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 18,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  gap: 8,
                  alignItems: "center",
                  background: COLORS.soft,
                  color: COLORS.ink,
                  borderRadius: 999,
                  padding: "8px 12px",
                  fontWeight: 700,
                  fontSize: 13,
                }}
              >
                <MapPin size={14} color={COLORS.blue} />
                {t.demoForOdden}
              </div>

              <div style={{ fontSize: 48, fontWeight: 800, color: COLORS.ink, marginTop: 12 }}>
                {t.appTitle}
              </div>
              <div style={{ marginTop: 8, color: "#5d6f88", maxWidth: 680, lineHeight: 1.7 }}>
                {t.appDesc}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              <TopNav active={page === "home"} label={t.home} onClick={() => setPage("home")} />
              <TopNav active={page.startsWith("mobility")} label={t.mobility} onClick={() => setPage("mobility")} />
              <TopNav active={page.startsWith("spaces")} label={t.spaces} onClick={() => setPage("spaces")} />
              <TopNav active={page.startsWith("guest")} label={t.guest} onClick={() => setPage("guest")} />
              <TopNav active={page.startsWith("tools")} label={t.tools} onClick={() => setPage("tools")} />
              <TopNav active={page === "help"} label={t.help} onClick={() => setPage("help")} />
              <TopNav active={page === "bookings"} label={t.bookings} onClick={() => setPage("bookings")} />
              <TopNav active={false} label="Bokmål" onClick={() => setLang("nb")} />
              <TopNav active={false} label="English" onClick={() => setLang("en")} />
            </div>
          </div>
        </div>

        {page === "home" && (
          <div style={{ display: "grid", gap: 22 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: 18,
              }}
            >
              <div
                style={{
                  background: COLORS.navy,
                  color: COLORS.white,
                  borderRadius: 28,
                  padding: 28,
                  boxShadow: "0 18px 50px rgba(36,79,124,0.18)",
                }}
              >
                <div style={{ fontSize: 34, fontWeight: 800 }}>{t.heroTitle}</div>
                <div style={{ marginTop: 12, lineHeight: 1.8, color: "#edf5ff" }}>
                  {t.heroText}
                </div>

                <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <button
                    onClick={() => goTo("mobility")}
                    style={{
                      background: COLORS.lightBlue,
                      color: COLORS.ink,
                      border: "none",
                      borderRadius: 999,
                      padding: "12px 18px",
                      cursor: "pointer",
                      fontWeight: 800,
                    }}
                  >
                    {t.seeMobility}
                  </button>
                  <button
                    onClick={() => goTo("spaces")}
                    style={{
                      background: COLORS.pink,
                      color: COLORS.ink,
                      border: "none",
                      borderRadius: 999,
                      padding: "12px 18px",
                      cursor: "pointer",
                      fontWeight: 800,
                    }}
                  >
                    {t.seeSpaces}
                  </button>
                </div>
              </div>

              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 28,
                  padding: 24,
                  boxShadow: "0 12px 35px rgba(36,79,124,0.08)",
                }}
              >
                <div style={{ display: "flex", gap: 10, alignItems: "center", color: COLORS.ink, fontWeight: 800 }}>
                  <Coins size={22} color={COLORS.blue} />
                  {t.pointsBalance}
                </div>
                <div style={{ fontSize: 44, fontWeight: 800, color: COLORS.ink, marginTop: 14 }}>
                  {points}
                </div>
                <div style={{ marginTop: 10, color: "#5d6f88", lineHeight: 1.7 }}>
                  {t.pointsDesc}
                </div>
                <div style={{ marginTop: 10, color: "#5d6f88", fontSize: 14, lineHeight: 1.7 }}>
                  {t.pointsMore}
                </div>
                <div style={{ marginTop: 10, color: "#5d6f88", fontSize: 14, lineHeight: 1.7 }}>
                  {t.discountInfo}
                </div>
              </div>
            </div>

            <div
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 28,
                padding: 26,
                boxShadow: "0 12px 35px rgba(36,79,124,0.08)",
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
                <div
                  style={{
                    background: COLORS.navy,
                    borderRadius: 18,
                    padding: 12,
                    display: "flex",
                  }}
                >
                  <IdCard size={22} color={COLORS.white} />
                </div>
                <div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: COLORS.ink }}>{t.profileTitle}</div>
                  <div style={{ color: "#5d6f88", marginTop: 4 }}>{t.profileText}</div>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 16,
                }}
              >
                <div>
                  <label style={{ display: "block", fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>
                    {t.residentId}
                  </label>
                  <select
                    value={residentId}
                    onChange={(e) => syncByUser(e.target.value)}
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      border: `1px solid ${COLORS.line}`,
                      padding: "12px 14px",
                      background: COLORS.white,
                    }}
                  >
                    {DEMO_USERS.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>
                    {t.apartment}
                  </label>
                  <input
                    readOnly
                    value={apartment}
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      border: `1px solid ${COLORS.line}`,
                      padding: "12px 14px",
                      background: COLORS.soft,
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 700, color: COLORS.ink, marginBottom: 8 }}>
                    {t.license}
                  </label>
                  <select
                    value={licenseId || "Ingen registrert"}
                    onChange={(e) => {
                      setLicenseId(e.target.value);
                      syncByLicense(e.target.value);
                    }}
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      border: `1px solid ${COLORS.line}`,
                      padding: "12px 14px",
                      background: COLORS.white,
                    }}
                  >
                    {LICENSE_OPTIONS.map((id) => (
                      <option key={id} value={id}>
                        {id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 700, color: "transparent", marginBottom: 8 }}>
                    x
                  </label>
                  <button
                    onClick={verifyLicenseForCar}
                    style={{
                      width: "100%",
                      background: carVerified ? COLORS.lightBlue : COLORS.blue,
                      color: COLORS.ink,
                      border: "none",
                      borderRadius: 16,
                      padding: "12px 14px",
                      cursor: "pointer",
                      fontWeight: 800,
                    }}
                  >
                    {carVerified ? t.verified : t.verifyLicense}
                  </button>
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    background: registeredApartment ? COLORS.okBg : COLORS.warnBg,
                    border: `1px solid ${registeredApartment ? COLORS.okBorder : COLORS.warnBorder}`,
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 800, color: COLORS.ink }}>
                    {registeredApartment ? (
                      <CheckCircle2 size={18} color={COLORS.blue} />
                    ) : (
                      <TriangleAlert size={18} color={COLORS.blue} />
                    )}
                    {t.apartment}
                  </div>
                  <div style={{ marginTop: 8, color: "#5d6f88" }}>
                    {registeredApartment ? apartment : t.invalidApartment}
                  </div>
                </div>

                <div
                  style={{
                    background: hasRegisteredLicense ? COLORS.okBg : COLORS.warnBg,
                    border: `1px solid ${hasRegisteredLicense ? COLORS.okBorder : COLORS.warnBorder}`,
                    borderRadius: 18,
                    padding: 16,
                  }}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 800, color: COLORS.ink }}>
                    {hasRegisteredLicense ? (
                      <CheckCircle2 size={18} color={COLORS.blue} />
                    ) : (
                      <TriangleAlert size={18} color={COLORS.blue} />
                    )}
                    {t.license}
                  </div>
                  <div style={{ marginTop: 8, color: "#5d6f88" }}>
                    {hasRegisteredLicense ? (licenseId || currentUser.license) : t.invalidLicense}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: 18,
                  background: COLORS.soft,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 18,
                  padding: 16,
                }}
              >
                <div style={{ display: "flex", gap: 8, alignItems: "center", fontWeight: 800, color: COLORS.ink }}>
                  <UserRound size={18} color={COLORS.blue} />
                  {t.selectedSkills}
                </div>
                <div style={{ marginTop: 8, color: "#5d6f88" }}>{t.skillsProfile}</div>
                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {profileSkills.length > 0 ? (
                    profileSkills.map((skill, i) => (
                      <span
                        key={`${skill}-${i}`}
                        style={{
                          background: COLORS.white,
                          border: `1px solid ${COLORS.line}`,
                          borderRadius: 999,
                          padding: "6px 10px",
                          fontSize: 12,
                          fontWeight: 700,
                          color: COLORS.ink,
                        }}
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span style={{ color: "#7b8ca3" }}>—</span>
                  )}
                </div>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: 18,
              }}
            >
              <SectionCard
                icon={Car}
                title={t.mobility}
                text={
                  lang === "nb"
                    ? "Book elbil, sykkel, lastesykkel eller tilhenger."
                    : "Book an electric car, bike, cargo bike or trailer."
                }
                onClick={() => goTo("mobility")}
                button={t.open}
              />
              <SectionCard
                icon={Briefcase}
                title={t.spaces}
                text={
                  lang === "nb"
                    ? "Book hjemmekontor, møterom, studierom eller selskapsrom."
                    : "Book home office rooms, meeting rooms, study rooms or event spaces."
                }
                onClick={() => goTo("spaces")}
                button={t.open}
              />
              <SectionCard
                icon={BedDouble}
                title={t.guest}
                text={
                  lang === "nb"
                    ? "Se gjesteleiligheter eller registrer bolig ved fravær."
                    : "View guest apartments or register your home while away."
                }
                onClick={() => goTo("guest")}
                button={t.open}
              />
              <SectionCard
                icon={Hammer}
                title={t.tools}
                text={
                  lang === "nb"
                    ? "Se tilgjengelige verktøy og lagerplass."
                    : "See available tools and storage locations."
                }
                onClick={() => goTo("tools")}
                button={t.open}
              />
              <SectionCard
                icon={Users}
                title={t.help}
                text={
                  lang === "nb"
                    ? "Be om hjelp eller tilby hjelp til andre beboere."
                    : "Request help or offer help to other residents."
                }
                onClick={() => goTo("help")}
                button={t.open}
              />
              <SectionCard
                icon={Calendar}
                title={t.bookings}
                text={
                  lang === "nb"
                    ? "Få oversikt over aktive reservasjoner."
                    : "Get an overview of active reservations."
                }
                onClick={() => goTo("bookings")}
                button={t.open}
              />
            </div>
          </div>
        )}

        {page === "mobility" &&
          renderCategoryPage(t.mobilityTitle, t.mobilityText, mobilityCategories, (id) => {
            setSelectedMobilityCategory(id);
            goTo("mobility-list");
          })}

        {page === "mobility-list" &&
          selectedMobilityCategory &&
          renderItemList(
            mobilityCategories.find((c) => c.id === selectedMobilityCategory)?.title || t.mobilityTitle,
            t.mobilityText,
            mobilityItems[selectedMobilityCategory] || [],
            "mobility"
          )}

        {page === "spaces" &&
          renderCategoryPage(t.spacesTitle, t.spacesText, spaceCategories, (id) => {
            setSelectedSpaceCategory(id);
            goTo("spaces-list");
          })}

        {page === "spaces-list" &&
          selectedSpaceCategory &&
          renderItemList(
            spaceCategories.find((c) => c.id === selectedSpaceCategory)?.title || t.spacesTitle,
            t.spacesText,
            spaceItems[selectedSpaceCategory] || [],
            "spaces"
          )}

        {page === "guest" &&
          renderCategoryPage(t.guestTitle, t.guestText, guestCategories, (id) => {
            setSelectedGuestCategory(id);
            goTo("guest-list");
          })}

        {page === "guest-list" &&
          selectedGuestCategory &&
          renderItemList(
            guestCategories.find((c) => c.id === selectedGuestCategory)?.title || t.guestTitle,
            t.guestText,
            guestItems[selectedGuestCategory] || [],
            "guest"
          )}

        {page === "tools" &&
          renderCategoryPage(t.toolsTitle, t.toolsText, toolCategories, (id) => {
            setSelectedToolCategory(id);
            goTo("tools-list");
          })}

        {page === "tools-list" &&
          selectedToolCategory &&
          renderItemList(
            toolCategories.find((c) => c.id === selectedToolCategory)?.title || t.toolsTitle,
            t.toolsText,
            toolItems[selectedToolCategory] || [],
            "tools"
          )}

        {page === "help" && (
          <div>
            <Header title={t.helpTitle} subtitle={t.helpText} />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: 18,
              }}
            >
              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 24,
                  padding: 22,
                  boxShadow: "0 12px 35px rgba(36,79,124,0.08)",
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.ink }}>
                  {t.requestExample}
                </div>
                <div style={{ marginTop: 8, color: "#5d6f88" }}>{t.chooseServices}</div>

                <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                  {services.map((service) => (
                    <label key={service} style={{ display: "flex", gap: 10, alignItems: "center", color: COLORS.ink }}>
                      <input
                        type="checkbox"
                        checked={helpRequestSelection.includes(service)}
                        onChange={() =>
                          toggleSelection(service, helpRequestSelection, setHelpRequestSelection)
                        }
                      />
                      {service}
                    </label>
                  ))}
                </div>

                {helpRequestSelection.includes(lang === "nb" ? "Annet" : "Other") && (
                  <textarea
                    value={helpRequestOther}
                    onChange={(e) => setHelpRequestOther(e.target.value)}
                    placeholder={t.specifyOther}
                    style={{
                      width: "100%",
                      minHeight: 100,
                      marginTop: 14,
                      borderRadius: 16,
                      border: `1px solid ${COLORS.line}`,
                      padding: 12,
                    }}
                  />
                )}

                <button
                  onClick={sendHelpRequest}
                  style={{
                    marginTop: 16,
                    background: COLORS.blue,
                    color: COLORS.white,
                    border: "none",
                    borderRadius: 999,
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                >
                  {t.sendRequest}
                </button>
              </div>

              <div
                style={{
                  background: COLORS.white,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 24,
                  padding: 22,
                  boxShadow: "0 12px 35px rgba(36,79,124,0.08)",
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.ink }}>
                  {t.offerExample}
                </div>
                <div style={{ marginTop: 8, color: "#5d6f88" }}>{t.chooseServices}</div>

                <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
                  {services.map((service) => (
                    <label key={service} style={{ display: "flex", gap: 10, alignItems: "center", color: COLORS.ink }}>
                      <input
                        type="checkbox"
                        checked={helpOfferSelection.includes(service)}
                        onChange={() =>
                          toggleSelection(service, helpOfferSelection, setHelpOfferSelection)
                        }
                      />
                      {service}
                    </label>
                  ))}
                </div>

                {helpOfferSelection.includes(lang === "nb" ? "Annet" : "Other") && (
                  <textarea
                    value={helpOfferOther}
                    onChange={(e) => setHelpOfferOther(e.target.value)}
                    placeholder={t.specifyOther}
                    style={{
                      width: "100%",
                      minHeight: 100,
                      marginTop: 14,
                      borderRadius: 16,
                      border: `1px solid ${COLORS.line}`,
                      padding: 12,
                    }}
                  />
                )}

                <button
                  onClick={saveHelpOffer}
                  style={{
                    marginTop: 16,
                    background: COLORS.pink,
                    color: COLORS.ink,
                    border: "none",
                    borderRadius: 999,
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                >
                  {t.sendOffer}
                </button>
              </div>
            </div>
          </div>
        )}

        {page === "bookings" && (
          <div>
            <Header title={t.bookingsTitle} subtitle={t.bookingsText} />

            <div style={{ display: "grid", gap: 18 }}>
              {currentBookings.length === 0 && (
                <div
                  style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 24,
                    padding: 22,
                    color: "#5d6f88",
                    boxShadow: "0 12px 35px rgba(36,79,124,0.08)",
                  }}
                >
                  {t.noBookings}
                </div>
              )}

              {currentBookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    background: COLORS.white,
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 24,
                    padding: 22,
                    boxShadow: "0 12px 35px rgba(36,79,124,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 18,
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                    }}
                  >
                    <div>
                      <div style={{ color: "#7b8ca3", fontSize: 13, fontWeight: 700 }}>
                        {b.type}
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink, marginTop: 4 }}>
                        {b.name}
                      </div>
                      <div style={{ marginTop: 8, color: "#5d6f88" }}>{b.time}</div>
                      <div style={{ marginTop: 8, color: "#5d6f88", display: "flex", gap: 8, alignItems: "center" }}>
                        <MapPin size={14} color={COLORS.blue} />
                        {b.location}
                      </div>
                      <div style={{ marginTop: 8, color: "#5d6f88", display: "flex", gap: 8, alignItems: "center" }}>
                        <Clock3 size={14} color={COLORS.blue} />
                        {t.remaining}: {b.remaining}
                      </div>
                      <div
                        style={{
                          marginTop: 12,
                          display: "inline-flex",
                          background: COLORS.soft,
                          color: COLORS.ink,
                          borderRadius: 999,
                          padding: "6px 10px",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        {b.status}
                      </div>
                    </div>

                    <button
                      onClick={() => cancelBooking(b.id)}
                      style={{
                        background: COLORS.white,
                        color: "#b03554",
                        border: `1px solid #efc0ce`,
                        borderRadius: 999,
                        padding: "11px 14px",
                        cursor: "pointer",
                        fontWeight: 800,
                        display: "inline-flex",
                        gap: 8,
                        alignItems: "center",
                      }}
                    >
                      <XCircle size={16} color="#b03554" />
                      {t.cancel}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "confirmation" && (
          <div>
            <Header title={t.confirmationTitle} subtitle={t.confirmationText} />

            <div
              style={{
                background: COLORS.white,
                border: `1px solid ${COLORS.line}`,
                borderRadius: 28,
                padding: 28,
                maxWidth: 760,
                margin: "0 auto",
                boxShadow: "0 12px 35px rgba(36,79,124,0.08)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: "50%",
                  background: COLORS.okBg,
                  margin: "0 auto 18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CheckCircle2 size={30} color={COLORS.blue} />
              </div>

              <div style={{ fontSize: 28, fontWeight: 800, color: COLORS.ink }}>
                {t.actionRegistered}
              </div>
              <div style={{ marginTop: 10, color: "#5d6f88", lineHeight: 1.7 }}>
                {notice || t.alerts}
              </div>

              {selected && (
                <div
                  style={{
                    marginTop: 18,
                    background: COLORS.soft,
                    border: `1px solid ${COLORS.line}`,
                    borderRadius: 20,
                    padding: 16,
                    textAlign: "left",
                  }}
                >
                  <div style={{ color: "#7b8ca3", fontSize: 13, fontWeight: 700 }}>
                    {t.selectedItem}
                  </div>
                  <div style={{ marginTop: 6, color: COLORS.ink, fontWeight: 800 }}>
                    {selected.title}
                  </div>
                  <div style={{ marginTop: 6, color: "#5d6f88" }}>{selected.subtitle}</div>
                  <div style={{ marginTop: 6, color: "#5d6f88" }}>{selected.location}</div>
                </div>
              )}

              <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
                <button
                  onClick={() => setPage("bookings")}
                  style={{
                    background: COLORS.blue,
                    color: COLORS.white,
                    border: "none",
                    borderRadius: 999,
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                >
                  {t.bookings}
                </button>
                <button
                  onClick={() => setPage("home")}
                  style={{
                    background: COLORS.lightBlue,
                    color: COLORS.ink,
                    border: "none",
                    borderRadius: 999,
                    padding: "12px 16px",
                    cursor: "pointer",
                    fontWeight: 800,
                  }}
                >
                  {t.home}
                </button>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 28, textAlign: "center", color: "#7b8ca3", fontSize: 14 }}>
          {lang === "nb"
            ? "Demoen er laget som en visuell prototype og viser hvordan plattformen kan fungere uten å være et fullt utviklet system."
            : "This demo is a visual prototype that shows how the platform could work without being a fully developed system."}
        </div>
      </div>
    </div>
  );
}