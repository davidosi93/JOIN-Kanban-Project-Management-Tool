if (newCategory.length > 0 && currentCategoryColor) {
    allCategorys.push(jsonColor);
    selectNewCatagoryCancel();
    createnewCategoryAll();
    newCategorySelected = false;
}

if (newCategory.length > 0) {
    if (currentCategoryColor) {
        allCategorys.push(jsonColor);
        selectNewCatagoryCancel();
        createnewCategoryAll();
        newCategorySelected = false;
    } else {
        alert("Please select a color for the new category.");
    }
}


if (newCategory.length > 0) {
    if (currentCategoryColor) {
        let categoryExists = allCategorys.some(category => category.name === newCategory && category.color === currentCategoryColor);
        if (!categoryExists) {
            allCategorys.push(jsonColor);
            selectNewCatagoryCancel();
            createnewCategoryAll();
            newCategorySelected = false;
        } else {
            alert("A category with the same name and color already exists.");
        }
    } else {
        alert("Please select a color for the new category.");
    }
}