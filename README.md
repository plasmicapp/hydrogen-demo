# Plasmic-Hydrogen Demo

## Overview

This demo shows integration between Plasmic and Hydrogen.  

It includes a recreation of a few pages from the original Hydrogen starter project:

* The home page, at `pages/Index.server.jsx`. Featured gallery collection data is fetched on the server with `useShopQuery()`
* A collection page, at `pages/collection/[handle].server.jsx`. Collection data for the param handle is fetched on the server.
* A product page, at `pages/product/[handle].server.jsx`.  Product details for the param handle is fetched on the server`.
* A catch-all page, at `pages/pages/[handle].server.jsx`.  Any additional page created in the Plasmic project will show up here, though no server data is provided for it.
* A 404 page, at `components/NotFound.jsx`.
* A "Plasmic host" page, at `pages/plasmic-host.jsx`. Each artboard that shows up in the Plasmic studio is an iframe pointing at this page.  The page registers custom code components with Plasmic, and contains a placeholder where the Plasmic studio will insert the design for each artboard.  This page has some collection and product data hard-coded and fetched on the server. This page is only used for development, not for production.

The Plasmic project is located at https://studio.plasmic.app/projects/411uuq2ERfYjd7WEGqb5iw.


## How it works

You design pages in Plasmic. The server page components dynamically fetch the designs from Plasmic when rendering, either for server-side rendering or static generation.  This makes it possibe for content creators to create new pages and update designs without involving develoeprs!

## Trying out Plasmic studio

A production site at https://plasmic-hydrogen-starter-demo.herokuapp.com/ is running Hydrogen code from this repo.  Pages there are all built in Plasmic, based on the Hydrogen starter.

You can try making some changes in [the Plasmic project](https://studio.plasmic.app/projects/411uuq2ERfYjd7WEGqb5iw), and then hitting the **Publish** button on the upper right.  Once your changes have been published, they should show up in the production site.

## Trying out running a local dev server

If you want to experiment with registering new code components, or creating pages that require server-fetched data, you'll need to spin up your own local dev server.

1. Make a copy of the Plasmic Hydrogen demo project so you can play with it.  You'll need to point its app host to your local dev server instead (by default, http://localhost:3000/plasmic-host).  See [how to do that here](https://docs.plasmic.app/learn/app-hosting/).
2. Update `plasmic-init.js` to point to your new project's ID and token.  To find the token, click on the Code button on the upper-right corner.
3. Run `yarn dev`. This starts the vite server.
4. Open your Plasmic project!

**Note**: vite can be pretty flakey here; sometimes it refuses to pick up changes in your code. If things are not working, try deleting `node_modules/.vite` and restarting the vite server, and reload your browser with a hard refresh.  The HMR / auto-refresh from the vite server may also result in a blank white page on the Plasmic studio sometimes, and you'll need to reload the browser tab to get it back.

You can now visit Plasmic-created pages on your local server, at `http://localhost:3000/`.  

If you make changes to pages that you've designed, you need to publish those changes for them to show up on your dev server.  You can do so by clicking on the Publish button on the upper-right.

## Custom components

You can bring in your own custom components for use in the Plasmic studio.  This repo contains many such components:

* `ProductParts.client.jsx` contains components that reads pieces of Product data from the context.  You can use these components in Plasmic to show render product data.
* `CollectionParts.client.jsx` contains components that renders pieces of Collection data from the context.
* `ProductsList.client.jsx` renders a list of product from the context.

These custom components are registered with Plasmic in `plasmic-init.js`. 