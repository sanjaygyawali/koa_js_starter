import Joi from "@hapi/joi";
import { format, parseISO } from "date-fns";
import { logger } from "../logs/log";

import { User } from "../models/User";
import { Note } from "../models/Note";
import faker from "faker";
import path from "path";
const fs = require("fs");
const baseUrl = "http://192.168.0.105:3000/assets/";
const assetFolder = path.join(__dirname, "../public/assets");
let productImages = fs.readdirSync(assetFolder);

const noteSchema = Joi.object({
  id: Joi.number().integer(),
  userId: Joi.number().integer().required(),
  title: Joi.string().required(),
  content: Joi.string().required(),
  ipAddress: Joi.string(),
  updatedAt: Joi.date().optional(),
  createdAt: Joi.date().optional(),
});
export const getCategoryById = async (ctx) => {};
export const categories = async (ctx) => {
  let content = [];
  for (let i = 0; i < 10; i++) {
    let department = faker.commerce.department();
    content.push({
      id: faker.random.uuid(),
      tag: department,
      label: department,
      parent_id: faker.random.uuid(),
      children: faker.random.number({
        min: 0,
        max: 20,
      }),
    });
  }

  let categories = {
    id: faker.random.uuid(),
    tag: faker.commerce.department(),
    label: faker.commerce.department(),
    parent_id: faker.random.uuid(),
    children: faker.random.number({
      min: 0,
      max: 20,
    }),
    categories: content,
  };

  ctx.body = categories;
};

export const products = async (ctx) => {
  let data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      isOnSale: faker.random.boolean(),
      image: baseUrl + faker.random.arrayElement(productImages),
      isOnWishList: faker.random.boolean(),
      rating: faker.random.number({
        min: 1,
        max: 5,
      }),
      regularPrice: faker.random.number({
        min: 1000,
        max: 1500,
      }),
      specialPrice: faker.random.number({
        min: 100,
        max: 1000,
      }),
    });
  }
  let pagination = {
    total: 100,
    currentPage: ctx.request.query.page ? ctx.request.query.page++ : 1,
    lastPage: 10,
  };
  ctx.body = {
    data,
    pagination,
  };
};

export const getProductDetail = async (ctx) => {
  let images = [];
  let categoryAncestor = getCategoryAncestor();

  for (let i = 0; i < 7; i++) {
    images.push({
      id: faker.random.uuid(),
      url: baseUrl + faker.random.arrayElement(productImages),
    });
  }
  let product = {
    id: faker.random.uuid(),
    title: faker.commerce.productName(),
    isOnSale: faker.random.boolean(),
    image: baseUrl + faker.random.arrayElement(productImages),
    images: images,
    isOnWishList: faker.random.boolean(),
    rating: faker.random.number({
      min: 1,
      max: 5,
    }),
    regularPrice: faker.random.number({
      min: 1000,
      max: 1500,
    }),
    specialPrice: faker.random.number({
      min: 100,
      max: 1000,
    }),
    description: faker.lorem.paragraphs(),
    content: faker.lorem.paragraphs(),
    videos: [
      "https://www.youtube.com/embed/ycZshUhdukI",
      "https://www.youtube.com/embed/ycZshUhdukI",
      "https://www.youtube.com/embed/ycZshUhdukI",
    ],
    reviewCount: faker.random.number({
      min: 10,
      max: 100,
    }),
    attribute: {
      brand: faker.company.companyName(),
      colors: [
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
      ],
    },
    isOnStock: faker.random.boolean(),
    categoryAncestor,
  };
  ctx.body = product;
};

export const getProductReview = async (ctx) => {
  let data = [];
  for (let i = 1; i < 5; i++) {
    data.push({
      id: faker.random.uuid(),
      name: faker.name.firstName() + " " + faker.name.lastName(),
      image: baseUrl + faker.random.arrayElement(productImages),
      rating: faker.random.number({
        min: 1,
        max: 5,
      }),
      review: faker.lorem.paragraph(),
    });
  }
  let pagination = {
    total: 100,
    currentPage: ctx.request.query.page ? ctx.request.query.page++ : 1,
    lastPage: 20,
  };

  let ratingDetails = {
    data,
    pagination,
  };
  ctx.body = ratingDetails;
};
export const getProductRating = async (ctx) => {
  let ratingDetails = {
    totalReviews: 100,
    avgRating: 3,
    rating: [
      {
        rating: 5,
        review: 50,
      },
      {
        rating: 4,
        review: 20,
      },
      {
        rating: 3,
        review: 10,
      },
      {
        rating: 2,
        review: 5,
      },
      {
        rating: 1,
        review: 15,
      },
    ],
  };
  ctx.body = ratingDetails;
};

