### Plan to Dynamically Generate Product Listings

1.  **Analyze Existing Files:**
    *   Read `index.html` to understand the current structure of the product display area and the category links.
    *   Read `css/data/products.js` to understand the data structure for each product (e.g., properties for name, image, price, and category).
    *   Read `js/主頁.js` to see if there is any existing JavaScript that needs to be integrated with.

2.  **Modify `index.html`:**
    *   Locate the main container element where the product cards are currently displayed. Assign it a unique ID, like `product-grid`, for easy selection with JavaScript.
    *   Remove the static, hard-coded product items from this container.
    *   Change the title "Room A" to "Whole Products".
    *   Add a container for pagination controls (e.g., `<div id="pagination-controls"></div>`).
    *   Add a `<script>` tag to include the `css/data/products.js` file before the main `js/主頁.js` script tag. This will make the product data available to the script.

3.  **Modify `js/主頁.js`:**
    *   Create a state object to keep track of the current product list (e.g., all, earrings), the current page number, and the number of items per page (6).
    *   Create a main `render()` function that will be called every time the view needs to be updated.
    *   **`displayProducts()` function:**
        *   This function will be called by `render()`.
        *   It will take the filtered list of products and the current page number as arguments.
        *   It will calculate which products to display based on the current page (e.g., for page 2, it would be items 7-12).
        *   It will dynamically generate the HTML for each product card using the data from the `products` array.
        *   It will update the `innerHTML` of the `product-grid` with the generated HTML.
    *   **`setupPagination()` function:**
        *   This function will also be called by `render()`.
        *   It will calculate the total number of pages needed for the current product list.
        *   It will generate the HTML for the pagination buttons (e.g., "Previous", "Next", page numbers) and add them to the `pagination-controls` container.
        *   It will add event listeners to these buttons to update the current page number and re-render the view.
    *   **`filterProducts()` function:**
        *   This function will be called when a user clicks on a category link (Whole Products, Earrings, etc.).
        *   It will update the state with the new product list based on the selected category.
        *   It will reset the current page to 1.
        *   It will call the main `render()` function to update the page.
    *   **Initial Load:**
        *   Add an event listener for `DOMContentLoaded` to call `filterProducts()` with the 'all' category to display all products when the page first loads.

4.  **Create `gemini.md`:**
    *   Save this plan to a new file named `gemini.md` in the project root.
