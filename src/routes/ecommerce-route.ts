import Router from "koa-router";
import { jwt } from "../middleware/jwt";

import {
  categories,
  products,
  ansestorCategory,
  childrenCategory,
  brands,
  deals,
  specialEvents,
  categoryGallery,
  availablelocations,
  getCategoryById,
  cartItemDetails,
  getProductDetail,
  getProductReview,
  getProductRating,
  applyPromotionCode,
  revokePromotionCode,
  getCity,
  search,
  getPageConfiguration,
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  getProductFaq,
  getProductAttributes,
  getSystemConfig,
  searchAtttribute,
  toggleWishList,
  getWishListItems,
  getApplicationConfiguration,
} from "../controllers/GharbataiController";
import { production } from "knexfile";

export const router = new Router();
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET });

const baseUrl = "";

router.get(`${baseUrl}/products`, products);
router.get(`${baseUrl}/products/:id`, getProductDetail);
router.get(`${baseUrl}/products/:id/review`, getProductReview);
router.post(`${baseUrl}/products/:id/review`, getProductReview);
router.get(`${baseUrl}/products/:id/rating`, getProductRating);
router.get(`${baseUrl}/products/:id/faq`, getProductFaq);
router.get(`${baseUrl}/products/:id/attributes`, getProductAttributes);

router.get(`${baseUrl}/sys-config`, getSystemConfig);

//ROUTE ON TOP HAS MORE PRIORITY.
router.get(`${baseUrl}/categories`, categories);
router.get(`${baseUrl}/categories/gallery`, categoryGallery);
router.get(`${baseUrl}/categories/:id/ansestor`, ansestorCategory);
router.get(`${baseUrl}/categories/search`, childrenCategory);
router.get(`${baseUrl}/categories/:id`, categories);

router.get(`${baseUrl}/brands/search`, brands);

router.get(`${baseUrl}/deals`, deals);
router.get(`${baseUrl}/specialevents`, specialEvents);
router.get(`${baseUrl}/locations`, availablelocations);
router.get(`${baseUrl}/cartItemDetails`, cartItemDetails);

router.get(`${baseUrl}/cart/items`, cartItemDetails);

router.post(`${baseUrl}/promotions/apply`, applyPromotionCode);
router.post(`${baseUrl}/promotions/revoke`, revokePromotionCode);

router.get(`${baseUrl}/cities/:id`, getCity);

router.get(`${baseUrl}/search`, search);
router.get(`${baseUrl}/index-page-config`, getPageConfiguration);
router.get(`${baseUrl}/notifications`, getNotifications);
router.put(`${baseUrl}/notifications/:id/read`, markNotificationAsRead);
router.delete(`${baseUrl}/notifications/:id`, deleteNotification);
// router.post(`${baseUrl}/notes`, jwtMiddleware, create);
// router.get(`${baseUrl}/notes/:id`, jwtMiddleware, show);
// router.put(`${baseUrl}/notes/:id`, jwtMiddleware, update);
// router.delete(`${baseUrl}/notes/:id`, jwtMiddleware, del);

// search page  apis.
router.get(`${baseUrl}/attribute/search`, searchAtttribute);

// baseurl
router.put(`${baseUrl}/wish-list/:id/:action`, toggleWishList);
router.get(`${baseUrl}/wish-list/:id/:action`, toggleWishList);
router.get(`${baseUrl}/wish-list`, getWishListItems);

// site-configuration
router.get(`${baseUrl}/get-site-setting`, getApplicationConfiguration);
