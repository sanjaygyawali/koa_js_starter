import Joi from "@hapi/joi";
import { format, parseISO } from "date-fns";
import { logger } from "../logs/log";

import { User } from "../models/User";
import { Note } from "../models/Note";
import faker from "faker";
import path from "path";
import { cities } from "./gharbatai";
import assetsURL from "../baseUrl";

const fs = require("fs");
const baseUrl = assetsURL;
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
  ctx.body = getCategories(ctx);
};

function getCategories(ctx) {
  let content = [];
  for (let i = 0; i < 10; i++) {
    let department = faker.commerce.department();
    content.push({
      id: faker.random.uuid(),
      label: department,

      children: faker.random.number({
        min: 0,
        max: 20,
      }),
    });
  }

  // let parent_id = "";
  // if (ctx.params.id) {
  //   parent_id = faker.random.uuid();
  // }

  let categories = {
    id: ctx.params.id,
    parent_id: ctx.params.id ? faker.random.uuid() : ctx.params.id,
    children: content.length,
    categories: content,
  };

  return categories;
  // ctx.body = categories;
}

export const products = async (ctx) => {
  ctx.body = getProducts(ctx);
};

function getProducts(ctx) {
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
    lastPage: 3,
  };
  return {
    data,
    pagination,
  };
}

function prepareProductAttribute() {
  return [
    {
      name: "Color",
      componentType: "product-attribute-color",
      items: [
        {
          enable: faker.random.boolean(),
          id: "red",
          title: "red",
        },
        {
          enable: faker.random.boolean(),
          id: "blue",
          title: "blue",
        },
        {
          enable: true,
          id: "green",
          title: "green",
        },
        {
          enable: faker.random.boolean(),
          id: "black",
          title: "black",
        },
      ],
    },
    // {
    //   name: "Brand",
    //   type: "product-attribute-brand",
    //   brand: {
    //     id: faker.random.uuid(),
    //     name: faker.company.companyName(),
    //   },
    // },
    // {
    //   name: "Size",
    //   type: "product-attribute-box",
    //   items: [
    //     {
    //       enable: faker.random.boolean(),
    //       id: "L",
    //       title: "L",
    //     },
    //     {
    //       enable: faker.random.boolean(),
    //       id: "XL",
    //       title: "XL",
    //     },
    //     {
    //       enable: faker.random.boolean(),
    //       id: "XXL",
    //       title: "XXL",
    //     },
    //     {
    //       enable: faker.random.boolean(),
    //       id: "XXXL",
    //       title: "XXXL",
    //     },
    //   ],
    // },
    {
      name: "Brand",
      componentType: "product-attribute-box",
      items: [
        {
          enable: true,
          id: "APPLE",
          title: "APPLE",
        },
        {
          enable: faker.random.boolean(),
          id: "BALL",
          title: "BALL",
        },
      ],
    },
    {
      name: "MaterialType",
      componentType: "product-attribute-box",
      items: [
        {
          enable: true,
          id: "cotton",
          title: "cotton",
        },
        {
          enable: faker.random.boolean(),
          id: "nylon",
          title: "nylon",
        },
        {
          enable: faker.random.boolean(),
          id: "soft-fabric",
          title: "soft-fabric",
        },
        {
          enable: faker.random.boolean(),
          id: "hard-fabric",
          title: "hard-fabric",
        },
      ],
    },
  ];
}

export const getSystemConfig = async (ctx) => {
  let config = {
    test: "test",
  };
  ctx.body = config;
};

