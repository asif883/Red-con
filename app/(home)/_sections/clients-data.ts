// Client logos shown on the home page marquee and the Our Clients page.
// To add a client: drop the logo into /public/images/clients and add an entry here.
export interface Client {
  name: string;
  logo: string;
}

export const clients: Client[] = [
  { name: "Rapid Action Battalion (RAB)", logo: "/images/clients/client1.png" },
  { name: "Save the Children", logo: "/images/clients/client2.png" },
  { name: "Bangladesh University of Professionals (BUP)", logo: "/images/clients/client3.png" },
  { name: "Bangladesh Coast Guard", logo: "/images/clients/client4.png" },
  { name: "Client", logo: "/images/clients/client5.png" },
  { name: "Bangladesh Forest Department", logo: "/images/clients/client6.png" },
  { name: "Client", logo: "/images/clients/client7.png" },
  { name: "Local Government Engineering Department (LGED)", logo: "/images/clients/client8.png" },
  { name: "Agence Française de Développement (AFD)", logo: "/images/clients/client9.png" },
  { name: "Asian Development Bank (ADB)", logo: "/images/clients/client10.png" },
  { name: "Uttaran", logo: "/images/clients/client11.png" },
  { name: "IFAD", logo: "/images/clients/client12.png" },
  { name: "Koei Research & Consulting (KRC)", logo: "/images/clients/client13.png" },
  { name: "Japan International Cooperation Agency (JICA)", logo: "/images/clients/client14.png" },
  // TODO: KOICA — add the logo file, then uncomment.
  // { name: "Korea International Cooperation Agency (KOICA)", logo: "/images/clients/koica.png" },
];
