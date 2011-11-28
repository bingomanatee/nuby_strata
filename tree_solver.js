function find_parents(item, callback, parents) {

    if (!parents) {
        parents = [];
    }

    function _on_parent_found(err, found_parent) {
        parents.unshift(found_parent);
        next_parent = found_parent;
        _find_parent();
    }

    var next_parent = item;

    function _find_parent() {
        if (next_parent && next_parent.parent) {
            MenuItem.findOne({_id:next_parent.parent}, _on_parent_found);
        } else {
            callback(null, parents.length);
        }
    }

    _find_parent();
}