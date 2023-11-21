let deleteForm = document.getElementById("deleteForm");
document.addEventListener("click", (event) => {

    if (event.target.id === "delete") {
        console.log("Delete button clicked");
        let isConfirmed = confirm("Are you sure you want to delete?");
        if (isConfirmed) {
            deleteForm.submit();
        }
    }
});
