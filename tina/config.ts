import { defineConfig, Template } from "tinacms"

const globalBlockFields: Template["fields"] = [
  {
    type: "string",
    label: "Kotva",
    name: "id",
  },
  {
    type: "boolean",
    label: "Skrýt blok",
    name: "isHidden",
  },
]

const columnsBlock: Template = {
  name: "columns",
  label: "Sloupce",
  ui: {
    itemProps: (item) => ({ label: `${item.title} [sloupce]` }),
  },
  fields: [
    ...globalBlockFields,
    {
      type: "string",
      label: "Nadpis",
      name: "title",
    },
    {
      type: "object",
      label: "Sloupce",
      name: "columns",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.title }),
      },
      fields: [
        {
          type: "string",
          label: "Nadpis",
          name: "title",
          required: true,
        },
        {
          type: "rich-text",
          label: "Text",
          name: "richText",
        },
        {
          type: "string",
          label: "Ikona",
          name: "icon",
          options: [
            "sky",
            "person",
            "hand",
            "stars",
            "arrow",
            "moon",
            "mark",
            "star",
            "check",
          ],
        },
      ],
    },
  ],
}

const contactsBlock: Template = {
  name: "contacts",
  label: "Kontakty",
  ui: {
    itemProps: (item) => ({ label: `${item.title} [kontakty]` }),
  },
  fields: [
    ...globalBlockFields,
    {
      type: "string",
      label: "Nadpis",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Text",
      name: "richText",
    },
    {
      type: "object",
      label: "Kontakty",
      name: "contacts",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.type }),
      },
      fields: [
        {
          type: "string",
          label: "Typ",
          name: "type",
          required: true,
        },
        {
          type: "string",
          label: "Ikona",
          name: "icon",
          options: ["mail", "fb", "insta"],
          required: true,
        },
        {
          type: "string",
          label: "Odkaz",
          name: "url",
          required: true,
        },
      ],
    },
  ],
}

const coverBlock: Template = {
  name: "cover",
  label: "Úvod",
  ui: {
    itemProps: (item) => ({ label: `${item.title} [úvod]` }),
  },
  fields: [
    ...globalBlockFields,
    {
      type: "string",
      label: "Nadpis",
      name: "title",
    },
    {
      type: "string",
      label: "Podnadpis",
      name: "subtitle",
    },
    {
      type: "string",
      label: "Popis",
      name: "claim",
    },
    {
      type: "boolean",
      label: "Sněžení",
      name: "isSnowfall",
    },
    {
      type: "object",
      label: "Tlačítko",
      name: "button",
      fields: [
        {
          type: "string",
          label: "Popis",
          name: "label",
          required: true,
        },
        {
          type: "string",
          label: "Odkaz",
          name: "link",
          required: true,
        },
        {
          type: "boolean",
          label: "Otevřít v novém okně",
          name: "targetBlank",
        },
        {
          type: "boolean",
          label: "Zobrazit tlačítko",
          name: "showButton",
        },
      ],
    },
  ],
}

const galleryBlock: Template = {
  name: "gallery",
  label: "Galerie",
  ui: {
    itemProps: () => ({ label: `Galerie [galerie]` }),
  },
  fields: [
    ...globalBlockFields,
    {
      type: "image",
      label: "Fotka",
      name: "images",
      list: true,
    },
    {
      type: "object",
      label: "Tlačítko",
      name: "button",
      fields: [
        {
          type: "string",
          label: "Popis",
          name: "label",
          required: true,
        },
        {
          type: "string",
          label: "Odkaz",
          name: "link",
          required: true,
        },
      ],
    },
  ],
}

const personsBlock: Template = {
  name: "persons",
  label: "Medailonky",
  ui: {
    itemProps: (item) => ({ label: `${item.title} [medailonky]` }),
  },
  fields: [
    ...globalBlockFields,
    {
      type: "string",
      label: "Nadpis",
      name: "title",
    },
    {
      type: "string",
      label: "Podnadpis",
      name: "subtitle",
    },
    {
      type: "object",
      label: "Medailonky",
      name: "persons",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item.nickname }),
      },
      fields: [
        {
          type: "image",
          label: "Fotka",
          name: "image",
        },
        {
          type: "string",
          label: "Přezdívka",
          name: "nick",
          required: true,
        },
        {
          type: "string",
          label: "Jméno",
          name: "name",
          required: true,
        },
        {
          type: "rich-text",
          label: "Text",
          name: "richText",
        },
      ],
    },
  ],
}

const quotationBlock: Template = {
  name: "quotation",
  label: "Citát",
  ui: {
    itemProps: () => ({ label: `Citát [citát]` }),
  },
  fields: [
    ...globalBlockFields,
    {
      type: "string",
      label: "Citát",
      name: "text",
    },
    {
      type: "string",
      label: "Zdroj",
      name: "source",
    },
    {
      type: "string",
      label: "Odkaz na zdroj",
      name: "sourceUrl",
    },
  ],
}

const richTextBlock: Template = {
  name: "richText",
  label: "Text",
  ui: {
    itemProps: (item) => ({ label: `${item.title} [text]` }),
  },
  fields: [
    ...globalBlockFields,
    {
      type: "string",
      label: "Nadpis",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Text",
      name: "richText",
    },
    {
      type: "string",
      label: "Zarovnání",
      name: "textAlign",
      options: ["left", "center", "right"],
    },
  ],
}

const videoBlock: Template = {
  name: "video",
  label: "Video",
  ui: {
    itemProps: () => ({ label: `Video [video]` }),
  },
  fields: [
    ...globalBlockFields,
    {
      type: "string",
      label: "Kód videa",
      name: "src",
      required: true,
    },
    {
      type: "number",
      label: "Šířka",
      name: "width",
      required: true,
    },
    {
      type: "number",
      label: "Výška",
      name: "height",
      required: true,
    },
  ],
}

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD ||
    "master", // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
        name: "settings",
        label: "Nastavení",
        format: "json",
        path: "settings",
        ui: {
          allowedActions: { delete: false, create: false },
        },
        fields: [
          { name: "siteTitle", label: "Název webu", type: "string" },
          { name: "siteLogo", label: "Logo", type: "image" },
        ],
      },
      {
        name: "navigation",
        label: "Navigace",
        format: "json",
        path: "data",
        ui: {
          allowedActions: { delete: false, create: false },
        },
        fields: [
          {
            type: "object",
            name: "items",
            list: true,
            ui: {
              itemProps: (item) => ({ label: item.title }),
            },
            fields: [
              {
                name: "title",
                label: "Název",
                type: "string",
                required: true,
              },
              {
                name: "link",
                label: "Odkaz",
                type: "string",
                required: true,
              },
            ],
          },
        ],
      },
      {
        name: "page",
        label: "Obsah",
        path: "content/pages",
        format: "mdx",
        ui: {
          allowedActions: { delete: false, create: false },
          router: () => "/",
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Obsah",
            templates: [
              columnsBlock,
              contactsBlock,
              coverBlock,
              galleryBlock,
              personsBlock,
              quotationBlock,
              richTextBlock,
              videoBlock,
            ],
          },
        ],
      },
    ],
  },
})

export default config