export const filterConfig = async (ctx) => {
  let sortByFilterList = [];
  let brands = [];
  ctx.body = [];
};
function getCategoryAncestor() {
  let content = [];
  for (let i = 0; i < 4; i++) {
    let department = faker.commerce.department();
    content.push({
      id: faker.random.uuid(),
      label: department,
    });
  }

  content.push({
    id: faker.random.uuid(),
    label: faker.commerce.department(),
  });

  return content;
}
export const ansestorCategory = async (ctx) => {
  let content = getCategoryAncestor();
  ctx.body = content;
};

export const childrenCategory = async (ctx) => {
  let loop = faker.random.number({
    min: 5,
    max: 10,
  });
  let content = [];
  for (let i = 0; i < loop; i++) {
    let department = faker.commerce.department();
    content.push({
      value: faker.random.uuid(),
      label: department,
    });
  }
  ctx.body = content;
};

export const brands = async (ctx) => {
  let content = [];
  let loop = faker.random.number({
    min: 5,
    max: 10,
  });
  for (let i = 0; i < loop; i++) {
    content.push({
      value: faker.random.uuid(),
      label: faker.company.companyName(),
    });
  }
  ctx.body = content;
};

export const deals = async (ctx) => {
  let content = [];
  let loop = faker.random.number({
    min: 5,
    max: 10,
  });

  for (let i = 0; i < loop; i++) {
    content.push({
      id: faker.random.uuid(),
      image: baseUrl + faker.random.arrayElement(productImages),
      title:
        "Get" +
        faker.random.number({
          min: 10,
          max: 50,
        }) +
        "per off",
      deadline: faker.date.future(),
      referral: faker.internet.url(),
    });
  }
  ctx.body = content;
};

export const specialEvents = async (ctx) => {
  let content = [];
  let loop = faker.random.number({
    min: 5,
    max: 10,
  });

  for (let i = 0; i < loop; i++) {
    content.push({
      id: faker.random.uuid(),
      image: baseUrl + faker.random.arrayElement(productImages),
      title:
        "Get" +
        faker.random.number({
          min: 10,
          max: 50,
        }) +
        "per off",
      referral: faker.internet.url(),
    });
  }
  ctx.body = content;
};
export const categoryGallery = async (ctx) => {
  let content = [];
  let loop = faker.random.number({
    min: 5,
    max: 10,
  });

  for (let i = 0; i < 12; i++) {
    content.push({
      id: faker.random.uuid(),
      img: baseUrl + faker.random.arrayElement(productImages),
      title: faker.commerce.department(),
      link: faker.internet.url(),
    });
  }
  ctx.body = content;
};

export const availablelocations = async (ctx) => {
  ctx.body = [
    {
      id: faker.random.uuid(),
      name: "Kathmandu",
    },
    {
      id: faker.random.uuid(),
      name: "Lalitpur",
    },
    {
      id: faker.random.uuid(),
      name: "Bhaktapur",
    },
  ];
};

export const cartItemDetails = async (ctx) => {
  let data = [];
  let loop = 0;
  // ctx.body = ctx.request.query;
  // return;
  let items = [];
  // ctx.body = item;
  // return;
  if (ctx.request.query.items) {
    items = JSON.parse(ctx.request.query.items);
  }

  for (let i = 0; i < items.length; i++) {
    data.push({
      id: items[i].id,
      title: faker.commerce.productName(),
      isOnSale: faker.random.boolean(),
      image: baseUrl + faker.random.arrayElement(productImages),
      isOnWishList: faker.random.boolean(),
      brand: faker.company.companyName(),
      rating: faker.random.number({
        min: 1,
        max: 5,
      }),
      regularPrice: faker.random.number({
        min: 1000,
        max: 1500,
      }),
      specialPrice: faker.random.number({
        min: 100,
        max: 1000,
      }),
      quantity: items[i].quantity,
    });
  }
  ctx.body = data;
};
