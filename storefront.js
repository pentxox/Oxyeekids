(() => {
    "use strict";

    const WISHLIST_KEY = "oxyee-little-wear-wishlist";
    const catalog = [
        { id: "jabla", name: "Jabla Button", category: "Jabla, baby clothing, cotton", image: "images/Product/oxyeejabla11.png", href: "jabla.html" },
        { id: "swaddle", name: "Baby Swaddle", category: "Swaddle, muslin, baby essentials", image: "images/Product/oxyeeswaddle2.png", href: "swaddle.html" },
        { id: "towel", name: "Baby Towel", category: "Towels, bath, baby essentials", image: "images/Product/oxyeetowel2.png", href: "towel.html" },
        { id: "night", name: "Night Suit", category: "Nightwear, sleepwear, baby clothing", image: "images/Product/oxyeenightsuits2.png", href: "night.html" },
        { id: "frock", name: "Baby Frock", category: "Frocks, dresses, baby clothing", image: "images/Product/oxyeefrock2.png", href: "frock.html" },
        { id: "nappy", name: "Baby Nappy", category: "Nappy, nappies, baby essentials", image: "images/Product/oxyeenappy4.png", href: "nappy.html" },
        { id: "wipes", name: "Reusable Baby Wipes", category: "Wipes, baby essentials", image: "images/Product/oxyeewipes2.png", href: "wipes.html" },
        { id: "cordset", name: "Baby Co-ord Set", category: "Co-ord, coord, matching sets, baby clothing", image: "images/Product/oxyee_coord_set_2.png", href: "cordset.html" },
        { id: "rombers", name: "Baby Rompers", category: "Rompers, romper, baby clothing", image: "images/Product/oxyeerombers.png", href: "rombers.html" },
        { id: "baby-pillow", name: "Baby Pillow", category: "Baby Accessories, pillow", collection: "accessories", image: "images/oxyeeaccesories/oxyee_pillow.png", href: "baby-pillow.html" },
        { id: "baby-sleeping-bag", name: "Baby Sleeping Bag", category: "Baby Accessories, sleeping bag", collection: "accessories", image: "images/oxyeeaccesories/oxyee_sleepingbAG1.png", href: "baby-sleeping-bag.html" },
        { id: "baby-carrier-bag", name: "Baby Carrier Bag", category: "Baby Accessories, carrier bag", collection: "accessories", image: "images/oxyeeaccesories/carrierbag1.jpg", href: "baby-carrier-bag.html" },
        { id: "baby-head-protector", name: "Baby Head Protector", category: "Baby Accessories, head protector", collection: "accessories", image: "images/oxyeeaccesories/oxyee_headprotector.png", href: "baby-head-protector.html" }
    ];
    const catalogById = new Map(catalog.map((product) => [product.id, product]));

    function readWishlist() {
        try {
            const stored = JSON.parse(window.localStorage.getItem(WISHLIST_KEY) || "[]");
            return Array.isArray(stored)
                ? [...new Set(stored.filter((id) => catalogById.has(id)))]
                : [];
        } catch (error) {
            console.error("Unable to read the Oxyee wishlist from localStorage.", error);
            return [];
        }
    }

    let wishlist = readWishlist();
    let searchReturnFocus = null;
    let menuReturnFocus = null;

    function writeWishlist() {
        try {
            window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
        } catch (error) {
            console.error("Unable to save the Oxyee wishlist to localStorage.", error);
            window.alert("Your browser could not save the wishlist. Please check your browser storage settings.");
        }
    }

    function getElement(tag, className, text) {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    }

    function createIconButton(label, icon, action, extraClass = "") {
        const button = getElement("button", `storefront-icon-button ${extraClass}`.trim());
        button.type = "button";
        button.setAttribute("aria-label", label);
        button.dataset[action] = "";
        const iconElement = getElement("span", "storefront-icon", icon);
        iconElement.setAttribute("aria-hidden", "true");
        button.append(iconElement);
        return button;
    }

    function createWishlistLink() {
        const link = getElement("a", "storefront-icon-button storefront-wishlist-link");
        link.href = "wishlist.html";
        link.setAttribute("aria-label", "Wishlist");
        const icon = getElement("span", "storefront-icon", "♡");
        icon.setAttribute("aria-hidden", "true");
        link.append(icon);
        ensureWishlistCount(link);
        return link;
    }

    function ensureWishlistCount(link) {
        link.classList.add("storefront-wishlist-link");
        link.setAttribute("aria-label", "Wishlist");
        if (link.querySelector("[data-wishlist-count]")) return;
        const count = getElement("span", "wishlist-count", "0");
        count.dataset.wishlistCount = "";
        count.setAttribute("aria-live", "polite");
        link.append(count);
    }

    function ensureWishlistLink(container) {
        let link = container.querySelector(".storefront-wishlist-link, a[href='wishlist.html']");
        if (!link) {
            link = createWishlistLink();
            container.append(link);
        } else {
            ensureWishlistCount(link);
        }
    }

    function installHeaderControls() {
        const iconBar = document.querySelector("header .nav-icons");
        const header = document.querySelector("header");
        if (!header) return;

        if (iconBar) {
            if (!iconBar.querySelector("[data-store-search-open]")) {
                iconBar.append(createIconButton("Search products", "⌕", "storeSearchOpen"));
            }
            ensureWishlistLink(iconBar);
            if (!iconBar.querySelector("[data-store-menu-open]")) {
                iconBar.append(createIconButton("Open navigation menu", "☰", "storeMenuOpen"));
            }
        } else {
            let controls = header.querySelector(".storefront-controls");
            if (!controls) {
                controls = getElement("div", "storefront-controls");
                const nav = header.querySelector("nav");
                if (nav) nav.insertAdjacentElement("afterend", controls);
                else header.append(controls);
            }

            if (!controls.querySelector("[data-store-search-open]")) {
                controls.append(createIconButton("Search products", "⌕", "storeSearchOpen"));
            }
            ensureWishlistLink(controls);
            if (!controls.querySelector("[data-store-menu-open]")) {
                controls.append(createIconButton("Open navigation menu", "☰", "storeMenuOpen"));
            }
        }

        document.querySelectorAll("[data-store-search-open]").forEach((button) => {
            button.setAttribute("aria-haspopup", "dialog");
            button.setAttribute("aria-controls", "store-search-dialog");
            button.setAttribute("aria-expanded", "false");
        });
        document.querySelectorAll("[data-store-menu-open]").forEach((button) => {
            button.setAttribute("aria-haspopup", "dialog");
            button.setAttribute("aria-controls", "store-menu-dialog");
            button.setAttribute("aria-expanded", "false");
        });
    }

    function buildOverlays() {
        const search = getElement("div", "storefront-overlay storefront-search-overlay");
        search.id = "store-search-dialog";
        search.hidden = true;
        search.dataset.storeSearchDialog = "";
        search.innerHTML = `
            <section class="storefront-dialog storefront-search-dialog" role="dialog" aria-modal="true" aria-labelledby="store-search-title">
                <div class="storefront-dialog-heading">
                    <div><p class="storefront-kicker">FIND SOMETHING SOFT</p><h2 id="store-search-title">Search our collection</h2></div>
                    <button class="storefront-close" type="button" data-store-search-close aria-label="Close search">&times;</button>
                </div>
                <label class="storefront-search-field">
                    <span class="storefront-search-icon" aria-hidden="true">⌕</span>
                    <input type="search" data-store-search-input aria-label="Search by product name or category" placeholder="Search by product or category..." autocomplete="off">
                </label>
                <p class="storefront-results-label" data-store-search-label>Popular picks</p>
                <div class="storefront-search-results" data-store-search-results aria-live="polite"></div>
                <p class="storefront-empty-search" data-store-search-empty hidden>No products found. Try another name or category.</p>
            </section>`;

        const menu = getElement("div", "storefront-overlay storefront-menu-overlay");
        menu.id = "store-menu-dialog";
        menu.hidden = true;
        menu.dataset.storeMenuDialog = "";
        menu.innerHTML = `
            <aside class="storefront-drawer" role="dialog" aria-modal="true" aria-labelledby="store-menu-title">
                <div class="storefront-drawer-heading">
                    <a class="storefront-drawer-brand" id="store-menu-title" href="index.html">Oxyee <span>Little Wear</span></a>
                    <button class="storefront-close" type="button" data-store-menu-close aria-label="Close navigation menu">&times;</button>
                </div>
                <p class="storefront-kicker">MADE FOR TINY MOMENTS</p>
                <nav class="storefront-drawer-nav" aria-label="Main navigation">
                    <a href="shop.html">Shop <span aria-hidden="true">→</span></a>
                    <a href="collections.html">Collections <span aria-hidden="true">→</span></a>
                    <a href="About.html">About <span aria-hidden="true">→</span></a>
                    <a href="contact.html">Contact <span aria-hidden="true">→</span></a>
                </nav>
                <p class="storefront-drawer-note">Soft, thoughtful essentials for all your little one's everyday moments.</p>
            </aside>`;

        document.body.append(search, menu);
        return { search, menu };
    }

    const overlays = buildOverlays();
    const searchInput = overlays.search.querySelector("[data-store-search-input]");
    const searchResults = overlays.search.querySelector("[data-store-search-results]");
    const searchEmpty = overlays.search.querySelector("[data-store-search-empty]");
    const searchLabel = overlays.search.querySelector("[data-store-search-label]");

    function addWishlistToggle(parent, product, className = "storefront-card-wishlist") {
        const button = getElement("button", className);
        button.type = "button";
        button.dataset.wishlistToggle = product.id;
        const isSaved = wishlist.includes(product.id);
        button.setAttribute("aria-pressed", String(isSaved));
        button.setAttribute("aria-label", `${isSaved ? "Remove" : "Add"} ${product.name} ${isSaved ? "from" : "to"} wishlist`);
        button.textContent = isSaved ? "♥" : "♡";
        parent.append(button);
        return button;
    }

    function renderSearchResults(query = "") {
        const normalized = query.trim().toLocaleLowerCase();
        const matches = catalog.filter((product) => {
            const searchable = `${product.name} ${product.category}`.toLocaleLowerCase();
            return !normalized || searchable.includes(normalized);
        });

        searchResults.replaceChildren();
        searchLabel.textContent = normalized ? `${matches.length} matching product${matches.length === 1 ? "" : "s"}` : "Popular picks";
        searchEmpty.hidden = matches.length > 0;

        matches.forEach((product) => {
            const item = getElement("article", "storefront-result");
            const link = getElement("a", "storefront-result-link");
            link.href = product.href;
            const image = getElement("img");
            image.src = product.image;
            image.alt = "";
            image.loading = "lazy";
            const copy = getElement("span", "storefront-result-copy");
            copy.append(getElement("strong", "", product.name), getElement("small", "", product.category.split(",")[0].trim()));
            link.append(image, copy);
            item.append(link);
            addWishlistToggle(item, product, "storefront-card-wishlist storefront-result-wishlist");
            searchResults.append(item);
        });
    }

    function renderWishlistPage() {
        const container = document.querySelector("[data-wishlist-items]");
        if (!container) return;
        container.replaceChildren();
        const savedProducts = wishlist.map((id) => catalogById.get(id)).filter(Boolean);
        const empty = document.querySelector("[data-wishlist-empty]");
        empty.hidden = savedProducts.length > 0;

        savedProducts.forEach((product) => {
            const card = getElement("article", "wishlist-product-card");
            const imageLink = getElement("a", "wishlist-product-image");
            imageLink.href = product.href;
            const image = getElement("img");
            image.src = product.image;
            image.alt = product.name;
            image.loading = "lazy";
            imageLink.append(image);

            const details = getElement("div", "wishlist-product-details");
            details.append(
                getElement("p", "storefront-kicker", product.category.split(",")[0].trim()),
                getElement("h2", "", product.name)
            );
            const actions = getElement("div", "wishlist-product-actions");
            const viewLink = getElement("a", "wishlist-view-link", "View product");
            viewLink.href = product.href;
            const removeButton = getElement("button", "wishlist-remove-button", "Remove");
            removeButton.type = "button";
            removeButton.dataset.wishlistToggle = product.id;
            removeButton.setAttribute("aria-label", `Remove ${product.name} from wishlist`);
            actions.append(viewLink, removeButton);
            details.append(actions);
            card.append(imageLink, details);
            container.append(card);
        });
    }

    function updateWishlistUI() {
        document.querySelectorAll("[data-wishlist-count]").forEach((counter) => {
            counter.textContent = String(wishlist.length);
            counter.hidden = wishlist.length === 0;
        });
        document.querySelectorAll("[data-wishlist-toggle]").forEach((button) => {
            const product = catalogById.get(button.dataset.wishlistToggle);
            if (!product) return;
            const isSaved = wishlist.includes(product.id);
            button.setAttribute("aria-pressed", String(isSaved));
            if (button.classList.contains("wishlist-remove-button")) {
                button.setAttribute("aria-label", `Remove ${product.name} from wishlist`);
            } else {
                button.setAttribute("aria-label", `${isSaved ? "Remove" : "Add"} ${product.name} ${isSaved ? "from" : "to"} wishlist`);
                button.textContent = isSaved ? "♥" : "♡";
            }
        });
        renderWishlistPage();
    }

    function toggleWishlist(id) {
        if (!catalogById.has(id)) return;
        wishlist = wishlist.includes(id)
            ? wishlist.filter((savedId) => savedId !== id)
            : [...wishlist, id];
        writeWishlist();
        updateWishlistUI();
    }

    function addCardInteractions() {
        document.querySelectorAll(".product-card").forEach((card) => {
            const detailLink = card.querySelector('a[href$=".html"]');
            if (!detailLink) return;
            const href = detailLink.getAttribute("href").split("/").pop();
            const product = catalog.find((item) => item.href === href);
            if (!product) return;

            card.dataset.productId = product.id;
            card.dataset.productCategory = product.collection || "babywear";
            card.tabIndex = 0;
            card.setAttribute("role", "group");
            card.setAttribute("aria-label", `${product.name} product. Press Enter to view details.`);
            if (!card.querySelector("[data-wishlist-toggle]")) {
                addWishlistToggle(card, product);
            }
        });

        const currentPage = window.location.pathname.split("/").pop().toLowerCase();
        const currentProduct = catalog.find((product) => product.href.toLowerCase() === currentPage);
        if (currentProduct) {
            const title = document.querySelector(".product-content h1, .jabla-info h1, .swaddle-info h1, .towel-info h1");
            if (title && !title.parentElement.querySelector("[data-wishlist-toggle]")) {
                addWishlistToggle(title.parentElement, currentProduct, "storefront-detail-wishlist");
            }
        }
    }

    function installCategoryFilters() {
        const filters = Array.from(document.querySelectorAll("[data-product-filter]"));
        if (!filters.length) return;

        const products = Array.from(document.querySelectorAll(".product-card[data-product-id]"));
        const requestedCategory = new URLSearchParams(window.location.search).get("category");
        const initialCategory = filters.some((filter) => filter.dataset.productFilter === requestedCategory)
            ? requestedCategory
            : "all";

        function selectCategory(category) {
            filters.forEach((filter) => {
                filter.setAttribute("aria-pressed", String(filter.dataset.productFilter === category));
            });
            products.forEach((card) => {
                card.hidden = category !== "all" && card.dataset.productCategory !== category;
            });
        }

        filters.forEach((filter) => {
            filter.addEventListener("click", () => selectCategory(filter.dataset.productFilter));
        });
        selectCategory(initialCategory);
    }

    function openOverlay(overlay, trigger) {
        if (overlay === overlays.search) {
            searchReturnFocus = trigger;
            trigger.setAttribute("aria-expanded", "true");
            renderSearchResults(searchInput.value);
            overlay.hidden = false;
            document.body.classList.add("storefront-overlay-open");
            window.requestAnimationFrame(() => searchInput.focus());
        } else {
            menuReturnFocus = trigger;
            trigger.setAttribute("aria-expanded", "true");
            overlay.hidden = false;
            document.body.classList.add("storefront-overlay-open");
            overlay.querySelector("[data-store-menu-close]").focus();
        }
    }

    function closeOverlay(overlay) {
        if (overlay.hidden) return;
        overlay.hidden = true;
        const trigger = overlay === overlays.search ? searchReturnFocus : menuReturnFocus;
        if (trigger) trigger.setAttribute("aria-expanded", "false");
        if (overlays.search.hidden && overlays.menu.hidden) {
            document.body.classList.remove("storefront-overlay-open");
        }
        if (trigger && document.contains(trigger)) trigger.focus();
    }

    function trapDialogFocus(event, overlay) {
        if (event.key !== "Tab") return;
        const focusable = Array.from(
            overlay.querySelectorAll("a[href], button:not([disabled]), input:not([disabled])")
        ).filter((element) => element.getClientRects().length > 0);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function installEvents() {
        document.addEventListener("click", (event) => {
            const searchOpen = event.target.closest("[data-store-search-open]");
            if (searchOpen) {
                openOverlay(overlays.search, searchOpen);
                return;
            }

            const menuOpen = event.target.closest("[data-store-menu-open]");
            if (menuOpen) {
                openOverlay(overlays.menu, menuOpen);
                return;
            }

            if (event.target.closest("[data-store-search-close]")) {
                closeOverlay(overlays.search);
                return;
            }
            if (event.target.closest("[data-store-menu-close]")) {
                closeOverlay(overlays.menu);
                return;
            }

            if (event.target === overlays.search) {
                closeOverlay(overlays.search);
                return;
            }
            if (event.target === overlays.menu) {
                closeOverlay(overlays.menu);
                return;
            }

            const accessoryThumbnail = event.target.closest("[data-accessory-thumbnail]");
            if (accessoryThumbnail) {
                const mainImage = document.querySelector("[data-accessory-main-image]");
                if (mainImage) {
                    mainImage.src = accessoryThumbnail.dataset.image;
                    mainImage.alt = accessoryThumbnail.dataset.alt;
                    document.querySelectorAll("[data-accessory-thumbnail]").forEach((thumbnail) => {
                        const isActive = thumbnail === accessoryThumbnail;
                        thumbnail.classList.toggle("is-active", isActive);
                        thumbnail.setAttribute("aria-pressed", String(isActive));
                    });
                }
                return;
            }

            const wishlistButton = event.target.closest("[data-wishlist-toggle]");
            if (wishlistButton) {
                event.preventDefault();
                event.stopPropagation();
                toggleWishlist(wishlistButton.dataset.wishlistToggle);
                return;
            }

            const productCard = event.target.closest(".product-card[data-product-id]");
            if (productCard && !event.target.closest("a, button")) {
                const product = catalogById.get(productCard.dataset.productId);
                if (product) window.location.href = product.href;
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                if (!overlays.search.hidden) closeOverlay(overlays.search);
                if (!overlays.menu.hidden) closeOverlay(overlays.menu);
                return;
            }
            if (!overlays.search.hidden) trapDialogFocus(event, overlays.search);
            if (!overlays.menu.hidden) trapDialogFocus(event, overlays.menu);

            if ((event.key === "Enter" || event.key === " ") &&
                event.target.matches(".product-card[data-product-id]") &&
                !event.target.closest("a, button")) {
                event.preventDefault();
                const product = catalogById.get(event.target.dataset.productId);
                if (product) window.location.href = product.href;
            }
        });

        searchInput.addEventListener("input", () => renderSearchResults(searchInput.value));
        window.addEventListener("storage", (event) => {
            if (event.key === WISHLIST_KEY) {
                wishlist = readWishlist();
                updateWishlistUI();
            }
        });
    }

    function init() {
        installHeaderControls();
        addCardInteractions();
        installCategoryFilters();
        installEvents();
        updateWishlistUI();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();
