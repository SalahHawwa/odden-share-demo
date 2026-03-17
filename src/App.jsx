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

const initialBookingsByUser = {
  "21458731904": [
    {
      id: "b1",
      type: "Mobilitet",
      name: "Elbil – Odden mobilitetspunkt",
      time: "Onsdag 14:00–18:00",
      remaining: "2 t 10 min",
      status: "Aktiv",
      location: "Odden mobilitetspunkt",
    },
    {
      id: "b2",
      type: "Rom",
      name: "Stillerom 2",
      time: "Torsdag 09:00–11:00",
      remaining: "1 dag",
      status: "Aktiv",
      location: "Nabolagshus, 2. etasje",
    },
  ],
};

const helpServices = [
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

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "#e5e7eb",
    padding: "24px",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  card: {
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "18px",
    padding: "20px",
    marginBottom: "18px",
  },
  hero: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "56px",
    margin: "10px 0 8px",
    color: "white",
    fontWeight: "700",
  },
  subtitle: {
    fontSize: "17px",
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  smallTop: {
    display: "inline-flex",
    gap: "8px",
    alignItems: "center",
    color: "#cbd5e1",
    fontSize: "14px",
  },
  nav: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "16px",
  },
  button: {
    background: "#1f2937",
    color: "white",
    border: "1px solid #475569",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
  },
  buttonPrimary: {
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
  },
  buttonDanger: {
    background: "#7f1d1d",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 14px",
    cursor: "pointer",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "16px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "16px",
  },
  sectionTitle: {
    fontSize: "32px",
    color: "white",
    marginBottom: "8px",
  },
  muted: {
    color: "#cbd5e1",
  },
  itemTitle: {
    fontSize: "20px",
    color: "white",
    margin: "0 0 6px",
  },
  itemBox: {
    background: "#111827",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "16px",
  },
  tagWrap: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  tag: {
    background: "#1e293b",
    borderRadius: "999px",
    padding: "6px 10px",
    fontSize: "12px",
    color: "#e2e8f0",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    gap: "14px",
    alignItems: "flex-start",
    flexWrap: "wrap",
  },
  input: {
    width: "100%",
    background: "#0b1220",
    color: "white",
    border: "1px solid #475569",
    borderRadius: "10px",
    padding: "10px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    color: "#cbd5e1",
  },
  infoGood: {
    background: "#052e16",
    border: "1px solid #166534",
    color: "#dcfce7",
    borderRadius: "14px",
    padding: "14px",
  },
  infoWarn: {
    background: "#3f1d0a",
    border: "1px solid #92400e",
    color: "#fde68a",
    borderRadius: "14px",
    padding: "14px",
  },
};

