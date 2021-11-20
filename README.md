# Plasmic-Hydrogen Demo

## Overview

This demo shows integration between Plasmic and Hydrogen.  

It includes a recreation of a few pages from the original Hydrogen starter project:

* The home page, at `pages/plasmic/home.server.jsx`. Featured gallery collection data is fetched on the server with `useShopQuery()`
* A collection page, at `pages/plasmic/collection/[handle].server.jsx`. Collection data for the param handle is fetched on the server.
* A product page, at `pages/plasmic/product/[handle].server.jsx`.  Product details for the param handle is fetched on the server`.
* A catch-all page, at `pages/plasmic/pages/[handle].server.jsx`.  Any additional page created in the Plasmic project will show up here.
* A "Plasmic host" page, at `pages/plasmic-host.jsx`. Each artboard that shows up in the Plasmic studio is an iframe pointing at this page.  The page registers custom code components with Plasmic, and contains a placeholder where the Plasmic studio will insert the design for each artboard.  This page has some collection and product data hard-coded and fetched on the server. This page is only used for development, not for production.

The Plasmic project is located at https://studio.plasmic.app/projects/jb6uzr5Zyd7sXx5pGeaPgg.

## Getting started

1. Run `yarn dev`. This starts the vite server.
2. If your server is running on port 3000, the Hydrogen Demo Plasmic project should already be configured to use it.
3. Open the Plasmic Hydrogen Demo project.

**Note**: vite can be pretty flakey here; sometimes it refuses to pick up changes in your code. If things are not working, try deleting `node_modules/.vite` and restarting the vite server, and reload your browser with a hard refresh.  The HMR / auto-refresh from the vite server may also result in a blank white page on the Plasmic studio sometimes, and you'll need to reload the browser tab to get it back.

## How it works

You design pages in Plasmic. The server page components dynamically fetch the designs from Plasmic when rendering, either for server-side rendering or static generation.  This makes it possibe for content creators to create new pages and update designs without involving develoeprs!

## Custom components

You can bring in your own custom components for use in the Plasmic studio.  This repo contains many such components:

* `ProductParts.client.jsx` contains components that reads pieces of Product data from the context.  You can use these components in Plasmic to show render product data.
* `CollectionParts.client.jsx` contains components that renders pieces of Collection data from the context.
* `ProductsList.client.jsx` renders a list of product from the context.

These custom components are registered with Plasmic in `plasmic-init.js`. 

## Publishing changes

You can visit Plasmic-created pages on your local server, at `http://localhost:3000/plasmic/home`.  

If you make changes to pages that you've designed, you need to publish those changes for them to show up on your dev server.  You can do so by clicking on the Publish button on the upper-right.

In a typical workflow, content creators will make their changes, and publish.  Those changes will then be incorporated into the real production site the next time they are fetched from Plasmic (could be the next time you rebuild the site, or dynamically if you set a max-age for the data).