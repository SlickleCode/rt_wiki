const COLLAPSED_STORAGE_KEY_PREFIX = "sidebar-collapsed-";

window.onload = function() {
    document.getElementById("open-sidebar").addEventListener("click", openSidebar);
    document.getElementById("close-sidebar").addEventListener("click", closeSidebar);
    document.getElementById("search-field").addEventListener("input", filterSidebar);
    window.onresize = removeMobileSidebarClasses;
    initSidebarCategories();
}

function initSidebarCategories() {
    let categories = document.getElementsByClassName("sidebar-category");
    for (let category of categories) {
        let header = category.querySelector(".sidebar-header-item");
        if (isCategoryCollapsedByDefault(category)) {
            setCategoryCollapsed(category, header, true);
        }
        header.addEventListener("click", function() {
            setCategoryCollapsed(category, header, !category.classList.contains("collapsed"));
        });
    }
}

function isCategoryCollapsedByDefault(category) {
    try {
        return localStorage.getItem(COLLAPSED_STORAGE_KEY_PREFIX + category.dataset.category) === "true";
    } catch (e) {
        return false;
    }
}

function setCategoryCollapsed(category, header, collapsed) {
    category.classList.toggle("collapsed", collapsed);
    header.setAttribute("aria-expanded", String(!collapsed));
    try {
        localStorage.setItem(COLLAPSED_STORAGE_KEY_PREFIX + category.dataset.category, String(collapsed));
    } catch (e) {
        // localStorage unavailable (private browsing, etc.) - collapse state just won't persist
    }
}

function filterSidebar(event) {
    let query = event.target.value.trim().toLowerCase();
    let sidebarList = document.getElementById("sidebar-item-list");
    sidebarList.classList.toggle("searching", query !== "");

    let categories = sidebarList.getElementsByClassName("sidebar-category");
    for (let category of categories) {
        let items = category.getElementsByClassName("sidebar-line-item");
        let visibleCount = 0;
        for (let item of items) {
            let matches = query === "" || item.dataset.keywords.includes(query);
            item.classList.toggle("search-hidden", !matches);
            if (matches) visibleCount++;
        }
        category.classList.toggle("no-match", visibleCount === 0);
    }
}

function openSidebar() {
    let sidebar = document.getElementsByClassName("sidebar-component")[0];
    sidebar.classList.add("sidebar-component-slide-in");
    sidebar.classList.remove("sidebar-component-slide-out");
}

function closeSidebar() {
    let sidebar = document.getElementsByClassName("sidebar-component")[0];
    sidebar.classList.add("sidebar-component-slide-out");
    sidebar.classList.remove("sidebar-component-slide-in");
}

function removeMobileSidebarClasses() {
    let sidebar = document.getElementsByClassName("sidebar-component")[0];
    sidebar.classList.remove("sidebar-component-slide-out");
    sidebar.classList.remove("sidebar-component-slide-in");
}

function openModalWithPicture(image) {
    let modalPicture = document.getElementById("modal-picture")
    modalPicture.src = image.src;
    document.getElementById("modal").addEventListener("click", hideModal);
    displayModal();
}

function displayModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "flex";
}

function hideModal() {
    let modal = document.getElementById("modal");
    modal.style.display = "none";
    modal.removeEventListener("click", hideModal);
}