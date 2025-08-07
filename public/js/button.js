function toggleDropdown(id) {
    const menu = document.getElementById(`dropdown-${id}`);
    // Close other dropdowns
    document.querySelectorAll('.dropdown-menu').forEach(el => {
        if (el !== menu) el.classList.remove('show');
    });
    // Toggle the selected one
    menu.classList.toggle('show');
}

// Optional: close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.viewposts__post')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
    }
});