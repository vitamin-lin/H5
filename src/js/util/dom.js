const Dom = {
  addClass: function(obj, cls) {
    const obj_class = obj.className,
          blank = (obj_class != '') ? ' ' : '';
    const added = obj_class + blank + cls;
    obj.className = added;
  },
  removeClass: function(obj, cls) {
    let obj_class = ' ' + obj.className + ' ';
    obj_class = obj_class.replace(/(\s+)/gi, ' '),
    removed = obj_class.replace(' ' + cls + ' ', ' ');
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;
  },
  hasClass: function(obj, cls) {
    const obj_class = obj.className,
          obj_class_lst = obj_class.split(/\s+/);
    let x = 0;
    for(x in obj_class_lst) {
      if(obj_class_lst[x] == cls) {
        return true;
      }
    }
    return false;
  }
}

export default Dom