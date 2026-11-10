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

// "Major Clients" carousel on the About Us and Our Clients pages.
// Logos live in /public/images/major-clients.
export const majorClients: Client[] = [
  { name: "Bangladesh University of Professionals (BUP)", logo: "/images/major-clients/39cc11ff-118e-46d5-b1c4-cf8b672d278c.png" },
  { name: "Bangladesh Coast Guard", logo: "/images/major-clients/3c9c4bcd-892f-4e1b-ba8a-9065a4f23ecc.png" },
  { name: "Bangladesh Forest Department", logo: "/images/major-clients/4b6587af-6eb0-46c9-9363-6e1def36da70.png" },
  { name: "Bangladesh Water Development Board (BWDB)", logo: "/images/major-clients/57b41c9f-78da-4b1d-9ac7-1d821db96a2c.png" },
  { name: "Koei Research & Consulting (KRC)", logo: "/images/major-clients/69a47a99-c61a-4527-8735-a872449f706b.png" },
  { name: "Uttaran", logo: "/images/major-clients/c804050d-b2b1-439b-a88f-34db5d852a68.png" },
  { name: "IFAD", logo: "/images/major-clients/d82a03d7-df7c-48e9-9bbb-18b2af18b432.png" },
  { name: "Local Government Engineering Department (LGED)", logo: "/images/major-clients/df370a4d-8769-42c7-b553-8d0859a9dc4d.png" },
];

// "Major Funding Agencies" grid on the Our Clients page.
// Logos live in /public/images/major-fundings.
export const fundingAgencies: Client[] = [
  { name: "Agence Française de Développement (AFD)", logo: "/images/major-fundings/13235835-3972-436f-b0cb-57060787547e.png" },
  { name: "Rapid Action Battalion (RAB)", logo: "/images/major-fundings/3fb71c6a-4176-49b3-9ecb-9ef1a60b1412.png" },
  { name: "Roads and Highways Department (RHD)", logo: "/images/major-fundings/7b27cf93-8709-41af-82f4-c660e2cc88fc.png" },
  { name: "Japan International Cooperation Agency (JICA)", logo: "/images/major-fundings/bc9ced30-d3a6-4a07-936c-c04ff2a1ff88.png" },
  { name: "Asian Development Bank (ADB)", logo: "/images/major-fundings/ca123ebe-71a1-4772-a61f-1bc05f91e991.png" },
  { name: "Save the Children", logo: "/images/major-fundings/d54cf4b5-8d16-4c09-8e9c-9a4690ed18f4.png" },
];
