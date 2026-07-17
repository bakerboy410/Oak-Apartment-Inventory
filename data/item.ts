import { Item } from "@/types/item";

export const items: Item[] = [
  {
    id: "blank-plate",
    name: "Blank Plate",
    description:
      "Used to cover unused electrical switch or socket openings, providing a neat and safe finish.",
    store: 1,
    images: ["/images/items/Blank plate.jpeg"],
    hasQuantity: false,
    variants: [
      {
        name: "Single Plug Blank Plate",
        images: [],
        hasQuantity: true,
        quantity: 6,
        unit: "pieces",
      },
      {
        name: "Double Plug Blank Plate",
        images: ["/images/variants/Blank plate(1).jpeg"],
        hasQuantity: true,
        quantity: 6,
        unit: "pieces",
      },
    ],
  },

  {
    id: "cat-6-cable",
    name: "CAT 6 Cable",
    description:
      "Network cable used for Ethernet installations, supporting high-speed data transmission.",
    store: 1,
    images: ["/images/items/CAT 6 Cable.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "cement",
    name: "Cement",
    description: "Portland cement used for construction and repair work.",
    store: 1,
    images: ["/images/items/Cement.jpeg"],
    hasQuantity: true,
    quantity: 4,
    unit: "kg",
    variants: [],
  },

  {
    id: "concrete-vibrator-hose",
    name: "Concrete Vibrator Hose",
    description:
      "Flexible hose used with a concrete vibrator to remove trapped air from freshly poured concrete.",
    store: 1,
    images: ["/images/items/Concrete Vibrator Hose.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "dr-fixit-pidiproof",
    name: "Dr. Fixit Pidiproof LW+101",
    description:
      "Liquid waterproofing additive mixed with cement to improve water resistance.",
    store: 1,
    images: ["/images/items/Dr.Fixit Pidiproof.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "edge-banding",
    name: "Edge Banding",
    description:
      "Protective strip used to finish exposed edges of plywood and MDF boards.",
    store: 1,
    images: ["/images/items/Edge Banding.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "electrical-supplies",
    name: "Electrical Supplies",
    description:
      "Collection of assorted electrical wiring accessories and PVC conduit fittings.",
    store: 1,
    images: ["/images/items/electric stuff.jpg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "flexible-hose-connector",
    name: "Flexible Hose Connector",
    description:
      "Connector used to join flexible plumbing hoses to taps and fixtures.",
    store: 1,
    images: ["/images/items/Flexible hose Connector.jpeg"],
    hasQuantity: true,
    quantity: 5,
    unit: "pieces",
    variants: [],
  },

  {
    id: "floor-drain",
    name: "Floor Drain",
    description:
      "Drain fitting installed in floors to channel wastewater into the drainage system.",
    store: 1,
    images: ["/images/items/Floor Drain.jpeg"],
    hasQuantity: false,
    variants: [
      {
        name: "Complete",
        images: [],
        hasQuantity: true,
        quantity: 9,
        unit: "pieces",
      },
      {
        name: "Without Filter",
        images: [],
        hasQuantity: true,
        quantity: 5,
        unit: "pieces",
      },
    ],
  },

  {
    id: "grease",
    name: "Grease",
    description:
      "Lubricating grease used to reduce friction and protect moving parts.",
    store: 1,
    images: ["/images/items/Grease.jpg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "grout",
    name: "Grout",
    description:
      "Material used to fill the joints between ceramic or porcelain tiles.",
    store: 1,
    images: ["/images/items/Grout.jpeg"],
    hasQuantity: false,
    variants: [
      {
        name: "Beige",
        images: [],
        hasQuantity: false,
      },
      {
        name: "White",
        images: [],
        hasQuantity: false,
      },
      {
        name: "Grey",
        images: [],
        hasQuantity: false,
      },
    ],
  },

  {
    id: "hcl",
    name: "Hydrochloric Acid (HCL)",
    description:
      "Cleaning acid commonly used to remove cement stains and mineral deposits.",
    store: 1,
    images: ["/images/items/HCL.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "magic-flex",
    name: "Magic Flex",
    description: "Flexible plumbing connector used to join water supply lines.",
    store: 1,
    images: ["/images/items/Magic Flex.jpeg"],
    hasQuantity: false,
    variants: [
      {
        name: "Standard",
        images: [],
        hasQuantity: true,
        quantity: 2,
        unit: "pieces",
      },
      {
        name: "Lirlee",
        images: ["/images/variants/Magic flex (1).webp"],
        hasQuantity: false,
      },
    ],
  },
  {
    id: "mesh-joint-tape",
    name: "Mesh Joint Tape",
    description:
      "Fiberglass mesh tape used to reinforce drywall and plasterboard joints.",
    store: 1,
    images: ["/images/items/Mesh joint Tape.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "paint-gloss",
    name: "Paint Gloss",
    description:
      "Gloss paint used to provide a durable, shiny finish on wood and metal surfaces.",
    store: 1,
    images: ["/images/items/Paint Gloss.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "paint-roller",
    name: "Paint Roller",
    description:
      "Used for applying paint evenly over large wall and ceiling surfaces.",
    store: 1,
    images: ["/images/items/Paint roller.jpeg"],
    hasQuantity: true,
    quantity: 5,
    unit: "pieces",
    variants: [],
  },

  {
    id: "ponal-wood-glue",
    name: "Ponal Wood Glue",
    description:
      "Strong adhesive used for bonding wood and woodworking materials.",
    store: 1,
    images: ["/images/items/Ponal Wood Glue.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "ppr-welding-gun",
    name: "PPR Welding Gun",
    description: "Heat welding tool used to join PPR water pipes and fittings.",
    store: 1,
    images: ["/images/items/PPR Gun.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "pvc-elbow",
    name: "PVC Elbow",
    description:
      "PVC elbow fitting used to change the direction of plumbing pipework.",
    store: 1,
    images: ["/images/items/PVC Elbow.jpeg"],
    hasQuantity: false,
    variants: [
      {
        name: "1½ inch",
        images: [],
        hasQuantity: true,
        quantity: 4,
        unit: "pieces",
      },
      {
        name: "2 inch",
        images: [],
        hasQuantity: true,
        quantity: 5,
        unit: "pieces",
      },
    ],
  },

  {
    id: "pvc-flexible-tube",
    name: "PVC Flexible Tube",
    description:
      "Flexible shower hose used to connect hand showers to the water supply.",
    store: 1,
    images: ["/images/items/PVC Flexible tube.jpeg"],
    hasQuantity: true,
    quantity: 8,
    unit: "pieces",
    variants: [],
  },

  {
    id: "pvc-tee",
    name: "PVC Waste Tee",
    description:
      "PVC T-shaped fitting used to split or join plumbing pipework.",
    store: 1,
    images: ["/images/items/PVC t.jpeg"],
    hasQuantity: false,
    variants: [
      {
        name: "1½ inch",
        images: [],
        hasQuantity: true,
        quantity: 1,
        unit: "piece",
      },
      {
        name: "2 inch",
        images: [],
        hasQuantity: true,
        quantity: 1,
        unit: "piece",
      },
      {
        name: "110 mm",
        images: [],
        hasQuantity: true,
        quantity: 3,
        unit: "pieces",
      },
    ],
  },

  {
    id: "sandpaper",
    name: "Sandpaper",
    description:
      "Abrasive paper used to smooth wood, filler, paint and other surfaces.",
    store: 1,
    images: ["/images/items/Sandpaper.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "sanding-sealer",
    name: "Sanding Sealer",
    description:
      "Wood finishing product applied before varnish or paint for a smooth finish.",
    store: 1,
    images: ["/images/items/Sanding Sealer.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "skim-coat",
    name: "Skim Coat",
    description:
      "Fine finishing material used to smooth walls before painting.",
    store: 1,
    images: ["/images/items/Skim Coat.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "steel-nails",
    name: '1" Steel Nails',
    description:
      "Steel nails commonly used for carpentry and construction work.",
    store: 1,
    images: ['/images/items/1" Steel Nail.jpeg'],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "super-gloss",
    name: "Super Gloss",
    description:
      "High-gloss finishing paint used for decorative and protective coatings.",
    store: 1,
    images: ["/images/items/Super Gloss.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "superfast-brilliant-white",
    name: "Superfast Brilliant White",
    description:
      "White finishing product used to provide a bright decorative surface.",
    store: 1,
    images: ["/images/items/Superfast Brilliant white.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "thinner",
    name: "Thinner",
    description:
      "Paint thinner used for reducing paint viscosity and cleaning brushes.",
    store: 1,
    images: ["/images/items/Thinner.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "tissue-holder",
    name: "Tissue Holder",
    description: "Bathroom accessory used to hold toilet paper rolls.",
    store: 1,
    images: ["/images/items/Tissue Holder.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "toilet-lid",
    name: "Toilet Lid",
    description: "Replacement toilet seat and lid assembly.",
    store: 1,
    images: ["/images/items/Toilet Lid.jpeg"],
    hasQuantity: true,
    quantity: 2,
    unit: "pieces",
    variants: [],
  },

  {
    id: "ultraguard-silicone",
    name: "Ultraguard Silicone",
    description:
      "Silicone sealant used for waterproof sealing around kitchens, bathrooms and windows.",
    store: 1,
    images: ["/images/items/Ultraguard Silicone.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "varnish-stain",
    name: "Varnish Stain",
    description:
      "Mahogany wood stain used to colour and protect timber surfaces.",
    store: 1,
    images: ["/images/items/Varnish stain.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "vibrating-machine",
    name: "Vibrating Machine",
    description:
      "Concrete vibrator motor used together with the vibrator hose.",
    store: 1,
    images: ["/images/items/Vibrating Machine.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "vinyl-silk",
    name: "Vinyl Silk",
    description:
      "Duracoat interior vinyl silk paint for smooth interior wall finishes.",
    store: 1,
    images: ["/images/items/Vinyl Silk .png"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "welding-electrodes",
    name: "Welding Electrodes",
    description: "Electrodes used for electric arc welding.",
    store: 1,
    images: ["/images/items/Welding Rod.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "white-spirit",
    name: "White Spirit",
    description:
      "Solvent used for thinning oil-based paints and cleaning painting equipment.",
    store: 1,
    images: ["/images/items/White Spirit.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "whiting-chalk",
    name: "Whiting Chalk",
    description: "Fine chalk powder used for marking construction layouts.",
    store: 1,
    images: ["/images/items/Whiting Chalk.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "wire-mesh",
    name: "Hexagonal Wire Mesh",
    description:
      "30-metre galvanized hexagonal wire mesh used for fencing and reinforcement.",
    store: 1,
    images: ["/images/items/Wire mesh.jpeg"],
    hasQuantity: false,
    variants: [],
  },

  {
    id: "tiles",
    name: "Tiles",
    description: "Ceramic floor tiles measuring 400 × 400 × 7.9 mm.",
    store: 1,
    images: ["/images/items/Tiles.jpeg"],
    hasQuantity: true,
    quantity: 31,
    unit: "pieces",
    variants: [],
  },
];
