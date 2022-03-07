
/**
 * Flatten the nested list of menu items
 */
let uuid = 1;

const assignIdAndParent = (menuItems, parentId) => {
    menuItems = menuItems || [];
    menuItems.forEach(item => {
        const id = item.id || uuid;
        uuid += 1;
        item.id = id;
        item.parentId = item.parentId || parentId;
        item.active = false;

        if (typeof item.children !== 'undefined') {
            assignIdAndParent(item.children, id);
        }
    });
};

export default (menuItems) => {
    assignIdAndParent(menuItems);
    return menuItems;
};
