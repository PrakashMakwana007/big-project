

import api from './api';



export const getCategories = api.categories.getAll;
export const getSubcategories = api.categories.getSubcategories;
export const getGigMetadata = api.categories.getGigMetadata;
export const getPricingFeatures = api.categories.getPricingFeatures;
export const getExtraServices = api.categories.getExtraServices;
export const getGig = api.gigs.getById;
export const createGig = api.gigs.create;
export const updateGig = api.gigs.update;
export const publishGig = api.gigs.publish;
export const getActiveGigs = api.gigs.getActiveGigs;
export const getGigBySlug = api.gigs.getById;