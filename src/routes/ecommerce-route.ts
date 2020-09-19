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
} from "../controllers/GharbataiController";
import { production } from "knexfile";

export const router = new Router();
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET });

const baseUrl = "";

router.get(`${baseUrl}/products`, products);
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

// router.post(`${baseUrl}/notes`, jwtMiddleware, create);
// router.get(`${baseUrl}/notes/:id`, jwtMiddleware, show);
// router.put(`${baseUrl}/notes/:id`, jwtMiddleware, update);
// router.delete(`${baseUrl}/notes/:id`, jwtMiddleware, del);