export const getProductAttributes = async (ctx) => {
  ctx.body = {
    attributes: prepareProductAttribute(),
    regularPrice: faker.random.number({
      min: 1000,
      max: 1500,
    }),
    specialPrice: faker.random.number({
      min: 100,
      max: 1000,
    }),
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
    images: images,
    isOnWishList: faker.random.boolean(),

    productDetail: [
      {
        componentType: "product-rating",
        data: {
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
        },
      },
      {
        componentType: "exchange-policy-list-item",
        data: {
          days: 5,
          policyUrl: `/exchange-policy/${faker.random.uuid()}`,
        },
      },
    ],
    regularPrice: faker.random.number({
      min: 1000,
      max: 1500,
    }),
    specialPrice: faker.random.number({
      min: 100,
      max: 1000,
    }),
    defaultAttribute: {
      Brand: "APPLE",
      MaterialType: "nylon",
      Color: "green",
    },
    productInfoBundle: [
      {
        componentType: "article-attribute",
        title: "Description",
        content: {
          data:
            "<span style='font-size: 1em;'>Check out the two different types of dropdowns in each of the 'Align' buttons.fasdfadfasdf</span><span style='font-size: 1em;'>fasdfaf</span></blockquote><pre><span style='font-size: 1em;'><a href='https://'>fasdf</a>fas</span></pre><pre><span style='font-size: 1em;'><br></span></pre><pre><span style='font-size: 1em;'>fasdfasdffasdfadsffasd string = var -- 12;</span></pre>",
        },
      },
      {
        componentType: "video-attribute",
        title: "videos",
        content: {
          data: [
            {
              id: "a313698f-267c-4110-90fd-8a8bc4d202e8",
              url: "https://www.youtube.com/embed/ycZshUhdukI",
            },
            {
              id: "a313698f-267c-4110-90fd-8a8bc4d202e8",
              url: "https://www.youtube.com/embed/ycZshUhdukI",
            },
          ],
        },
      },
      {
        componentType: "customer-review",
        title: "Customer Review",
        content: {},
      },
      {
        componentType: "product-faq",
        title: "FAQ",
        content: {},
      },
    ],

    attributes: prepareProductAttribute(),
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
      date: "2020-01-01",
      rating: faker.random.number({
        min: 1,
        max: 5,
      }),
      review: faker.lorem.paragraph(),
      replies: [
        {
          id: faker.random.uuid(),
          date: "2020-01-01",
          name: faker.name.firstName() + " " + faker.name.lastName(),
          review: faker.lorem.paragraph(),
          image: baseUrl + faker.random.arrayElement(productImages),
        },
        {
          id: faker.random.uuid(),
          date: "2020-01-01",
          name: faker.name.firstName() + " " + faker.name.lastName(),
          review: faker.lorem.paragraph(),
          image: baseUrl + faker.random.arrayElement(productImages),
        },
        {
          id: faker.random.uuid(),
          date: "2020-01-01",
          name: faker.name.firstName() + " " + faker.name.lastName(),
          review: faker.lorem.paragraph(),
          image: baseUrl + faker.random.arrayElement(productImages),
        },
        {
          id: faker.random.uuid(),
          date: "2020-01-01",
          name: faker.name.firstName() + " " + faker.name.lastName(),
          review: faker.lorem.paragraph(),
          image: baseUrl + faker.random.arrayElement(productImages),
        },
      ],
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

export const getProductFaq = async (ctx) => {
  let data = [];
  for (let i = 1; i < 5; i++) {
    data.push({
      question: faker.lorem.sentence(),
      answer: faker.lorem.sentences(),
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
  ctx.body = getDeal(ctx);
};

function getDeal(ctx) {
  let data = [];
  let loop = faker.random.number({
    min: 5,
    max: 10,
  });

  for (let i = 0; i < loop; i++) {
    data.push({
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
  let pagination = {
    total: 100,
    currentPage: ctx.request.query.page ? ctx.request.query.page++ : 1,
    lastPage: 3,
  };
  return {
    data,
    pagination,
  };
  return content;
}

export const specialEvents = async (ctx) => {
  ctx.body = getSpecialEvents(ctx);
};

function getSpecialEvents(ctx) {
  let data = [];
  let loop = faker.random.number({
    min: 5,
    max: 10,
  });

  for (let i = 0; i < loop; i++) {
    data.push({
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
  let pagination = {
    total: 100,
    currentPage: ctx.request.query.page ? ctx.request.query.page++ : 1,
    lastPage: 10,
  };
  return {
    data,
    pagination,
  };
  // return content;
}

export const categoryGallery = async (ctx) => {
  ctx.body = getCategoryGallery(ctx);
};

function getCategoryGallery(ctx) {
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
  return content;
}

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

export const applyPromotionCode = async (ctx) => {
  let success = {
    status: "success",
    code: ctx.request.body.code,
    message: `Promotion code ${ctx.request.body.code} applied`,
    discount: 700,
  };
  let fail = {
    status: "failed",
    code: ctx.request.body.code,
    message: `Promotion code ${ctx.request.body.code} failed to apply`,
    discount: 0,
  };

  let content = [fail, success];

  ctx.body = faker.random.arrayElement(content);
};

export const revokePromotionCode = async (ctx) => {
  let success = {
    status: "success",
    code: ctx.request.body.code,
    message: `Promotion code ${ctx.request.body.code} applied`,
    discount: 0,
  };
  let fail = {
    status: "failed",
    code: ctx.request.body.code,
    message: `Promotion code ${ctx.request.body.code} failed to apply`,
    discount: 0,
  };
  let content = [fail, success];

  ctx.body = faker.random.arrayElement(content);
};

export const getCity = async (ctx) => {
  // let result = [];
  let result = [];
  cities.forEach((element) => {
    element.children.forEach((elem) => {
      result.push({
        ...elem,
        province_id: element.province_id,
      });
    });
  });

  // ctx.body = result;
  let newCities = result
    .filter((item) =>
      item.name.toLowerCase().includes(ctx.params.id.toLowerCase()),
    )
    .slice(0, 10);
  ctx.body = newCities;
};

export const getDistricts = async (ctx) => {
  let result = [];

  ctx.body = [
    {
      id: 28,
      name: "Kathmandu",
    },
    {
      id: 29,
      name: "Kathmandu",
    },
    {
      id: 30,
      name: "Kathmandu",
    },
  ];
};

export const search = async (ctx) => {
  let data = [];

  for (let i = 0; i < 10; i++) {
    data.push({
      id: faker.random.uuid(),
      title: faker.commerce.productName(),
      image: baseUrl + faker.random.arrayElement(productImages),
    });
  }

  if (ctx.query.productName == "blank") {
    ctx.body = {
      recommendedProducts: data,
      results: [],
    };
  } else {
    ctx.body = {
      recommendedProducts: [],
      results: data,
    };
  }
};

export const getPageConfiguration = async (ctx) => {
  let data = [];

  let slider = [
    {
      id: 1,
      title: "Something",
      link: "product/14e7aad5-6e5a-4cfd-9850-8e7343a35da4",
      img: `${baseUrl}banner-one.png`,
    },
    {
      id: 2,
      title: "Something",
      link: "product/14e7aad5-6e5a-4cfd-9850-8e7343a35da4",
      img: `${baseUrl}banner-three.png`,
    },
  ];

  let product = {
    type: "product-row",
    config: {
      category: "featured",
      special: true,
      title: "Featured Products",
      to: {
        path: "/filter",
        query: {
          category: "featuredProducts",
        },
      },
    },
    data: getProducts(ctx),
  };
  let cateogoryProduct = {
    type: "product-row",
    config: {
      category: "sample-category",
      title: "Featured Products",
      to: {
        path: "/filter",
        query: {
          category: "featuredProducts",
        },
      },
    },
    data: getProducts(ctx),
  };
  ctx.request.query.page = 0;
  let event = {
    type: "event-row",
    config: {
      title: "Specials Event",
      to: {
        path: "/deal",
      },
    },
    data: getSpecialEvents(ctx),
  };
  ctx.request.query.page = 0;
  let deals = {
    type: "deal-row",
    config: {
      title: "Special Deals For You",
      to: {
        path: "/deal",
      },
    },
    data: getDeal(ctx),
  };
  ctx.request.query.page = 0;
  let recommendedProduct = {
    type: "product-row",
    config: {
      category: "recommended",
      special: true,
      title: "Recommended for you",
      to: {
        path: "/filter",
        query: {
          category: "recommended",
        },
      },
    },
    data: getProducts(ctx),
  };
  ctx.request.query.page = 0;
  let category = {
    type: "category-gallery",
    config: {
      title: "Shop by category",
      to: {
        path: "/categories",
      },
    },
    data: getCategoryGallery(ctx),
  };

  data.push(product);
  data.push(event);
  data.push(deals);
  data.push(category);
  data.push(recommendedProduct);
  data.push(cateogoryProduct);
  data.push(cateogoryProduct);
  data.push(cateogoryProduct);
  data.push(cateogoryProduct);
  data.push(cateogoryProduct);

  // let infiniteCategory = [];
  // infiniteCategory.push(data["product"]);
  // infiniteCategory.push(data["product"]);
  // infiniteCategory.push(data["product"]);
  // infiniteCategory.push(data["product"]);
  // infiniteCategory.push(data["product"]);

  // data["infiniteCategories"] = {
  //   type: "infinite-category",
  //   config: {},
  //   data: infiniteCategory,
  // };
  // ctx.body = {
  //   banners: slider,
  //   configurations: data,
  // };

  // ctx.body = ctx.request.query;
  // return;
  let pagination = {
    total: 100,
    currentPage: ctx.request.query.page ? ctx.request.query.page - 4 : 1,
    lastPage: 2,
  };
  // ctx.body = pagination;
  // return;
  ctx.body = {
    banners: slider,
    configurations: {
      data,
      pagination,
    },
  };
};

export const getNotifications = async (ctx) => {
  // ctx.body = ctx.request.query.page;
  // return;
  let notification = [
    {
      id: faker.random.uuid(),
      title: "Lorem ipsum",
      image:
        "https://t4.ftcdn.net/jpg/02/66/65/73/240_F_266657349_5QMR6FiWIk0VAZHojNd7cdClDR5V6Ph2.jpg",
      description:
        " Secondary line text. Lorem ipsum dolor sit amet consectetur adipiscit elit.",
      date: "21 Jul 2020, Tuesday",
      read: true,
      link: "",
    },
    {
      id: faker.random.uuid(),
      title: "Lorem ipsum",
      image:
        "https://t4.ftcdn.net/jpg/02/66/65/73/240_F_266657349_5QMR6FiWIk0VAZHojNd7cdClDR5V6Ph2.jpg",
      description:
        " Secondary line text. Lorem ipsum dolor sit amet consectetur adipiscit elit.",
      date: "21 Jul 2020, Tuesday",
      read: false,
      link: "",
    },
    {
      id: faker.random.uuid(),
      title: "Lorem ipsum",
      image: "",
      description:
        " Secondary line text. Lorem ipsum dolor sit amet consectetur adipiscit elit.",
      date: "21 Jul 2020, Tuesday",
      read: false,
      link: "/product/938f010c-ded0-438d-8fe5-77230298be09",
    },
  ];
  let pagination = {
    total: 100,
    currentPage: ctx.request.query.page ? ctx.request.query.page++ : 1,
    lastPage: 3,
  };
  ctx.body = {
    unreadNotification: 2,
    data: notification,
    pagination,
  };
};

export const markNotificationAsRead = async (ctx) => {
  ctx.body = {
    success: true,
  };
};

export const deleteNotification = async (ctx) => {
  ctx.body = {
    success: true,
  };
};

export const searchAtttribute = async (ctx) => {
  let colors = [
    faker.commerce.color(),
    faker.commerce.color(),
    faker.commerce.color(),
    faker.commerce.color(),
    faker.commerce.color(),
  ];
  ctx.body = [
    {
      label: "Categories",
      search: "category",
      componentType: "g-filter-search",
      placeholder: "Please Enter Category",
      options: [
        {
          value: faker.random.uuid(),
          label: faker.commerce.department(),
        },
        {
          value: faker.random.uuid(),
          label: faker.commerce.department(),
        },
        {
          value: faker.random.uuid(),
          label: faker.commerce.department(),
        },
        {
          value: faker.random.uuid(),
          label: faker.commerce.department(),
        },
        {
          value: faker.random.uuid(),
          label: faker.commerce.department(),
        },
      ],
    },
    {
      label: "Color",
      placeholder: "Search color",
      componentType: "g-filter-search",
      color: true,
      options: [
        {
          label: colors[0],
          value: colors[0],
        },
        {
          label: colors[1],
          value: colors[1],
        },
        {
          label: colors[2],
          value: colors[2],
        },
        {
          label: colors[3],
          value: colors[3],
        },
        {
          label: colors[4],
          value: colors[4],
        },
      ],
    },
    {
      label: "Brands",
      search: "brand",
      componentType: "g-filter-search",
      placeholder: "Please Enter Brand",
      options: [
        {
          value: faker.random.uuid(),
          label: faker.company.companyName(),
        },
        {
          value: faker.random.uuid(),
          label: faker.company.companyName(),
        },
        {
          value: faker.random.uuid(),
          label: faker.company.companyName(),
        },
        {
          value: faker.random.uuid(),
          label: faker.company.companyName(),
        },
        {
          value: faker.random.uuid(),
          label: faker.company.companyName(),
        },
      ],
    },
    {
      label: "Range",
      componentType: "g-range",
      min: 97,
      max: 970,
      prefix: "Npr",
    },
    {
      label: "Rating",
      componentType: "g-rating-group",
      placeholder: "Please Enter Filter Rating",
    },
  ];
};

export const func = async (ctx) => {};