function SectionButton({ icon: Icon, title, text, onClick }) {
  return (
    <button onClick={onClick} style={{ ...styles.itemBox, textAlign: "left", cursor: "pointer" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
        <Icon size={22} color="#e5e7eb" />
        <div>
          <div style={{ ...styles.itemTitle, fontSize: "18px" }}>{title}</div>
          <div style={styles.muted}>{text}</div>
        </div>
      </div>
    </button>
  );
}

function ItemCard({ icon: Icon, title, subtitle, meta, location, extra, action, onClick }) {
  return (
    <div style={styles.itemBox}>
      <div style={styles.rowBetween}>
        <div style={{ maxWidth: "720px" }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "8px" }}>
            <Icon size={20} color="#e5e7eb" />
            <h3 style={styles.itemTitle}>{title}</h3>
          </div>
          <div style={styles.muted}>{subtitle}</div>
          <div style={{ marginTop: "8px", color: "#94a3b8" }}>{meta}</div>
          <div style={{ marginTop: "6px", color: "#94a3b8" }}>
            <MapPin size={14} color="#cbd5e1" style={{ verticalAlign: "middle", marginRight: "6px" }} />
            {location}
          </div>
          {extra?.length > 0 && (
            <div style={styles.tagWrap}>
              {extra.map((x, i) => (
                <span key={i} style={styles.tag}>{x}</span>
              ))}
            </div>
          )}
        </div>
        <button onClick={onClick} style={styles.buttonPrimary}>{action}</button>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [pageHistory, setPageHistory] = useState([]);
  const [lang, setLang] = useState("nb");
  const [bookingsByUser, setBookingsByUser] = useState(initialBookingsByUser);
  const [points, setPoints] = useState(28);
  const [notice, setNotice] = useState("");
  const [selected, setSelected] = useState(null);

  const [residentId, setResidentId] = useState(DEMO_USERS[0].id);
  const [apartment, setApartment] = useState(DEMO_USERS[0].apartment);
  const [licenseId, setLicenseId] = useState(DEMO_USERS[0].license || "Ingen registrert");
  const [carVerified, setCarVerified] = useState(DEMO_USERS[0].verified);

  const [helpRequestSelection, setHelpRequestSelection] = useState([]);
  const [helpRequestOther, setHelpRequestOther] = useState("");

  const currentUser = DEMO_USERS.find((u) => u.id === residentId) || DEMO_USERS[0];
  const currentBookings = bookingsByUser[residentId] || [];
  const registeredApartment = currentUser.apartment !== "Ikke registrert";
  const hasRegisteredLicense = !!currentUser.license;

  const goToPage = (nextPage) => {
    if (nextPage === page) return;
    setPageHistory((prev) => [...prev, page]);
    setPage(nextPage);
  };

  const goBack = () => {
    if (pageHistory.length === 0) {
      setPage("home");
      return;
    }
    const last = pageHistory[pageHistory.length - 1];
    setPageHistory((prev) => prev.slice(0, -1));
    setPage(last);
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

  const mobility = useMemo(
    () => [
      {
        title: lang === "nb" ? "Elbil" : "Electric car",
        subtitle: lang === "nb" ? "Ledig i ettermiddag" : "Available this afternoon",
        meta: lang === "nb" ? "69 kr/time" : "69 NOK/hour",
        location: lang === "nb" ? "Odden mobilitetspunkt" : "Odden mobility hub",
        extra: [
          lang === "nb" ? "Status: Ledig" : "Status: Available",
          lang === "nb" ? "Batteri: 82%" : "Battery: 82%",
          lang === "nb" ? "Ladetid: 35 min" : "Charge time: 35 min",
          lang === "nb" ? "Rekkevidde: 280 km" : "Range: 280 km",
          lang === "nb" ? "Seter: 5" : "Seats: 5",
        ],
        icon: Car,
      },
      {
        title: lang === "nb" ? "Elsykkel" : "E-bike",
        subtitle: lang === "nb" ? "3 ledige sykler" : "3 bikes available",
        meta: lang === "nb" ? "25 kr/time" : "25 NOK/hour",
        location: lang === "nb" ? "Stasjon Parkgata" : "Parkgata station",
        extra: [
          lang === "nb" ? "Status: Ledig" : "Status: Available",
          lang === "nb" ? "Batteri: 64%" : "Battery: 64%",
          lang === "nb" ? "Ladetid: 20 min" : "Charge time: 20 min",
          lang === "nb" ? "Rekkevidde: 42 km" : "Range: 42 km",
        ],
        icon: Bike,
      },
      {
        title: lang === "nb" ? "Sykkel" : "Bike",
        subtitle: lang === "nb" ? "Vanlig bysykkel" : "Regular city bike",
        meta: lang === "nb" ? "15 kr/time" : "15 NOK/hour",
        location: lang === "nb" ? "Elvepromenaden" : "River promenade",
        extra: [lang === "nb" ? "Status: Ledig" : "Status: Available"],
        icon: Bike,
      },
      {
        title: lang === "nb" ? "Lastesykkel" : "Cargo bike",
        subtitle: lang === "nb" ? "Passer til handling og barn" : "Suitable for shopping and children",
        meta: lang === "nb" ? "35 kr/time" : "35 NOK/hour",
        location: lang === "nb" ? "Mobilitetshus" : "Mobility house",
        extra: [
          lang === "nb" ? "Status: Lader" : "Status: Charging",
          lang === "nb" ? "Batteri: 48%" : "Battery: 48%",
          lang === "nb" ? "Ladetid: 50 min" : "Charge time: 50 min",
          lang === "nb" ? "Lastekapasitet: 100 kg" : "Cargo capacity: 100 kg",
        ],
        icon: Bike,
      },
      {
        title: lang === "nb" ? "Tilhenger" : "Trailer",
        subtitle: lang === "nb" ? "Bookes ved behov" : "Booked when needed",
        meta: lang === "nb" ? "49 kr/time" : "49 NOK/hour",
        location: lang === "nb" ? "Mobilitetshus" : "Mobility house",
        extra: [lang === "nb" ? "Lastekapasitet: 750 kg" : "Cargo capacity: 750 kg"],
        icon: Wrench,
      },
    ],
    [lang]
  );

  const spaces = useMemo(
    () => [
      {
        title: lang === "nb" ? "Hjemmekontor" : "Home office room",
        subtitle: lang === "nb" ? "Rolig arbeidsrom med skjerm" : "Quiet work room with screen",
        meta: lang === "nb" ? "45 kr/time" : "45 NOK/hour",
        location: lang === "nb" ? "Nabolagshus, 2. etasje" : "Community house, 2nd floor",
        extra: [lang === "nb" ? "Skjerm og docking" : "Screen and docking"],
        icon: Briefcase,
      },
      {
        title: lang === "nb" ? "Møterom" : "Meeting room",
        subtitle: lang === "nb" ? "Passer til gruppemøter" : "Suitable for group meetings",
        meta: lang === "nb" ? "70 kr/time" : "70 NOK/hour",
        location: lang === "nb" ? "Nabolagshus, 1. etasje" : "Community house, 1st floor",
        extra: [lang === "nb" ? "6 personer" : "6 people"],
        icon: Users,
      },
      {
        title: lang === "nb" ? "Studierom" : "Study room",
        subtitle: lang === "nb" ? "For lesing og prosjektarbeid" : "For reading and project work",
        meta: lang === "nb" ? "30 kr/time" : "30 NOK/hour",
        location: lang === "nb" ? "Stille sone" : "Quiet zone",
        extra: [lang === "nb" ? "2 plasser" : "2 seats"],
        icon: Briefcase,
      },
      {
        title: lang === "nb" ? "Aktivitetsrom" : "Activity room",
        subtitle: lang === "nb" ? "Kan brukes til hobby og kurs" : "Can be used for hobby and courses",
        meta: lang === "nb" ? "90 kr per økt" : "90 NOK per session",
        location: lang === "nb" ? "Nabolagshus, bakgård" : "Community house, courtyard side",
        extra: [lang === "nb" ? "Fleksibelt rom" : "Flexible room"],
        icon: Home,
      },
      {
        title: lang === "nb" ? "Selskapsrom" : "Event room",
        subtitle: lang === "nb" ? "Til bursdag eller samling" : "For birthdays or gatherings",
        meta: lang === "nb" ? "250 kr per kveld" : "250 NOK per evening",
        location: lang === "nb" ? "Nabolagshus, taketasje" : "Community house, top floor",
        extra: [lang === "nb" ? "Kjøkkenkrok" : "Small kitchen"],
        icon: Users,
      },
    ],
    [lang]
  );

  const guest = useMemo(
    () => [
      {
        title: lang === "nb" ? "Gjesteleilighet A" : "Guest apartment A",
        subtitle: lang === "nb" ? "For korttidsbesøk" : "For short-term visits",
        meta: lang === "nb" ? "450 kr/natt" : "450 NOK/night",
        location: lang === "nb" ? "Bygg B, inngang 2" : "Building B, entrance 2",
        extra: [lang === "nb" ? "2 sengeplasser" : "2 beds"],
        icon: BedDouble,
      },
      {
        title: lang === "nb" ? "Gjesteleilighet B" : "Guest apartment B",
        subtitle: lang === "nb" ? "Større enhet for familie" : "Larger unit for family",
        meta: lang === "nb" ? "700 kr/natt" : "700 NOK/night",
        location: lang === "nb" ? "Bygg E, inngang 1" : "Building E, entrance 1",
        extra: [lang === "nb" ? "4 sengeplasser" : "4 beds"],
        icon: BedDouble,
      },
      {
        title: lang === "nb" ? "Del bolig ved fravær" : "Share home while away",
        subtitle:
          lang === "nb"
            ? "Registrer at boligen kan brukes når du er bortreist"
            : "Register that your home can be used while away",
        meta: lang === "nb" ? "Administreres i appen" : "Managed in the app",
        location: apartment,
        extra: [lang === "nb" ? "Krever godkjenning" : "Requires approval"],
        icon: Home,
      },
    ],
    [lang, apartment]
  );

  const tools = useMemo(
    () => [
      {
        title: lang === "nb" ? "Boremaskin" : "Drill",
        subtitle: lang === "nb" ? "For montering og småprosjekter" : "For assembly and small projects",
        meta: lang === "nb" ? "20 kr/time" : "20 NOK/hour",
        location: lang === "nb" ? "Verktøylager A" : "Tool storage A",
        extra: [lang === "nb" ? "Kategori: El-verktøy" : "Category: Power tool", lang === "nb" ? "Hylle 2" : "Shelf 2"],
        icon: Hammer,
      },
      {
        title: lang === "nb" ? "Stikksag" : "Jigsaw",
        subtitle: lang === "nb" ? "Til treplater og finere kutt" : "For wood panels and finer cuts",
        meta: lang === "nb" ? "25 kr/time" : "25 NOK/hour",
        location: lang === "nb" ? "Verktøylager A" : "Tool storage A",
        extra: [lang === "nb" ? "Kategori: El-verktøy" : "Category: Power tool", lang === "nb" ? "Hylle 3" : "Shelf 3"],
        icon: Wrench,
      },
      {
        title: lang === "nb" ? "Verktøysett for sykkel" : "Bike tool kit",
        subtitle: lang === "nb" ? "For enkel sykkelservice" : "For basic bike maintenance",
        meta: lang === "nb" ? "15 kr/time" : "15 NOK/hour",
        location: lang === "nb" ? "Verkstedstasjon" : "Workshop station",
        extra: [lang === "nb" ? "Kategori: Sykkelverktøy" : "Category: Bike tools"],
        icon: Wrench,
      },
      {
        title: lang === "nb" ? "Malerutstyr" : "Painting kit",
        subtitle: lang === "nb" ? "Ruller, brett og dekkplast" : "Rollers, tray and cover sheets",
        meta: lang === "nb" ? "18 kr/time" : "18 NOK/hour",
        location: lang === "nb" ? "Verktøylager B" : "Tool storage B",
        extra: [lang === "nb" ? "Kategori: Maleutstyr" : "Category: Painting tools"],
        icon: Hammer,
      },
    ],
    [lang]
  );

  const bookItem = (category, item) => {
    const confirmText =
      lang === "nb"
        ? `Vil du reservere ${item.title}?`
        : `Do you want to reserve ${item.title}?`;

    if (!window.confirm(confirmText)) return;

    const isCar =
      item.title.toLowerCase().includes("elbil") ||
      item.title.toLowerCase().includes("electric car");

    if (isCar && !registeredApartment) {
      setNotice(
        lang === "nb"
          ? "Denne demo-brukeren er ikke registrert i en godkjent boenhet i området."
          : "This demo user is not registered in an approved apartment."
      );
      setSelected(item);
      goToPage("confirmation");
      return;
    }

    if (isCar && !carVerified) {
      setNotice(
        lang === "nb"
          ? "Billeie krever verifisert førerkort i demoen."
          : "Car rental requires a verified driver license in this demo."
      );
      setSelected(item);
      goToPage("confirmation");
      return;
    }

    const labels = {
      mobility: lang === "nb" ? "Mobilitet" : "Mobility",
      spaces: lang === "nb" ? "Rom" : "Room",
      guest: lang === "nb" ? "Gjesteløsning" : "Guest solution",
      tools: lang === "nb" ? "Verktøy" : "Tool",
    };

    const newBooking = {
      id: `${Date.now()}`,
      type: labels[category],
      name: item.title,
      time: lang === "nb" ? "Valgt eksempelbooking" : "Selected sample booking",
      remaining: lang === "nb" ? "Ny booking" : "New booking",
      status: lang === "nb" ? "Aktiv" : "Active",
      location: item.location,
    };

    setBookingsByUser((prev) => ({
      ...prev,
      [residentId]: [newBooking, ...(prev[residentId] || [])],
    }));

    setSelected(item);
    setNotice(
      lang === "nb"
        ? `${item.title} er lagt til i Mine bookinger. Lokasjon: ${item.location}`
        : `${item.title} has been added to My bookings. Location: ${item.location}`
    );
    goToPage("confirmation");
  };

  const cancelBooking = (bookingId, bookingName) => {
    const confirmText =
      lang === "nb"
        ? `Vil du avbestille ${bookingName}?`
        : `Do you want to cancel ${bookingName}?`;

    if (!window.confirm(confirmText)) return;

    setBookingsByUser((prev) => ({
      ...prev,
      [residentId]: (prev[residentId] || []).filter((b) => b.id !== bookingId),
    }));

    setNotice(
      lang === "nb"
        ? "Bookingen er fjernet fra Mine bookinger."
        : "The booking has been removed from My bookings."
    );
    setSelected(null);
    goToPage("confirmation");
  };

  const verifyLicenseForCar = () => {
    const confirmText =
      lang === "nb"
        ? "Vil du bekrefte førerkort for billeie?"
        : "Do you want to verify the driver license for car rental?";

    if (!window.confirm(confirmText)) return;

    if (!registeredApartment) {
      setNotice(
        lang === "nb"
          ? "Denne demo-brukeren er ikke registrert i en godkjent boenhet i området."
          : "This demo user is not registered in an approved apartment."
      );
      goToPage("confirmation");
      return;
    }

    if (!hasRegisteredLicense) {
      setNotice(
        lang === "nb"
          ? "Denne demo-brukeren har ikke registrert førerkort for billeie."
          : "This demo user does not have a registered driver license."
      );
      goToPage("confirmation");
      return;
    }

    setCarVerified(true);
    setNotice(
      lang === "nb"
        ? "Førerkort er bekreftet for demo-bruker. Elbil kan nå reserveres."
        : "Driver license verified. Electric car can now be reserved."
    );
    goToPage("confirmation");
  };

  const sendHelpRequest = () => {
    const confirmText =
      lang === "nb"
        ? "Vil du sende denne forespørselen om hjelp?"
        : "Do you want to send this help request?";

    if (!window.confirm(confirmText)) return;

    setPoints((p) => p - 4);
    setNotice(lang === "nb" ? "Forespørsel om hjelp er sendt." : "Help request sent.");
    goToPage("confirmation");
  };

  const renderHeader = (title, subtitle) => (
    <div style={styles.card}>
      <button style={{ ...styles.button, marginBottom: "14px" }} onClick={goBack}>
        <ArrowLeft size={16} style={{ marginRight: "6px", verticalAlign: "middle" }} />
        {lang === "nb" ? "Tilbake" : "Back"}
      </button>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <p style={styles.subtitle}>{subtitle}</p>
    </div>
  );

  const renderHome = () => (
    <>
      <div style={styles.card}>
        <div style={styles.hero}>
          <div style={styles.smallTop}>
            <MapPin size={18} color="#cbd5e1" />
            <span>{lang === "nb" ? "Demo for Odden" : "Demo for Odden"}</span>
          </div>

          <div style={styles.title}>Odden Share</div>
          <div style={styles.subtitle}>
            {lang === "nb"
              ? "En enkel demonstrasjon av hvordan en digital plattform for delingsøkonomi i Odden kan fungere."
              : "A simple demonstration of how a digital sharing platform for Odden could work."}
          </div>

          <div style={styles.nav}>
            <button style={styles.button} onClick={() => setPage("home")}>
              {lang === "nb" ? "Forside" : "Home"}
            </button>
            <button style={styles.button} onClick={() => goToPage("mobility")}>
              {lang === "nb" ? "Mobilitet" : "Mobility"}
            </button>
            <button style={styles.button} onClick={() => goToPage("spaces")}>
              {lang === "nb" ? "Rom og lokaler" : "Rooms"}
            </button>
            <button style={styles.button} onClick={() => goToPage("guest")}>
              {lang === "nb" ? "Gjesteløsninger" : "Guest"}
            </button>
            <button style={styles.button} onClick={() => goToPage("tools")}>
              {lang === "nb" ? "Verktøy" : "Tools"}
            </button>
            <button style={styles.button} onClick={() => goToPage("help")}>
              {lang === "nb" ? "Nabohjelp" : "Neighbor help"}
            </button>
            <button style={styles.button} onClick={() => goToPage("bookings")}>
              {lang === "nb" ? "Mine bookinger" : "My bookings"}
            </button>
          </div>

          <div style={{ ...styles.nav, marginTop: "10px" }}>
            <button style={styles.button} onClick={() => setLang("nb")}>
              <Globe2 size={16} color="#e5e7eb" style={{ marginRight: "6px", verticalAlign: "middle" }} />
              Bokmål
            </button>
            <button style={styles.button} onClick={() => setLang("en")}>English</button>
          </div>
        </div>
      </div>

      <div style={styles.grid2}>
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>
            {lang === "nb" ? "En plattform for deling i hverdagen" : "A platform for everyday sharing"}
          </h2>
          <p style={styles.subtitle}>
            {lang === "nb"
              ? "Plattformen samler mobilitet, fellesrom, gjesteløsninger, verktøy og nabohjelp på ett sted. Beboere kan booke, betale, bruke poeng og få oversikt over egne reservasjoner."
              : "The platform brings mobility, shared rooms, guest solutions, tools and neighbor help together in one place."}
          </p>
          <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button style={styles.buttonPrimary} onClick={() => goToPage("mobility")}>
              {lang === "nb" ? "Se mobilitet" : "View mobility"}
            </button>
            <button style={styles.buttonPrimary} onClick={() => goToPage("spaces")}>
              {lang === "nb" ? "Se fellesrom" : "View spaces"}
            </button>
          </div>
        </div>

        <div style={styles.card}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Coins color="#e5e7eb" />
            <h3 style={{ ...styles.itemTitle, margin: 0 }}>{lang === "nb" ? "Poengsaldo" : "Points balance"}</h3>
          </div>
          <div style={{ fontSize: "42px", color: "white", marginTop: "14px" }}>{points}</div>
          <p style={styles.subtitle}>
            {lang === "nb"
              ? "Poeng kan brukes til mindre nabotjenester og tjenes ved å hjelpe andre."
              : "Points can be used for small neighbor-help services."}
          </p>
        </div>
      </div>

      <div style={styles.card}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" }}>
          <IdCard color="#e5e7eb" />
          <h2 style={{ ...styles.sectionTitle, margin: 0 }}>
            {lang === "nb" ? "Demoidentitet" : "Demo identity"}
          </h2>
        </div>

        <p style={styles.subtitle}>
          {lang === "nb"
            ? "Velg en fiktiv demoidentitet for å vise hvordan innlogging og reservasjon kan fungere."
            : "Choose a fictional demo identity to show how login and reservation could work."}
        </p>

        <div style={{ ...styles.grid3, marginTop: "16px" }}>
          <div>
            <label style={styles.label}>{lang === "nb" ? "Demo-ID" : "Demo ID"}</label>
            <select style={styles.input} value={residentId} onChange={(e) => syncByUser(e.target.value)}>
              {DEMO_USERS.map((u) => (
                <option key={u.id} value={u.id}>{u.id}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={styles.label}>{lang === "nb" ? "Boenhet" : "Apartment"}</label>
            <input style={styles.input} value={apartment} readOnly />
          </div>

          <div>
            <label style={styles.label}>{lang === "nb" ? "Førerkort-ID" : "Driver license ID"}</label>
            <select
              style={styles.input}
              value={licenseId || "Ingen registrert"}
              onChange={(e) => {
                setLicenseId(e.target.value);
                syncByLicense(e.target.value);
              }}
            >
              {LICENSE_OPTIONS.map((id) => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: "16px" }}>
          <button style={styles.buttonPrimary} onClick={verifyLicenseForCar}>
            {carVerified
              ? (lang === "nb" ? "Verifisert for billeie" : "Verified for car rental")
              : (lang === "nb" ? "Bekreft førerkort for billeie" : "Verify driver license")}
          </button>
        </div>

        <div style={{ ...styles.grid2, marginTop: "18px" }}>
          <div style={registeredApartment ? styles.infoGood : styles.infoWarn}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              {registeredApartment ? (
                <CheckCircle2 size={18} color="#dcfce7" />
              ) : (
                <TriangleAlert size={18} color="#fde68a" />
              )}
              <strong>{lang === "nb" ? "Boenhet" : "Apartment"}</strong>
            </div>
            <div>
              {registeredApartment
                ? apartment
                : (lang === "nb" ? "Ikke registrert i godkjent boenhet." : "Not registered in approved apartment.")}
            </div>
          </div>

          <div style={hasRegisteredLicense ? styles.infoGood : styles.infoWarn}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>
              {hasRegisteredLicense ? (
                <CheckCircle2 size={18} color="#dcfce7" />
              ) : (
                <TriangleAlert size={18} color="#fde68a" />
              )}
              <strong>{lang === "nb" ? "Førerkort-ID" : "Driver license ID"}</strong>
            </div>
            <div>
              {hasRegisteredLicense
                ? licenseId
                : (lang === "nb" ? "Ingen registrert førerkort-ID." : "No registered driver license ID.")}
            </div>
          </div>
        </div>
      </div>

      <div style={styles.grid3}>
        <SectionButton
          icon={Car}
          title={lang === "nb" ? "Mobilitet" : "Mobility"}
          text={lang === "nb" ? "Book elbil, sykkel og tilhenger." : "Book car, bike and trailer."}
          onClick={() => goToPage("mobility")}
        />
        <SectionButton
          icon={Briefcase}
          title={lang === "nb" ? "Rom og lokaler" : "Rooms"}
          text={lang === "nb" ? "Book hjemmekontor, møterom og studierom." : "Book office, meeting and study rooms."}
          onClick={() => goToPage("spaces")}
        />
        <SectionButton
          icon={BedDouble}
          title={lang === "nb" ? "Gjesteløsninger" : "Guest solutions"}
          text={lang === "nb" ? "Se gjesteleiligheter og boligdeling." : "See guest apartments and home sharing."}
          onClick={() => goToPage("guest")}
        />
        <SectionButton
          icon={Hammer}
          title={lang === "nb" ? "Verktøy" : "Tools"}
          text={lang === "nb" ? "Felles verktøybibliotek." : "Shared tool library."}
          onClick={() => goToPage("tools")}
        />
        <SectionButton
          icon={Users}
          title={lang === "nb" ? "Nabohjelp" : "Neighbor help"}
          text={lang === "nb" ? "Be om hjelp eller tilby hjelp." : "Request or offer help."}
          onClick={() => goToPage("help")}
        />
        <SectionButton
          icon={Calendar}
          title={lang === "nb" ? "Mine bookinger" : "My bookings"}
          text={lang === "nb" ? "Se og avbestill bookinger." : "See and cancel bookings."}
          onClick={() => goToPage("bookings")}
        />
      </div>
    </>
  );

  const renderListPage = (title, subtitle, list, category, actionText) => (
    <>
      {renderHeader(title, subtitle)}
      <div style={{ display: "grid", gap: "14px" }}>
        {list.map((item) => (
          <ItemCard
            key={item.title}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
            meta={item.meta}
            location={item.location}
            extra={item.extra}
            action={actionText}
            onClick={() => bookItem(category, item)}
          />
        ))}
      </div>
    </>
  );

  const renderHelp = () => (
    <>
      {renderHeader(
        lang === "nb" ? "Nabohjelp og poeng" : "Neighbor help and points",
        lang === "nb"
          ? "Velg hvilke tjenester du trenger hjelp til."
          : "Choose which services you need help with."
      )}

      <div style={styles.card}>
        <h3 style={styles.itemTitle}>{lang === "nb" ? "Be om hjelp" : "Request help"}</h3>
        <div style={{ marginTop: "12px" }}>
          {helpServices.map((service) => (
            <label key={service} style={{ display: "block", marginBottom: "10px" }}>
              <input
                type="checkbox"
                checked={helpRequestSelection.includes(service)}
                onChange={() => {
                  setHelpRequestSelection((prev) =>
                    prev.includes(service) ? prev.filter((x) => x !== service) : [...prev, service]
                  );
                }}
                style={{ marginRight: "8px" }}
              />
              {service}
            </label>
          ))}
        </div>

        {helpRequestSelection.includes("Annet") && (
          <textarea
            style={{ ...styles.input, marginTop: "12px", minHeight: "100px" }}
            placeholder={lang === "nb" ? "Beskriv annet behov" : "Describe another need"}
            value={helpRequestOther}
            onChange={(e) => setHelpRequestOther(e.target.value)}
          />
        )}

        <div style={{ marginTop: "16px" }}>
          <button style={styles.buttonPrimary} onClick={sendHelpRequest}>
            {lang === "nb" ? "Send forespørsel" : "Send request"}
          </button>
        </div>
      </div>
    </>
  );

  const renderBookings = () => (
    <>
      {renderHeader(
        lang === "nb" ? "Mine bookinger" : "My bookings",
        lang === "nb"
          ? "Her ser du bookingene til valgt demo-bruker."
          : "Here you can see bookings for the selected demo user."
      )}

      <div style={{ display: "grid", gap: "14px" }}>
        {currentBookings.length === 0 && (
          <div style={styles.itemBox}>
            {lang === "nb"
              ? "Ingen aktive bookinger for valgt demo-bruker."
              : "No active bookings for selected demo user."}
          </div>
        )}

        {currentBookings.map((b) => (
          <div key={b.id} style={styles.itemBox}>
            <div style={styles.rowBetween}>
              <div>
                <div style={{ color: "#94a3b8", fontSize: "13px" }}>{b.type}</div>
                <h3 style={styles.itemTitle}>{b.name}</h3>
                <div style={styles.muted}>{b.time}</div>
                <div style={{ marginTop: "6px", color: "#94a3b8" }}>
                  <MapPin size={14} color="#cbd5e1" style={{ verticalAlign: "middle", marginRight: "6px" }} />
                  {b.location}
                </div>
                <div style={{ marginTop: "6px", color: "#94a3b8" }}>
                  <Clock3 size={14} color="#cbd5e1" style={{ verticalAlign: "middle", marginRight: "6px" }} />
                  {lang === "nb" ? "Gjenstående tid" : "Time remaining"}: {b.remaining}
                </div>
              </div>

              <button
                style={styles.buttonDanger}
                onClick={() => cancelBooking(b.id, b.name)}
              >
                <XCircle size={16} color="#fecaca" style={{ verticalAlign: "middle", marginRight: "6px" }} />
                {lang === "nb" ? "Avbestill" : "Cancel"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const renderConfirmation = () => (
    <>
      {renderHeader(
        lang === "nb" ? "Bekreftelse" : "Confirmation",
        lang === "nb"
          ? "Eksempel på hvordan systemet kan vise en booking eller en forespørsel etter at brukeren har fullført et valg."
          : "Example of how the system can show a booking or request after the user completes an action."
      )}

      <div style={styles.card}>
        <div style={{ textAlign: "center" }}>
          <CheckCircle2 size={48} color="#4ade80" />
          <h2 style={styles.sectionTitle}>{lang === "nb" ? "Handling registrert" : "Action registered"}</h2>
          <p style={styles.subtitle}>{notice}</p>
        </div>

        {selected && (
          <div style={{ ...styles.itemBox, marginTop: "18px" }}>
            <div style={{ color: "#94a3b8", marginBottom: "6px" }}>
              {lang === "nb" ? "Valgt element" : "Selected item"}
            </div>
            <h3 style={styles.itemTitle}>{selected.title}</h3>
            <div style={styles.muted}>{selected.subtitle}</div>
            <div style={{ marginTop: "8px", color: "#94a3b8" }}>{selected.location}</div>
          </div>
        )}

        <div style={{ marginTop: "16px" }}>
          <button style={styles.buttonPrimary} onClick={goBack}>
            {lang === "nb" ? "Tilbake" : "Back"}
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {page === "home" && renderHome()}
        {page === "mobility" &&
          renderListPage(
            lang === "nb" ? "Mobilitet" : "Mobility",
            lang === "nb"
              ? "Her kan beboerne booke delte transportløsninger ved behov."
              : "Residents can book shared mobility here.",
            mobility,
            "mobility",
            lang === "nb" ? "Reserver" : "Reserve"
          )}
        {page === "spaces" &&
          renderListPage(
            lang === "nb" ? "Rom og lokaler" : "Rooms and spaces",
            lang === "nb"
              ? "Bookbare rom gjør det enklere å bo kompakt."
              : "Bookable rooms make compact living easier.",
            spaces,
            "spaces",
            lang === "nb" ? "Book rom" : "Book room"
          )}
        {page === "guest" &&
          renderListPage(
            lang === "nb" ? "Gjesteløsninger" : "Guest solutions",
            lang === "nb"
              ? "Eksempel på gjesteleiligheter og boligdeling."
              : "Example of guest apartments and home sharing.",
            guest,
            "guest",
            lang === "nb" ? "Åpne" : "Open"
          )}
        {page === "tools" &&
          renderListPage(
            lang === "nb" ? "Verktøybibliotek" : "Tool library",
            lang === "nb"
              ? "Eksempel på felles verktøytilbud."
              : "Example of a shared tool offer.",
            tools,
            "tools",
            lang === "nb" ? "Reserver" : "Reserve"
          )}
        {page === "help" && renderHelp()}
        {page === "bookings" && renderBookings()}
        {page === "confirmation" && renderConfirmation()}
      </div>
    </div>
  );
}