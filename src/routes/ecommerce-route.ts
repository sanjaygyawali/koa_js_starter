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
} from "../controllers/GharbataiController";
import { production } from "knexfile";

export const router = new Router();
const jwtMiddleware = jwt({ secret: process.env.JWT_SECRET });

const baseUrl = "/api/v1";

router.get(`${baseUrl}/categories`, categories);
router.get(`${baseUrl}/category/:id`, categories);
router.get(`${baseUrl}/products`, products);
router.get(`${baseUrl}/ansestorcategory`, ansestorCategory);
router.get(`${baseUrl}/childrencategory`, childrenCategory);
router.get(`${baseUrl}/brands`, brands);
router.get(`${baseUrl}/deals`, deals);
router.get(`${baseUrl}/specialevents`, specialEvents);
router.get(`${baseUrl}/categorygallery`, categoryGallery);
router.get(`${baseUrl}/availablelocations`, availablelocations);

// router.post(`${baseUrl}/notes`, jwtMiddleware, create);
// router.get(`${baseUrl}/notes/:id`, jwtMiddleware, show);
// router.put(`${baseUrl}/notes/:id`, jwtMiddleware, update);
// router.delete(`${baseUrl}/notes/:id`, jwtMiddleware, del);
