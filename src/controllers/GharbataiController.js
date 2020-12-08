import Joi from "@hapi/joi";
import {
  format,
  parseISO
} from "date-fns";
import {
  logger
} from "../logs/log";

import {
  User
} from "../models/User";
import {
  Note
} from "../models/Note";
import faker from "faker";
import path from "path";
import {
  cities
} from "./gharbatai";

const fs = require("fs");
const baseUrl = "http://localhost:3000/assets/";
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

    productDetail: [{
        type: "product-rating",
        data: {
          totalReviews: 100,
          avgRating: 3,
          rating: [{
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
        type: "exchange-policy-list-item",
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
    colors: [{
        id: faker.random.uuid(),
        title: faker.commerce.color(),
      },
      {
        id: faker.random.uuid(),
        title: faker.commerce.color(),
      },
      {
        id: faker.random.uuid(),
        title: faker.commerce.color(),
      },
      {
        id: faker.random.uuid(),
        title: faker.commerce.color(),
      },
    ],
    catalogueCombination: [{
        types: {
          Color: {
            id: "red",
            title: "red"
          },
          Size: {
            id: "L",
            title: "L"
          },
          MaterialType: {
            id: "cotton",
            title: "cotton"
          },
        },
        regularPrice: 2000,
        specialPrice: 1500,
      },
      {
        types: {
          Color: {
            id: "red",
            title: "red"
          },
          Size: {
            id: "XL",
            title: "XL"
          },
          MaterialType: {
            id: "Xcotton",
            title: "Xcotton"
          },
        },
        regularPrice: 2000,
        specialPrice: 1500,
      },
      {
        types: {
          Color: {
            id: "blue",
            title: "blue"
          },
          Size: {
            id: "XL",
            title: "XL"
          },
          MaterialType: {
            id: "nylon",
            title: "nylon"
          },
        },
        regularPrice: 2001,
        specialPrice: 1501,
      },
      {
        types: {
          Color: {
            id: "green",
            title: "green"
          },
          Size: {
            id: "XXL",
            title: "XXL"
          },
          MaterialType: {
            id: "soft-fabric",
            title: "soft-fabric"
          },
        },
        regularPrice: 2002,
        specialPrice: 1502,
      },
      {
        types: {
          Color: {
            id: "black",
            title: "black"
          },
          Size: {
            id: "XXXL",
            title: "XXXL"
          },
          MaterialType: {
            id: "hard-fabric",
            title: "hard-fabric"
          },
        },
        regularPrice: 1502,
      },
    ],
    attributes: [{
        name: "Color",
        type: "product-attribute-color",
        colors: [{
            id: "red",
            title: "red",
          },
          {
            id: "blue",
            title: "blue",
          },
          {
            id: "green",
            title: "green",
          },
          {
            id: "black",
            title: "black",
          },
        ],
      },
      {
        name: "Brand",
        type: "product-attribute-brand",
        brand: {
          id: faker.random.uuid(),
          name: faker.company.companyName(),
        },
      },
      {
        name: "Size",
        type: "product-attribute-box",
        items: [{
            id: "XSS",
            title: "XSS",
          }, {
            id: "XS",
            title: "XS",
          }, {
            id: "S",
            title: "S",
          }, {
            id: "M",
            title: "M",
          },
          {
            id: "L",
            title: "L",
          },
          {
            id: "XL",
            title: "XL",
          },
          {
            id: "XXL",
            title: "XXL",
          },
          {
            id: "XXXL",
            title: "XXXL",
          },
          {
            id: "a",
            title: "L",
          }, {
            id: "b",
            title: "XL",
          }, {
            id: "c",
            title: "XXL",
          }, {
            id: "d",
            title: "XXXL",
          },

        ],
      },
      {
        name: "MaterialType",
        type: "product-attribute-box",
        items: [{
            id: "cotton",
            title: "cotton",
          },
          {
            id: "nylon",
            title: "nylon",
          },
          {
            id: "soft-fabric",
            title: "soft-fabric",
          },
          {
            id: "hard-fabric",
            title: "hard-fabric",
          },
        ],
      },
    ],
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
      replies: [{
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
    rating: [{
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
      title: "Get" +
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
      title: "Get" +
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
  ctx.body = [{
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

  ctx.body = [{
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

  let slider = [{
      id: 1,
      title: "Something",
      link: "product/14e7aad5-6e5a-4cfd-9850-8e7343a35da4",
      img: "http://localhost:3000/assets/banner-one.png",
    },
    {
      id: 2,
      title: "Something",
      link: "product/14e7aad5-6e5a-4cfd-9850-8e7343a35da4",
      img: "http://localhost:3000/assets/banner-three.png",
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
  let notification = [{
      id: faker.random.uuid(),
      title: "Lorem ipsum",
      image: "https://t4.ftcdn.net/jpg/02/66/65/73/240_F_266657349_5QMR6FiWIk0VAZHojNd7cdClDR5V6Ph2.jpg",
      description: " Secondary line text. Lorem ipsum dolor sit amet consectetur adipiscit elit.",
      date: "21 Jul 2020, Tuesday",
      status: "1",
      link: "",
    },
    {
      id: faker.random.uuid(),
      title: "Lorem ipsum",
      image: "https://t4.ftcdn.net/jpg/02/66/65/73/240_F_266657349_5QMR6FiWIk0VAZHojNd7cdClDR5V6Ph2.jpg",
      description: " Secondary line text. Lorem ipsum dolor sit amet consectetur adipiscit elit.",
      date: "21 Jul 2020, Tuesday",
      status: "1",
      link: "",
    },
    {
      id: faker.random.uuid(),
      title: "Lorem ipsum",
      image: "",
      description: " Secondary line text. Lorem ipsum dolor sit amet consectetur adipiscit elit.",
      date: "21 Jul 2020, Tuesday",
      status: "0",
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
    success: true
  };
};

export const deleteNotification = async (ctx) => {
  ctx.body = {
    success: true
  };
};

export const func = async (ctx) => {};
